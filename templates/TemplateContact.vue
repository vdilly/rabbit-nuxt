<template lang="pug">
.template.template--page(v-if="page")
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

  Container.container--small
    FormWP.form--material(:form="form")
</template>
<script>
import BannerStack from "../components/blocs/Banners/BannerStack.vue";
import pageBuilderMixin from "@/mixins/page/pageBuilder";
import FormWP from "@/components/form/instances/FormWP.vue";
import FormFieldsWP from "../components/form/FormFieldsWP.vue";
export default {
  props: ["page"],
  mixins: [pageBuilderMixin],
  components: { BannerStack, FormWP, FormFieldsWP },
  computed: {
    form() {
      return this.page?.acf;
    },
  },
};
</script>
