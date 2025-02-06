import { test, expect, type Page } from "@playwright/test";
import TopMenuPage from "../pages/top-menu-page-mine";

const baseURL = "https://playwright.dev/";
const pageURL = /.*intro/;
const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
const nodeDescription = "Installing Playwright";

let topMenuPage: TopMenuPage;

async function clickGetStarted(page: Page) {
  await page.getByRole("link", { name: "Get started" }).click();
  topMenuPage = new TopMenuPage(page);
}

test.describe('Test Playwright.dev', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(baseURL);
  });
  
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test("get started link", async ({ page }) => {
    await clickGetStarted(page);
    await topMenuPage.assertPageUrl(pageURL);
  });

  test("check Java page", async ({ page }) => {
    await clickGetStarted(page);
    await topMenuPage.hoverNode();
    await topMenuPage.clickJava();
    await topMenuPage.assertPageUrl(pageURL);
    await topMenuPage.assertNodeDescriptionNotVisible();
    await topMenuPage.assertJavaDescriptionVisible();
  });
});