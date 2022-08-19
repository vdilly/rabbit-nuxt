<template lang="pug">
.layout-headerWhite
  Header
  Nuxt.main
  Footer
  //- notifications(group="all")
</template>

<script>
// import AuthMixin from "@/mixins/auth";
import Btn from "~/components/atoms/Btn.vue";
import Footer from "~/components/Footer.vue";
export default {
  // mixins: [AuthMixin],
  components: { Btn, Footer },
  computed: {},
  methods: {
    logoutHandler() {
      this.logout();
    },
  },
};
</script>

<style lang="scss">
.layout-headerWhite {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .nuxt-content {
    flex: 1;
  }
  footer {
    margin-top: 5rem;
  }
}
.nuxt-content.page {
  margin-top: 6rem;
  padding-bottom: 6rem;
  h1 {
    margin-bottom: 4rem;
  }
}
.home-enter-active,
.home-leave-active {
  transition: opacity 0.5s;
}
.home-enter,
.home-leave-active {
  opacity: 0;
}

.layout-headerWhite {
  // Header
  .navbar {
    background-color: transparent;
  }
  .header .logo img {
    // filter: grayscale(100) brightness(1.5);
  }
  .main-menu .label--main,
  .main-menu .label--trigger {
    color: $color-1-font;
  }
  .main-menu .dropdown .dropdown-arrow {
    fill: $color-1-font;
  }
}
</style>