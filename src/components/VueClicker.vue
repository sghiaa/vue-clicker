<script lang="ts">
import UnitButton from "./UnitButton.vue";
import UnitStore from "./UnitStore.vue"
import { state } from '../services/GameState'

export default {
  data() {
    return {
      state,
      moment: new Date().getTime(),
      autoClickerInterval: 0,
      fasterClickerInterval: 0,
      fastestClickerInterval: 0,
      prestigeCost: 50000,
      prestigeExponent: 1.15,
    };
  },
  components: {
    UnitButton,
    UnitStore,
  },
  methods: {
    incrementCount() {
      this.state.count += this.state.multiplier;
    },
    prestige() {
      this.state.count = 0;
      this.state.autoClicker = 0;
      this.state.fasterClicker = 0;
      this.state.fastestClicker = 0;
      state.prestigeNumber++;
      this.state.multiplier = state.prestigeNumber;
      state.multiplierExponent = Math.max(state.multiplierExponent * 0.95, 1.01);
      this.prestigeCost = this.prestigeCost * this.prestigeExponent;
    },
  },
  mounted() {
    this.autoClickerInterval = setInterval(() => {
      this.state.count += this.state.autoClicker;
    }, 1000);
    this.fasterClickerInterval = setInterval(() => {
      this.state.count += this.state.fasterClicker;
    }, 100);
    this.fastestClickerInterval = setInterval(() => {
      this.state.count += this.state.fastestClicker;
    }, 10);
  },
  beforeUnmount() {
    // Don't forget to remove the interval before destroying the component
    clearInterval(this.autoClickerInterval);
    clearInterval(this.fasterClickerInterval);
    clearInterval(this.fastestClickerInterval);
  },
};
</script>

<template>
  <div>
    <h2>
      <button class="baseButton mainButton" @click="incrementCount">
        Click here
      </button>
      <span class="totalCount">{{ state.count }}</span>
    </h2>
    <div>
      <span class="clicker">Autoclickers: {{ state.autoClicker }}</span>
    </div>
    <div>
      <span class="clicker">Faster clickers: {{ state.fasterClicker }}</span>
    </div>
    <div>
      <span class="clicker">Fastest clickers: {{ state.fastestClicker }}</span>
    </div>
    <div>
      <span class="clicker">Click Multiplier: {{ state.multiplier }}</span>
    </div>
    <div v-if="state.count > prestigeCost">
      <button class="baseButton mainButton" @click="prestige">PRESTIGE</button>
    </div>
  </div>
  <div class="countImage">
    <img
      v-if="state.count <= 1000"
      alt="Water droplet"
      class=""
      src="@/assets/water-droplet.jpg"
      width="125"
      height="125"
    />
    <img
      v-if="state.count > 1000 && state.count <= 10000"
      alt="Lightning strike"
      class=""
      src="@/assets/lightning-strike.jpg"
      width="125"
      height="125"
    />
    <img
      v-if="state.count > 10000 && state.count <= 100000"
      alt="Dandylion"
      class=""
      src="@/assets/dandylion.jpg"
      width="125"
      height="125"
    />
    <img
      v-if="state.count > 100000"
      alt="Tree"
      class=""
      src="@/assets/tree.jpg"
      width="125"
      height="125"
    />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.baseButton {
  border-radius: 0.5rem;
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
/* .mainButton { } */

.upgradeButton {
  background-color: #f6f21e;
}
.totalCount {
  margin: 1rem;
  min-width: 10rem;
}
</style>
