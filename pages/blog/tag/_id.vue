<template lang="pug">
main(v-if="tag")
  //- Banner
  .region--banner
    BannerStack(
      :bloc="{ titre: 'Articles liés au tag :', description: tag.name }"
    )

  //- //- Content
  .region--content
    BlogPosts(:bloc="blogPostDatas", v-if="tag")
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
        forcedTags: [this.tag.id],
      };
    },
  },
  async asyncData({ store, error, params }) {
    // let page = store.getters["pages/getPageBySlug"]("blog");
    // if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    let tag = await store.getters["posts/getTagById"](params.id);
    if (!tag) return error({ statusCode: 404, message: "Tag introuvable" });
    return { tag };
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
