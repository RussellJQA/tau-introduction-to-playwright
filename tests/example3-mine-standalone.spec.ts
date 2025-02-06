import { test, expect } from '@playwright/test';

test('test example mine', async ({ page }) => {

  const baseURL = 'https://playwright.dev/';

  const nodeHeadingText = 'Installing Playwright';
  const nodeHeading = page.getByRole('heading', { name: nodeHeadingText });
  const javaArticleText = 'Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project\'s pom.xml as described below. If you\'re not familiar with Maven please refer to its documentation.';

  await page.goto(baseURL);

  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(nodeHeading).toBeVisible();
  await expect(page).toHaveURL(baseURL + 'docs/intro');

  await page.getByRole('button', { name: 'Node.js' }).hover();
  await page.getByRole('link', { name: 'Java', exact: true }).click();
  await expect(page).toHaveURL(baseURL + 'java/docs/intro');
  await expect(page.getByRole('article')).toContainText(javaArticleText);
  await expect(nodeHeading).not.toBeVisible();
});