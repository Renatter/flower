<template>
  <div style="max-width: 950px; margin: 0 auto" class="pt-[155px]">
    <div
      v-if="items === null || (items && items.length < 1)"
      class="text-center"
    >
      <img
        class="pl-[200px]"
        src="../assets/free-icon-box-4076503.png"
        alt=""
      />
    </div>
    <div v-else-if="order === true">
      <h1 class="font-bold text-center text-[30px]">ОЖИДАЙТЕ ЗАКАЗА</h1>
      <button class="btn mt-[25px] max-w-[400px] ml-[270px]">
        <span class="button_top" @click="cancelOrder()"> Отменить? </span>
      </button>
      <img class="pl-[200px]" src="../assets/clock.png" alt="" />
    </div>
    <div v-else>
      <div class="relative overflow-x-auto">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Product name</th>
              <th scope="col" class="px-6 py-3">Color</th>
              <th scope="col" class="px-6 py-3">Количество</th>
              <th scope="col" class="px-6 py-3">Price</th>
              <th scope="col" class="px-6 py-3">Удалить</th>
            </tr>
          </thead>
          <tbody v-for="item in items">
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ item.flowerName }}
                <img class="w-[70px] rounded-[10px]" :src="item.image" alt="" />
              </th>
              <td class="px-6 py-4">
                {{ item.color }}
              </td>
              <td class="px-6 py-4">{{ item.quantity }}шт</td>
              <td class="px-6 py-4">{{ item.totalSum }}тг</td>
              <td>
                <button
                  @click="deleteItem(item)"
                  type="button"
                  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn mt-[25px]">
        <span class="button_top" @click="openModal()">
          Купить {{ fullSum }}тг
        </span>
      </button>
    </div>
  </div>
  <div
    v-if="isModalOpen"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-8 rounded-lg w-[500px]">
      <h2 class="text-2xl font-bold mb-4">Подтвердите покупку</h2>
      <div class="flex">
        <div class="mr-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Имя</label
          >
          <input
            type="email"
            v-model="userName"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Фамилия</label
          >
          <input
            v-model="userLastName"
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Адрес</label
        >
        <input
          v-model="addres"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <label
        for="phone-input"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Номер:</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 19 18"
          >
            <path
              d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"
            />
          </svg>
        </div>
        <input
          v-model="phone"
          type="text"
          id="phone-input"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="777-777-77-77"
          required
        />
      </div>

      <p class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Способ оплаты
      </p>
      <button
        @click="isTake = 1"
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Наличными
      </button>
      <button
        @click="isTake = 2"
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Карта
      </button>
      <div class="lg:col-span-2 max-lg:order-1" v-if="isTake === 2">
        <form class="mt-12 max-w-lg">
          <div class="grid gap-6">
            <input
              type="text"
              placeholder="Имя и Фамилия"
              class="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none"
            />
            <div
              class="flex bg-gray-100 border rounded-md focus-within:border-purple-500 overflow-hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 ml-3"
                viewBox="0 0 32 20"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="10"
                  fill="#f93232"
                  data-original="#f93232"
                />
                <path
                  fill="#fed049"
                  d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                  class="hovered-path"
                  data-original="#fed049"
                />
              </svg>
              <input
                type="number"
                placeholder="Card Number"
                class="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm outline-none"
              />
            </div>
            <div class="grid grid-cols-2 gap-6">
              <input
                type="number"
                placeholder="Data"
                class="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none"
              />
              <input
                type="number"
                placeholder="CVV"
                class="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-4"
        >
          Отмена
        </button>
        <button
          @click="addInfo()"
          class="px-4 py-2 bg-black text-white rounded-md"
        >
          Подтвердить
        </button>
      </div>
    </div>
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
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
export default {
  data() {
    return {
      items: null,
      currentUser: null,
      fullSum: 0,
      isModalOpen: false,
      isTake: 1,
      userName: "",
      userLastName: "",
      addres: "",
      phone: 0,
      order: null,
    };
  },
  methods: {
    async addInfo() {
      if (this.currentUser) {
        const docRef = doc(db, "cart", `${this.currentUser.uid}`);
        await updateDoc(docRef, {
          userName: this.userName,
          userL: this.userLastName,
          addres: this.addres,
          phone: this.phone,
          sposob: this.isTake,
          order: true,
          allSum: this.fullSum,
        });
      }
      this.closeModal();
    },
    async cancelOrder() {
      if (this.currentUser) {
        const docRef = doc(db, "cart", `${this.currentUser.uid}`);
        await updateDoc(docRef, {
          order: false,
        });
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    updateTotalSum() {
      if (this.items) {
        this.fullSum = this.items.reduce((sum, item) => sum + item.totalSum, 0);
      }
    },
    async deleteItem(item) {
      try {
        const cartDocRef = doc(db, "cart", this.currentUser.uid);

        // Get the current cart data
        const cartDoc = await getDoc(cartDocRef);
        const currentCart = cartDoc.exists() ? cartDoc.data().cart : [];

        // Find the index of the item to be deleted in the current cart
        const index = currentCart.findIndex(
          (cartItem) => cartItem.id === item.id
        );

        if (index !== -1) {
          // Remove the item from the current cart array
          currentCart.splice(index, 1);

          // Update the cart document with the modified cart array
          await updateDoc(cartDocRef, { cart: currentCart });
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
      this.updateTotalSum();
    },
  },

  async created() {
    // Проверка аутентификации пользователя
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUser = user;
        const docRef = doc(db, "cart", this.currentUser.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            this.items = docSnap.data().cart;
            this.order = docSnap.data().order;
            this.updateTotalSum();
          } else {
            console.log("No such document!");
          }
        });

        this.unsubscribe = unsubscribe;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
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
</style>
