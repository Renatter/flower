<template>
  <div
    class="w-[350px] card border-[3px] border-[#020617] p-[15px] rounded-[10px] flex justify-between items-start"
  >
    <div>
      <p>Аты: {{ order.userName }} {{ order.userL }}</p>
      <p>Нөмірі: {{ order.phone }}</p>
      <p>Тәсілі: {{ order.sposob === 2 ? "карта" : "колма-кол" }}</p>
      <p>Итого: {{ order.allSum }}тг</p>
    </div>
    <button class="btn1 mt-[5px] w-[410px]" @click="openModal()">
      <span class="button_top"> Көру </span>
    </button>
    <div v-if="modalOpen" class="modal">
      <div class="modal-content w-[400px]">
        <p>Аты: {{ order.userName }} {{ order.userL }}</p>
        <p>Нөмірі: {{ order.phone }}</p>
        <p v-if="order.tip === 'доставка'">Мекен-жайы: {{ order.addres }}</p>
        <p v-if="order.tip === 'самовывоз'">Алатын жерi: Проспект Абая, 57/2</p>
        <p>Тәсілі: {{ order.sposob === 2 ? "карта" : "колма-кол" }}</p>
        <div v-for="i of order.cart" class="mt-[15px]">
          <div class="flex">
            <img class="w-[100px] rounded-[15px]" :src="i.image" alt="" />
            <div class="ml-[10px]">
              <p>Атауы: {{ i.flowerName }}</p>
              <p>Штук: {{ i.quantity }}</p>
              <p>Сомасы: {{ i.totalSum }} тг</p>
            </div>
          </div>
        </div>
        <p>Барлығы: {{ order.allSum }}тг</p>
        <div class="flex">
          <button class="btn1 mt-[5px]" @click="closeModal()">
            <span class="button_top"> Жабу </span>
          </button>
          <button class="btn mt-[5px] ml-[15px]">
            <span class="button_top" @click="deleteItem(order.userName)">
              Жіберу
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
  onSnapshot,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { storage, db, auth } from "../firebase/firebase";
export default {
  props: ["order"],
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    async deleteItem(itemName) {
      const querySnapshot = await getDocs(
        query(collection(db, "cart"), where("userName", "==", itemName))
      );

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  -webkit-box-shadow: 9px 9px 0px -3px rgba(0, 0, 0, 1);
  -moz-box-shadow: 9px 9px 0px -3px rgba(0, 0, 0, 1);
  box-shadow: 9px 9px 0px -3px rgba(0, 0, 0, 1);
}

.btn {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #ffffff;
  --button_outline_color: #0ce13a;
  width: 70%;

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

/* Стили модального окна */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.btn1 {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #ffffff;
  --button_outline_color: #1f2020;
  width: 100px;
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
