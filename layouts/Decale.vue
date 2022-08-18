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
  .burger-icon span {
    background-color: white;
  }
  .main-menu .label--main,
  .main-menu .label--trigger {
    color: $color__gradient-1;
  }
  .main-menu .dropdown .dropdown-arrow {
    fill: $color__gradient-1;
  }

  // Banner Stack
  .bannerStack.gradient {
    background: $gradient-1;
    padding-top: 20rem;
    padding-bottom: 35rem;
    margin-bottom: -25rem;
    .h1,
    .description {
      color: $color__gradient-1;
    }
  }

  // Blogposts
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