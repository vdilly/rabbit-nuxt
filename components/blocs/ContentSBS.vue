<template lang="pug">
.contentSBS(:class="inverted ? 'inverted' : null")
  Container.container--small
    .image(v-if="bloc.image")
      img(:src="bloc.image.mobile.src")
    .text
      h2.h2(v-html="bloc.titre", v-if="bloc.titre")
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
.contentSBS {
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .description {
    margin-top: 4rem;
  }
  .btn {
    margin-top: 2rem;
  }
  .image {
    width: 44rem;
    flex-shrink: 0;
    max-width: 100%;
    height: auto;
    img {
      width: 100%;
      height: auto;
      border-radius: $bradius;
    }
  }
}

.contentSBS:not(.inverted) {
  .image {
    margin-right: 5rem;
  }
}
.contentSBS.inverted {
  .container {
    flex-direction: row-reverse;
  }
  .image {
    margin-left: 5rem;
  }
}
</style>