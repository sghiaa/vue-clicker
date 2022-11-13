import { SimpleTimer, sleep } from '../helpers/SimpleTimer';

const multiWaitDebug = false;
const waitForDebug = false;

const logMultiWaitDebug = (message) => {
  if (multiWaitDebug) {
    console.log(message);
  }
}

const logWaitForDebug = (message) => {
  if (waitForDebug) {
    console.log(message);
  }
}

const multiWait = async (events, timeoutSecondsParam) => {
  let timeoutSeconds;
  if (typeof timeoutSecondsParam !== 'undefined') {
    timeoutSeconds = timeoutSecondsParam;
  } else {
    timeoutSeconds = 5; // TODO: Link this to Playwright's config.expext.timeout
  }

  let foundEvent = null;

  let eventLabels = Object.keys(events);
  let eventFunctions = Object.values(events);

  const timer = new SimpleTimer(true);
  while (timer.keepTrying(timeoutSeconds)) {
    for (let i = 0; i < eventLabels.length; i++) {
      let label = eventLabels[i];
      const eventFunction = events[label];
      if (eventFunction === 'NOTHING') {
        // 'NOTHING' is a special event. If it is included and no other events occur, the nothing event is returned.
      } else {
        if (await eventFunction()) {
          foundEvent = label;
          break;
        }
      }
    }

    if (foundEvent !== null) {
      break;
    }
    await sleep(50);
  }

  // Check if nothing is a valid event
  if (foundEvent === null && eventFunctions.includes('NOTHING')) {
    foundEvent = eventLabels.find((label) => {
      return events[label] === 'NOTHING';
    });
  }

  if (foundEvent === null) {
    throw new Error(`After [${timer.tryCount}] polling iterations over [${timeoutSeconds}] seconds, none of the following events occurred: [${eventLabels}].`);
  } else {
    return foundEvent;
  }
};

const waitFor = async (eventFunction, options = {}) => {
  let timeoutSeconds = 5; // TODO: Link this to Playwright's config.expext.timeout
  if (options.timeoutSeconds) {
    timeoutSeconds = options.timeoutSeconds;
  }
  let description = 'unnamed_event';
  if (options.description) {
    description = options.description;
  }

  let success = false;

  logWaitForDebug(`waitFor called on event [${description}] with a timeout of [${timeoutSeconds}] seconds.`);

  const timer = new SimpleTimer(true);
  while (timer.keepTrying(timeoutSeconds)) {
    logWaitForDebug(`timer.tryCount = [${timer.tryCount}]`);
    if (await eventFunction()) {
      logWaitForDebug('  - Function passed');
      success = true;
      break;
    } else {
      logWaitForDebug('  - Function failed');
    }
    await sleep(50);
  }

  logWaitForDebug('We are no longer waiting.');

  if (!success) {
    throw new Error(`The event [${description}] did not occur after [${timer.tryCount}] polling iterations over [${timeoutSeconds}] seconds.`);
  }
  logWaitForDebug('waitFor succeeded and is returning control.');
};

module.exports = {
  multiWait,
  waitFor
};