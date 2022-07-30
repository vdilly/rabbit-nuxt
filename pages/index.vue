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
export default {
  layout: "Default",
  name: "HomePage",
  mixins: [pageMixin],
  components: { BlocsAuto },
  computed: {
    page() {
      return this.$store.getters["pages/getPageByTemplate"]("homepage.php");
    },
    ...mapState("pages", ["pages"]),
    ...mapState("posts", ["posts"]),
  },
};
</script>
