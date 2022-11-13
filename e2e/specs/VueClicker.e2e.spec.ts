import { test, expect } from "@playwright/test";

test.describe("Vue Clicker", () => {
  test("should have a Main Click button", async ({ page }) => {
    await page.goto("/");
    await new Promise(resolve => setTimeout(resolve, 2000)); // Just to give you a chance to see that it's actually loading
    await expect(page.locator("button.mainButton")).toHaveText("Click here");
  });
});

