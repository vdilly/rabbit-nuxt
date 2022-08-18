<template lang="pug">
.bannerBlog
  .img-cover(v-if="bloc")
    img(:src="bloc.image.full.src", :alt="bloc.image.alt", v-if="bloc.image")
  Container
    .categories(v-if="bloc.categories")
      span(v-for="category in bloc.categories", v-html="category.name")
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
.bannerBlog {
  .img-cover {
    position: relative;
    height: 80vw;
    max-height: 40rem;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: linear-gradient(
        to bottom,
        rgba(black, 0.2) 0%,
        rgba(white, 0.4) 60%,
        rgba(white, 1) 100%
      );
    }
  }
  .container {
    position: relative;
    z-index: 3;
    margin-top: -8rem;
    margin-bottom: 4rem;
  }
  .categories {
    color: $color__title;
    // opacity: 0.5;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 1rem;

    span {
      background-color: $color__core;
      color: $color__core-font;
      padding: 0.3rem 0.5rem;
      border-radius: 0.5rem;
    }
  }
  .h1 {
    font-weight: 600;
    padding-right: 4rem;
  }
}
</style>