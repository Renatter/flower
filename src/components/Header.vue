<template>
  <div class="container">
    <div class="text-center">
      <div class="flex justify-between items-center">
        <router-link to="/">
          <img
            src="../assets/Без имени.webp"
            alt=""
            class="w-[50px] pt-[20px]"
          />
        </router-link>
        <p class="text-[30px] font-bold text-[#d133d1]">AD flowers</p>
        <div class="flex justify-between items-center">
          <router-link to="/basket" v-if="isAuthenticated">
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
            <button>Кiру</button>
          </router-link>

          <button @click="logout" v-if="isAuthenticated">Шығу</button>

          <a
            class="text-[green] font-bold ml-[30px] text-[20px]"
            href="https://api.whatsapp.com/send?phone=87478421263"
          >
            <img width="50px" src="../assets/icons8-whatsapp.gif" alt=""
          /></a>
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
              <ul class="dropdown-menu border-[1px] z-[900000]">
                <li
                  v-for="(subMenu, subIndex) in menu.subMenus"
                  :key="subIndex"
                  class="text-left p-[5px] li w-[210px] bg-[white]"
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
          title: "БАРЛЫҚ ТАУАРЛАР",
          routerLink: "/category",
        },
        {
          title: "Маусым",
          routerLink: "/category",
          showSubMenu: false,
          subMenus: [
            { title: "Қыс", routerLink: "/zima" },
            { title: "Көктем", routerLink: "/Vesna" },
            { title: "Жаз", routerLink: "/Leto" },
            { title: "Күз", routerLink: "/Osen" },
          ],
        },
        {
          title: "Үй өсімдіктер",
          routerLink: "/Comnata",
        },
        {
          title: "CЕБЕП БОЙЫНША САТЫП АЛЫҢЫЗ",
          routerLink: "/category",
          showSubMenu: false,
          subMenus: [
            { title: "8 наурыз", routerLink: "/Mart" },
            { title: "Ғашықтар  күні", routerLink: "/Valentina" },
            { title: "Аналар күні", routerLink: "/Mama" },
            {
              title: "Туған күн",
              routerLink: "/happy",
            },
            { title: "Қораптағы гүлдер", routerLink: "/flowerInbox" },
            { title: "Вазадағы гүлдер", routerLink: "/flowervase" },
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
  background-color: white;
  display: none;
  position: absolute;
  /* Add additional styling as needed */
}

li:hover .dropdown-menu {
  display: block;
  background-color: white;
}
.li:hover {
  background-color: white;
  transition: all 1.3s;
  border-bottom: 1px solid black;
}
</style>
