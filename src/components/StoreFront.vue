<script lang="ts">
import type { Product } from "@/components/UnitStore.vue";
import UnitStore from "@/components/UnitStore.vue";
import { useMainStore } from "@/services/GameState";

export default {
  setup() {
    const main = useMainStore();
    const autoClickerCost = (amt: number) => {
      return Math.ceil(10 * Math.pow(1.05, amt));
    };
    const fasterClickerCost = (amt: number) => {
      return Math.ceil(100 * Math.pow(1.1, amt));
    };
    const fastestClickerCost = (amt: number) => {
      return Math.ceil(1000 * Math.pow(1.15, amt));
    };

    const buyAutoClicker = () => {
      if(main.count >= autoClickerCost(main.autoClicker)) {
        main.spendCount(autoClickerCost(main.autoClicker));
        main.incrementAutoClicker(1);
      }
    };
    const buyFasterClicker = () => {
      if(main.count >= fasterClickerCost(main.fasterClicker)) {
        main.spendCount(fasterClickerCost(main.fasterClicker));
        main.incrementFasterClicker(1);
      }
    };
    const buyFastestClicker = () => {
      if(main.count >= fastestClickerCost(main.fastestClicker)) {
        main.spendCount(fastestClickerCost(main.fastestClicker));
        main.incrementFastestClicker(1);
      }
    };
    const clickers: Array<Product> = [
      {
        id: 1,
        name: "Auto Clicker",
        cost: () => autoClickerCost(main.autoClicker),
        buyFunction: buyAutoClicker,
      },
      {
        id: 2,
        name: "Faster Clicker",
        cost: () => fasterClickerCost(main.fasterClicker),
        buyFunction: buyFasterClicker,
      },
      {
        id: 3,
        name: "Fastest Clicker",
        cost: () => fastestClickerCost(main.fastestClicker),
        buyFunction: buyFastestClicker,
      },
    ]

    return {
      buyAutoClicker,
      buyFasterClicker,
      buyFastestClicker,
      clickers: clickers,
    };
  },
  components: {
    UnitStore
  }
};

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
