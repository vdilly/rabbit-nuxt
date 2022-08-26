<template lang="pug">
.sectionSBS.section.section-big
  Container.container--small
    h2.h2.section-title(v-html="bloc.titre", v-if="bloc.titre")
    .section-description.description(
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
  Container.container--small
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
  .section-content {
    // margin-top: -;
  }
  .contentSBS {
    margin-top: 8rem;
    .container {
      justify-content: center;
    }
    .h2 {
      font-size: 2.5rem;
    }
    .description {
      margin-top: 2rem;
    }
    .text {
      width: 45rem;
    }
    .image {
      width: 30rem;
    }
  }
}
</style>