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
import pageBuilderMixin from "@/mixins/pageBuilder";
export default {
  layout: "Default",
  mixins: [pageMixin, pageBuilderMixin],
  async asyncData({ store, error }) {
    let page = store.getters["pages/getPageBySlug"]("blog");
    if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    let unboundPage = JSON.parse(JSON.stringify(page)); // Unbind from store
    return { page: unboundPage };
  },
  mounted() {
    this.$nuxt.$on("blogpage-change", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  },
};
</script>
<style lang="scss">
body.blog,
body.blog-tag-id {
  @include layoutImmersion($decale: true);
  .bannerStack {
    // padding-bottom: 8rem;
  }
  .blogPosts {
    padding: 0;
    .section-content {
      margin-top: 0;
    }
  }
  .layout-decale .region--content .blocs .container {
    background-color: transparent;
  }

  // // Blogposts
  // .region--content {
  //   position: relative;
  //   z-index: 2;

  //   .blocs .container {
  //     background-color: $color__page-bg;
  //     border-top-right-radius: $bradius;
  //     border-top-left-radius: $bradius;
  //   }
  // }

  .form--blog-filters .filters__categories .form__field {
    border-color: $color-1-font;
  }

  .form--blog-filters .filters__categories .form__group .form__label {
    color: $color-1-font;
    opacity: 0.4;
  }

  .form--blog-filters .filters__categories .form__group input:checked + label {
    color: $color-1-font;
    opacity: 1;
  }
}
</style>