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
const clickers: Array<Product> = [
  {
    id: 1,
    name: "Multiplier",
    cost: multiplierCost,
    buyFunction: incrementMultiplier,
  },
];

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
