<template>
  <div class="container pt-[150px]">
    <h1 class="font-bold text-[25px]">Тапсырыстар</h1>
    <OrderCard v-for="i of item" :order="i"></OrderCard>
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
import OrderCard from "../components/OrderCard.vue";
export default {
  components: {
    OrderCard,
  },
  data() {
    return {
      item: [],
    };
  },
  async created() {
    const pizzaQuery = query(
      collection(db, "cart"),
      where("order", "==", true)
    );
    onSnapshot(pizzaQuery, (querySnapshot) => {
      this.item = [];
      querySnapshot.forEach((doc) => {
        this.item.push(doc.data());
      });
    });
  },
};
</script>

<style lang="scss" scoped></style>
