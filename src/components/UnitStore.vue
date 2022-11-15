<script lang="ts">
import UnitButton from "./UnitButton.vue";
export interface Product {
  id: number,
  cost: () => number,
  name: string,
  buyFunction: () => void,
}
export default {
  props: {
    // storeName: String,
    products: Array<Product>,
  },
  components: {
    UnitButton,
  },
};
</script>

<template>
  <div>
    <div v-for="product in products" :key="product.id">
      <UnitButton :name="product.name" :cost="product.cost()" :data-test-id="product.name"
        @click="product.buyFunction" />
    </div>
  </div>
</template>

<style scoped>

</style>
