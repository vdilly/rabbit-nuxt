<template lang="pug">
main(v-if="page")
  //- Region Banner
  .region--banner(v-if="bannerBlocs")
    BlocsAuto(:blocs="bannerBlocs")

  //- Content
  .region--content
    BlocsAuto(:blocs="contentBlocs", v-if="contentBlocs", :displayName="true")
</template>
<script>
import pageMixin from "@/mixins/page/page";
export default {
  layout: "Default",
  mixins: [pageMixin],
  computed: {
    page() {
      return this.$store.getters["pages/getPageBySlug"]("showcase-blocs");
    },
  },
};
</script>

<style lang="scss">
body.showcase-blocs {
  transform-origin: center 0;
  transform: scale(0.6);
}
</style>
