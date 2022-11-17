exports.SimpleTimer = class SimpleTimer {
  constructor(start = false) {
    this.startTime = 0;
    this.started = false;
    this.tryCount = 0;
    if (start) {
      this.start();
    }
  };

  start() {
    if (this.started) {
      $log.warn(`The start method was called on a SimpleTimer that had already been started and had been running for [${this.getElapsedSeconds}] seconds. Starting an already started timer does nothing, and reusing timers is discouraged, so this is probably a mistake.`);
    } else {
      this.started = true;
      this.startTime = Date.now();
    }
  };

  getElapsedSeconds() {
    if (this.startTime === 0) {
      return 0;
    } else {
      let now = Date.now();
      return (Math.round(((now - this.startTime) / 100)) / 10);
    }
  };

  getElapsedMillis() {
    if (this.startTime === 0) {
      return 0;
    } else {
      return (Date.now() - this.startTime);
    }
  };

  hasTime(timeoutSeconds) {
    if (this.startTime === 0) {
      return false;
    } else {
      return (this.getElapsedMillis() < (timeoutSeconds * 1000));
    }
  };

  keepTrying(timeoutSeconds) {
    if (typeof timeoutSeconds === 'undefined') {
      timeoutSeconds = 5; // TODO: Link this to Playwright's config.expext.timeout
    }
    if (this.startTime === 0) {
      return false;
    } else {
      if (this.tryCount === 0) {
        this.tryCount = this.tryCount + 1;
        return true;
      } else {
        this.tryCount = this.tryCount + 1;
        return this.hasTime(timeoutSeconds);
      }
    }
  };

  getRemaining(timeoutSeconds) {
    if (this.startTime === 0) {
      return 0;
    } else {
      return Math.max((timeoutSeconds - ((Date.now() - this.startTime) / 1000)), 0);
    }
  }
};

exports.sleep = async (timeoutMillis) => {
  await new Promise(resolve => setTimeout(resolve, timeoutMillis));
}