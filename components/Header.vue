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
      ul.menu.desktop
      //- .filler
      Popin(panelType="side-right-panel")
        svg.icon(slot="trigger") 
          use(xlink:href="#burger")
        div(slot="close") 
          svg.burger-close.icon
            use(xlink:href="#close-circled")
        ul.menu.rwd
</template>

<script>
import Navbar from "~/components/layouts/Navbar.vue";
import Logo from "./atoms/Logo.vue";
export default {
  components: { Navbar, Logo },
  computed: {
    isFront() {
      return this.$route.path == "/";
    },
  },
  methods: {},
};
</script>

<style lang="scss">
$header-force-full-height: false;
$header-bg: transparent;
.header {
  height: 100%;
  background-color: $header-bg;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 0rem;
  position: relative;

  .filler:not(.desktop-only) {
    flex: 1;
  }

  .menu {
    display: flex;
    align-items: center;
    & > li {
      margin-left: 2rem;
      position: relative;
    }
    a:not(.btn) {
      font-size: 1.3rem;
      color: white;
      text-decoration: none;
      padding: 1rem 2rem;
      display: inline-flex;
    }
    .btn {
    }
    .btn__text {
      font-size: 1.3rem;
    }
    .notif {
      background-color: $color__core;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
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
}

// Menu rwd
.header {
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
    fill: white;
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

// Header dark
body.annonce-id-candidatures,
body[class^="dashboard"],
body[class*=" dashboard"] {
  .navbar {
    // height: 13rem;
    background-color: #02004d;
    @include RWD(mobile) {
      // height: 8rem;
    }
  }
  header {
    padding-bottom: 3rem;
    @include RWD(mobile) {
      padding-bottom: 0;
    }
  }
}
</style>