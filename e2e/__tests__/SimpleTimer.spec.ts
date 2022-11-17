import { describe, it, expect } from "vitest";
import { SimpleTimer, sleep } from '../helpers/SimpleTimer';

describe("Simple Timer", () => {
  describe.concurrent("Unstarted Timer", () => {
    it("should not be created in a start state", () => {
      const unstartedTimer = new SimpleTimer(false);
      expect(unstartedTimer.started).toBe(false);
    });

    it("should have a start time of zero", () => {
      const unstartedTimer = new SimpleTimer(false);
      expect(unstartedTimer.startTime).toBe(0);
    });

    it("should have a try count of zero", () => {
      const unstartedTimer = new SimpleTimer(false);
      expect(unstartedTimer.tryCount).toBe(0);
    });

    it("getElapsedMillis should return zero", () => {
      const unstartedTimer = new SimpleTimer(false);
      expect(unstartedTimer.getElapsedMillis()).toBe(0);
    });

    it("getElapsedSeconds should return zero", () => {
      const unstartedTimer = new SimpleTimer(false);
      expect(unstartedTimer.getElapsedSeconds()).toBe(0);
    });

    it("hasTime should return false", () => {
      const unstartedTimer = new SimpleTimer(false);
      expect(unstartedTimer.hasTime(0)).toBe(false);
    });

    it("should be in the started state after starting it", () => {
      const timer = new SimpleTimer(false);
      timer.start();
      expect(timer.started).toBe(true);
    });
  });

  describe.concurrent("Started Timer", () => {
    it("should be created in a started state", () => {
      const startedTimer = new SimpleTimer(true);
      expect(startedTimer.started).toBe(true);
    });

    it("should increment the access count when keepTrying is called", () => {
      const startedTimer = new SimpleTimer(true);
      expect(startedTimer.tryCount).toBe(0);
      startedTimer.keepTrying(10);
      expect(startedTimer.tryCount).toBe(1);
      startedTimer.keepTrying(10);
      expect(startedTimer.tryCount).toBe(2);
    });

    it("should return correct elapsed seconds after a pause", async () => {
      const startedTimer = new SimpleTimer(true);
      await sleep(2000);
      const elapsedSeconds = startedTimer.getElapsedSeconds();
      expect(elapsedSeconds).toBeGreaterThanOrEqual(1);
      expect(elapsedSeconds).toBeLessThanOrEqual(2);
    });

    it("should return the correct elapsed milliseconds after a pause", async () => {
      const minimum = 2750;
      const target = 3000;
      const maximum = 3250;

      const startedTimer = new SimpleTimer(true);
      await sleep(target);
      const elapsedMilliseconds = startedTimer.getElapsedMillis();
      expect(elapsedMilliseconds).toBeGreaterThanOrEqual(minimum);
      expect(elapsedMilliseconds).toBeLessThanOrEqual(maximum);
    });

    it("should have time after sleeping for 1 second with a 2 second time limit", async () => {
      const startedTimer = new SimpleTimer(true);
      await sleep(1000);
      expect(startedTimer.hasTime(2)).toBe(true);
    });

    it("should not have time after sleeping for 2 seconds with a 1 second time limit", async () => {
      const startedTimer = new SimpleTimer(true);
      await sleep(2000);
      expect(startedTimer.hasTime(1)).toBe(false);
    });

    it("should return the remaining time correctly", async () => {
      const startedTimer = new SimpleTimer(true);
      expect(startedTimer.getRemaining(5)).toBeGreaterThanOrEqual(4.9);
      expect(startedTimer.getRemaining(5)).toBeLessThanOrEqual(5.1);
      await sleep(2000);
      expect(startedTimer.getRemaining(5)).toBeGreaterThanOrEqual(2.9);
      expect(startedTimer.getRemaining(5)).toBeLessThanOrEqual(3.1);
      await sleep(4000);
      expect(startedTimer.getRemaining(5)).toBe(0);
    }, 7000);

    it("should keep trying if there is time left", async () => {
      const startedTimer = new SimpleTimer(true);
      expect(startedTimer.keepTrying(0)).toBe(true);
    });

    it("should try at least once even if there is no time left, then stop trying", async () => {
      const startedTimer = new SimpleTimer(true);
      expect(startedTimer.keepTrying(0)).toBe(true);
      expect(startedTimer.keepTrying(0)).toBe(false);
      expect(startedTimer.keepTrying(0)).toBe(false);
    });

    it("should allow a loop that will succeed to complete", async () => {
      let loopSucceeded = false;
      const startedTimer = new SimpleTimer(true);
      const fakeTask = new SimpleTimer(true);
      while (startedTimer.keepTrying(30)) {
        if (fakeTask.getElapsedMillis() >= 500) {
          loopSucceeded = true;
          break;
        }
        await sleep(10);
      }
      expect(loopSucceeded).toBe(true);
    });

    it("should allow a loop that will succeed on the first try to complete even if there isn't any time left", async () => {
      let loopSucceeded = false;
      const startedTimer = new SimpleTimer(true);
      await sleep(15);
      while (startedTimer.keepTrying(0)) {
        loopSucceeded = true;
        break;
      }
      expect(loopSucceeded).toBe(true);
      expect(startedTimer.keepTrying(0)).toBe(false);
    });

    it("should allow a loop that won't succeed to time out", async () => {
      const startedTimer = new SimpleTimer(true);
      while (startedTimer.keepTrying(1)) {
        await sleep(50);
      }
      expect(startedTimer.getElapsedSeconds()).toBeGreaterThanOrEqual(1);
      expect(startedTimer.getElapsedMillis()).toBeLessThanOrEqual(1100);
      expect(startedTimer.keepTrying(1)).toBe(false);
      expect(startedTimer.tryCount).toBeGreaterThanOrEqual(10);
    });
  });
});
