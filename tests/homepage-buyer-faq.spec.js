const { expect, test } = require("@playwright/test");
const { homepageMetadata } = require("../src/lib/homepageContent.ts");
const { siteUpdatedAt, siteUrl } = require("../src/lib/site.ts");

// Chat behavior is tested separately; keep this content-parity suite free of timed overlays.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("emc2ops-chat-auto-opened-v1", "true"));
});

const buyerQuestions = [
  "Can you build a workflow that is not listed, including live calls or missed-call replies?",
  "How quickly can we launch—and how much work will my team do?",
  "What happens after the first reply or workflow step?",
  "Which property types and portfolio sizes are the best fit?",
  "How is the AI customized for each property and brand?",
  "Who handles exceptions after hours?",
  "Why choose EMC2Ops instead of EliseAI, a chatbot, a call center, or PMS-native AI?",
  "Which languages are supported?",
  "How does pricing work?",
];

const setupQuestions = [
  "Does this replace my team?",
  "Can it connect to my CRM or property-management system?",
  "What about SMS compliance?",
  "Can it handle maintenance requests through completion?",
];

const normalizeText = (text) => text.replace(/\s+/g, " ").trim();

async function homeGraph(page) {
  const scripts = await page.locator("script[type='application/ld+json']").allTextContents();
  return scripts.flatMap((script) => JSON.parse(script)["@graph"] || []);
}

async function faqText(locator, exclude) {
  // Decorative numbers and supporting CTA links are not part of the FAQ answer.
  return normalizeText(await locator.evaluate((element, selector) => {
    const copy = element.cloneNode(true);
    copy.querySelectorAll(selector).forEach((node) => node.remove());
    return copy.textContent;
  }, exclude));
}

async function visibleFaqs(page, grid) {
  const entries = [];
  for (const faq of await page.locator(`${grid} details`).all()) {
    const summary = faq.locator("summary");
    await expect(summary).toBeVisible();
    if (await faq.getAttribute("open") === null) await summary.click();
    const answer = faq.locator(".faq-answer");
    await expect(answer).toBeVisible();
    entries.push({
      question: await faqText(summary, '[aria-hidden="true"]'),
      answer: await faqText(answer, 'a, [aria-hidden="true"]'),
    });
  }
  return entries;
}

test("homepage publishes the buyer-question set with interactive answers", async ({ page }) => {
  await page.goto("/#faq");

  const buyerFaqs = page.locator(".buyer-faq-grid details");
  await expect(buyerFaqs).toHaveCount(buyerQuestions.length);

  for (const [index, question] of buyerQuestions.entries()) {
    await expect(buyerFaqs.nth(index).locator("summary")).toContainText(question);
  }

  await expect(buyerFaqs.first()).toHaveAttribute("open", "");
  await expect(buyerFaqs.first().locator(".faq-answer")).toBeVisible();

  const pricingFaq = buyerFaqs.last();
  await expect(pricingFaq).not.toHaveAttribute("open", "");
  await pricingFaq.locator("summary").click();
  await expect(pricingFaq).toHaveAttribute("open", "");
  await expect(pricingFaq.locator(".faq-answer")).toContainText("quote-based");

  const setupFaqs = page.locator(".setup-faq-grid details");
  await expect(setupFaqs).toHaveCount(setupQuestions.length);
  for (const [index, question] of setupQuestions.entries()) {
    await expect(setupFaqs.nth(index).locator("summary")).toContainText(question);
  }
});

test("homepage FAQ structured data matches the visible questions and answers", async ({ page }) => {
  await page.goto("/");

  const graph = await homeGraph(page);
  const faqPage = graph.find((node) => node["@id"] === `${siteUrl}/#faq-schema`);

  expect(faqPage).toMatchObject({ "@type": "FAQPage" });
  const renderedFaqs = [
    ...await visibleFaqs(page, ".buyer-faq-grid"),
    ...await visibleFaqs(page, ".setup-faq-grid"),
  ];
  expect(renderedFaqs.map((faq) => faq.question)).toEqual([...buyerQuestions, ...setupQuestions]);
  expect(faqPage.mainEntity.map((item) => {
    expect(item["@type"]).toBe("Question");
    expect(item.acceptedAnswer["@type"]).toBe("Answer");
    return {
      question: normalizeText(item.name),
      answer: normalizeText(item.acceptedAnswer.text),
    };
  })).toEqual(renderedFaqs);

  for (const faq of renderedFaqs) {
    const words = faq.answer.split(/\s+/).length;
    expect(words, faq.question).toBeGreaterThanOrEqual(30);
    expect(words, faq.question).toBeLessThanOrEqual(50);
  }
});

test("homepage metadata and discovery freshness agree without redating unrelated pages", async ({ page, request }) => {
  await page.goto("/");
  const graph = await homeGraph(page);
  const webPage = graph.find((node) => node["@id"] === `${siteUrl}/#webpage`);

  await expect(page).toHaveTitle(homepageMetadata.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", homepageMetadata.description);
  expect(webPage).toMatchObject({
    "@type": "WebPage",
    name: homepageMetadata.title,
    description: homepageMetadata.description,
    dateModified: homepageMetadata.updatedAt,
  });

  const [llmsResponse, llmsFullResponse, aiDocsResponse, sitemapResponse] = await Promise.all([
    request.get("/llms.txt"),
    request.get("/llms-full.txt"),
    request.get("/ai-docs.json"),
    request.get("/sitemap.xml"),
  ]);

  expect(llmsResponse.ok()).toBe(true);
  expect(llmsFullResponse.ok()).toBe(true);
  expect(aiDocsResponse.ok()).toBe(true);
  expect(sitemapResponse.ok()).toBe(true);

  const llms = await llmsResponse.text();
  const llmsFull = await llmsFullResponse.text();
  const aiDocs = await aiDocsResponse.json();
  const sitemap = await sitemapResponse.text();

  expect(llmsFull).not.toContain("/undefined");
  expect(aiDocs.lastUpdated).toBe(homepageMetadata.updatedAt);
  expect(llms.match(/^Last updated: (.+)$/m)?.[1]).toBe(homepageMetadata.updatedAt);
  expect(llmsFull.match(/^Last updated: (.+)$/m)?.[1]).toBe(homepageMetadata.updatedAt);

  const sitemapDates = new Map([...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
    .map((entry) => [entry[1], entry[2]]));
  expect(sitemapDates.get(`${siteUrl}/`)).toBe(homepageMetadata.updatedAt);
  expect(sitemapDates.get(`${siteUrl}/about/`)).toBe(homepageMetadata.updatedAt);
  expect(sitemapDates.get(`${siteUrl}/services/`)).toBe(homepageMetadata.updatedAt);
  expect(sitemapDates.get(`${siteUrl}/privacy/`)).toBe(siteUpdatedAt);
});

test("AI discovery files publish the exact visible buyer answers and supporting links", async ({ page, request }) => {
  await page.goto("/#faq");
  const renderedFaqs = await visibleFaqs(page, ".buyer-faq-grid");
  expect(renderedFaqs.map((faq) => faq.question)).toEqual(buyerQuestions);

  const [llmsResponse, llmsFullResponse, aiDocsResponse] = await Promise.all([
    request.get("/llms.txt"),
    request.get("/llms-full.txt"),
    request.get("/ai-docs.json"),
  ]);
  for (const response of [llmsResponse, llmsFullResponse, aiDocsResponse]) expect(response.ok()).toBe(true);
  const llms = await llmsResponse.text();
  const llmsFull = await llmsFullResponse.text();
  const aiDocs = await aiDocsResponse.json();

  expect(aiDocs.buyerQuestions.map(({ question, answer }) => ({ question, answer }))).toEqual(renderedFaqs);
  const llmsBuyerSection = llms.split("## Buyer Questions Answered on the Homepage\n")[1]?.split("\n## ")[0];
  expect(llmsBuyerSection).toBeTruthy();
  expect(llmsBuyerSection.split("\n").filter((line) => line.startsWith("- ")))
    .toEqual(renderedFaqs.map((faq) => `- ${faq.question} ${faq.answer}`));
  const llmsFullBuyerSection = llmsFull.split("## Buyer Questions Answered on the Homepage\n")[1]?.split("\n## ")[0];
  expect(llmsFullBuyerSection).toBeTruthy();
  expect(llmsFullBuyerSection.split("\n").filter((line) => line.startsWith("### ")))
    .toEqual(renderedFaqs.map((faq) => `### ${faq.question}`));

  for (const [index, faq] of renderedFaqs.entries()) {
    const link = page.locator(".buyer-faq-grid details").nth(index).locator(".faq-answer a");
    await expect(link).toBeVisible();
    const supportingUrl = new URL(await link.getAttribute("href"), siteUrl).href;
    expect(aiDocs.buyerQuestions[index].supportingUrl).toBe(supportingUrl);
    expect(llmsFullBuyerSection).toContain(`### ${faq.question}\n${faq.answer}\nSupporting page: ${supportingUrl}\n`);
  }
});
