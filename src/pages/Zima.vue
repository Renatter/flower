<template>
  <div class="container pt-[150px]">
    <p class="text-center text-[25px] leader mb-[25px]">Зима</p>
    <div class="flex gap-[35px]">
      <ProductCard
        v-for="item in items"
        :flower="item"
        :key="item.id"
      ></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    const flowersQuery = query(
      collection(db, "flowers"),
      where("category", "array-contains", "Зимние аранжировки")
    );

    onSnapshot(flowersQuery, (querySnapshot) => {
      this.items = [];
      querySnapshot.forEach((doc) => {
        this.items.push({ id: doc.id, ...doc.data() });
      });
    });
  },
};
</script>

<style lang="scss" scoped></style>
