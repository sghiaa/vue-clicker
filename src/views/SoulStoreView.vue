<script lang="ts">
import type { Product } from "@/components/UnitStore.vue";
import UnitStore from "@/components/UnitStore.vue";
import { useMainStore } from "@/services/GameState";

export default {
  setup() {
    const main = useMainStore();

    const autoClickerMultiplierCost = (amt: number) => {
      return Math.ceil(
        Math.pow(
          1.5,
          amt
        )
      );
    };
    const buyAutoClickMultiplier = () => {
      if (main.souls >= autoClickerMultiplierCost(main.autoClickerMultiplier)) {
        main.spendSouls(autoClickerMultiplierCost(main.autoClickerMultiplier))
        main.autoClickerMultiplier++;
      }
    };
    const fasterClickerMultiplierCost = (amt: number) => {
      return Math.ceil(
        Math.pow(
          1.75,
          amt
        )
      );
    };
    const buyFasterClickerMultiplier = () => {
      if (main.souls >= fasterClickerMultiplierCost(main.autoClickerMultiplier)) {
        main.spendSouls(fasterClickerMultiplierCost(main.autoClickerMultiplier))
        main.autoClickerMultiplier++;
      }
    };
    const fastestClickerMultiplierCost = (amt: number) => {
      return Math.ceil(
        1 *
        Math.pow(
          2,
          amt
        )
      );
    };
    const buyFastestClickerMultiplier = () => {
      if (main.souls >= fastestClickerMultiplierCost(main.fastestClickerMultiplier)) {
        main.spendSouls(fastestClickerMultiplierCost(main.fastestClickerMultiplier))
        main.autoClickerMultiplier++;
      }
    };
    const upgrades: Array<Product> = [
      {
        id: 1,
        name: "Autoclick Multiplier",
        cost: () => autoClickerMultiplierCost(main.autoClickerMultiplier),
        buyFunction: buyAutoClickMultiplier,
      },
      {
        id: 2,
        name: "Faster Click Multiplier",
        cost: () => fasterClickerMultiplierCost(main.fasterClickerMultiplier),
        buyFunction: buyFasterClickerMultiplier,
      },
      {
        id: 3,
        name: "Fastest Click Multiplier",
        cost: () => fastestClickerMultiplierCost(main.fastestClickerMultiplier),
        buyFunction: buyFastestClickerMultiplier,
      },
    ];
    return {
      upgrades: upgrades,
    }
  }
}
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
