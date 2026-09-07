import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = (path) => readFileSync(`dist/${path}/index.html`, "utf8");

for (const slug of ["apartment-lead-tracking", "automate-property-management-lead-follow-up", "property-management-guest-card-automation", "reduce-administrative-workload-property-management"]) {
  test(`${slug} retains its authored guide with valid navigation and no duplicate template`, () => {
    const html = page(`blog/${slug}`);
    assert.match(html, /class="article-content"/);
    assert.doesNotMatch(html, /Where the operational cost shows up|How EMC2Ops would approach this rollout/);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    const toc = html.match(/<aside class="toc"[\s\S]*?<\/aside>/)?.[0];
    assert.ok(toc);
    for (const [, id] of toc.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(html.includes(`id="${id}"`), `Missing navigation target: ${id}`);
    }
    assert.match(html, /id="faq"/);
    assert.ok(html.includes(`href="https://www.emc2ops.com/blog/${slug}/"`));
  });
}

test("other blog posts retain unique supplemental workflow facts", () => {
  const html = page("blog/appfolio-claude-property-management-workflows");
  assert.match(html, /Where the operational cost shows up/);
  assert.match(html, /id="workflow"/);
});

test("integration examples are optional and cite the vendor capability sources", () => {
  assert.match(page("integrations/buildium"), /Example mapping: a maintenance intake/);
  assert.match(page("integrations/buildium"), /https:\/\/developer\.buildium\.com\//);
  assert.match(page("integrations/appfolio"), /Choose an AppFolio connection/);
  assert.match(page("integrations/appfolio"), /https:\/\/www\.appfolio\.com\/stack\/partners\/api/);
  assert.doesNotMatch(page("integrations/leadsimple"), /Choose an AppFolio connection|Example mapping: a maintenance intake/);
});
