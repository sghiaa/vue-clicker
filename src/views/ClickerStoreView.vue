<script setup lang="ts">
import type { Product } from "@/components/UnitStore.vue";
import UnitStore from "@/components/UnitStore.vue";
import { state } from '../services/GameState'

const autoClickerCost = () => {
  return Math.ceil(10 * Math.pow(1.05, state.autoClicker));
};
const fasterClickerCost = () => {
  return Math.ceil(100 * Math.pow(1.1, state.fasterClicker));
};
const fastestClickerCost = () => {
  return Math.ceil(1000 * Math.pow(1.15, state.fastestClicker));
};
const incrementAutoClicker = () => {
  if (state.count >= autoClickerCost()) {
    state.count -= autoClickerCost();
    state.autoClicker++;
  }
};
const incrementFasterClicker = () => {
  if (state.count >= fasterClickerCost()) {
    state.count -= fasterClickerCost();
    state.fasterClicker++;
  }
};
const incrementFastestClicker = () => {
  if (state.count >= fastestClickerCost()) {
    state.count -= fastestClickerCost();
    state.fastestClicker++;
  }
};
const clickers: Array<Product> = [
        {
          id: 1,
          name: "Auto Clicker",
          cost: autoClickerCost,
          buyFunction: incrementAutoClicker,
        },
        {
          id: 2,
          name: "Faster Clicker",
          cost: fasterClickerCost,
          buyFunction: incrementFasterClicker,
        },
        {
          id: 3,
          name: "Fastest Clicker",
          cost: fastestClickerCost,
          buyFunction: incrementFastestClicker,
        },
]

</script>

<template>
  <div class="about">
    <h1>Buy Clickers</h1>
    <div>
      <UnitStore :products="clickers"  />
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
