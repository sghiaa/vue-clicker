<script lang="ts">
  export default {
    data() {
      return {
        moment: new Date().getTime(),
        prestigeNumber: 1,
        count: 0,
        autoClicker: 0,
        autoClickerInterval: 0,
        fasterClickerInterval: 0,
        fastestClickerInterval: 0,
        fasterClicker: 0,
        fastestClicker: 0,
        multiplier: 1,
        multiplierExponent: 1.25,
        prestigeCost: 50000,
        prestigeExponent: 1.15,
      }
    },
    methods: {
      incrementCount() {
        this.count += this.multiplier;
      },
      autoClickerCost() {
        return Math.ceil(10 * Math.pow(1.05, this.autoClicker))
      },
      incrementAutoClicker() {
        if(this.count >= this.autoClickerCost()) {
          this.count -= this.autoClickerCost();
          this.autoClicker++;
        }
      },
      fasterClickerCost() {
        return Math.ceil(100 * Math.pow(1.1, this.fasterClicker))
      },
      incrementFasterClicker() {
        if(this.count >= this.fasterClickerCost()) {
          this.count -= this.fasterClickerCost();
          this.fasterClicker++;
        }
      },
      fastestClickerCost() {
        return Math.ceil(1000 * Math.pow(1.15, this.fastestClicker))
      },
      incrementFastestClicker() {
        if(this.count >= this.fastestClickerCost()) {
          this.count -= this.fastestClickerCost();
          this.fastestClicker++;
        }
      },
      multiplierCost() {
        return Math.ceil(50 * Math.pow(this.multiplierExponent, this.multiplier - this.prestigeNumber))
      },
      incrementMultiplier() {
        if(this.count >= this.multiplierCost()) {
          this.count -= this.multiplierCost();
          this.multiplier++;
        }
      },
      prestige() {
        this.count = 0;
        this.autoClicker = 0;
        this.fasterClicker = 0;
        this.fastestClicker = 0;
        this.prestigeNumber++;
        this.multiplier = this.prestigeNumber;
        this.multiplierExponent = Math.max(this.multiplierExponent * .95, 1.01);
        this.prestigeCost =  this.prestigeCost * this.prestigeExponent;
      }
    },
    mounted() {
      this.autoClickerInterval = setInterval(() => {
        this.count += this.autoClicker;
      }, 1000)
      this.fasterClickerInterval = setInterval(() => {
        this.count += this.fasterClicker;
      }, 100)
      this.fastestClickerInterval = setInterval(() => {
        this.count += this.fastestClicker;
      }, 10)
    },
    beforeDestroy() {
      // Don't forget to remove the interval before destroying the component
      clearInterval(this.autoClickerInterval)
      clearInterval(this.fasterClickerInterval)
      clearInterval(this.fastestClickerInterval)
    }
  }
</script>

<template>
  <div>
    <h2>
      <button class="baseButton mainButton" @click="incrementCount">Click here</button>
      <span class="totalCount">{{ count }}</span>
    </h2>
    <div>
    </div>
    <div>
      <button class="baseButton buyButton" @click="incrementAutoClicker">Auto Clicker (cost: {{ autoClickerCost() }})</button>
      <span class="clicker">count: {{ autoClicker }}</span>
    </div>
    <div>
      <button class="baseButton buyButton" @click="incrementFasterClicker">Faster Clicker (cost: {{ fasterClickerCost() }})</button>
      <span class="clicker">count: {{ fasterClicker }}</span>
    </div>
    <div>
      <button class="baseButton buyButton" @click="incrementFastestClicker">Fastest Clicker (cost: {{ fastestClickerCost() }})</button>
      <span class="clicker">count: {{ fastestClicker }}</span>
    </div>
    <div>
      <button class="baseButton upgradeButton" @click="incrementMultiplier">Multiplier (cost: {{ multiplierCost() }})</button>
      <span class="clicker">count: {{ multiplier }}</span>
    </div>
    <div v-if="count > prestigeCost">
      <button class="baseButton mainButton" @click="prestige">PRESTIGE</button>
    </div>
  </div>
  <div class="countImage">
    <img v-if="count <= 1000" alt="Water droplet" class="" src="@/assets/water-droplet.jpg" width="125" height="125" />
    <img v-if="count > 1000 && count <= 10000" alt="Lightning strike" class="" src="@/assets/lightning-strike.jpg" width="125" height="125" />
    <img v-if="count > 10000 && count <= 100000" alt="Dandylion" class="" src="@/assets/dandylion.jpg" width="125" height="125" />
    <img v-if="count > 100000" alt="Tree" class="" src="@/assets/tree.jpg" width="125" height="125" />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.baseButton {
  border-radius: .5rem;
  padding: 1rem;
  margin-top: 0.5rem;
  min-width: 15rem;
}

.buyButton {
  background-color: #6ff36d;
}

.clicker {
  display: inline;
  padding-left: 1rem;
  text-align: center;
}

.countImage {
  padding: 1rem;
  margin: 1rem;
}
.mainButton {
}

.upgradeButton {
  background-color: #f6f21e;
}
.totalCount {
  margin: 1rem;
  min-width: 10rem;
}
</style>
