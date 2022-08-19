<template lang="pug">
.layout-decale
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
.layout-decale {
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

body .layout-decale {
  .main {
    padding-top: 0;
  }

  // Header
  .navbar {
    background-color: transparent;
  }
  .header {
    @import "@/assets/scss/headers/_header-white";
  }

  // Banner Stack
  .bannerStack.gradient {
    background: $gradient-1;
    padding-top: 20rem;
    padding-bottom: 35rem;
    margin-bottom: -25rem;
    position: relative;
    .h1,
    .description {
      color: $color__gradient-1;
    }
    &:after {
      background-color: white;
      content: "";
      position: absolute;
      bottom: -0.1rem;
      right: 0;
      width: 100%;
      height: 7rem;
      clip-path: polygon(0 100%, 100% 100%, 100% 0);
      // transform: translateY(100%);
      z-index: 1;
    }
  }

  // Blogposts
  .region--content {
    position: relative;
    z-index: 2;
  }
  .form--blog-filters .filters__categories .form__field {
    border-color: $color__gradient-1;
  }
  .form--blog-filters .filters__categories .form__group .form__label {
    color: rgba(white, 0.4);
  }
  .form--blog-filters .filters__categories .form__group input:checked + label {
    color: white;
  }

  // Contenu
  // .region--content {
  //   .container {
  //     background-color: $color__page-bg;
  //   }
  // }
}
</style>