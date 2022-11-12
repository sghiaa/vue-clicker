<script setup lang="ts">
import type UnitStore from "@/components/UnitStore.vue";
</script>

<template>
  <div class="about">
    <h1>Buy Clickers</h1>
    <div>
      <UnitStore />
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
