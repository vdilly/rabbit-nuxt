<template lang="pug">
.bannerSBS(:class="inverted ? 'inverted' : null")
  Container
    .img-cover(v-if="bloc.image")
      img(:src="bloc.image.mobile.src")
    .text
      h1.h1(v-html="bloc.titre", v-if="bloc.titre")
      .description(v-html="bloc.description", v-if="bloc.description")
      Btn.gradient(v-if="bloc.bouton", :link="bloc.bouton")
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
.bannerSBS {
  height: 80vw;
  max-height: 60rem;
  display: flex;
  align-items: center;
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(2rem);
  }
  .text {
    width: 54rem;
    margin-left: 6rem;
  }
  .h1 {
    font-size: 7rem;
    line-height: 1.2;
    // font-weight: 600;
  }
  .description {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 3rem;
  }
  .img-cover {
    flex: 1;
    flex-shrink: 0;
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
  }

  &.gradient {
    background: $gradient-1;
    .h1,
    .description {
      color: $color-1-font;
    }
  }
}
</style>