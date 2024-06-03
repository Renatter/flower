<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-[450px] pt-[30px] text-center">
      <!-- Поле для ввода промокода -->
      <div class="mb-4">
        <label
          for="promo_code"
          class="block mb-2 text-[25px] font-medium text-gray-900 dark:text-white"
          >ПРОМОКОД</label
        >
        <input
          v-model="newProduct.name"
          type="text"
          id="promo_code"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <!-- Поле для ввода скидки -->
      <div class="mb-4">
        <label
          for="discount"
          class="block mb-2 text-[25px] font-medium text-gray-900 dark:text-white"
          >СКИДКА</label
        >
        <input
          v-model="newProduct.discount"
          type="text"
          id="discount"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <!-- Кнопка для добавления промокода -->
      <button
        @click="addPromo"
        type="button"
        class="text-[25px] w-[100%] text-white bg-[#2E91FF] hover:bg-[#2E91FF] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        ПРОМОКОД косу
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
  data() {
    return {
      newProduct: {
        name: "",
        discount: 0,
      },
    };
  },
  methods: {
    async addPromo() {
      const discountValue = parseFloat(this.newProduct.discount);
      const docRef = await addDoc(collection(db, "promo"), {
        name: this.newProduct.name,
        discount: discountValue,
      });
      // Добавление нового промокода в базу данных
    },
  },
};
</script>

<style lang="scss" scoped></style>
