<script lang="ts">
import { formatNumber } from '../services/Helpers'
export default {
  props:{
    cost: Number,
    name: String,
    buyFunction: () => {},
  },
  methods: {
    format(n: number | undefined) {
      if(n === undefined) {
        return "undefined"
      }
      return formatNumber(n);
    }
  }
};
</script>

<template>
    <div>
      <button class="baseButton buyButton" @click="() => buyFunction">
        <span>{{ name }} (cost: {{ format(cost) }})</span>
      </button>
    </div>
</template>

<style scoped>
.baseButton {
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 0.5rem;
  min-width: 15rem;
}

.buyButton {
  background-color: #6ff36d;
}
</style>
