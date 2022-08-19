<template lang="pug">
main(v-if="page")
  //- Banner
  BannerBlog2(:bloc="bannerBloc")
    Ariane(:ariane="ariane", slot="pre")

  //- Content
  .region--content
    .container.container--article.main-container
      .main-rte.rte(v-html="page.content")

  //- Post Content
  .region--postContent(v-if="postContentBlocs")
    BlocsAuto(:blocs="postContentBlocs")
</template>
<script>
import postMixin from "@/mixins/post";
import pageMixin from "@/mixins/page/page";
import BannerBlog from "@/components/blocs/Banners/BannerBlog.vue";
import BannerBlog2 from "@/components/blocs/Banners/BannerBlog2.vue";
import pageBuilderMixin from "@/mixins/page/pageBuilder";
import Ariane from "@/components/navs/Ariane.vue";
export default {
  layout: "Decale",
  mixins: [pageMixin, postMixin, pageBuilderMixin],
  computed: {
    ariane() {
      return [
        {
          link: "/blog",
          label: "Blog",
        },
        {
          link: null,
          label: this.page?.title,
        },
      ];
    },
    bannerBloc() {
      return {
        titre: this.page?.title,
        categories: this.page?.categories,
        image: this.thumbnail,
        author: this.page?.author,
        date: this.page?.date,
      };
    },
  },
  components: { BannerBlog, BannerBlog2, Ariane },
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