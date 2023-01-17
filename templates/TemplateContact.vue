<template lang="pug">
.template.template--contact(v-if="page")
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
      FormAuto.left.form--material(:form="form")

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
import BannerStack from "@/components/blocs/Banners/BannerStack.vue";
import pageBuilderMixin from "@/mixins/pageBuilder";
import FormAuto from "@/components/form/instances/FormAuto.vue";
export default {
  props: ["page"],
  mixins: [pageBuilderMixin],
  components: { BannerStack, FormAuto },
  computed: {
    form() {
      return this.page?.acf;
    },
  },
};
</script>
<style lang="scss">
.template.template--contact {
  .main-wrapper {
    position: relative;
    z-index: 4;
    display: flex;
    box-shadow: 0 2px 4rem 0 rgb(0 0 0 / 20%);
    border-radius: $bradius;
    overflow: hidden;
    .right {
      width: 40rem;
      padding: 7rem 5rem;
      background-color: $color__grey;
      // color: $color__text;
      // h3 {
      //   color: $color__text;
      // }
    }
    .left {
      background-color: $color__page-bg;
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
