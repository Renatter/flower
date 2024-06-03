<template>
  <div class="container pt-[150px] pb-[45px]">
    <div class="flex justify-between">
      <div class="min-w-[220px] max-w-[220px] h-[200px]">
        <div class=".div">
          <button class="btn mb-[5px] w-[410px]" @click="restore()">
            <span class="button_top"> Қайтару </span>
          </button>
          <details>
            <summary>Категория</summary>
            <div class="pt-[10px]">
              <div
                class="flex items-center mb-4"
                v-for="category in categories"
                :key="category"
              >
                <input
                  :id="'category-radio-' + category"
                  type="radio"
                  :value="category"
                  name="category"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  @change="filterByCategory(category)"
                />
                <label
                  :for="'category-radio-' + category"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >{{ category }}</label
                >
              </div>
            </div>
          </details>
        </div>
        <div class=".div">
          <details>
            <summary>Түстер</summary>
            <div class="flex flex-wrap">
              <div
                v-for="i in colors"
                :style="{ 'background-color': i }"
                class="w-[20px] ml-[10px] mt-[5px] h-[20px] rounded-full flex items-center justify-center"
                @click="filterByColor(i)"
              ></div>
            </div>
          </details>
        </div>
        <div class=".div">
          <details>
            <summary>Бағасы</summary>
            <div class="flex">
              <button @click="sortAscending" class="btn mt-[25px]">
                <span class="button_top"> Өсу бойынша </span>
              </button>
              <button @click="sortDescending" class="btn ml-[5px] mt-[25px]">
                <span class="button_top"> Кему бойынша </span>
              </button>
            </div>
          </details>
        </div>
      </div>
      <div class="pl-[35px]">
        <div class="flex flex-wrap gap-[30px]">
          <ProductCard
            v-for="flower in filteredFlowers"
            :flower="flower"
          ></ProductCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import ProductCard from "../components/ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      flowers: [],
      filteredFlowers: [],
      categories: [
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
      colors: [],
    };
  },
  async created() {
    // Загрузить цветы из базы данных Firebase
    const querySnapshot = await getDocs(collection(db, "flowers"));
    querySnapshot.forEach((doc) => {
      this.flowers.push(doc.data());
      this.colors.push(doc.data().color);
    });
    this.filteredFlowers = this.flowers;
  },
  methods: {
    async restore() {
      this.filteredFlowers = this.flowers;
    },

    filterByCategory(category) {
      // Фильтрация цветов по выбранной категории
      this.filteredFlowers = this.flowers.filter((flower) =>
        flower.category.includes(category)
      );
    },
    filterByColor(selectedColor) {
      // Фильтрация цветов по выбранному цвету
      this.filteredFlowers = this.flowers.filter(
        (flower) => flower.color === selectedColor
      );
    },
    sortAscending() {
      this.filteredFlowers.sort((a, b) => a.price - b.price);
    },

    // Сортировка массива обуви по убыванию цены
    sortDescending() {
      this.filteredFlowers.sort((a, b) => b.price - a.price);
    },
  },
};
</script>
<style lang="scss" scoped>
.div {
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
}

details + details {
  margin-top: 0.5rem;
}

summary {
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary {
  border: 2px solid #000;
  padding: 0.75em 1em;
  cursor: pointer;
  position: relative;
  padding-left: calc(1.75rem + 0.75rem + 0.75rem);
}

summary:before {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.75rem;
  content: "↓";
  width: 1.75rem;
  height: 1.75rem;
  background-color: #000;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

details[open] summary {
  background-color: #eee;
}

details[open] summary:before {
  content: "↑";
}

summary:hover {
  background-color: #eee;
}

a {
  color: inherit;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 1px 0 0;
}

a:hover {
  box-shadow: 0 3px 0 0;
}

code {
  font-family: monospace;
  font-weight: 600;
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
