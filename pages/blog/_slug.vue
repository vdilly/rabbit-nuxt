<template lang="pug">
main(v-if="page")
  //- Banner
  BannerBlog2(:bloc="bannerBloc")
    Ariane(:ariane="ariane", slot="pre")

  //- Content
  .region--content.section.pt0
    .container.container--article.main-container
      .main-rte.rte(v-html="page.content")
    //- .share-rs.share-rs--large
    //-   ShareNetwork.linkedin(
    //-     network="linkedin",
    //-     :url="seo.link[0].href",
    //-     :title="seo.title"
    //-   )
    //-     svg.icon
    //-       use(xlink:href="#linkedin")
    //-     span Partager sur Linkedin
    //-   ShareNetwork.twitter(
    //-     network="twitter",
    //-     :url="seo.link[0].href",
    //-     :title="seo.title"
    //-   )
    //-     svg.icon
    //-       use(xlink:href="#twitter")
    //-     span Partager sur Twitter

  //- Post Content
  .region--postContent.section.section--2
    Container
      CrossReading.crossreading(v-if="crossreading", :bloc="crossreading")
</template>
<script>
import postMixin from "@/mixins/post";
import pageMixin from "@/mixins/page/page";
import BannerBlog from "@/components/blocs/Banners/BannerBlog.vue";
import BannerBlog2 from "@/components/blocs/Banners/BannerBlog2.vue";
import pageBuilderMixin from "@/mixins/page/pageBuilder";
import Ariane from "@/components/navs/Ariane.vue";
import CrossReading from "@/components/blocs/CrossReading.vue";
export default {
  layout: "Decale",
  mixins: [pageMixin, postMixin, pageBuilderMixin],
  components: { BannerBlog, BannerBlog2, Ariane, CrossReading },
  computed: {
    crossreading() {
      return {
        titre: "Articles suivants",
        posts_par_page: "3",
        nombre_de_posts: "3",
        exclude: this.page?.id,
      };
    },
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