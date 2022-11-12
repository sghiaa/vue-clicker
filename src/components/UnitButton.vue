<script lang="ts">
export default {
  props:{
    cost: Number,
    name: String,
    buyFunction: () => {},
  },
};
</script>

<template>
    <div>
      <button class="baseButton buyButton" @click="() => buyFunction">
        <span>{{ name }} (cost: {{ cost }})</span>
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
