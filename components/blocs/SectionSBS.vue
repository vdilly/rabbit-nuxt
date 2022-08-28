<template lang="pug">
.sectionSBS.section.section-big
  Container.container--xs
    h2.h2.section-title(v-html="bloc.titre", v-if="bloc.titre")
    .section-description.description.hr-top(
      v-html="bloc.description",
      v-if="bloc.description"
    )
  .section-content
    ContentSBS(
      :bloc="bloc",
      v-for="(bloc, index) in bloc.blocs_sbs",
      :key="index",
      :class="index % 2 == 0 ? '' : 'inverted'"
    )
  Container.container--small.align-center
    Btn.core(v-if="bloc.bouton", :link="bloc.bouton")
      span(v-html="bloc.bouton.title")
</template>

<script>
import ContentSBS from "@/components/blocs/ContentSBS.vue";
export default {
  props: ["bloc"],
  components: {
    ContentSBS,
  },
  computed: {
    inverted() {
      return this.bloc.alignement_image == "right";
    },
  },
};
</script>

<style lang="scss">
.sectionSBS {
  .section-title {
  }
  .section-description {
    margin-top: 6rem;
    &:before {
      top: -1.5rem;
    }
  }
  .section-content {
    // margin-top: 10rem !important;
  }
  .contentSBS {
    margin-top: 8rem;
    .content {
      justify-content: center;
    }
    .h2 {
      font-size: 2.5rem;
      color: $color-1;
    }
    .description {
      margin-top: 4rem;
    }
    .text {
      width: 40rem;
    }
    .image {
      width: 30rem;
      margin-right: 8rem;
    }
    &.inverted .image {
      margin-right: 0;
      margin-left: 8rem;
    }
  }
  .container.align-center {
    margin-top: 8rem;
  }
}
</style>