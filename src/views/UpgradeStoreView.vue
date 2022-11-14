<script setup lang="ts">
import type { Product } from "@/components/UnitStore.vue";
import UnitStore from "@/components/UnitStore.vue";
import { state } from '../services/GameState'

const multiplierCost = () => {
  return Math.ceil(
    50 *
    Math.pow(
      state.multiplierExponent,
      state.multiplier - state.prestigeNumber
    )
  );
};
const incrementMultiplier = () => {
  if (state.count >= multiplierCost()) {
    state.count -= multiplierCost();
    state.multiplier++;
  }
};
const autoClickerMultiplierCost = () => {
  return Math.ceil(
    75 *
    Math.pow(
      1.5,
      state.autoClickerMultiplier - state.prestigeNumber
    )
  );
};
const incrementAutoClickMultiplier = () => {
  if (state.count >= autoClickerMultiplierCost()) {
    state.count -= autoClickerMultiplierCost();
    state.autoClickerMultiplier++;
  }
};
const fasterClickerMultiplierCost = () => {
  return Math.ceil(
    500 *
    Math.pow(
      1.75,
      state.fasterClickerMultiplier - state.prestigeNumber
    )
  );
};
const incrementFasterClickerMultiplier = () => {
  if (state.count >= fasterClickerMultiplierCost()) {
    state.count -= fasterClickerMultiplierCost();
    state.fasterClickerMultiplier++;
  }
};
const fastestClickerMultiplierCost = () => {
  return Math.ceil(
    5000 *
    Math.pow(
      2,
      state.fastestClickerMultiplier - state.prestigeNumber
    )
  );
};
const incrementFastestClickerMultiplier = () => {
  if (state.count >= fastestClickerMultiplierCost()) {
    state.count -= fastestClickerMultiplierCost();
    state.fastestClickerMultiplier++;
  }
};
const upgrades: Array<Product> = [
  {
    id: 1,
    name: "Manual Click Multiplier",
    cost: multiplierCost,
    buyFunction: incrementMultiplier,
  },
  {
    id: 1,
    name: "Auto Click Multiplier",
    cost: autoClickerMultiplierCost,
    buyFunction: incrementAutoClickMultiplier,
  },
  {
    id: 1,
    name: "Faster Click Multiplier",
    cost: fasterClickerMultiplierCost,
    buyFunction: incrementFasterClickerMultiplier,
  },
  {
    id: 1,
    name: "Fastest Click Multiplier",
    cost: fastestClickerMultiplierCost,
    buyFunction: incrementFastestClickerMultiplier,
  },
];

</script>

<template>
  <div class="about">
    <h1>Buy Upgrades</h1>
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
