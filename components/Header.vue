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
      MainMenu1(v-show="window.range == 'desktop'")
      Popin(panelType="side-right-panel", @close="closeDrawers")
        BurgerIcon(slot="trigger")
        div(slot="close") 
          svg.burger-close.icon
            use(xlink:href="#close-circled")
        MainMenuRwd1(ref="menuRwd")
</template>

<script>
import { mapState } from "vuex";
import Navbar from "~/components/layouts/Navbar.vue";
import Logo from "./atoms/Logo.vue";
import MainMenu1 from "~/components/navs/MainMenu1.vue";
import MainMenuRwd1 from "~/components/navs/MainMenuRwd1.vue";
import BurgerIcon from "@/components/atoms/BurgerIcon.vue";
export default {
  components: { Navbar, MainMenu1, MainMenuRwd1, Logo, BurgerIcon },
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
.header {
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 0rem;
  position: relative;

  .filler:not(.desktop-only) {
    flex: 1;
  }

  // Logo
  h1 {
    height: 100%;
    display: flex;
  }
  .logo {
    display: flex;
    height: 8rem;
    width: auto;

    @include RWD(mobile) {
      width: 20rem;
    }
  }

  // Menu desktop
  .menu {
    display: flex;
    align-items: center;
    & > li {
      margin-left: 2rem;
      position: relative;
    }
  }
  .main__menu-label {
    font-size: 1.3rem;
    color: white;
    text-decoration: none;
    padding: 1rem 2rem;
    display: inline-flex;
  }
}

// Menu rwd
.header {
  .popin__close {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .burger-close {
    height: 3rem;
    width: 3rem;
    fill: $color__text;
    margin: 2rem;
  }
  .popin {
    @include RWD(desktop) {
      display: none;
    }
  }
  .menu.desktop {
    @include RWD(tablet) {
      display: none;
    }
  }
  .menu.rwd {
    @include RWD(desktop) {
      display: none;
    }
  }

  .popin__trigger .icon {
    height: 3rem;
    width: 3rem;
    fill: $color__core;
  }
  .popin__panel {
    background-color: $color__core;
  }
  .menu.rwd {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 5rem;
    li {
      margin-top: 3rem;
    }
    a:not(.btn) {
      padding-left: 0;
    }
    a {
      font-size: 1.5rem;
    }
  }
}
</style>