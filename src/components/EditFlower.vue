<template>
  <div class="container pt-[150px] flex justify-center items-center">
    <div>
      <h1 class="text-[30px] text-center mb-4">Изменить</h1>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Картинка</p>
        <input @change="onFileChange" id="dropzone-file" type="file" />
        <button
          v-if="file"
          class="btn ml-[25px] w-[100%]"
          @click="uploadImage()"
        >
          >
          <span class="button_top">добавить</span>
        </button>
      </div>
      <img
        :src="item.img"
        class="w-[400px] h-[400px] object-fill rounded-[25px] border-[1px] mt-[15px]"
        alt=""
        srcset=""
      />
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Название</p>
        <input
          class="w-[100%]"
          type="text"
          placeholder="Введите текст"
          v-model="item.name"
        />
      </div>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Цвет</p>
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
        <p class="w-[100px] text-center">Описание</p>
        <textarea
          class="w-[100%] ml-[10px]"
          type="text"
          placeholder="Введите текст"
          v-model="item.desc"
        />
      </div>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center mr-[1px]">Категория</p>
        <div class="flex flex-wrap gap-[5px]">
          <button
            v-for="i of category"
            class="btn mt-[5px] w-[100%]"
            :class="{ selected: flowerCategory.includes(i) }"
            @click="toggleCategory(i)"
          >
            >
            <span class="button_top">{{ i }}</span>
          </button>
        </div>
      </div>
      <div class="input-container mt-[15px]">
        <p class="w-[100px] text-center">Цена</p>
        <input
          class="w-[100%]"
          type="text"
          placeholder="Введите текст"
          v-model="item.price"
        />
      </div>
      <div class="flex items-center">
        <button
          class="btn mt-[5px] w-[410px]"
          :disabled="!file"
          @click="save()"
        >
          <span class="button_top"> Сохранить </span>
        </button>
        <p v-if="!file" class="ml-[15px] text-[#dc2626]">добавьте картинку</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
  collection,
  onSnapshot,
  getDocs,
  getDocsFromServer,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

import { db, auth, storage } from "../firebase/firebase";
export default {
  data() {
    return {
      item: {},
      id: this.$route.params.id,
      color: "null",
      flower: "null",
      category: [
        "Вазадағы Гүлдер",
        "свадьба",
        "день матери",
        "ЦВЕТОЧНЫЙ ДЕКОР",
        "Декоративные цветы",
        "Комнатные растения",
        "Весенние цветы",
        "Летние букеты",
        "Осенние композиции",
        "Зимние аранжировки",
        "8 марта",
        "день валентина",
      ],
      price: null,
      desc: "",
      img: "null",
      file: null,
      imageUrls: [],
      flowerCategory: [],
    };
  },
  methods: {
    toggleCategory(category) {
      const index = this.flowerCategory.indexOf(category);
      if (index === -1) {
        // Категория не найдена в массиве, добавляем ее
        this.flowerCategory.push(category);
      } else {
        // Категория найдена в массиве, удаляем ее
        this.flowerCategory.splice(index, 1);
      }
      // Здесь вы можете выполнить обновление базы данных, добавив или удалив категорию
      // Например, выполните соответствующие операции с Firebase Firestore
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
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      console.log(this.file);
    },
    async save() {
      const q = query(collection(db, "flowers"), where("name", "==", this.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; // Берем первый документ из результатов запроса
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
  /* Pull the button upwards when hovered */
  transform: translateY(-0.33em);
}
.btn:disabled {
  opacity: 0.5; /* Уменьшаем прозрачность */
  cursor: not-allowed; /* Меняем курсор на неактивный */
  /* Можно также изменить цвет фона или текста, чтобы показать, что кнопка неактивна */
  /* background-color: #cccccc; */
  /* color: #666666; */
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
