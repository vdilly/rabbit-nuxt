<template lang="pug">
Navbar
  Container
    header.header
      template(v-if="isFront")
        h1
          Logo
      template(v-else)
        Logo(:linked="true")
      .filler
      MainMenu1
      MainMenuRwd1(ref="menuRwd")
</template>

<script>
import { mapState } from "vuex";
import Navbar from "~/components/layouts/Navbar.vue";
import Logo from "./atoms/Logo.vue";
import MainMenu1 from "~/components/navs/MainMenu1.vue";
import MainMenuRwd1 from "~/components/navs/MainMenuRwd1.vue";
export default {
  components: { Navbar, MainMenu1, MainMenuRwd1, Logo },
  computed: {
    isFront() {
      return this.$route.path == "/";
    },
  },
  methods: {
    closeDrawers: function () {
      // Au close du burger on close les éventuels drawers, on achemine l'event: Default -> MainMenuRwd -> Drawer
      this.$refs.menuRwd.closeDrawers();
    },
  },
};
</script>

<style lang="scss">
/**

4. Gérer la couleur du header
5. Gérer le placement des différents éléments (logo, menu, etc...)
6. Go main menu pour gérer les labels
7. Go mainmenurwd pour gérer le burger menu

*/
.navbar > .container {
  height: 100%;
  max-width: 100%;
}
.header {
  height: 100%;
  background-color: $color__page-bg;
  display: flex;
  justify-content: flex-start;
  position: relative;

  .filler:not(.desktop-only) {
    flex: 1;
  }

  // Logo
  h1,
  .logo {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .logo {
    img {
      height: calc(100% - 4rem);
      width: auto;
      @include RWD(mobile) {
        height: calc(100% - 3rem);
      }
    }
  }

  // Menu 100% hauteur, permet des zones cliquables plus grande et au dropdown de coller à la navbar
  .main-menu {
    height: 100%;
    .item {
      display: flex;
      height: 100%;
    }
    .label:not(.btn) {
      height: 100%;
    }
    .btn {
      align-self: center;
    }
  }
}
</style>