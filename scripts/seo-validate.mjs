import fs from "node:fs";
import path from "node:path";
import { normalizeInternalHref } from "./lib/normalize-internal-href.mjs";

const distDir = path.resolve("dist");
const sitemapPath = path.join(distDir, "sitemap.xml");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  });
}

function pageUrl(filePath) {
  return `/${path.relative(distDir, filePath).replace(/index\.html$/, "").replace(/\\/g, "/")}`;
}

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function decodeHtml(value) {
  return value
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

function schemaTypes(value) {
  if (Array.isArray(value)) return value.flatMap(schemaTypes);
  if (!value || typeof value !== "object") return [];
  return [
    ...(Array.isArray(value["@type"]) ? value["@type"] : value["@type"] ? [value["@type"]] : []),
    ...Object.values(value).flatMap(schemaTypes),
  ];
}

function schemaNodes(value) {
  if (Array.isArray(value)) return value.flatMap(schemaNodes);
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(schemaNodes)];
}

const htmlFiles = walk(distDir).filter((file) => file.endsWith(".html"));
const urls = new Set(htmlFiles.map(pageUrl));
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const sitemapUrls = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/www\.emc2ops\.com([^<]*)<\/loc>/g)].map((match) => match[1]),
);
const moneyPageUrls = [
  "/use-cases/apartment-lead-tracking/",
  "/use-cases/real-estate-lead-follow-up-automation/",
  "/use-cases/how-to-automate-property-management/",
  "/use-cases/lead-to-lease-automation/",
  "/use-cases/real-estate-crm-follow-up-mess/",
  "/services/missed-call-recovery/",
  "/services/leasing-follow-up/",
  "/services/maintenance-intake-automation/",
  "/services/crm-workflow-automation/",
  "/services/owner-update-automation/",
  "/services/vendor-dispatch-automation/",
  "/services/ai-front-desk-property-management/",
  "/integrations/appfolio/",
  "/integrations/buildium/",
  "/integrations/leadsimple/",
];
const forbiddenVisibleLabels = [
  "Search intent this page answers",
  "Cluster keywords",
  "Search cluster strategy",
  "query clusters",
];
const protectedOperatorBriefs = new Map([
  ["/services/maintenance-intake-automation/", "What a dispatch-ready maintenance request actually contains"],
  ["/services/owner-update-automation/", "The owner update staff should not have to rewrite"],
  ["/services/ai-front-desk-property-management/", "What happens in a real front-desk conversation"],
]);
const failures = [];
const pageRecords = [];
const unsupportedSchemaTypes = new Set(["ContactAction", "PrivacyPolicy", "TermsOfService"]);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const url = pageUrl(file);
  const title = decodeHtml(firstMatch(html, /<title>(.*?)<\/title>/s));
  const description = firstMatch(html, /<meta name="description" content="(.*?)"/s);
  const canonical = firstMatch(html, /<link rel="canonical" href="(.*?)"/s);
  const h1s = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map((match) => stripTags(match[1]));
  const hasNoindex = /<meta name="robots" content="[^"]*noindex/i.test(html);

  if (!title) failures.push(`${url} is missing a title tag.`);
  if (!hasNoindex && title.length > 70) failures.push(`${url} title is ${title.length} characters; expected at most 70.`);
  if (!description) failures.push(`${url} is missing a meta description.`);
  if (!hasNoindex && description.length < 100) failures.push(`${url} description is ${description.length} characters; expected at least 100.`);
  if (description.length > 160) failures.push(`${url} description is ${description.length} characters; expected at most 160.`);
  if (!canonical) failures.push(`${url} is missing a canonical tag.`);
  if (h1s.length !== 1) failures.push(`${url} has ${h1s.length} H1 tags.`);
  if (/href="\/book-demo\/\?/i.test(html)) {
    failures.push(`${url} links to a crawlable booking query variant; use fragment attribution instead.`);
  }
  if (!hasNoindex && !sitemapUrls.has(url)) failures.push(`${url} is indexable but missing from sitemap.`);
  for (const label of forbiddenVisibleLabels) {
    if (stripTags(html).includes(label)) failures.push(`${url} exposes internal SEO label "${label}".`);
  }
  const protectedOperatorBrief = protectedOperatorBriefs.get(url);
  if (protectedOperatorBrief && (!stripTags(html).includes(protectedOperatorBrief) || !stripTags(html).includes("Human boundary:"))) {
    failures.push(`${url} is missing its protected operator brief.`);
  }
  if (url.startsWith("/blog/") && url !== "/blog/" && !moneyPageUrls.some((moneyUrl) => html.includes(`href="${moneyUrl}"`))) {
    failures.push(`${url} does not link to a service, use-case, or integration money page.`);
  }

  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt=/.test(img[0])) failures.push(`${url} has an image without alt text.`);
  }

  for (const script of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const schema = JSON.parse(script[1]);
      for (const type of schemaTypes(schema)) {
        if (unsupportedSchemaTypes.has(type)) failures.push(`${url} uses unsupported schema type ${type}.`);
      }
      for (const node of schemaNodes(schema)) {
        const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
        if (types.includes("Dataset") && !node.description) {
          failures.push(`${url} declares a Dataset without the description Google requires.`);
        }
        if (types.includes("SoftwareApplication")) {
          const qualifyingFields = ["offers", "aggregateRating", "applicationCategory", "operatingSystem"].filter(
            (field) => node[field],
          );
          if (qualifyingFields.length < 2) {
            failures.push(`${url} declares an incomplete SoftwareApplication rich-result item.`);
          }
        }
      }
    } catch {
      failures.push(`${url} has invalid JSON-LD.`);
    }
  }

  for (const link of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = link[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = normalizeInternalHref(href);
    if (!target) continue;
    const targetFile = path.join(distDir, target.replace(/^\//, ""), "index.html");
    const targetAsset = path.join(distDir, target.replace(/^\//, ""));
    if (!urls.has(target) && !fs.existsSync(targetFile) && !fs.existsSync(targetAsset)) {
      failures.push(`${url} links to missing internal URL ${href}.`);
    }
  }

  pageRecords.push({ url, html, hasNoindex });
}

const indexablePages = pageRecords.filter((page) => !page.hasNoindex && sitemapUrls.has(page.url));
const inboundSources = new Map(indexablePages.map((page) => [page.url, new Set()]));
for (const page of indexablePages) {
  const targets = new Set(
    [...page.html.matchAll(/<a\b[^>]*href="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((href) => href.startsWith("/") && !href.startsWith("//"))
      .map(normalizeInternalHref)
      .filter(Boolean),
  );
  for (const target of targets) {
    if (target !== page.url && inboundSources.has(target)) inboundSources.get(target).add(page.url);
  }
}
for (const [url, sources] of inboundSources) {
  if (sources.size < 2) failures.push(`${url} has only ${sources.size} followed internal-link source(s); expected at least 2.`);
}

const indexNowKey = "f2b98b61da415ce13aeda36cf5cf4d7a5969a332b27ed7bf05c2f973ed002de6";
const indexNowKeyPath = path.join(distDir, `${indexNowKey}.txt`);
if (!fs.existsSync(indexNowKeyPath) || fs.readFileSync(indexNowKeyPath, "utf8").trim() !== indexNowKey) {
  failures.push("IndexNow verification key is missing from the production build.");
}
if (!fs.existsSync(path.join(distDir, "deployment.json"))) failures.push("Production commit marker is missing.");
if (!fs.existsSync(path.resolve("scripts/submit-indexnow.mjs"))) failures.push("IndexNow submission script is missing.");

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`SEO validation passed for ${htmlFiles.length} HTML pages.`);
