<template lang="pug">
main(v-if="page")
  //- Banner
  BannerStack(:bloc="bannerBloc")

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
import BannerStack from "@/components/blocs/Banners/BannerStack.vue";
import pageBuilderMixin from "@/mixins/page/pageBuilder";
export default {
  layout: "Default",
  mixins: [pageMixin, postMixin, pageBuilderMixin],
  computed: {
    bannerBloc() {
      return {
        titre: this.page?.title,
        image: this.thumbnail,
      };
    },
  },
  components: { BannerStack },
  async asyncData({ store, params, error }) {
    let page = store.getters["posts/getPostBySlug"](params.slug);
    if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    return { page };
  },
};
</script>