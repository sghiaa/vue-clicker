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
        if(this.started) {
            $log.warn(`The start method was called on a SimpleTimer that had already been started and had been running for [${this.getElapsedSeconds}] seconds. Starting an already started timer does nothing, and reusing timers is discouraged, so this is probably a mistake.`);
        } else {
            this.started = true;
            this.startTime = Date.now();
        }
    }
};

exports.sleep = async (timeoutMillis) => {
    await new Promise(resolve => setTimeout(resolve, timeoutMillis));
}