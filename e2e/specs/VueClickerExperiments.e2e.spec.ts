import { test, expect } from "@playwright/test";
import { SimpleTimer } from "../helpers/SimpleTimer";
import { VueClickerPage } from "../pageObjects/VueClickerPO";

test.describe("Vue Clicker Experiments", () => {
  test.skip("How many multipliers is best to reach 1000?", async ({ page }) => {
    test.setTimeout(600000);
    const vueClickerPage = new VueClickerPage(page);
    let timer;
    for (let i = 3; i <= 12; i++) {
      await vueClickerPage.visit();
      expect(await vueClickerPage.getScore()).toBe(0);
      timer = new SimpleTimer(true);
      await vueClickerPage.clickForMultipliers(i);
      await vueClickerPage.clickUntilScore(1000, { carefully: false });
      console.log(`At ${i} multipliers, it took ${timer.getElapsedMillis()} ms to reach 1000`);
    }
  });
});

// At 3 multipliers, it took 13949 ms to reach 1000
// At 4 multipliers, it took 12040 ms to reach 1000
// At 5 multipliers, it took 11278 ms to reach 1000
// At 6 multipliers, it took 10968 ms to reach 1000
// At 7 multipliers, it took 11079 ms to reach 1000
// At 8 multipliers, it took 11459 ms to reach 1000
// At 9 multipliers, it took 12009 ms to reach 1000
// At 10 multipliers, it took 12779 ms to reach 1000
// At 11 multipliers, it took 13759 ms to reach 1000
// At 12 multipliers, it took 15060 ms to reach 1000
