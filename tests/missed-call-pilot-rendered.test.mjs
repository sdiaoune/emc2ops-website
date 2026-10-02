import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const renderedPage = (route = '') => fs.readFileSync(path.resolve('dist', route, 'index.html'), 'utf8');
const home = renderedPage();
const pilot = renderedPage('services/missed-call-recovery');
const visibleText = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

test('homepage adds a focused pilot entry point and keeps the current hero', () => {
  assert.match(home, /id="home-heading"[^>]*>Custom automations for property management companies\./);
  assert.match(home, /id="missed-call-pilot"/);
  assert.match(visibleText(home), /Start with one missed-call workflow/);
  assert.match(home, /href="\/services\/missed-call-recovery\/"[^>]*>Explore missed-call text-back/);
  assert.match(home, /href="\/services\/missed-call-recovery\/"[^>]*>See the pilot scope and fit/);
});

test('desktop and mobile navigation each provide a direct pilot link', () => {
  for (const name of ['Primary', 'Mobile primary']) {
    const nav = home.match(new RegExp(`<nav[^>]*aria-label="${name}"[^>]*>([\\s\\S]*?)</nav>`))?.[1];
    assert.ok(nav, `Missing ${name} navigation`);
    assert.match(nav, /href="\/services\/missed-call-recovery\/"[^>]*>Missed-call text-back/);
    assert.match(nav, /href="\/services\/"/);
    assert.match(nav, /href="\/integrations\/"/);
    assert.match(nav, /href="\/use-cases\/"/);
    assert.match(nav, /href="\/customers\/"/);
    assert.match(nav, /href="\/blog\/"/);
  }
});

test('pilot copy clearly bounds the offer and retains its canonical and booking destination', () => {
  const text = visibleText(pilot);
  for (const copy of [
    'Missed-call text-back for small property management teams',
    'one leasing phone number',
    'already handles missed calls effectively',
    'Maintenance intake, live AI call answering, and custom CRM development are outside this pilot',
    'existing scheduling link',
    'consent', 'opt-out', 'staff take over', 'two-way replies',
  ]) assert.ok(text.includes(copy), `Missing pilot copy: ${copy}`);
  assert.match(pilot, /href="https:\/\/www.emc2ops.com\/services\/missed-call-recovery\/"/);
  assert.match(pilot, /href="\/book-demo\/#workflow=missed-call-recovery(?:&|&amp;)source=service"/);
  assert.doesNotMatch(text, /Every missed leasing call receives/);
});

test('deposit authority route and existing useful links remain in the build', () => {
  const deposit = renderedPage('use-cases/security-deposit-automation');
  assert.match(deposit, /AI must not infer the original condition/);
  const sitemap = fs.readFileSync(path.resolve('dist/sitemap.xml'), 'utf8');
  for (const route of ['/services/missed-call-recovery/', '/use-cases/security-deposit-automation/', '/blog/', '/integrations/', '/book-demo/']) {
    assert.ok(sitemap.includes(`https://www.emc2ops.com${route}`), `Missing route ${route}`);
  }
});
