<template lang="pug">
.hp.container.rte(v-if="page")
  h1(v-html="page.title")
  h2 Pages
  .page(v-for="(page, index) in pages") 
    a(v-html="page.title", :href="'/' + page.slug")
  h2 Posts
  .page(v-for="(post, index) in posts") 
    a(v-html="post.title", :href="'/blog/' + post.slug")
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "Default",
  name: "IndexPage",
  computed: {
    page() {
      return this.$store.getters["pages/getPageByTemplate"]("homepage.php");
    },
    ...mapState("pages", ["pages"]),
    ...mapState("posts", ["posts"]),
  },
};
</script>
