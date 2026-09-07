import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { readBlogPosts } from "../scripts/blog-content.mjs";

const page = (route) => readFileSync(`dist/${route ? `${route}/` : ""}index.html`, "utf8");

test("all published articles have a single heading and working article navigation", () => {
  for (const post of readBlogPosts()) {
    const html = page(`blog/${post.slug}`);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, post.slug);
    const toc = html.match(/<aside class="toc"[\s\S]*?<\/aside>/)?.[0];
    assert.ok(toc, post.slug);
    for (const [, id] of toc.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(html.includes(`id="${id}"`), `${post.slug}: missing target ${id}`);
    }
    assert.doesNotMatch(html, /How EMC2Ops would approach this rollout/, post.slug);
  }
});

test("featured guides lead the blog without duplicating or dropping article cards", () => {
  const html = page("blog");
  const cards = [...html.matchAll(/<article class="post-card">[\s\S]*?<\/article>/g)].map((m) => m[0]);
  const slugs = cards.map((card) => card.match(/href="\/blog\/([^/]+)\//)[1]);
  assert.equal(slugs.length, readBlogPosts().length);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual(slugs.slice(0, 6), ["apartment-call-tracking", "apartment-lead-tracking", "automate-property-management-lead-follow-up", "property-management-make-ready-automation", "property-management-security-deposit-return-automation", "ai-leasing-assistant"]);
  assert.doesNotMatch(html, /Practical SEO guides|city-aware language|clean slugs/);
});

test("the new call guide connects attribution, recovery, and the commercial offer", () => {
  const html = page("blog/apartment-call-tracking");
  assert.match(html, /CALL-208/);
  assert.match(html, /href="\/services\/missed-call-recovery\/"/);
  assert.match(html, /href="\/use-cases\/apartment-lead-tracking\/"/);
  assert.match(html, /confirmed calendar booking/);
});

test("reviewed checklists and task specifications reach the rendered articles", () => {
  assert.match(page("blog/property-management-make-ready-automation"), /Inspection-to-rent-ready checklist/);
  assert.match(page("blog/property-management-move-out-automation"), /Move-out responsibility table/);
  assert.match(page("blog/property-management-security-deposit-return-automation"), /missing evidence changes the next action/);
  assert.match(page("blog/property-management-owner-reporting-automation"), /Approve a version before sending it/);
  const tasks = page("blog/property-management-automation-tasks");
  assert.equal([...tasks.matchAll(/<strong>Input:<\/strong>/g)].length, 15);
  assert.equal([...tasks.matchAll(/<strong>Human approval:<\/strong>/g)].length, 15);
});

test("buyer directories expose deliverables and verified connection examples", () => {
  assert.match(page("services"), /Deliverables:/);
  for (const slug of ["buildium", "appfolio", "leadsimple"]) {
    assert.ok(page("integrations").includes(`href="/integrations/${slug}/"`));
  }
  assert.match(page("integrations/leadsimple"), /training.leadsimple.com\/en\/articles\/14803573/);
  assert.match(page("services/security-deposit-automation"), /Approval belongs to a version/);
  assert.match(page("services/ai-front-desk-property-management"), /Captured: call facts and renter intent/);
});

test("brand identity stays consistent across metadata and structured identity", () => {
  const html = page("");
  assert.match(html, /property="og:site_name" content="EMC2Ops"/);
  assert.match(html, /rel="canonical" href="https:\/\/www.emc2ops.com\/"/);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  for (const type of ["Organization", "WebSite"]) {
    const entity = schema["@graph"].find((node) => node["@type"] === type);
    assert.equal(entity.name, "EMC2Ops");
    assert.equal(entity.url, "https://www.emc2ops.com/");
  }
  const org = schema["@graph"].find((node) => node["@type"] === "Organization");
  assert.deepEqual(org.sameAs, ["https://www.linkedin.com/company/emc2ops/", "https://www.youtube.com/@EMC2Ops", "https://x.com/EMC2Ops", "https://www.instagram.com/emc2ops_official/"]);
});
