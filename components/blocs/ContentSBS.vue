<template lang="pug">
.contentSBS(:class="inverted ? 'inverted' : null", v-if="bloc")
  Container.container--small
    .content
      .image(v-if="bloc.image")
        img(:src="bloc.image.mobile.src")
      svg.icon(v-if="bloc.icone")
        use(:xlink:href="`#${bloc.icone}`")
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
      return this.bloc?.alignement_image == "right";
    },
  },
};
</script>

<style lang="scss">
.contentSBS {
  .container {
  }
  .content {
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
  .content {
    flex-direction: row-reverse;
  }
  .image {
    margin-left: 5rem;
  }
}

// Mode column
.contentSBS.column {
  .content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .icon {
    height: 4rem;
    width: 4rem;
    fill: $color-1;
  }
  .h2 {
    font-size: 2rem;
    margin-top: 2rem;
    font-weight: 600;
    // color: $color__title-light;
    color: $color-1;
  }
  .description {
    margin-top: 1rem;
    line-height: 1.2;
  }
}
</style>