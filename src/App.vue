<template>
  <div class="">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import HomePage from "./pages/HomePage.vue";
export default {
  components: {
    Header,
    HomePage,
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 15px;
}
</style>
