<template lang="pug">
main(v-if="page")
  //- Banner
  BannerBlog(:bloc="bannerBloc")

  //- Content
  .region--content
    .container.main-rte.rte(v-html="page.content")

  //- Post Content
  .region--postContent(v-if="postContentBlocs")
    BlocsAuto(:blocs="postContentBlocs")
</template>
<script>
import postMixin from "@/mixins/post";
import pageMixin from "@/mixins/page/page";
import BannerBlog from "@/components/blocs/Banners/BannerBlog.vue";
import pageBuilderMixin from "@/mixins/page/pageBuilder";
export default {
  layout: "HeaderWhite",
  mixins: [pageMixin, postMixin, pageBuilderMixin],
  computed: {
    bannerBloc() {
      return {
        titre: this.page?.title,
        categories: this.page?.categories,
        image: this.thumbnail,
      };
    },
  },
  components: { BannerBlog },
  async asyncData({ store, params, error }) {
    let page = store.getters["posts/getPostBySlug"](params.slug);
    if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    return { page };
  },
};
</script>

<style lang="scss">
body.blog-slug {
}
</style>