import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import test from "node:test";

function buildFeedDate() {
  execFileSync("npm", ["run", "build"], { stdio: "ignore" });
  const feed = fs.readFileSync("dist/feed.xml", "utf8");
  const value = feed.match(/<channel>[\s\S]*?<lastBuildDate>([^<]+)<\/lastBuildDate>/)?.[1];
  assert.ok(value, "channel lastBuildDate should exist");
  return value;
}

test("feed channel build date is deterministic for unchanged content", async () => {
  const first = buildFeedDate();
  await new Promise((resolve) => setTimeout(resolve, 1_100));
  const second = buildFeedDate();

  assert.equal(second, first);
});
