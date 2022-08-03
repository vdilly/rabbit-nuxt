<template lang="pug">
main(v-if="page")
  //- Banner
  .region--banner(v-if="bannerBlocs")
    BlocsAuto(:blocs="bannerBlocs")
  .region--banner
    BlocsAuto(v-if="bannerBlocs", :blocs="bannerBlocs")
    BannerStack(v-else, :bloc="{ titre: page.title }")

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
import BannerStack from "../components/blocs/Banners/BannerStack.vue";
export default {
  layout: "Default",
  mixins: [pageMixin],
  components: { BannerStack },
  async asyncData({ store, params, error }) {
    let page = store.getters["pages/getPageBySlug"](params.slug);
    if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    return { page };
  },
};
</script>
