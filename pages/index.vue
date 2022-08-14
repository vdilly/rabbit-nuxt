<template lang="pug">
main(v-if="page")
  //- Banner
  .region--banner(v-if="bannerBlocs")
    BlocsAuto(:blocs="bannerBlocs")
  .region--banner
    BlocsAuto(v-if="bannerBlocs", :blocs="bannerBlocs")
    BannerStack(v-else, :bloc="{ titre: page.title }")

  //- Pre content
  .region--preContent(v-if="postContentBlocs")
    BlocsAuto(:blocs="preContentBlocs")

  //- Content
  .region--content
    BlocsAuto(:blocs="contentBlocs", v-if="contentBlocs")
    .container.main-rte.rte(v-else, v-html="page.content")

    //- Spé hp en dur
    .container.rte
      h2 Pages
      .page(v-for="(page, index) in pages") 
        a(v-html="page.title", :href="'/' + page.slug")
      h2 Posts
      .page(v-for="(post, index) in posts") 
        a(v-html="post.title", :href="'/blog/' + post.slug")

  //- Post Content
  .region--postContent(v-if="postContentBlocs")
    BlocsAuto(:blocs="postContentBlocs")
</template>

<script>
import { mapState } from "vuex";
import BlocsAuto from "@/components/blocs/BlocsAuto.vue";
import pageMixin from "@/mixins/page/page";
import BannerStack from "../components/blocs/Banners/BannerStack.vue";
import pageBuilderMixin from "@/mixins/page/pageBuilder";
export default {
  layout: "Default",
  name: "HomePage",
  mixins: [pageMixin, pageBuilderMixin],
  components: { BlocsAuto, BannerStack },
  computed: {
    ...mapState("pages", ["pages"]),
    ...mapState("posts", ["posts"]),
  },
  async asyncData({ store, error }) {
    let page = store.getters["pages/getPageByTemplate"]("homepage.php");
    if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    return { page };
  },
};
</script>
