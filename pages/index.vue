<template lang="pug">
.hp(v-if="page")
  BlocsAuto(:blocs="bannerBlocs")
  .container.rte
    h2 Pages
    .page(v-for="(page, index) in pages") 
      a(v-html="page.title", :href="'/' + page.slug")
    h2 Posts
    .page(v-for="(post, index) in posts") 
      a(v-html="post.title", :href="'/blog/' + post.slug")
</template>

<script>
import { mapState } from "vuex";
import BlocsAuto from "@/components/blocs/BlocsAuto.vue";
export default {
  layout: "Default",
  name: "IndexPage",
  components: { BlocsAuto },
  computed: {
    page() {
      return this.$store.getters["pages/getPageByTemplate"]("homepage.php");
    },
    bannerBlocs() {
      return this.page.acf?.page_builder?.banner?.blocs;
    },
    ...mapState("pages", ["pages"]),
    ...mapState("posts", ["posts"]),
  },
};
</script>
