import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appUrl =
  process.env.TRACKBY_DEMO_URL ?? 'http://localhost:4200/control-flow/for-syntax/trackby';
const outputDir = path.resolve(__dirname, '../artifacts/trackby-recording');

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1080 },
  recordVideo: {
    dir: outputDir,
    size: { width: 1440, height: 1080 },
  },
});

const page = await context.newPage();

const wait = (ms) => page.waitForTimeout(ms);

try {
  await page.goto(appUrl, { waitUntil: 'networkidle', timeout: 30_000 });
  await wait(1_000);

  const addButton = page.getByRole('button', { name: 'Add Product' });
  const removeButton = page.getByRole('button', { name: 'Remove Product' });
  const refreshButton = page.getByRole('button', { name: 'Refresh Products' });
  const updatePriceButton = page.getByRole('button', { name: 'Update Price' });
  const deleteButtons = page.getByRole('button', { name: 'delete' });

  await addButton.click();
  await wait(900);

  await addButton.click();
  await wait(900);

  await updatePriceButton.click();
  await wait(1_800);

  await refreshButton.click();
  await wait(1_200);

  const deleteCount = await deleteButtons.count();
  if (deleteCount > 0) {
    await deleteButtons.nth(0).click();
    await wait(1_000);
  }

  await removeButton.click();
  await wait(1_000);

  await refreshButton.click();
  await wait(1_200);

  await updatePriceButton.click();
  await wait(1_800);

  await page.screenshot({
    path: path.join(outputDir, 'trackby-demo-final-state.png'),
    fullPage: true,
  });

  console.log(`Recording saved under ${outputDir}`);
} finally {
  await context.close();
  await browser.close();
}
