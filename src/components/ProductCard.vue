<template>
  <div
    class="w-[270px] card border-[3px] border-[#020617] p-[15px] rounded-[10px]"
  >
    <router-link :to="{ path: '/flower-page/' + flower.name }">
      <img class="h-[240px] w-[270px]" :src="flower.img" alt="" />
    </router-link>
    <div class="text-center">
      <p class="flower-text">{{ flower.name }}</p>
      <p class="price">{{ flower.price }}тг</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["flower"],
};
</script>

<style lang="scss" scoped>
.price {
  font-weight: bold;
}
.card {
  display: block;
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
  -webkit-box-shadow: 9px 9px 0px -3px rgba(0, 0, 0, 1);
  -moz-box-shadow: 9px 9px 0px -3px rgba(0, 0, 0, 1);
  box-shadow: 9px 9px 0px -3px rgba(0, 0, 0, 1);
}
.card:hover {
  transform: scale(1.1);
}
</style>
