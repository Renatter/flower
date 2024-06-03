<template>
  <div>
    <main class="container pt-[150px]">
      <div class="flower-content flex justify-evenly pt-[40px]">
        <img
          :src="item.img"
          alt=""
          class="w-[400px] h-[400px] rounded-[25px]"
        />
        <div class="block w-[400px]">
          <h1 class="text-[20px] font-[500]">{{ item.name }}</h1>
          <p class="text-[#6a6a6a] mt-[15px] mb-[15px]">
            Бағасы: {{ item.price }}тг
          </p>
          <div class="text-[#6a6a6a] mt-[15px] mb-[15px]">
            Катгеория:
            <span class="text-black" v-for="i in item.category">
              {{ i }},
            </span>
          </div>
          <div class="text-[#6a6a6a] mt-[15px] mb-[15px]">
            Түсі:
            <div
              :style="{ 'background-color': item.color }"
              class="w-[20px] h-[20px] rounded-full flex items-center justify-center"
            ></div>
          </div>
          шт:
          <div
            class="bg-white border border-gray-200 rounded-lg dark:bg-slate-700 dark:border-gray-700"
            data-hs-input-number
          >
            <div class="w-full flex justify-between items-center gap-x-1">
              <div class="grow py-2 px-3">
                <input
                  class="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
                  type="text"
                  v-model="quantity"
                />
              </div>
              <div
                class="flex items-center -gap-y-px divide-x divide-gray-200 border-s border-gray-200 dark:divide-gray-700 dark:border-gray-700"
              >
                <button
                  type="button"
                  class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-input-number-decrement
                  @click="decrement"
                >
                  <svg
                    class="flex-shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <button
                  type="button"
                  class="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-input-number-increment
                  @click="increment"
                >
                  <svg
                    class="flex-shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button class="btn mt-[25px]" v-if="currentUser === null">
            <span class="button_top"> Акаунтка кіріңіз </span>
          </button>
          <button class="btn mt-[25px]" v-else>
            <span class="button_top" @click="addToCart()">
              Сатып алу {{ totalPrice }}тг
            </span>
          </button>
          <p class="pt-[20px]">Сипаттама:</p>
          <p class="">{{ item.desc }}</p>
          <div class="flex justify-between">
            <h1 class="font-[500] text-[25px] pt-[25px]">Пікір</h1>
            <button
              v-if="currentUser"
              class="btn1 mt-[25px]"
              @click="showReviewModal = true"
            >
              <span class="button_top"> Пікір қосу </span>
            </button>
          </div>
          <div
            v-for="i of item.reviews"
            class="border-[1px] w-[200px] rounded-[10px] p-[5px] border-[#1F2937]"
          >
            <p>Почта: {{ i.name }}</p>
            Пікір: {{ i.review }}
          </div>
        </div>
      </div>
      <div
        class="dialog"
        v-if="showReviewModal"
        @close="showReviewModal = false"
      >
        <div class="dialog" v-if="showReviewModal">
          <form @submit.prevent="addOtzv">
            <h2 class="font-bold text-[25px]">Пікір қосу</h2>
            <div>
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Почта</label
              >
              <input
                :disabled="true"
                type="text"
                id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                v-model="userProfile.email"
              />
            </div>
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Пікір</label
              >
              <textarea
                id="message"
                rows="4"
                v-model="reviewComment"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
            <button class="btn mt-[25px]" type="submit">
              <span class="button_top">жіберу </span>
            </button>
            <button class="btn mt-[25px]" @click="showReviewModal = false">
              <span class="button_top">Бас тарту </span>
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

import { db, auth } from "../firebase/firebase";
export default {
  data() {
    return {
      id: this.$route.params.id,
      item: {},
      quantity: 1,
      currentUser: null,
      showReviewModal: false,
      reviewName: "",
      reviewComment: "",
    };
  },
  computed: {
    totalPrice() {
      return this.item.price * this.quantity; // Вычисляем общую цену
    },
  },
  methods: {
    async addOtzv() {
      if (!this.userProfile || !this.userProfile.email) {
        alert("Пользователь не авторизован или нет email");
        return;
      }

      if (!this.reviewComment) {
        alert("Отзыв не может быть пустым");
        return;
      }

      const newReview = {
        name: this.userProfile.email,
        review: this.reviewComment,
      };

      try {
        const q = query(
          collection(db, "flowers"),
          where("name", "==", this.id)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("Продукт не найден");
          return;
        }

        const doc = querySnapshot.docs[0]; // Берем первый документ из результатов запроса
        const docData = doc.data();

        // Инициализируем reviews, если он не существует
        const reviews = docData.reviews || [];

        // Проверяем, существует ли отзыв от этого пользователя
        const existingReview = reviews.find(
          (review) => review.name === this.userProfile.email
        );

        if (existingReview) {
          alert("Вы уже добавили отзыв");
          return;
        }

        await updateDoc(doc.ref, {
          reviews: arrayUnion(newReview), // Добавляем новый отзыв в массив существующих отзывов
        });
        console.log("Отзыв успешно добавлен");
        this.showReviewModal = false;
      } catch (error) {
        console.error("Ошибка при добавлении отзыва:", error);
      }
    },
    async addToCart() {
      if (this.currentUser) {
        const docRef = doc(db, "cart", `${this.currentUser}`);

        const newCartItem = {
          flowerName: this.item.name,
          image: this.item.img,
          desc: this.item.desc,
          price: this.item.price,
          color: this.item.color,
          quantity: this.quantity,
          totalSum: this.totalPrice,
          userProfile: null,
        };

        try {
          const docSnap = await getDoc(docRef);
          let updatedCart = [];

          if (docSnap.exists()) {
            const existingCart = docSnap.data().cart || [];

            // Check if the item already exists in the cart
            const itemExists = existingCart.some(
              (item) => item.flowerName === newCartItem.flowerName
            );

            if (itemExists) {
              // Item already exists, show a message or handle it as needed
              alert("Ондай өнім себетте бар");
              return;
            }

            updatedCart = [...existingCart, newCartItem];
          } else {
            updatedCart = [newCartItem];
          }

          const updatedCartData = {
            order: false,
            cart: updatedCart,
          };

          await setDoc(docRef, updatedCartData);

          console.log("Өнім қосылды", newCartItem);
        } catch (error) {
          console.error("Ошибка при добавлении товара в корзину:", error);
          // Обработка ошибок по мере необходимости
        }
      }
      alert("Өнім қосылды");
    },
    decrement() {
      if (this.quantity > 1) {
        this.quantity--; // Уменьшаем значение quantity на 1 при клике на кнопку декремента
      }
    },
    increment() {
      this.quantity++; // Увеличиваем значение quantity на 1 при клике на кнопку инкремента
    },
  },
  async created() {
    const pizzaQuery = query(
      collection(db, "flowers"),
      where("name", "==", this.id)
    );
    onSnapshot(pizzaQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.item = doc.data();
        console.log(this.item);
      });
    });
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUser = user.uid;
        const userDocRef = doc(db, "userProfile", this.currentUser);

        onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            this.userProfile = doc.data();
          } else {
            console.log("Документ не существует!");
          }
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Тень */
  z-index: 1000;
}
.btn {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #ffffff;
  --button_outline_color: #000000;
  width: 100%;
  font-size: 17px;
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
  --button_outline_color: #10e129;
  width: 150px;
  font-size: 12px;
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
