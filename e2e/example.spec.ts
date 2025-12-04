import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Next/);
  });

  test("should have main content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toBeVisible();
  });
});
