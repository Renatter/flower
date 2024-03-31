<template>
  <div class="flex justify-between items-center pt-[100px] container">
    <img src="../assets/sunflower-1188753.webp" alt="" class="w-[760px]" />
    <div>
      <h1 class="text-[80px] text-bold">Твой букет говорит за тебя</h1>
      <p class="text-[28px] baner-text">Создаем по вашим пожеланиям</p>
    </div>
  </div>
  <div class="best pt-[100px] pb-[25px] container">
    <p class="text-center text-[25px] leader mb-[25px]">ЛИДЕРЫ ПРОДАЖ</p>
    <div class="flex justify-between">
      <swiper
        class="pt-[15px] h-[400px]"
        :slides-per-view="4"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="item in items">
          <ProductCard :flower="item"></ProductCard
        ></swiper-slide>
      </swiper>
    </div>
  </div>
  <img src="../assets/LEAD_BANNER_DESKTOP_1.jpg" alt="" />
  <div class="best pt-[100px] pb-[25px] container">
    <p class="text-center text-[25px] leader mb-[25px]">
      ТРЕНДОВЫЕ КАТЕГОРИИ МАГАЗИНОВ
    </p>

    <div class="flex justify-between">
      <swiper
        class="pt-[55px] h-[400px]"
        :slides-per-view="4"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="item in items">
          <ProductCard :flower="item"></ProductCard
        ></swiper-slide>
      </swiper>
    </div>
  </div>
  <img src="../assets/SECTION_FOUR_BLOCK_DESKTOP-min.jpeg" alt="" />
  <div class="container flex items-center pl-[55px] py-[55px]">
    <img cla class="w-[500px] h-[400px]" src="../assets/banner1.jpg" alt="" />
    <div class="ml-[35px]">
      <p class="title text-[15px]">ИСТОРИЯ ЦВЕТОЧНОЙ КОМПАНИИ</p>
      <p class="w-[530px] mt-[15px]">
        Каждая веха, каждые отношения, любая связь требует уникального
        празднования. Отмечайте моменты и эмоции, которые только расцветают,
        даже те, которые уже расцвели. Для таких моментов существуют роскошные
        цветочные композиции от Цветочной компании. Эстетически привлекательные
        для глаз, эти цветочные композиции подчеркивают силу связи, подчеркивают
        розовую улыбку 18-летней девушки, подчеркивают румянец на лице матери,
        когда она получает сообщение от своего далекого сына. Эти цветы
        наполняют этот момент красотой, роскошью и щегольством и пробуждают ту
        часть вас, которую может передать только поэзия.
      </p>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard.vue";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
export default {
  components: {
    ProductCard,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      onSwiper: null,
      onSlideChange: null,
      items: [],
    };
  },
  mounted() {
    this.onSwiper = (swiper) => {
      console.log(swiper);
    };
    this.onSlideChange = () => {
      console.log("slide change");
    };
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, "flowers"));
    // Заполнение массива новостей
    querySnapshot.forEach((doc) => {
      const Item = {
        id: doc.id,
        ...doc.data(),
      };
      this.items.push(Item);
    });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  line-height: 72px;
}
.baner-text {
  padding-top: 30px;
  color: red;
}
.leader {
  font-weight: 500;
}
.container img {
  background-repeat: no-repeat;
  background-size: cover;
}
.title {
  font-weight: bold;
}
</style>
