<template lang="pug">
main(v-if="page")
  //- Banner
  .region--banner
    BannerStack(
      :bloc="{ description: 'Articles liés à la catégorie', titre: page.name }"
    )

  //- //- Content
  .region--content
    BlogPosts(:bloc="blogPostDatas")
</template>
<script>
import pageMixin from "@/mixins/page/page";
import BannerStack from "@/components/blocs/Banners/BannerStack.vue";
import BlogPosts from "@/components/blocs/BlogPosts.vue";
export default {
  layout: "Default",
  mixins: [pageMixin],
  computed: {
    blogPostDatas() {
      return {
        posts_par_page: "12",
        nombre_de_posts: "-1",
        forcedCats: [this.page.id],
      };
    },
  },
  async asyncData({ store, error, params }) {
    // let page = store.getters["pages/getPageBySlug"]("blog");
    // if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    let page = await store.getters["posts/getCategoryBySlug"](params.slug);
    if (!page)
      return error({ statusCode: 404, message: "Category introuvable" });
    return { page };
  },
  mounted() {
    // Au change de page on rescroll top
    this.$nuxt.$on("blogpage-change", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  },
  components: { BannerStack, BlogPosts },
};
</script>
