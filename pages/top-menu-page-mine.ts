import { expect, Locator, Page } from "@playwright/test";

export class TopMenuPage {
  // Your implementation here

  readonly page: Page;
  readonly nodeBtn: Locator;
  readonly javaLink: Locator;
  readonly nodeLabel: Locator;
  readonly javaLabel: Locator;

  readonly javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
  readonly nodeDescription = "Installing Playwright";

  constructor(page: Page) {
    this.page = page;
    this.nodeBtn = page.getByRole("button", { name: "Node.js" });
    this.javaLink = page
      .getByRole("navigation", { name: "Main" })
      .getByText("Java");
    this.nodeLabel = page.getByText(this.nodeDescription, { exact: true });
    this.javaLabel = page.getByText(this.javaDescription);
  }

  async hoverNode() {
    await this.nodeBtn.hover();
  }

  async clickJava() {
    await this.javaLink.click();
  }

  async assertPageUrl(pageUrl: RegExp) {
    await expect(this.page).toHaveURL(pageUrl);
  }

  async assertNodeDescriptionNotVisible() {
    await expect(this.nodeLabel).not.toBeVisible();
  }

  async assertJavaDescriptionVisible() {
    await expect(this.javaLabel).toBeVisible();
  }
}

export default TopMenuPage;
