import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { homepageReviewFingerprint, validateApprovedHomepageProductionRelease, verifyBlogDeployBaseline } from "../scripts/verify-blog-deploy-baseline.mjs";

const approvedRelease = {
  branch: "main", remote: "https://github.com/sdiaoune/emc2ops-website.git",
  commit: "a04350282bddec4fad54ddb3a93565ace5810e5f", isAncestor: true,
};

test("production homepage authorization accepts the approved descendant on main", () => {
  assert.doesNotThrow(() => validateApprovedHomepageProductionRelease(approvedRelease));
});

for (const [label, change] of [
  ["a review branch", { branch: "review/missed-call-pilot-20261001" }],
  ["an unrelated repository", { remote: "https://github.com/example/another-site.git" }],
  ["an unapproved commit", { commit: "96cf520267b957c6258f295b6c32f6eaff92ced0" }],
  ["a candidate omitting the approved commit", { isAncestor: false }],
]) {
  test(`production homepage authorization rejects ${label}`, () => {
    assert.throws(() => validateApprovedHomepageProductionRelease({ ...approvedRelease, ...change }), /Homepage production release blocked/);
  });
}

const page = ({ hero = "Protected hero", offer = "Pilot offer", results = "Protected results", extra = "Local article list", css = "/_astro/home.css" } = {}) => `<!doctype html>
<html><head><link rel="stylesheet" href="${css}"></head><body>
  <section class="hero"><h1>${hero}</h1></section>
  <aside class="customer-results"><p>${results}</p></aside>
  <section class="pilot-offer"><h2>${offer}</h2></section>
  <section class="latest-posts">${extra}</section>
</body></html>`;

const sitemap = (paths) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((pathname) => `  <url><loc>https://www.emc2ops.com${pathname}</loc></url>`).join("\n")}
</urlset>`;

const securityDepositPage = ({ omit = "" } = {}) => {
  const markers = [
    "What is security deposit automation?",
    "What happens when evidence is missing, conflicting, or late?",
    "Questions to ask any security deposit automation provider",
    "AI must not infer the original condition",
    "Does new evidence invalidate an earlier manager approval?",
    "Content scope reviewed August 29, 2026",
  ].filter((marker) => marker !== omit);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", dateModified: "2026-08-29" },
      { "@type": "FAQPage", mainEntity: Array.from({ length: 15 }, (_, index) => ({ "@type": "Question", name: `Question ${index + 1}` })) },
      { "@type": "HowTo", step: Array.from({ length: 6 }, (_, index) => ({ "@type": "HowToStep", position: index + 1 })) },
    ],
  };
  return `<!doctype html><html><body>${markers.map((marker) => `<p>${marker}</p>`).join("")}<script type="application/ld+json">${JSON.stringify(schema)}</script></body></html>`;
};

async function withFixture({
  livePage,
  liveCss,
  localPage,
  localCss,
  liveSitemap = sitemap(["/", "/blog/existing-article/"]),
  localSitemap = sitemap(["/", "/blog/existing-article/", "/use-cases/security-deposit-automation/"]),
  localSecurityDepositPage = securityDepositPage(),
}, run) {
  const distDir = await mkdtemp(path.join(os.tmpdir(), "emc2ops-blog-guard-"));
  await mkdir(path.join(distDir, "_astro"), { recursive: true });
  await writeFile(path.join(distDir, "index.html"), localPage);
  await writeFile(path.join(distDir, "_astro", "home.css"), localCss);
  await writeFile(path.join(distDir, "sitemap.xml"), localSitemap);
  await mkdir(path.join(distDir, "use-cases", "security-deposit-automation"), { recursive: true });
  await writeFile(path.join(distDir, "use-cases", "security-deposit-automation", "index.html"), localSecurityDepositPage);
  await writeFile(path.join(distDir, "llms.txt"), "https://www.emc2ops.com/use-cases/security-deposit-automation/");
  await writeFile(path.join(distDir, "llms-full.txt"), "https://www.emc2ops.com/use-cases/security-deposit-automation/\nDoes new evidence invalidate an earlier manager approval?\nCan security deposit automation work without bank-account access?");
  await writeFile(path.join(distDir, "ai-docs.json"), JSON.stringify({
    importantUrls: { securityDepositAutomation: "https://www.emc2ops.com/use-cases/security-deposit-automation/" },
    useCaseClusters: [{ url: "https://www.emc2ops.com/use-cases/security-deposit-automation/" }],
  }));

  const server = createServer((request, response) => {
    if (request.url === "/_astro/home.css") {
      response.setHeader("content-type", "text/css");
      response.end(liveCss);
      return;
    }

    if (request.url === "/sitemap.xml") {
      response.setHeader("content-type", "application/xml");
      response.end(liveSitemap);
      return;
    }

    response.setHeader("content-type", "text/html");
    response.end(livePage);
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;

  try {
    await run({ distDir, origin });
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    await rm(distDir, { recursive: true, force: true });
  }
}

test("allows blog-only changes outside protected homepage regions", async () => {
  await withFixture({
    livePage: page({ extra: "Old article list" }),
    localPage: page({ extra: "New article list" }),
    liveCss: ".hero { min-height: calc(100svh - 57px); }",
    localCss: ".hero{min-height:calc(100svh - 57px)}",
  }, async ({ distDir, origin }) => {
    const result = await verifyBlogDeployBaseline({ distDir, origin });
    assert.deepEqual(result, { protectedRegions: 2, stylesheets: 1, securityDepositMarkers: 6 });
  });
});

test("pinned preview accepts the exact reviewed homepage while the default gate still blocks it", async () => {
  await withFixture({
    livePage: page(), localPage: page({ hero: "Reviewed missed-call hero" }),
    liveCss: ".hero { padding: 64px; }", localCss: ".hero { padding: 56px; }",
  }, async ({ distDir, origin }) => {
    const homepageReviewBaseline = await homepageReviewFingerprint({ distDir, origin });
    await assert.doesNotReject(verifyBlogDeployBaseline({ distDir, origin, homepageReviewBaseline }));
    await assert.rejects(verifyBlogDeployBaseline({ distDir, origin }), /homepage hero differs from production/);
  });
});

for (const change of ["hero", "offer", "stylesheets", "results"]) {
  test(`pinned preview rejects unreviewed ${change} changes`, async () => {
    await withFixture({
      livePage: page(), localPage: page(),
      liveCss: ".hero { padding: 64px; }", localCss: ".hero { padding: 56px; }",
    }, async ({ distDir, origin }) => {
      const homepageReviewBaseline = await homepageReviewFingerprint({ distDir, origin });
      if (change === "stylesheets") await writeFile(path.join(distDir, "_astro/home.css"), ".hero { display: none; }");
      else await writeFile(path.join(distDir, "index.html"), page({ [change]: "Unreviewed change" }));
      await assert.rejects(verifyBlogDeployBaseline({ distDir, origin, homepageReviewBaseline }), /differs from (the pinned review baseline|production)/);
    });
  });
}

test("pinned preview cannot omit a production URL", async () => {
  await withFixture({
    livePage: page(), localPage: page(),
    liveCss: ".hero {}", localCss: ".hero {}",
    liveSitemap: sitemap(["/", "/blog/new-production-article/"]),
  }, async ({ distDir, origin }) => {
    const homepageReviewBaseline = await homepageReviewFingerprint({ distDir, origin });
    await assert.rejects(verifyBlogDeployBaseline({ distDir, origin, homepageReviewBaseline }), /production URLs would disappear/);
  });
});

test("pinned preview cannot lose deposit authority content", async () => {
  await withFixture({
    livePage: page(), localPage: page(),
    liveCss: ".hero {}", localCss: ".hero {}",
    localSecurityDepositPage: securityDepositPage({ omit: "AI must not infer the original condition" }),
  }, async ({ distDir, origin }) => {
    const homepageReviewBaseline = await homepageReviewFingerprint({ distDir, origin });
    await assert.rejects(verifyBlogDeployBaseline({ distDir, origin, homepageReviewBaseline }), /lost protected security-deposit content/);
  });
});

test("allows an additive deploy that preserves every production URL", async () => {
  await withFixture({
    livePage: page(),
    localPage: page(),
    liveCss: ".hero { min-height: 100svh; }",
    localCss: ".hero { min-height: 100svh; }",
    liveSitemap: sitemap(["/", "/blog/existing-article/"]),
    localSitemap: sitemap([
      "/",
      "/blog/existing-article/",
      "/use-cases/security-deposit-automation/",
    ]),
  }, async ({ distDir, origin }) => {
    await assert.doesNotReject(verifyBlogDeployBaseline({ distDir, origin }));
  });
});

test("blocks a blog deploy that removes a production URL", async () => {
  await withFixture({
    livePage: page(),
    localPage: page(),
    liveCss: ".hero { min-height: 100svh; }",
    localCss: ".hero { min-height: 100svh; }",
    liveSitemap: sitemap([
      "/",
      "/blog/article-created-after-the-use-case/",
      "/use-cases/security-deposit-automation/",
    ]),
    localSitemap: sitemap(["/"]),
  }, async ({ distDir, origin }) => {
    await assert.rejects(
      verifyBlogDeployBaseline({ distDir, origin }),
      /production URLs would disappear.*article-created-after-the-use-case.*security-deposit-automation/s,
    );
  });
});

test("blocks a blog deploy that changes the production hero", async () => {
  await withFixture({
    livePage: page(),
    localPage: page({ hero: "Regressed hero" }),
    liveCss: ".hero { min-height: 100svh; }",
    localCss: ".hero { min-height: 100svh; }",
  }, async ({ distDir, origin }) => {
    await assert.rejects(
      verifyBlogDeployBaseline({ distDir, origin }),
      /homepage hero differs from production/,
    );
  });
});

test("blocks a blog deploy that removes protected security-deposit answers", async () => {
  await withFixture({
    livePage: page(),
    localPage: page(),
    liveCss: ".hero { min-height: 100svh; }",
    localCss: ".hero { min-height: 100svh; }",
    localSecurityDepositPage: securityDepositPage({ omit: "Questions to ask any security deposit automation provider" }),
  }, async ({ distDir, origin }) => {
    await assert.rejects(
      verifyBlogDeployBaseline({ distDir, origin }),
      /lost protected security-deposit content.*Questions to ask any security deposit automation provider/s,
    );
  });
});

test("blocks a blog deploy that changes homepage layout CSS", async () => {
  await withFixture({
    livePage: page(),
    localPage: page(),
    liveCss: ".hero { min-height: calc(100svh - 57px); }",
    localCss: ".hero { padding: 84px 0 62px; }",
  }, async ({ distDir, origin }) => {
    await assert.rejects(
      verifyBlogDeployBaseline({ distDir, origin }),
      /homepage stylesheet bundle differs from production/,
    );
  });
});

test("allows only equivalent booking attribution when converting queries to fragments", async () => {
  const link = (href) => `<a href="${href}">Book a consultation</a>`;
  await withFixture({
    livePage: page({ hero: link("/book-demo/?workflow=custom-property-management-automation&amp;source=homepage") }),
    localPage: page({ hero: link("/book-demo/#workflow=custom-property-management-automation&amp;source=homepage") }),
    liveCss: ".hero { min-height: 100svh; }",
    localCss: ".hero { min-height: 100svh; }",
  }, async ({ distDir, origin }) => {
    await assert.doesNotReject(verifyBlogDeployBaseline({ distDir, origin }));
  });
});

for (const [label, liveHref, localHref] of [
  ["changed attribution", "/book-demo/?source=homepage", "/book-demo/#source=another-page"],
  ["changed destination", "/book-demo/?source=homepage", "/another-page/#source=homepage"],
  ["non-attribution parameters", "/book-demo/?date=2026-09-07", "/book-demo/#date=2026-09-07"],
]) {
  test(`blocks booking normalization with ${label}`, async () => {
    const link = (href) => `<a href="${href}">Book a consultation</a>`;
    await withFixture({
      livePage: page({ hero: link(liveHref) }),
      localPage: page({ hero: link(localHref) }),
      liveCss: ".hero { min-height: 100svh; }",
      localCss: ".hero { min-height: 100svh; }",
    }, async ({ distDir, origin }) => {
      await assert.rejects(verifyBlogDeployBaseline({ distDir, origin }), /homepage hero differs from production/);
    });
  });
}
