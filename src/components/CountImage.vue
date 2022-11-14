<script lang="ts">
import { state } from '../services/GameState'

export default {
  data() {
    return {
      state,
    }
  }
}
</script>

<template>
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