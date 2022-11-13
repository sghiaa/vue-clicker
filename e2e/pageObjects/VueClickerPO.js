import { expect } from '@playwright/test';
import { multiWait, waitFor } from '../helpers/WaitForEvent';

exports.VueClickerPage = class VueClickerPage {
  constructor(page) {
    this.page = page;

    this.mainButton = this.page.locator('data-test-id=mainButton');
    this.autoClickerButton = this.page.locator('data-test-id=autoClickerButton');
    this.fasterClickerButton = this.page.locator('data-test-id=fasterClickerButton');
    this.fastestClickerButton = this.page.locator('data-test-id=fastestClickerButton');
    this.multiplierButton = this.page.locator('data-test-id=multiplierButton');

    this.currentTotalScore = this.page.locator('data-test-id=currentTotalScore');
    this.autoClickerCount = this.page.locator('data-test-id=autoClickerCount');
    this.fasterClickerCount = this.page.locator('data-test-id=fasterClickerCount');
    this.fastestClickerCount = this.page.locator('data-test-id=fastestClickerCount');
    this.multiplierCount = this.page.locator('data-test-id=multiplierCount');

    this.countRegex = /count: (\d+)/;

    this.currentScoreImage = this.page.locator('div.countImage img');

    this.image0 = this.page.locator('data-test-id=image0');
    this.image1000 = this.page.locator('data-test-id=image1000');
    this.image10000 = this.page.locator('data-test-id=image10000');
    this.image100000 = this.page.locator('data-test-id=image100000');

    this.navigationLinks = this.page.locator('data-test-id=navigationLinks');
    this.activeLink = this.page.locator('nav[data-test-id="navigationLinks"] a.router-link-active');
    this.homeNavLink = this.page.locator('nav[data-test-id="navigationLinks"] a:has-text("Home")');
    this.aboutNavLink = this.page.locator('nav[data-test-id="navigationLinks"] a:has-text("About")');

    this.aboutSection = this.page.locator('data-test-id=aboutSection');
    this.aboutSectionTitle = this.page.locator('div[data-test-id="aboutSection"] > h1');
    this.aboutSectionContent = this.page.locator('div[data-test-id="aboutSection"] > div');
  };

  async visit() {
    await this.page.goto("/");
    await this.waitForLoading();
  };

  async visitAbout() {
    await this.page.goto("/about");
    await this.waitForLoading();
    expect(this.aboutSection).toBeVisible();
  }

  async waitForLoading() {
    await expect(this.mainButton).toBeVisible();
    await expect(this.autoClickerButton).toBeVisible();
    await expect(this.fasterClickerButton).toBeVisible();
    await expect(this.fastestClickerButton).toBeVisible();
    await expect(this.multiplierButton).toBeVisible();

    await expect(this.currentTotalScore).toBeVisible();
    await expect(this.autoClickerCount).toBeVisible();
    await expect(this.fasterClickerCount).toBeVisible();
    await expect(this.fastestClickerCount).toBeVisible();
    await expect(this.multiplierCount).toBeVisible();

    await expect(this.currentScoreImage).toBeVisible();

    await expect(this.navigationLinks).toBeVisible();
  };

  async getCurrentTotalScore() {
    return Number(await this.currentTotalScore.textContent());
  };

  async getAutoClickerCount() {
    const autoClickerCountText = await this.autoClickerCount.textContent();
    const matches = autoClickerCountText.match(this.countRegex);
    return Number(matches[1]);
  };

  async getFasterClickerCount() {
    const fasterClickerCountText = await this.fasterClickerCount.textContent();
    const matches = fasterClickerCountText.match(this.countRegex);
    return Number(matches[1]);
  };

  async getFastestClickerCount() {
    const fastestClickerCountText = await this.fastestClickerCount.textContent();
    const matches = fastestClickerCountText.match(this.countRegex);
    return Number(matches[1]);
  };

  async getMultiplierCount() {
    const multiplierCountText = await this.multiplierCount.textContent();
    const matches = multiplierCountText.match(this.countRegex);
    return Number(matches[1]);
  };

  async getScoreImage() {
    return this.currentScoreImage.getAttribute('data-test-id');
  }

  async getCurrentSection() {
    return this.activeLink.textContent();
  }

  async navHomeSection() {
    await this.homeNavLink.click();
    await this.waitForLoading();
    await waitFor(async () => { return (await this.getCurrentSection()) === 'Home'; });
    expect(await this.aboutSection.isHidden()).toBe(true);
    expect(await this.aboutSectionTitle.isHidden()).toBe(true);
    expect(await this.aboutSectionContent.isHidden()).toBe(true);
  }

  async navAboutSection() {
    await this.aboutNavLink.click();
    await this.waitForLoading();
    await waitFor(async () => { return (await this.getCurrentSection()) === 'About'; });
    expect(this.aboutSection).toBeVisible();
    expect(this.aboutSectionTitle).toBeVisible();
    expect(this.aboutSectionContent).toBeVisible();
  }

  async getAboutTitle() {
    return this.aboutSectionTitle.textContent();
  }

  async getAboutContent() {
    return this.aboutSectionContent.textContent();
  }
};