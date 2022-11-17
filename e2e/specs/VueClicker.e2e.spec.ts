import { test, expect } from "@playwright/test";
import { SimpleTimer } from "../helpers/SimpleTimer";
import { VueClickerPage } from "../pageObjects/VueClickerPage";

test.describe("Vue Clicker", () => {
  test.describe("Navigating to the page", () => {
    test("should load the Home page via URL in a default starting state", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);

      await vueClickerPage.visit();

      expect(await vueClickerPage.getScore()).toBe(0);
      expect(await vueClickerPage.getAutoClickerCount()).toBe(0);
      expect(await vueClickerPage.getFasterClickerCount()).toBe(0);
      expect(await vueClickerPage.getFastestClickerCount()).toBe(0);
      expect(await vueClickerPage.getManualClickMultiplierCount()).toBe(1);

      expect(await vueClickerPage.getScoreImage()).toBe("image0");
    });

    test("should load the About page via URL", async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.visitAbout();
      expect(await vueClickerPage.getAboutContent()).toBe(
        "I wanted to learn vue."
      );
    });

    test("should load the Clicker Store page via URL", async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.visitClickerStore();
    });

    test("should load the Upgrade Store page via URL", async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.visitUpgradeStore();
    });
  });

  test.describe("On the page", () => {
    test.beforeEach(async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.visit();
    });

    test("should navigate between the sections", async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.navClickerStore();
      await vueClickerPage.navUpgradeStore();
      await vueClickerPage.navAboutSection();
      await vueClickerPage.navHomeSection();
      await vueClickerPage.navUpgradeStore();
      await vueClickerPage.navAboutSection();
      await vueClickerPage.navClickerStore();
    });

    test("should increase the score by clicking the 'Click here' button", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      for (let i = 0; i < 4; i++) {
        await vueClickerPage.clickMainButtonAndWait();
      }
    });

    test("should click until a target score is reached", async ({ page }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickUntilScore(7);
    });

    test("should not be able to purchase an Auto Clicker if the score is less than the cost", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickUntilScore(9, { carefully: true });
      expect(await vueClickerPage.clickAutoClickerButton()).toBe("no_sale");
    });

    test.skip("should be able to purchase an Auto Clicker if the score is at least equal to the cost", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickUntilScore(10, { carefully: true });
      expect(await vueClickerPage.clickAutoClickerButton()).toBe("purchased");
      expect(await vueClickerPage.getScore()).toBe(0);
      expect(await vueClickerPage.getAutoClickerCost()).toBe(11);
    });

    test.skip("should not be able to purchase a Faster Clicker if the score is less than the cost", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickUntilScore(99, { carefully: true });
      expect(await vueClickerPage.clickFasterClickerButton()).toBe("no_sale");
    });

    test.skip("should be able to purchase a Faster Clicker if the score is equal to the cost", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickUntilScore(100, { carefully: true });
      expect(await vueClickerPage.clickFasterClickerButton()).toBe("purchased");
      expect(await vueClickerPage.getFasterClickerCost()).toBe(111);
    });

    test.skip("should not be able to purchase a Fastest Clicker if the score is less than the cost", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickForMultipliers(6);
      await vueClickerPage.clickUntilScore(994, { carefully: true });
      expect(await vueClickerPage.clickFastestClickerButton()).toBe("no_sale");
    });

    test.skip("should be able to purchase a Fastest Clicker if the score is equal to the cost", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickForMultipliers(6);
      await vueClickerPage.clickUntilScore(1000, { carefully: false });
      expect(await vueClickerPage.clickFastestClickerButton()).toBe(
        "purchased"
      );
      expect(await vueClickerPage.getFastestClickerCost()).toBe(1150);
    });

    test.skip("should not be able to purchase a Multiplier if the score is less than the cost", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickUntilScore(49, { carefully: true });
      expect(await vueClickerPage.clickMultiplierButton()).toBe("no_sale");
    });

    test.skip("should be able to purchase a Multiplier if the score is equal to the cost", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickUntilScore(50, { carefully: true });
      expect(await vueClickerPage.clickMultiplierButton()).toBe("purchased");
      expect(await vueClickerPage.getScore()).toBe(0);
    });

    test.skip("should multiply the score per click after buying a Multiplier", async ({
      page,
    }) => {
      const vueClickerPage = new VueClickerPage(page);
      await vueClickerPage.clickUntilScore(50, { carefully: true });
      expect(await vueClickerPage.clickMultiplierButton()).toBe("purchased");
      expect(await vueClickerPage.getScore()).toBe(0);
      expect(await vueClickerPage.getMultiplierCost()).toBe(63);
      await vueClickerPage.clickMainButtonAndWait(10);
      expect(await vueClickerPage.getScore()).toBe(20);
    });
  });
});
