import { test, expect, type Page, type Locator } from "@playwright/test";

// This is my 2nd refactoring of example.spec.ts, still keeping it as a standalone file (without using page objects),
// but factoring out the locators as arrow functions, following the example of:
// 	https://github.com/engenious-inc/playwright-examples/blob/advance-playwright/3-module/3.C-lecture/tests/example.spec.ts

const baseURL = "https://playwright.dev/";
const pageURL = /.*intro/;
const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
const nodeDescription = "Installing Playwright";

// Locators
const nodeLink = (page: Page): Locator => page.getByRole("button", { name: "Node.js" });
const javaLink = (page: Page): Locator => page.getByRole("navigation", { name: "Main" }).getByText("Java");
const nodeLabel = (page: Page): Locator => page.getByText(nodeDescription, { exact: true });
const javaLabel = (page: Page): Locator => page.getByText(javaDescription);

async function clickGetStarted(page: Page) {
  await page.getByRole("link", { name: "Get started" }).click();
}

async function assertPageUrl(page: Page, pageUrl: RegExp) {
  await expect(page).toHaveURL(pageUrl);
}

async function hoverNode(page: Page) {
  await nodeLink(page).hover();
}

async function clickJava(page: Page) {
  await javaLink(page).click();
}

async function assertNodeDescriptionNotVisible(page: Page) {
  await expect(nodeLabel(page)).not.toBeVisible();
}

async function assertJavaDescriptionVisible(page: Page) {
  await expect(javaLabel(page)).toBeVisible();
}

test.describe('Test Playwright.dev home page', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(baseURL);
  });
  
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test("get started link", async ({ page }) => {
    await clickGetStarted(page);
    await assertPageUrl(page, pageURL);
  });

  test("check Java page", async ({ page }) => {
    await clickGetStarted(page);
    await assertPageUrl(page, pageURL);  
    await page.waitForLoadState("load");
    await page.waitForLoadState("domcontentloaded");
    await hoverNode(page);

    await clickJava(page);
    await assertPageUrl(page, pageURL);
    await assertNodeDescriptionNotVisible(page);
    await assertJavaDescriptionVisible(page);
  });
});