import { test, expect } from "@playwright/test";
import { VueClickerPage } from "../pageObjects/VueClickerPO";

test.describe("Vue Clicker", () => {
  test.describe("Navigating to the page", () => {
    test("should load the Home page via URL in a default starting state", async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);

      await vueClickerPage.visit();
      expect(await vueClickerPage.getCurrentSection()).toBe('Home');

      expect(await vueClickerPage.getCurrentTotalScore()).toBe(0);
      expect(await vueClickerPage.getAutoClickerCount()).toBe(0);
      expect(await vueClickerPage.getFasterClickerCount()).toBe(0);
      expect(await vueClickerPage.getMultiplierCount()).toBe(1);

      expect(await vueClickerPage.getScoreImage()).toBe('image0');
    });

    test("should load the About page via URL", async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);

      await vueClickerPage.visitAbout();
      expect(await vueClickerPage.getCurrentSection()).toBe('About');

      expect(await vueClickerPage.getAboutTitle()).toBe('About this projecct');
      expect(await vueClickerPage.getAboutContent()).toBe('I wanted to learn vue.');
    });
  });

  test.describe("On the page", () => {
    test.beforeEach(async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.visit();
    });

    test("should navigate between the Home and About sections", async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);

      await vueClickerPage.navAboutSection();
      expect(await vueClickerPage.getAboutTitle()).toBe('About this projecct');
      expect(await vueClickerPage.getAboutContent()).toBe('I wanted to learn vue.');

      await vueClickerPage.navHomeSection();
    });

    test.only("should increase the score by clicking the 'Click here' button", async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);
      for (let i = 0; i < 100; i++) {
        await vueClickerPage.clickMainButtonAndWait();
      }
    });
  });
});

