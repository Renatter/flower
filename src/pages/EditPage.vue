<template>
  <div class="container pt-[155px]">
    <button class="btn1 mt-[25px] max-w-[150px]">
      <router-link to="/add">
        <span class="button_top"> Қосу </span>
      </router-link>
    </button>
    <button class="btn mt-[25px] ml-[10px] max-w-[150px]">
      <router-link to="/order">
        <span class="button_top"> Тапсырыстар </span>
      </router-link>
    </button>
    <button class="btn mt-[25px] ml-[10px] max-w-[150px]">
      <router-link to="/AddPromo">
        <span class="button_top"> Жарнамалық код </span>
      </router-link>
    </button>
    <div class="flex flex-wrap gap-[35px] pt-[15px]">
      <EditProductCard
        v-for="item in items"
        :flower="item"
        class="flex"
      ></EditProductCard>
    </div>
  </div>
</template>

<script>
import EditProductCard from "../components/EditProductCard.vue";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
export default {
  components: {
    EditProductCard,
  },
  data() {
    return {
      items: [],
    };
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, "flowers"));
    // Заполнение массива новостей
    querySnapshot.forEach((doc) => {
      const Item = {
        id: doc.id,
        ...doc.data(),
      };
      this.items.push(Item);
    });
  },
};
</script>

<style lang="scss" scoped>
.btn {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #ffffff;
  --button_outline_color: #ba1604;
  width: 100%;
  font-size: 10px;
  font-weight: bold;
  border: none;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
}

.button_top {
  display: block;
  box-sizing: border-box;
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  padding: 0.75em 1.5em;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
}

.btn:hover .button_top {
  /* Pull the button upwards when hovered */
  transform: translateY(-0.33em);
}

.btn:active .button_top {
  /* Push the button downwards when pressed */
  transform: translateY(0);
}

.btn1 {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #ffffff;
  --button_outline_color: #04ba5f;
  width: 100%;
  font-size: 10px;
  font-weight: bold;
  border: none;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
}

.button_top {
  display: block;
  box-sizing: border-box;
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  padding: 0.75em 1.5em;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
}

.btn1:hover .button_top {
  /* Pull the button upwards when hovered */
  transform: translateY(-0.33em);
}

.btn1:active .button_top {
  /* Push the button downwards when pressed */
  transform: translateY(0);
}
</style>
