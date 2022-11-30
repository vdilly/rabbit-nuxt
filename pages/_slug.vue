<template lang="pug">
main(v-if="page")
  TemplatePage(:page="page")
</template>
<script>
import pageMixin from "@/mixins/page/page";
import TemplatePage from "@/templates/TemplatePage.vue";
export default {
  layout: "Default",
  mixins: [pageMixin],
  components: { TemplatePage },
  async asyncData({ store, params, error }) {
    let page = store.getters["pages/getPageBySlug"](params.slug);
    if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    return { page };
  },
};
</script>

<style lang="scss">
body.slug {
  @include layoutImmersion();
  .bannerStack {
    .h1 {
      text-align: left;
      max-width: 80rem;
    }
  }
}
</style>