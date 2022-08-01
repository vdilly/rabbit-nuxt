<template lang="pug">
main(v-if="page")
  //- Banner
  .region--banner(v-if="bannerBlocs")
    BlocsAuto(:blocs="bannerBlocs")

  //- Pre content
  .region--preContent(v-if="postContentBlocs")
    BlocsAuto(:blocs="preContentBlocs")

  //- Content
  .region--content
    BlocsAuto(:blocs="contentBlocs", v-if="contentBlocs")
    .container.main-rte.rte(v-else, v-html="page.content")

  //- Post Content
  .region--postContent(v-if="postContentBlocs")
    BlocsAuto(:blocs="postContentBlocs")
</template>
<script>
import pageMixin from "@/mixins/page/page";
export default {
  layout: "Default",
  mixins: [pageMixin],
  computed: {
    page() {
      return this.$store.getters["pages/getPageBySlug"]("blog");
    },
  },
};
</script>
