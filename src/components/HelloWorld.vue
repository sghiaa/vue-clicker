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
  <h1>
    Good game
  </h1>
  <div>
    <h2>
      <button class="mainButton" @click="incrementCount">Click here</button>
      <span class="totalCount">{{ count }}</span>
    </h2>
    <div>
    </div>
    <div>
      <button class="buyButton" @click="incrementAutoClicker">Auto Clicker (cost: {{ autoClickerCost() }})</button>
      count: {{ autoClicker }}
    </div>
    <div>
      <button class="buyButton" @click="incrementFasterClicker">Faster Clicker (cost: {{ fasterClickerCost() }})</button>
      count: {{ fasterClicker }}
    </div>
    <div>
      <button class="buyButton" @click="incrementFastestClicker">Fastest Clicker (cost: {{ fastestClickerCost() }})</button>
      count: {{ fastestClicker }}
    </div>
    <div>
      <button class="upgradeButton" @click="incrementMultiplier">Multiplier (cost: {{ multiplierCost() }})</button>
      count: {{ multiplier }}
    </div>
    <div v-if="count > prestigeCost">
      <button @click="prestige">PRESTIGE</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}
.buyButton {
  background-color: #6ff36d;
  border-radius: .5rem;
  padding: 1rem;
  margin-top: 0.5rem;
}

.mainButton {
  border-radius: .5rem;
  padding: 1rem;
}

.upgradeButton {
  background-color: #f6f21e;
  border-radius: .5rem;
  padding: 1rem;
  margin-top: 0.5rem;
}
.totalCount {
  margin: 1rem;
}
</style>
