import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
const out = '/tmp/claude-0/-home-claude/968b891d-c519-5cdd-bdbe-29420e343b8a/scratchpad/';
const inner = readFileSync('/mnt/user-data/outputs/agent-spaces-app/agent-spaces.html', 'utf8');
// Hostile host: light chrome that defines the same generic token names the page used to use
const doc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>:root{color-scheme:light;--bg:#faf9f5;--ink:#141413;--ink-2:#8a8a86;--surface:#ffffff;--surface-2:#f0efe9;--line:#e5e3dc;--claude:#d97757;--astra:#6a9bcc;--need:#c00;--ok:#0a0;--font:serif}body{margin:0;font:14px system-ui;background:#faf9f5;color:#141413}</style></head><body>${inner}</body></html>`;
writeFileSync(out + 'hostile.html', doc);
const b = await chromium.launch();
for (const scheme of ['light', 'dark']) {
  const ctx = await b.newContext({ viewport: { width: 1000, height: 900 }, colorScheme: scheme }); const p = await ctx.newPage();
  await p.goto('file://' + out + 'hostile.html', { waitUntil: 'load' }); await p.waitForTimeout(500);
  const r = await p.evaluate(() => { const cs = e => getComputedStyle(e); const n = document.querySelector('.needs'); const h = document.querySelector('#needs-h'); const sp = document.querySelector('.space-claude'); const t = document.querySelector('.space h3');
    return { needsBg: cs(n).backgroundColor, needsH: cs(h).color, spaceBg: cs(sp).backgroundColor, spaceH: cs(t).color, htmlBg: cs(document.documentElement).backgroundColor, appBg: cs(document.querySelector('.app')).backgroundColor }; });
  console.log(scheme, r);
  await p.screenshot({ path: out + `hostile-${scheme}.png`, clip: { x: 0, y: 0, width: 1000, height: 900 } });
  await ctx.close();
}
await b.close();
