import { test, expect, type Page } from "@playwright/test";

const baseURL = "https://playwright.dev/";
const pageURL = /.*intro/;
const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
const nodeDescription = "Installing Playwright";

async function clickGetStarted(page: Page) {
  await page.getByRole("link", { name: "Get started" }).click();
}

async function assertPageUrl(page: Page, pageUrl: RegExp) {
  await expect(page).toHaveURL(pageUrl);
}

async function hoverNode(page: Page) {
  const nodeLink = page.getByRole("button", { name: "Node.js" });
  await nodeLink.hover();
}

async function clickJava(page: Page) {
  const javaLink = page
    .getByRole("navigation", { name: "Main" })
    .getByText("Java");
  await javaLink.click();
}

async function assertNodeDescriptionNotVisible(page: Page) {
  const nodeLabel = page.getByText(nodeDescription, { exact: true });
  await expect(nodeLabel).not.toBeVisible();
}

async function assertJavaDescriptionVisible(page: Page) {
  const javaLabel = page.getByText(javaDescription);
  await expect(javaLabel).toBeVisible();
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