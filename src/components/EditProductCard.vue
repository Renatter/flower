<template>
  <div
    class="w-[270px] card border-[3px] border-[#020617] p-[15px] rounded-[10px]"
  >
    <router-link :to="{ path: '/flower-page/' + flower.name }">
      <img
        class="h-[220px] w-[270px] rounded-[10px] object-fill"
        :src="flower.img"
        alt=""
      />
    </router-link>
    <div class="text-center">
      <p class="flower-text">{{ flower.name }}</p>
      <p class="price">{{ flower.price }}тг</p>
    </div>
    <div class="flex gap-[15px]">
      <button class="btn mt-[25px]">
        <router-link :to="{ path: '/edit-flower/' + flower.name }">
          <span class="button_top"> Өзгерту </span>
        </router-link>
      </button>
      <button @click="deleteNews(flower.id)" class="btn mt-[25px]">
        <span class="button_top"> Жою </span>
      </button>
    </div>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
export default {
  props: ["flower"],
  methods: {
    async deleteNews(newsId) {
      // Удаление новости из Firestore
      try {
        const docRef = doc(collection(db, "flowers"), newsId);
        await deleteDoc(docRef);
        console.log("Новость успешно удалена:", newsId);
        location.reload();
      } catch (error) {
        console.error("Ошибка при удалении новости:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.price {
  font-weight: bold;
}
.card {
  display: block;
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
  -webkit-box-shadow: 9px 9px 0px -3px rgba(0, 0, 0, 1);
  -moz-box-shadow: 9px 9px 0px -3px rgba(0, 0, 0, 1);
  box-shadow: 9px 9px 0px -3px rgba(0, 0, 0, 1);
}
.card:hover {
  transform: translateY(-0.33em);
}

.btn {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #ffffff;
  --button_outline_color: #000000;
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
</style>
