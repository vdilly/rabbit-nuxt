<template lang="pug">
.container.rte.error-page 
  h1.h2(v-if="error.statusCode === 404") Page introuvable
  template(v-else-if="error.errorCode == 403 && !$store.state.auth.auth.user")
    h1.h2 Connectez-vous pour voir cette page
    Login(:redirect="$nuxt.$route.path")
  template(v-else)
    h1.h2 Une erreur est survenue
    div(v-html="error.message")

  NuxtLink(to="/", v-else) Home page
</template>

<script>
export default {
  props: ["error"],
  layout: "Default",
  methods: {},
};
</script>

<style lang="scss">
.error-page {
  padding-top: 4rem;

  h1 {
    margin-bottom: 1em !important;
  }
  .login.form {
    width: 54rem;
    max-width: 100%;
  }
}
</style>