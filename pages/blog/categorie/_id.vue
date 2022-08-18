<template lang="pug">
main(v-if="category")
  //- Banner
  .region--banner
    BannerStack(
      :bloc="{ titre: 'Articles liés à la catégorie :', description: category.name }"
    )

  //- //- Content
  .region--content
    BlogPosts(:bloc="blogPostDatas", v-if="category")
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
        forcedCats: [this.category.id],
      };
    },
  },
  async asyncData({ store, error, params }) {
    // let page = store.getters["pages/getPageBySlug"]("blog");
    // if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    let category = await store.getters["posts/getCategoryById"](params.id);
    if (!category)
      return error({ statusCode: 404, message: "Category introuvable" });
    return { category };
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
