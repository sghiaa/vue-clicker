import { waitForDebugger } from "inspector";
import { describe, it, expect } from "vitest";
import { SimpleTimer } from '../helpers/SimpleTimer';
import { multiWait, waitFor } from '../helpers/WaitForEvent';

describe("Wait For Event Utility", () => {
  describe.concurrent("multiWait", () => {
    it("should return one true event", async () => {
      const possibleEvents = {
        "one_true_event": () => {
          return true;
        }
      };
      let foundEvent = await multiWait(possibleEvents, 1);
      expect(foundEvent).toBe("one_true_event");
    });

    it("should fail if no event occurs within the timeout", async () => {
      const impossibleEvents = {
        "impossible_event_1": () => {
          return false;
        },
        "impossible_event_2": () => {
          return false;
        }
      }
      let errorThrown = false;
      try {
        await multiWait(impossibleEvents, 1);
      } catch (error) {
        errorThrown = true;
        expect(error.message).toMatch(/After \[\d+\] polling iterations over \[1]\ seconds, none of the following events occurred: \[impossible_event_1,impossible_event_2\]\./);
      }

      expect(errorThrown).toBe(true);
    });

    it("should return the NOTHING event when nothing occurs", async () => {
      const timer = new SimpleTimer(true);
      const possibleEvents = {
        "no_activity_event": 'NOTHING',
        "impossible_event": () => {
          return false;
        }
      };
      let foundEvent = await multiWait(possibleEvents, 1);
      expect(foundEvent).toBe('no_activity_event');
    });

    it("should return the correct event after the event occurs", async () => {
      const timer = new SimpleTimer(true);
      const possibleEvents = {
        "false_event_1": () => {
          return false;
        },
        "timed_event": () => {
          // This event is a function that will return true starting one second after the timer was started.
          return !timer.hasTime(1);
        },
        "false_event_2": () => {
          return false;
        }
      };
      const foundEvent = await multiWait(possibleEvents, 2);
      expect(timer.getElapsedMillis()).toBeGreaterThanOrEqual(1000);
      expect(timer.getElapsedMillis()).toBeLessThanOrEqual(1500);
      expect(foundEvent).toBe('timed_event');
    });
  });

  describe.concurrent("waitFor", () => {
    it("template", async () => {

    });

    it("should return if the event is successful", async () => {
      await waitFor(() => { return true; }, { timeoutSeconds: 1 });
    });

    it("should wait for an event before returning", async () => {
      const timer = new SimpleTimer(true);
      // This event is a function that will return true starting one second after the timer was started.
      await (waitFor(() => { return !timer.hasTime(1); }, { timeoutSeconds: 2, description: 'succeeds after 2 seconds' }));
      expect(timer.getElapsedMillis()).toBeGreaterThanOrEqual(1000);
      expect(timer.getElapsedMillis()).toBeLessThanOrEqual(1500);
    });

    it("should fail if the event does not occur within the timeout", async () => {
      let errorThrown = false;
      const timer = new SimpleTimer(true);
      try {
        const timer = new SimpleTimer(true);
        // This event is a function that will return true starting two seconds after the timer was started.
        await (waitFor(() => { return !timer.hasTime(2); }, { timeoutSeconds: 1, description: 'succeeds after 2 seconds' }));
      } catch (error) {
        errorThrown = true;
        expect(error.message).toMatch(/The event \[succeeds after 2 seconds\] did not occur after \[\d+\] polling iterations over \[1\] seconds\./);
      }
    });
  });
});
