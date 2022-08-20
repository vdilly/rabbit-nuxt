<template lang="pug">
.bannerDecale(:class="inverted ? 'inverted' : null")
  Container
    .img-cover(v-if="bloc.image")
      img(:src="bloc.image.mobile.src")
    .text
      h1.h1(v-html="bloc.titre", v-if="bloc.titre")
      .description(v-html="bloc.description", v-if="bloc.description")
      Btn.core(v-if="bloc.bouton", :link="bloc.bouton")
        span(v-html="bloc.bouton.title")
</template>

<script>
export default {
  props: ["bloc"],
  computed: {
    inverted() {
      return this.bloc.alignement_image == "right";
    },
  },
};
</script>

<style lang="scss">
.bannerDecale {
  height: 80vw;
  max-height: 70rem;
  display: flex;
  align-items: center;
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    flex-direction: row-reverse;
  }
  .text {
    width: 54rem;
    background: $gradient-1;
    padding: 6rem 5rem;
    border-radius: $bradius;
    position: relative;
    z-index: 2;
    transform: translateX(6rem) translateY(8rem);
  }
  .h1 {
    font-size: 7rem;
    line-height: 1.2;
  }
  .description {
    margin-top: 2rem;
  }
  .h1,
  .description {
    color: $color-1-font;
  }
  .btn {
    margin-top: 3rem;
  }
  .img-cover {
    height: 100%;
    transform: translateX(-4rem);
    flex: 1;
    flex-shrink: 0;
    max-width: 80rem;
    // width: 60rem;
    border-radius: $bradius;
    overflow: hidden;
    display: flex;
  }
}
</style>