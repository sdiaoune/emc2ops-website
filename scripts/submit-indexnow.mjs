import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const siteUrl = "https://www.emc2ops.com";
const host = "www.emc2ops.com";
const key = "f2b98b61da415ce13aeda36cf5cf4d7a5969a332b27ed7bf05c2f973ed002de6";
const keyLocation = `${siteUrl}/${key}.txt`;
const indexNowEndpoint = "https://api.indexnow.org/indexnow";

function cliArgs() {
  const result = new Map();
  const values = process.argv.slice(2);
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) continue;
    const keyName = value.slice(2);
    const next = values[index + 1];
    if (!next || next.startsWith("--")) result.set(keyName, "true");
    else {
      result.set(keyName, next);
      index += 1;
    }
  }
  return result;
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>(https:\/\/www\.emc2ops\.com[^<]+)<\/loc>/g)].map((match) => match[1]);
}

function changedFiles(from, to) {
  if (!from || !to || /^0+$/.test(from)) return [];
  try {
    return execFileSync("git", ["diff", "--name-only", from, to], { encoding: "utf8" })
      .split("\n")
      .map((value) => value.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function urlsForChanges(files, allUrls) {
  if (files.length === 0) return allUrls;
  const blogOnly = files.every(
    (file) => file.startsWith("src/content/blog/") || file.startsWith("public/blog/social-assets/"),
  );
  if (!blogOnly) return allUrls;

  const changedBlogUrls = files
    .filter((file) => file.startsWith("src/content/blog/") && /\.mdx?$/.test(file))
    .map((file) => `${siteUrl}/blog/${path.basename(file).replace(/\.mdx?$/, "")}/`);
  return [...new Set([`${siteUrl}/blog/`, ...changedBlogUrls])].filter((url) => allUrls.includes(url));
}

async function waitForProduction(expectedCommit, timeoutMs = 12 * 60 * 1000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${siteUrl}/deployment.json`, { cache: "no-store" });
      if (response.ok) {
        const deployment = await response.json();
        if (deployment.commit === expectedCommit) return;
      }
    } catch {
      // Production may be between aliases while the Git-backed deployment completes.
    }
    await new Promise((resolve) => setTimeout(resolve, 15_000));
  }
  throw new Error(`Timed out waiting for production commit ${expectedCommit}.`);
}

async function main() {
  const args = cliArgs();
  const dryRun = args.has("dry-run");
  const expectedCommit = args.get("wait-for-deployment");
  if (expectedCommit && !dryRun) await waitForProduction(expectedCommit);

  const sitemap = dryRun
    ? fs.readFileSync(path.resolve("dist/sitemap.xml"), "utf8")
    : await fetch(`${siteUrl}/sitemap.xml`, { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error(`Could not read the production sitemap: HTTP ${response.status}`);
        return response.text();
      });
  const allUrls = sitemapUrls(sitemap);
  const urls = urlsForChanges(changedFiles(args.get("from"), args.get("to")), allUrls);
  if (urls.length === 0) throw new Error("No eligible IndexNow URLs were found.");

  const payload = { host, key, keyLocation, urlList: urls };
  if (dryRun) {
    console.log(JSON.stringify({ status: "dry-run", urlCount: urls.length, keyLocation, sample: urls.slice(0, 5) }, null, 2));
    return;
  }

  const response = await fetch(indexNowEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (![200, 202].includes(response.status)) {
    const responseBody = await response.text();
    throw new Error(`IndexNow rejected ${urls.length} URLs: HTTP ${response.status} ${responseBody.slice(0, 300)}`);
  }
  console.log(JSON.stringify({ status: "accepted", httpStatus: response.status, urlCount: urls.length }, null, 2));
}

await main();
