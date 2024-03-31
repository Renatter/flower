<template>
  <div class="container">
    <div class="text-center">
      <div class="flex justify-between items-center">
        <router-link to="/">
          <img src="../assets/logo.webp" alt="" class="w-[100px]" />
        </router-link>
        <p>ЦВЕТОЧНАЯ КОМПАНИЯ</p>
        <div class="flex justify-between">
          <router-link to="/basket">
            <img class="mr-[10px]" src="../assets/basket.png" alt="" />
          </router-link>
          <router-link to="/edit">
            <img
              v-if="isAdmin"
              src="../assets/edit.png"
              alt=""
              class="mr-[15px]"
            />
          </router-link>
          <router-link v-if="!isAuthenticated" to="/login">
            <button>LOGIN</button>
          </router-link>
          <button @click="logout" v-if="isAuthenticated">Выход</button>
        </div>
      </div>
      <nav>
        <ul class="flex justify-between">
          <li
            v-for="(menu, index) in menus"
            :key="index"
            @mouseenter="showSubMenu(menu)"
          >
            <router-link :to="menu.routerLink">
              <a href="">{{ menu.title }}</a>
            </router-link>
            <div v-if="menu.showSubMenu === true">
              <ul class="dropdown-menu border-[1px]">
                <li
                  v-for="(subMenu, subIndex) in menu.subMenus"
                  :key="subIndex"
                  class="text-left p-[15px] li w-[210px]"
                >
                  <router-link :to="subMenu.routerLink">
                    <a>{{ subMenu.title }}</a>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
export default {
  data() {
    return {
      isAuthenticated: false,
      isAdmin: false,
      menus: [
        {
          title: "МАГАЗИН ПО КОЛЛЕКЦИЯМ",
          routerLink: "/category",
          showSubMenu: false,
          subMenus: [
            { title: "Цветы в Коробке", routerLink: "/flowerInbox" },
            { title: "Вазадағы Гүлдер", routerLink: "/flowervase" },
          ],
        },
        {
          title: "ВСЕ ТОВАРЫ",
          routerLink: "/category",
        },
        {
          title: "ДЕЛАЙТЕ ПОКУПКИ ПО ПОВОДАМ",
          routerLink: "/category",
          showSubMenu: false,
          subMenus: [
            { title: "8 марта", routerLink: "/Mart" },
            { title: "День валентина", routerLink: "/Valentina" },
            { title: "День матери", routerLink: "/Mama" },
          ],
        },
        {
          title: "Комнатные растения",
          routerLink: "/Comnata",
          // No subMenus property for this menu
        },
        {
          title: "СЕЗОН",
          routerLink: "/category",
          showSubMenu: false,
          subMenus: [
            { title: "ОСЕНЬ", routerLink: "/Osen" },
            { title: "ЗИМА", routerLink: "/zima" },
            { title: "ЛЕТО", routerLink: "/Leto" },
            { title: "Весна", routerLink: "/Vesna" },
          ],
        },
      ],
    };
  },
  methods: {
    showSubMenu(menu) {
      this.menus.forEach((item) => {
        if (item.title === menu.title) {
          item.showSubMenu = true;
        } else {
          item.showSubMenu = false;
        }
      });
    },
    logout() {
      auth.signOut();
      this.isAuthenticated = false;
      this.$router.push("/");
    },
  },
  async created() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.isAuthenticated = true;
        const docRef = doc(db, "userProfile", user.uid);
        const unsubscribeCart = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            this.isAdmin = docSnap.data().isAdmin;
            console.log(this.isAdmin);
          } else {
            console.log("No such document!");
          }
        });

        // Save the unsubscribe functions to be used when the component is destroyed
        this.unsubscribeCart = unsubscribeCart;
      }
    });
  },
  destroyed() {
    // Unsubscribe from the snapshots to avoid memory leaks
    if (this.unsubscribeCart) {
      this.unsubscribeCart();
    }
    if (this.unsubscribeProfile) {
      this.unsubscribeProfile();
    }
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  /* Add styles for the dropdown menu here */
  display: none;
  position: absolute;
  /* Add additional styling as needed */
}

li:hover .dropdown-menu {
  display: block;
}
.li:hover {
  transition: all 1.3s;
  border-bottom: 1px solid black;
}
</style>
