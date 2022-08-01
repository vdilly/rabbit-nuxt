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
import BannerStack from "../../components/blocs/Banners/BannerStack.vue";
export default {
  layout: "Default",
  mixins: [pageMixin, postMixin],
  computed: {
    bannerBloc() {
      return {
        titre: this.page.title,
        image: this.thumbnail,
      };
    },
    page() {
      const slug = this.$route.params.slug;
      return this.$store.getters["posts/getPostBySlug"](slug);
    },
  },
  components: { BannerStack },
};
</script>