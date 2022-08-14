<template lang="pug">
.template.template--page(v-if="page")
  //- Banner
  .region--banner(v-if="bannerBlocs")
    BlocsAuto(:blocs="bannerBlocs")
  .region--banner
    BlocsAuto(v-if="bannerBlocs", :blocs="bannerBlocs")
    BannerStack(v-else, :bloc="{ titre: page.title }")

  //- Pre content
  Container
    .main-wrapper
      //- Partie form
      FormWP.left.form--material(:form="form")

      //- Partie contenu side
      .content-wrapper.right
        .region--preContent(v-if="postContentBlocs")
          BlocsAuto(:blocs="preContentBlocs")

        //- Content
        .region--content
          BlocsAuto(:blocs="contentBlocs", v-if="contentBlocs")
          .main-rte.rte(v-else, v-html="page.content")

        //- Post Content
        .region--postContent(v-if="postContentBlocs")
          BlocsAuto(:blocs="postContentBlocs")

    //- Container.container--small
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
<style lang="scss">
.template.template--page {
  .main-wrapper {
    display: flex;
    box-shadow: 0 2px 74px 0 rgb(0 0 0 / 06%);
    border-radius: 1rem;
    overflow: hidden;
    .right {
      width: 40rem;
      padding: 7rem 5rem;
      background-color: #f1f3f4;
    }
    .left {
      // margin-right: 4rem;
      flex: 1;
      margin-top: 0;
      padding: 7rem 5rem;
    }
    .rte p {
      font-size: 1.4rem;
    }
  }
}
</style>
