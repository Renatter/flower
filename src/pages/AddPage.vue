<template>
  <div class="container pt-[150px] flex justify-center items-center">
    <div>
      <h1 class="text-[30px] text-center mb-4">Жасау</h1>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Сурет</p>
        <input @change="onFileChange" id="dropzone-file" type="file" />
        <button
          v-if="file && !isUploaded"
          class="btn ml-[25px] w-[100%]"
          @click="uploadImage()"
        >
          >
          <span class="button_top">қосу</span>
        </button>
      </div>
      <img
        v-if="!newFlowers.img"
        src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
        class="w-[470px] h-[400px] object-fill rounded-[25px] border-[1px] mt-[15px]"
        alt=""
        srcset=""
      />
      <img
        v-else
        :src="newFlowers.img"
        class="w-[470px] h-[400px] object-fill rounded-[25px] border-[1px] mt-[15px]"
        alt=""
        srcset=""
      />
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Атауы</p>
        <input
          class="w-[100%]"
          type="text"
          placeholder="Введите текст"
          v-model="newFlowers.name"
        />
      </div>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Түсі</p>
        <input
          class="w-[100%]"
          type="color"
          id="head"
          name="head"
          v-model="newFlowers.color"
        />
      </div>
      <div class="input-container mt-[15px] w-[100%]">
        <p class="w-[100px] text-center">Сипаттама</p>
        <textarea
          class="w-[100%] ml-[10px]"
          type="text"
          placeholder="Введите текст"
          v-model="newFlowers.desc"
        />
      </div>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center mr-[1px]">Категория</p>
        <div class="flex flex-wrap gap-[5px]">
          <button
            v-for="i of category"
            class="btn mt-[5px] w-[100%]"
            :class="{ selected: newFlowers.category.includes(i) }"
            @click="toggleCategory(i)"
          >
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
          placeholder="Введите текст"
          v-model="newFlowers.price"
        />
      </div>
      <button class="btn mt-[5px] w-[410px]" @click="save()">
        <span class="button_top"> Сақтау </span>
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
import { db, storage } from "../firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

export default {
  data() {
    return {
      item: {},
      id: this.$route.params.id,
      color: "",
      flower: "",
      isUploaded: false,
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
      ],
      price: "",
      desc: "",
      img: "null",
      file: null,
      imageUrls: [],
      flowerCategory: [],
      newFlowers: {
        color: "",
        name: "",
        category: [],
        price: 0,
        img: "",
      },
    };
  },
  methods: {
    toggleCategory(category) {
      const index = this.newFlowers.category.indexOf(category);
      if (index === -1) {
        this.newFlowers.category.push(category);
      } else {
        this.newFlowers.category.splice(index, 1);
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
      this.newFlowers.img = this.imageUrls[0];
      this.file = null;
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.isUploaded = false;
      console.log(this.file);
    },
    async save() {
      const docRef = await addDoc(collection(db, "flowers"), this.newFlowers);
      alert("Оним косылды");
      console.log("Document written with ID: ", docRef.id);
      this.$router.push("/edit");
    },
  },

  async created() {},
};
</script>

<style lang="scss" scoped>
.input-container {
  max-width: 32em;
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
  width: 110px;

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
.selected .button_top {
  background: #ff0000; /* Новый цвет фона для выбранных категорий */
  color: #ffffff; /* Новый цвет текста для выбранных категорий */
}
</style>
