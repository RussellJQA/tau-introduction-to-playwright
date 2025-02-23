import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/.*intro/);
});

test('check Java page', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('button', { name: 'Node.js' }).hover();
  await page.getByText('Java', { exact: true }).click();
  // await page.getByRole('navigation', { name: 'Main' }).getByText('Java').click(); // in case the locator above doesn't work, you can use this line. Remove the line above and use this one instead.
  await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
  await expect(page.getByText('Installing Playwright', { exact: true })).not.toBeVisible();
  const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
  await expect(page.getByText(javaDescription)).toBeVisible();
});

// From "Visual comparisons" at https://playwright.dev/docs/test-snapshots
// The 1st time this test is run, it will save a screenshot as "example visual comparison*.png" but generate a "Error: A snapshot doesn't exist ..." error.
//    It saves the screenshot in the "example.spec.ts-snapshots" folder (based on the name of this script file).
//    If it's run from the CLI via "npx playwright test --update-snapshots, will update the snapshot" (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         )
// The 2nd time it is run, it will compare the screenshot (using the https://github.com/mapbox/pixelmatch image comparison library) with the previously saved one.
test('example visual comparison', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveScreenshot();   
});

// Same as above, but the generated screenshot will be saved as "landing*.png"
test('example visual comparison 2', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveScreenshot('landing.png');
});

// Same as 'example visual comparison', but the generated screenshot will be a full page screenshot
test('example visual comparison 3', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// Same as above, but the generated screenshot will be saved as "landing-full.png"
test('example visual comparison 4', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveScreenshot('landing-full.png', { fullPage: true });
});

// This test will take a screenshot of the page and save it (in the "test-results" folder) as "landing-no-comparison.png" without generating a visual comparison
test('take screenshot without a visual comparison', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.screenshot({path :'test-results\\landing-no-comparison.png'});
});

// Do essentially the same with a full page screenshot
test('take fullpage screenshot without a visual comparison', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.screenshot({path :'test-results\\landing-no-comparison-fullpage.png', fullPage: true});
});

// Another example from https://playwright.dev/docs/test-snapshots:
//    Non-image snapshots
//    Apart from screenshots, you can use expect(value).toMatchSnapshot(snapshotName) to compare text or arbitrary binary data. Playwright Test auto-detects the content type and uses the appropriate comparison algorithm.
// 
//    Here we compare text content against the reference.
test('example test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  expect(await page.textContent('.hero__title')).toMatchSnapshot('hero.txt');
});