<template>
  <div class="flex justify-between items-center pt-[100px] container">
    <img
      src="https://s1.1zoom.me/big0/164/Bouquets_Roses_White_509278.jpg"
      alt=""
      class="w-[660px]"
    />
    <div>
      <h1 class="text-[80px] text-bold">Сіздің букетіңіз сіз үшін сөйлейді</h1>
      <p class="text-[28px] baner-text">
        Біз сіздің қалауыңыз бойынша жасаймыз
      </p>
    </div>
  </div>
  <div class="best pt-[100px] pb-[25px] container">
    <p class="text-center text-[25px] leader mb-[25px]">САТУ КӨШБАСШЫЛАРЫ</p>
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
      ДҮКЕНДЕРДІҢ ТРЕНДТІК САНАТТАРЫ
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
      <p class="title text-[15px]">ГҮЛ КОМПАНИЯСЫНЫҢ ТАРИХЫ</p>
      <p class="w-[530px] mt-[15px]">
        Әр кезең, әр қарым-қатынас, кез-келген байланыс ерекше мерекені қажет
        етеді. Тек гүлдейтін сәттер мен эмоцияларды, тіпті қазірдің өзінде
        гүлдегендерді де атап өтіңіз. Мұндай сәттер үшін гүл компаниясынан сәнді
        гүл композициялары бар. Көзге эстетикалық тартымды, бұл гүл
        композициялары байланыстың беріктігін көрсетеді, 18 жасар қыздың қызғылт
        күлкісін баса көрсетеді, алыстағы ұлынан хабарлама алған кезде анасының
        бетіндегі қызаруды баса көрсетеді. Бұл гүлдер осы сәтті сұлулыққа,
        сән-салтанатқа және сән-салтанатқа толтырады және тек поэзия жеткізе
        алатын бөлігіңізді оятады.
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
