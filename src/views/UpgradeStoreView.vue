<script lang="ts">
import type { Product } from "@/components/UnitStore.vue";
import UnitStore from "@/components/UnitStore.vue";
import { useMainStore } from "@/services/GameState";

export default {
  setup() {
    const main = useMainStore();
    const multiplierCost = () => {
      return Math.ceil(
        50 *
        Math.pow(
          main.multiplierExponent,
          main.multiplier - main.prestigeNumber
        )
      );
    };
    const incrementMultiplier = () => {
      if (main.count >= multiplierCost()) {
        main.spendCount(multiplierCost())
        main.incrementMultiplier(1)
      }
    };
    const autoClickerMultiplierCost = () => {
      return Math.ceil(
        75 *
        Math.pow(
          1.5,
          main.autoClickerMultiplier - main.prestigeNumber
        )
      );
    };
    const upgrades: Array<Product> = [
      {
        id: 1,
        name: "Manual Click Multiplier",
        cost: multiplierCost,
        buyFunction: incrementMultiplier,
      },
    ];

    return {
      upgrades
    }
  },
  components: {
    UnitStore
  }
}


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
