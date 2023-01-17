<template lang="pug">
.template.template--page(v-if="page")
  //- Banner
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
import BannerStack from "../components/blocs/Banners/BannerStack.vue";
import pageBuilderMixin from "@/mixins/pageBuilder";
export default {
  props: ["page"],
  mixins: [pageBuilderMixin],
  components: { BannerStack },
};
</script>
