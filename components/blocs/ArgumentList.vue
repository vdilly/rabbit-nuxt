<template lang="pug">
.argumentList.section
  Container.container--xs
    h2.section-title.section-title--small.hr-bot(
      v-html="bloc.titre",
      v-if="bloc.titre"
    )
    .section-description.description(
      v-html="bloc.description",
      v-if="bloc.description"
    )
  .section-content
    Container
      .list
        ContentSBS.column(
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
};
</script>

<style lang="scss">
.argumentList {
  .section-content {
    margin-top: 0rem;
    .container {
    }
    .list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-left: -6rem;
    }
  }
  .contentSBS {
    margin-left: 6rem;
    margin-top: 8rem;
    width: calc(33.33% - 6rem);
    .container {
      padding: 0 !important;
      max-width: 100%;
    }
    .h2 {
    }
    .description {
      // margin-top: 2rem;
    }
  }
  .btn {
    margin-top: 8rem;
  }
}
</style>