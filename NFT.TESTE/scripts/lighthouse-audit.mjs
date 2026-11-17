/**
 * Audita a build de produção do KURIO em mobile e desktop.
 * Uso: npm run audit:lighthouse (após npm run build e msw init).
 */
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const origin = 'http://127.0.0.1:4173';
const output = resolve('reports/lighthouse');
const targets = [
  { name: 'home-mobile', path: '/', desktop: false },
  { name: 'market-mobile', path: '/market', desktop: false },
  { name: 'home-desktop', path: '/', desktop: true },
  { name: 'market-desktop', path: '/market', desktop: true },
];
const thresholds = { performance: 90, accessibility: 95, 'best-practices': 95, seo: 90 };
const npm = process.platform === 'win32' ? 'cmd.exe' : 'npm';
// O caminho do CLI varia conforme a versão; consulte o bin oficial do pacote.
const lighthouseRoot = resolve('node_modules/lighthouse');
const lighthouseManifest = JSON.parse(await readFile(resolve(lighthouseRoot, 'package.json'), 'utf8'));
const bin = resolve(lighthouseRoot, typeof lighthouseManifest.bin === 'string' ? lighthouseManifest.bin : lighthouseManifest.bin.lighthouse);
const wait = (ms) => new Promise((done) => setTimeout(done, ms));
const run = (cmd, args, options = {}) => new Promise((ok, fail) => {
  const proc = spawn(cmd, args, { stdio: 'inherit', ...options });
  proc.on('error', fail);
  proc.on('exit', (code) => code === 0 ? ok() : fail(new Error(`${cmd} retornou código ${code}`)));
});

await mkdir(output, { recursive: true });
const previewArgs = process.platform === 'win32'
  ? ['/d', '/s', '/c', 'npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort']
  : ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'];
const preview = spawn(npm, previewArgs, { stdio: 'inherit', shell: false });
const close = () => { if (!preview.killed) preview.kill(); };
process.on('SIGINT', () => { close(); process.exit(130); });
let exitCode = 0;
try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    try { const response = await fetch(origin); if (response.ok) { ready = true; break; } } catch {}
    await wait(300);
  }
  if (!ready) throw new Error('Preview não iniciou na porta 4173. Verifique se a porta está livre.');
  const results = [];
  for (const target of targets) {
    const path = resolve(output, target.name);
    console.log(`\n[Lighthouse] ${target.name}`);
    await run(process.execPath, [bin, `${origin}${target.path}`, '--quiet', '--chrome-flags=--headless=new --no-sandbox',
      '--output=json', '--output=html', `--output-path=${path}`, '--only-categories=performance,accessibility,best-practices,seo',
      ...(target.desktop ? ['--preset=desktop'] : [])], {
      env: { ...process.env, ...(process.env.CHROME_PATH ? {} : { CHROME_PATH: chromium.executablePath() }) },
    });
    const report = JSON.parse(await readFile(`${path}.report.json`, 'utf8'));
    const scores = Object.fromEntries(Object.keys(thresholds).map((key) => [key, Math.round((report.categories[key]?.score ?? 0) * 100)]));
    const passed = Object.entries(thresholds).every(([key, minimum]) => scores[key] >= minimum);
    results.push({ scenario: target.name, scores, passed, html: `${target.name}.report.html` });
    console.log(scores, passed ? 'PASSOU' : 'ABAIXO DA META');
  }
  await writeFile(resolve(output, 'summary.json'), JSON.stringify({ thresholds, results }, null, 2));
  console.log('\nRelatórios salvos em reports/lighthouse/');
  if (results.some((result) => !result.passed)) exitCode = 1;
} catch (error) {
  console.error('\nAuditoria não concluída:', error);
  exitCode = 2;
} finally {
  close();
}
process.exitCode = exitCode;
