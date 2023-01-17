<template lang="pug">
main(v-if="page")
  //- Region Banner
  .region--banner(v-if="bannerBlocs")
    BlocsAuto(:blocs="bannerBlocs", :displayName="true")

  //- Content
  .region--content
    BlocsAuto(:blocs="contentBlocs", v-if="contentBlocs", :displayName="true")
</template>
<script>
import pageMixin from "@/mixins/page/page";
import pageBuilderMixin from "@/mixins/pageBuilder";
export default {
  layout: "Default",
  mixins: [pageMixin, pageBuilderMixin],
  async asyncData({ store, error }) {
    let page = store.getters["pages/getPageBySlug"]("showcase-blocs");
    if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    return { page };
  },
};
</script>

<style lang="scss">
body.showcase-blocs {
  transform-origin: center 0;
  transform: scale(0.6);
  @include layoutImmersion();
}
</style>
