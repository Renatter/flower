<template>
  <div class="container pt-[150px] flex justify-center items-center">
    <div>
      <h1 class="text-[30px] text-center mb-4">Өзгерту</h1>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Сурет</p>
        <input @change="onFileChange" id="dropzone-file" type="file" />
        <button
          v-if="file && !uploadSuccessful"
          class="btn ml-[25px] w-[100%]"
          @click="uploadImage"
        >
          <span class="button_top">қосу</span>
        </button>
      </div>
      <img
        :src="item.img"
        class="w-[400px] h-[400px] object-fill rounded-[25px] border-[1px] mt-[15px]"
        alt=""
        srcset=""
      />
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Атауы</p>
        <input
          class="w-[100%]"
          type="text"
          placeholder="Введите текст"
          v-model="item.name"
        />
      </div>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Түсі</p>
        <input
          class="w-[100%]"
          type="color"
          id="head"
          name="head"
          value="#e66465"
          v-model="item.color"
        />
      </div>
      <div class="input-container mt-[15px] w-[100%]">
        <p class="w-[100px] text-center">Сипаттама</p>
        <textarea
          class="w-[100%] ml-[10px]"
          type="text"
          placeholder="Введите текст"
          v-model="item.desc"
        />
      </div>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center mr-[1px]">Санат</p>
        <div class="flex flex-wrap gap-[5px]">
          <button
            v-for="i of category"
            class="btn mt-[5px] w-[100%]"
            :class="{ selected: flowerCategory.includes(i) }"
            @click="toggleCategory(i)"
          >
            <span class="button_top">{{ i }}</span>
          </button>
        </div>
      </div>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Бағасы</p>
        <input
          class="w-[100%]"
          type="text"
          placeholder="Мәтінді енгізіңіз"
          v-model="item.price"
        />
      </div>
      <div class="flex items-center">
        <button class="btn mt-[5px] w-[410px]" :disabled="!file" @click="save">
          <span class="button_top"> Сақтау </span>
        </button>
        <p v-if="!file" class="ml-[15px] text-[#dc2626]">суретті қосыңыз</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  doc,
  updateDoc,
  query,
  where,
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../firebase/firebase";

export default {
  data() {
    return {
      item: {},
      id: this.$route.params.id,
      category: [
        "8 наурыз",
        "үйлену тойы",
        "аналар күні",
        "ГҮЛ ДЕКОРЫ",
        "Қораптағы гүлдер",
        "Үй өсімдіктер",
        "Көктемгі гүлдер",
        "Жазғы гүл шоқтары",
        "Күзгі композициялар",
        "Қысқы  гүлдер",
        "Вазадағы Гүлдер",
        "Валентин күн",
        "Туған күн",
      ],
      price: null,
      desc: "",
      img: "null",
      file: null,
      imageUrls: [],
      flowerCategory: [],
      uploadSuccessful: false,
    };
  },
  methods: {
    toggleCategory(category) {
      const index = this.flowerCategory.indexOf(category);
      if (index === -1) {
        this.flowerCategory.push(category);
      } else {
        this.flowerCategory.splice(index, 1);
      }
    },
    async uploadImage() {
      const storageRef = ref(
        storage,
        `images/${this.item.name}/${this.file.name}`
      );
      await uploadBytes(storageRef, this.file);
      const downloadUrl = await getDownloadURL(storageRef);

      this.imageUrls.push(downloadUrl);
      this.item.img = this.imageUrls[0];
      this.uploadSuccessful = true; // Установка состояния успешной загрузки
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      console.log(this.file);
    },
    async save() {
      const q = query(collection(db, "flowers"), where("name", "==", this.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        await updateDoc(doc.ref, {
          name: this.item.name,
          color: this.item.color,
          price: this.item.price,
          desc: this.item.desc,
          img: this.imageUrls[0],
          category: this.flowerCategory,
        });
      }
      this.$router.push("/edit");
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
        this.flowerCategory = doc.data().category;
        console.log(this.item);
      });
    });
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUser = user.uid;
        const userDocRef = doc(db, "cart", this.currentUser);

        onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            this.cart = doc.data().cart;
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
.input-container {
  max-width: 27em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}

.input-container input {
  border: none;
  outline: none;
  padding: 5px;
  font-size: 16px;
}

.input-container p {
  color: white;
  background-color: black;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.btn {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #ffffff;
  --button_outline_color: #000000;
  width: 90px;
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
  transform: translateY(-0.33em);
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn:active .button_top {
  transform: translateY(0);
}
.selected .button_top {
  background: #ff0000;
  color: #ffffff;
}
</style>
