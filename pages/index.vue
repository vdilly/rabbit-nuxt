<template lang="pug">
.hp
  h2 Pages
  .page(v-for="(page, index) in pages") 
    pre(v-html="page.title")
  h2 Posts
  .page(v-for="(post, index) in posts") 
    pre(v-html="post.title")
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "IndexPage",
  computed: {
    ...mapState("pages", ["pages"]),
    ...mapState("posts", ["posts"]),
  },
};
</script>
