import { describe, it, expect } from "vitest";
import { SimpleTimer, sleep } from '../helpers/SimpleTimer';

describe("Simple Timer", () => {
  describe("Unstarted Timer", () => {
    it("should not be created in a start state", () => {
      const unstartedTimer = new SimpleTimer(false);
      expect(unstartedTimer.started).toBe(false);
    });
  });
});
