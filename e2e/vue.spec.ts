import { test, expect } from "@playwright/test";

test("visits the app root url", async ({ page }) => {
  await page.goto("/");
  await new Promise(resolve => setTimeout(resolve, 2000)); // Just to give you a chance to see that it's actually loading
  await expect(page.locator("button.mainButton")).toHaveText("Click here");
});
