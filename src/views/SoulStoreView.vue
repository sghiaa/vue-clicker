<script setup lang="ts">
import type { Product } from "@/components/UnitStore.vue";
import UnitStore from "@/components/UnitStore.vue";
import { state } from '../services/GameState'

const autoClickerMultiplierCost = () => {
  return Math.ceil(
    1 *
    Math.pow(
      1.5,
      state.autoClickerMultiplier - 1
    )
  );
};
const incrementAutoClickMultiplier = () => {
  if (state.souls >= autoClickerMultiplierCost()) {
    state.souls -= autoClickerMultiplierCost();
    state.autoClickerMultiplier++;
  }
};
const fasterClickerMultiplierCost = () => {
  return Math.ceil(
    1 *
    Math.pow(
      1.75,
      state.fasterClickerMultiplier - 1
    )
  );
};
const incrementFasterClickerMultiplier = () => {
  if (state.souls >= fasterClickerMultiplierCost()) {
    state.souls -= fasterClickerMultiplierCost();
    state.fasterClickerMultiplier++;
  }
};
const fastestClickerMultiplierCost = () => {
  return Math.ceil(
    1 *
    Math.pow(
      2,
      state.fastestClickerMultiplier - 1
    )
  );
};
const incrementFastestClickerMultiplier = () => {
  if (state.souls >= fastestClickerMultiplierCost()) {
    state.souls -= fastestClickerMultiplierCost();
    state.fastestClickerMultiplier++;
  }
};
const upgrades: Array<Product> = [
  {
    id: 1,
    name: "Autoclick Multiplier",
    cost: autoClickerMultiplierCost,
    buyFunction: incrementAutoClickMultiplier,
  },
  {
    id: 2,
    name: "Faster Click Multiplier",
    cost: fasterClickerMultiplierCost,
    buyFunction: incrementFasterClickerMultiplier,
  },
  {
    id: 3,
    name: "Fastest Click Multiplier",
    cost: fastestClickerMultiplierCost,
    buyFunction: incrementFastestClickerMultiplier,
  },
];
</script>

<template>
  <div class="about">
    <h1>Soul Upgrades</h1>
    <div>
      <UnitStore :products="upgrades"  />
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
