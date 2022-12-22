<script lang="ts">
import UnitButton from "./UnitButton.vue";
import UnitStore from "./UnitStore.vue"
import { useMainStore } from '../services/GameState'
import { formatNumber } from "../services/Helpers"
import { computed } from "vue";

export default {
  setup() {
    const main = useMainStore();
    const clickIncrement = () => {
      main.incrementCount(main.getMultiplier);
    };
    const autoClickIncrement = () => {
      console.log("click")
      main.incrementCount(main.getAutoClicker * main.getAutoClickerMultiplier);
    };
    const fasterClickIncrement = () => {
      main.incrementCount(main.getFasterClicker * main.getFasterClickerMultiplier);
    };
    const fastestClickIncrement = () => {
      main.incrementCount(main.getFastestClicker * main.getFastestClickerMultiplier);
    };
    const thisPrestige = () => {
      main.prestige();
    }
    const hardReset = () => {
      main.hardReset();
    }
    return {
      clickIncrement,
      autoClickIncrement,
      fasterClickIncrement,
      fastestClickIncrement,
      thisPrestige,
      hardReset,
      count: computed(() => main.getCount),
      autoClickers: computed(() => main.getAutoClicker),
      autoClickerMultiplier: computed(() => main.getAutoClickerMultiplier),
      fasterClickers: computed(() => main.getFasterClicker),
      fasterClickerMultiplier: computed(() => main.getFasterClickerMultiplier),
      fastestClickers: computed(() => main.getFastestClicker),
      fastestClickerMultiplier: computed(() => main.getFastestClickerMultiplier),
      multiplier: computed(() => main.getMultiplier),
      souls: computed(() => main.getSouls),
      prestigeNumber: computed(() => main.prestigeNumber),
      prestigeCost: computed(() => main.prestigeCost),
      
    };
  },
  data() {
    return {
      autoClickerInterval: 0,
      fasterClickerInterval: 0,
      fastestClickerInterval: 0,
    };
  },
  components: {
    UnitButton,
    UnitStore,
  },
  methods: {
    format(n: number): String {
      return formatNumber(n)
    },
  },
  mounted() {
    this.autoClickerInterval = setInterval(() => {
      this.autoClickIncrement();
    }, 1000);
    this.fasterClickerInterval = setInterval(() => {
      this.fasterClickIncrement();
    }, 100);
    this.fastestClickerInterval = setInterval(() => {
      this.fastestClickIncrement();
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
      <button class="baseButton mainButton" @click="clickIncrement" data-test-id="mainButton">
        Click This Here
      </button>
      <span class="totalCount">{{ format(count) }}</span>
      <span class="souls" v-if="prestigeNumber > 1">souls: {{ format(souls) }}</span>
    </h2>
    <div>
      <span class="clicker" data-test-id="autoClickerCount">Autoclickers: {{ autoClickers }}</span>
      <span data-test-id="autoClickerMultiplier" v-if="autoClickerMultiplier > 1"> x {{ autoClickerMultiplier}}</span>
    </div>
    <div>
      <span class="clicker" data-test-id="fasterClickerCount">Faster clickers: {{ fasterClickers }}</span>
      <span data-test-id="fasterClickerMultiplier" v-if="fasterClickerMultiplier > 1"> x {{ fasterClickerMultiplier }}</span>
    </div>
    <div>
      <span class="clicker" data-test-id="fastestClickerCount">Fastest clickers: {{ fastestClickers }}</span>
      <span data-test-id="fastestClickerMultiplier" v-if="fastestClickerMultiplier > 1"> x {{ fastestClickerMultiplier }}</span>
    </div>
    <div>
      <span class="clicker" data-test-id="clickMultiplierCount">Click Multiplier: {{ multiplier }}</span>
    </div>
    <div v-if="prestigeNumber > 1">
      Prestige Cost: {{ format(prestigeCost) }}
    </div>
    <div v-if="count > prestigeCost">
      <button class="baseButton mainButton" @click="thisPrestige">PRESTIGE</button>
    </div>
    <button class="baseButton redButton" @click="hardReset" data-test-id="hardReset">
      HARD RESET
    </button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.totalCount {
  font-family: 'Courier New', Courier, monospace;
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

.redButton {
  background-color: red;
}

.upgradeButton {
  background-color: #f6f21e;
}
.totalCount {
  margin: 1rem;
  min-width: 10rem;
}
</style>
