<template lang="pug">
.bannerStack(v-if="bloc")
  img.img(:src="bloc.image.full.src", v-if="bloc.image")
  Container
    h1.h1(v-html="bloc.titre", v-if="bloc.titre")
    .description.rte(v-html="bloc.description", v-if="bloc.description")
    Btn.core(v-if="bloc.bouton", :link="bloc.bouton")
      span(v-html="bloc.bouton.title")
</template>
<script>
export default {
  props: ["bloc"],
};
</script>

<style lang="scss">
.bannerStack {
  text-align: center;
  padding-top: 6rem;
  padding-bottom: 12rem;
  .description {
    font-size: 2.2rem;
    margin-top: 2rem;
    @include RWD(tablet) {
      font-size: 1.8rem;
    }
    @include RWD(mobile) {
      font-size: 1.6rem;
    }
  }
  .img {
    margin-top: 4rem;
    max-height: 50rem;
    border-radius: 1rem;
  }
}

// Gradient + décalage contenu
</style>