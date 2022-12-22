<script lang="ts">
import { useMainStore } from '@/services/GameState'

export default {
  setup() {
    const main = useMainStore();
    return {
      count: main.count,
    }
  }
}
</script>

<template>
  <div class="countImage">
    <img
      v-if="count <= 1000"
      alt="Water droplet"
      class=""
      src="@/assets/water-droplet.jpg"
      width="125"
      height="125"
      data-test-id="image0"
    />
    <img
      v-if="count > 1000 && count <= 10000"
      alt="Lightning strike"
      class=""
      src="@/assets/lightning-strike.jpg"
      width="125"
      height="125"
      data-test-id="image1000"
    />
    <img
      v-if="count > 10000 && count <= 100000"
      alt="Dandylion"
      class=""
      src="@/assets/dandylion.jpg"
      width="125"
      height="125"
      data-test-id="image10000"
    />
    <img
      v-if="count > 100000"
      alt="Tree"
      class=""
      src="@/assets/tree.jpg"
      width="125"
      height="125"
      data-test-id="image100000"
    />
  </div>
</template>