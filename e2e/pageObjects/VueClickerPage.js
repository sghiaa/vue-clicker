import { expect } from "@playwright/test";
import { ModuleResolutionKind } from "typescript";
import { SimpleTimer, sleep } from "../helpers/SimpleTimer";
import { multiWait, waitFor } from "../helpers/WaitForEvent";

class VueClickerPage {
  constructor(page) {
    this.page = page;

    this.countRegex = /.+: (\d+)/;
    this.multiplierRegex = / x (\S+)/;
    this.costRegex = /.*\(cost: (\S+)\).*/;

    // Main Section Elements
    this.mainButton = this.page.locator("data-test-id=mainButton");
    this.score = this.page.locator("span.totalCount");

    this.autoClickerCount = this.page.locator("data-test-id=autoClickerCount");
    this.autoClickerMultiplierSpan = this.page.locator(
      "data-test-id=autoClickerMultiplier"
    );
    this.fasterClickerCount = this.page.locator(
      "data-test-id=fasterClickerCount"
    );
    this.fasterClickerMultiplierSpan = this.page.locator(
      "data-test-id=fasterClickerMultiplier"
    );
    this.fastestClickerCount = this.page.locator(
      "data-test-id=fastestClickerCount"
    );
    this.fastestClickerMultiplierSpan = this.page.locator(
      "data-test-id=fastestClickerMultiplier"
    );
    this.clickMultiplierCount = this.page.locator(
      "data-test-id=clickMultiplierCount"
    );

    this.currentScoreImage = this.page.locator("div.countImage img");

    this.image0 = this.page.locator("data-test-id=image0");
    this.image1000 = this.page.locator("data-test-id=image1000");
    this.image10000 = this.page.locator("data-test-id=image10000");
    this.image100000 = this.page.locator("data-test-id=image100000");

    // Navigation Bar Elements
    this.navigationLinks = this.page.locator("data-test-id=navigationLinks");
    this.activeLink = this.page.locator(
      'nav[data-test-id="navigationLinks"] a.router-link-active'
    );
    this.homeNavLink = this.page.locator(
      'nav[data-test-id="navigationLinks"] a:has-text("Home")'
    );
    this.aboutNavLink = this.page.locator(
      'nav[data-test-id="navigationLinks"] a:has-text("About")'
    );
    this.clickerStoreNavLink = this.page.locator(
      'nav[data-test-id="navigationLinks"] a:has-text("Clicker Store")'
    );
    this.upgradeStoreNavLink = this.page.locator(
      'nav[data-test-id="navigationLinks"] a:has-text("Upgrade Store")'
    );

    // Clicker Store Section Elements
    this.autoClickerButton = this.page.locator(
      'div[data-test-id="Auto Clicker"] button'
    );
    this.fasterClickerButton = this.page.locator(
      'div[data-test-id="Faster Clicker"] button'
    );
    this.fastestClickerButton = this.page.locator(
      'div[data-test-id="Fastest Clicker"] button'
    );

    // Upgrade Store Section Elements
    this.manualMultiplierButton = this.page.locator(
      'div[data-test-id="Manual Click Multiplier"] button'
    );
    this.autoMultiplierButton = this.page.locator(
      'div[data-test-id="Auto Click Multiplier"] button'
    );
    this.fasterMultiplierButton = this.page.locator(
      'div[data-test-id="Faster Click Multiplier"] button'
    );
    this.fastestMultiplierButton = this.page.locator(
      'div[data-test-id="Fastest Click Multiplier"] button'
    );

    // About Section Elements
    this.aboutSectionTitle = this.page.locator(
      'div[data-test-id="aboutSection"] > h1:has-text("About this project")'
    );
    this.aboutSectionContent = this.page.locator(
      'div[data-test-id="aboutSection"] > div'
    );
  }

  // URL Navigation

  async visit() {
    await this.page.goto("/");
    await this.waitForHomeLoading();
  }

  async visitAbout() {
    await this.page.goto("/about");
    await this.waitForMainLoading();
    await this.waitForAboutLoading();
  }

  async visitClickerStore() {
    await this.page.goto("/clicker-store");
    await this.waitForMainLoading();
    await this.waitForClickerStoreLoading();
  }

  async visitUpgradeStore() {
    await this.page.goto("/upgrade-store");
    await this.waitForMainLoading();
    await this.waitForUpgradeStoreLoading();
  }

  // Loading

  async waitForMainLoading() {
    await expect(this.mainButton).toBeVisible();
    await expect(this.score).toBeVisible();
    await expect(this.autoClickerCount).toBeVisible();
    await expect(this.fasterClickerCount).toBeVisible();
    await expect(this.fastestClickerCount).toBeVisible();
    await expect(this.clickMultiplierCount).toBeVisible();

    await expect(this.currentScoreImage).toBeVisible();

    await expect(this.navigationLinks).toBeVisible();
  }

  async waitForSection(section) {
    await waitFor(async () => {
      return (await this.getCurrentSection()) === section;
    });
  }

  async waitForHomeLoading() {
    await this.waitForSection("Home");
    await this.waitForMainLoading();
  }

  async waitForAboutLoading() {
    await this.waitForSection("About");
    await expect(this.aboutSectionTitle).toBeVisible();
    await expect(this.aboutSectionContent).toBeVisible();
  }

  async waitForClickerStoreLoading() {
    await this.waitForSection("Clicker Store");
    await expect(this.autoClickerButton).toBeVisible();
    await expect(this.fasterClickerButton).toBeVisible();
    await expect(this.fastestClickerButton).toBeVisible();
  }

  async waitForUpgradeStoreLoading() {
    await this.waitForSection("Upgrade Store");
    await expect(this.manualMultiplierButton).toBeVisible();
  }

  // Main Section

  async getScore() {
    const score = Number(await this.score.textContent());
    return score;
  }

  async getAutoClickerCount() {
    const autoClickerCountText = await this.autoClickerCount.textContent();
    const matches = autoClickerCountText.match(this.countRegex);
    return Number(matches[1]);
  }

  async getAutoClickerMultiplier() {
    let autoClickMultiplier = 1;
    if (this.autoClickerMultiplierSpan.isVisible()) {
      const autoClickerMultiplierText =
        await this.autoClickerMultiplierSpan.textContent();
      const matches = autoClickerMultiplierText.match(this.multiplierRegex);
      autoClickMultiplier = Number(matches[1]);
    }
    return autoClickMultiplier;
  }

  async getFasterClickerCount() {
    const fasterClickerCountText = await this.fasterClickerCount.textContent();
    const matches = fasterClickerCountText.match(this.countRegex);
    return Number(matches[1]);
  }

  async getFasterClickerMultiplier() {
    let fasterClickMultiplier = 1;
    if (this.fasterClickerMultiplierSpan.isVisible()) {
      const fasterClickerMultiplierText =
        await this.fasterClickerMultiplierSpan.textContent();
      const matches = fasterClickerMultiplierText.match(this.multiplierRegex);
      fasterClickMultiplier = Number(matches[1]);
    }
    return fasterClickMultiplier;
  }

  async getFastestClickerCount() {
    const fastestClickerCountText =
      await this.fastestClickerCount.textContent();
    const matches = fastestClickerCountText.match(this.countRegex);
    return Number(matches[1]);
  }

  async getFastestClickerMultiplier() {
    let fastestClickMultiplier = 1;
    if (this.fastestClickerMultiplierSpan.isVisible()) {
      const fastestClickerMultiplierText =
        await this.fastestClickerMultiplierSpan.textContent();
      const matches = fastestClickerMultiplierText.match(this.multiplierRegex);
      fastestClickMultiplier = Number(matches[1]);
    }
    return fastestClickMultiplier;
  }

  async getManualClickMultiplierCount() {
    const multiplierCountText = await this.clickMultiplierCount.textContent();
    const matches = multiplierCountText.match(this.countRegex);
    return Number(matches[1]);
  }

  async getScoreImage() {
    return this.currentScoreImage.getAttribute("data-test-id");
  }

  async clickMainButton() {
    await this.mainButton.click();
  }

  // This method assumes there are no auto-clickers or other influences on the score besides the click.
  async clickMainButtonAndWait(iterations = 1) {
    for (let i = 0; i < iterations; i++) {
      const score = await this.getScore();
      const multiplier = await this.getManualClickMultiplierCount();
      await this.clickMainButton();
      await waitFor(async () => {
        return (await this.getScore()) === score + multiplier;
      });
    }
  }

  // Is not careful by default, and doesn't care if the score goes higher than the target.
  // If options.carefully, it will verify the score increase after every click, and will expect
  //   that no auto-clickers are influencing the score.
  async clickUntilScore(targetScore, options = {}) {
    let timeout = 20;
    if (options.timeout) {
      timeout = options.timeout;
    }
    let carefully = false || options.carefully;

    let score = await this.getScore();
    const timer = new SimpleTimer(true);

    while (score < targetScore && timer.keepTrying(timeout)) {
      if (carefully) {
        await this.clickMainButtonAndWait();
      } else {
        await this.clickMainButton();
      }
      score = await this.getScore();
    }

    score = await this.getScore();
    if (score < targetScore) {
      throw new Error(
        `After [${timer.tryCount}] clicking iterations over [${timeout}] seconds, we reached a score of [${score}] but the target score of [${targetScore}] was not reached.`
      );
    }
    if (carefully && score > targetScore) {
      throw new Error(
        `After [${timer.tryCount}] clicking iterations over [${timeout}] seconds, we exceeded the target score of [${targetScore}] and wound up at [${score}]. This should not happen when the 'carefully' flag is set. Were there auto-clickers or changes to the multiplier while this method was clicking?`
      );
    }
  }

  // UI Navigation

  async getCurrentSection() {
    return this.activeLink.textContent();
  }

  async navHomeSection() {
    await this.homeNavLink.click();
    await this.waitForHomeLoading();
  }

  async navAboutSection() {
    await this.aboutNavLink.click();
    await this.waitForAboutLoading();
  }

  async navClickerStore() {
    await this.clickerStoreNavLink.click();
    await this.waitForClickerStoreLoading();
  }

  async navUpgradeStore() {
    await this.upgradeStoreNavLink.click();
    await this.waitForUpgradeStoreLoading();
  }

  // Clicker Store

  async getAutoClickerCost(navToSection = true) {
    if (navToSection) {
      await this.navClickerStore();
    }
    const autoClickerCostText = await this.autoClickerButton.textContent();
    const matches = autoClickerCostText.match(this.costRegex);
    return Number(matches[1]);
  }

  async getFasterClickerCost(navToSection = true) {
    if (navToSection) {
      await this.navClickerStore();
    }
    const fasterClickerCostText = await this.fasterClickerButton.textContent();
    const matches = fasterClickerCostText.match(this.costRegex);
    return Number(matches[1]);
  }

  async getFastestClickerCost(navToSection = true) {
    if (navToSection) {
      await this.navClickerStore();
    }
    const fastestClickerCostText =
      await this.fastestClickerButton.textContent();
    const matches = fastestClickerCostText.match(this.costRegex);
    return Number(matches[1]);
  }

  async clickAutoClickerButton(navToSection = true) {
    if (navToSection) {
      await this.navClickerStore();
    }
    const autoClickerCount = await this.getAutoClickerCount();
    await this.autoClickerButton.click();
    const clickResponses = {
      purchased: async () => {
        return (await this.getAutoClickerCount()) === autoClickerCount + 1;
      },
      no_sale: "NOTHING",
    };
    return multiWait(clickResponses, 0.25);
  }

  async clickFasterClickerButton(navToSection = true) {
    if (navToSection) {
      await this.navClickerStore();
    }
    const fasterClickerCount = await this.getFasterClickerCount();
    await this.fasterClickerButton.click();
    const clickResponses = {
      purchased: async () => {
        return (await this.getFasterClickerCount()) === fasterClickerCount + 1;
      },
      no_sale: "NOTHING",
    };
    return multiWait(clickResponses, 0.25);
  }

  async clickFastestClickerButton(navToSection = true) {
    if (navToSection) {
      await this.navClickerStore();
    }
    const fastestClickerCount = await this.getFastestClickerCount();
    await this.fastestClickerButton.click();
    const clickResponses = {
      purchased: async () => {
        return (
          (await this.getFastestClickerCount()) === fastestClickerCount + 1
        );
      },
      no_sale: "NOTHING",
    };
    return multiWait(clickResponses, 0.25);
  }

  // Upgrade Store

  async getManualMultiplierCost() {
    const multiplierCostText = await this.manualMultiplierButton.textContent();
    const matches = multiplierCostText.match(this.costRegex);
    return Number(matches[1]);
  }

  async clickManualMultiplierButton(navToSection = true) {
    if (navToSection) {
      await this.navUpgradeStore();
    }
    const multiplierCount = await this.getManualClickMultiplierCount();
    await this.manualMultiplierButton.click();
    const clickResponses = {
      purchased: async () => {
        return (
          (await this.getManualClickMultiplierCount()) === multiplierCount + 1
        );
      },
      no_sale: "NOTHING",
    };
    return multiWait(clickResponses, 0.25);
  }

  // Click and purchase multipliers greedily until a certain number of multipliers have been purchased.
  async clickForMultipliers(targetMultiplier, options = {}) {
    let timeout = 20;
    if (options.timeout) {
      timeout = options.timeout;
    }

    let multiplierCount = await this.getManualClickMultiplierCount();
    let multiplierCost = await this.getMultiplierCost();
    const timer = new SimpleTimer(true);
    while (multiplierCount < targetMultiplier && timer.keepTrying(timeout)) {
      await this.clickUntilScore(multiplierCost);
      expect(await this.clickManualMultiplierButton()).toBe("purchased");
      multiplierCount = await this.getManualClickMultiplierCount();
      multiplierCost = await this.getMultiplierCost();
    }
  }

  // About Section

  async getAboutTitle() {
    return this.aboutSectionTitle.textContent();
  }

  async getAboutContent() {
    return this.aboutSectionContent.textContent();
  }
}

module.exports = {
  VueClickerPage,
};
