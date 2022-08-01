<template lang="pug">
.blogPosts
  Container
    h2.h2(v-html="bloc.titre", v-if="bloc.titre")
    .description(v-html="bloc.description", v-if="bloc.description")
    ul.posts-list
      li.item(v-for="post in filteredPosts")
        TeaserBlog(:post="post")
</template>

<script>
import { mapState } from "vuex";
import TeaserBlog from "@/components/teasers/TeaserBlog.vue";
export default {
  props: ["bloc"],
  computed: {
    ...mapState("posts", ["posts"]),
    filteredPosts() {
      // Limit
      const limit = this.bloc?.nombre_de_posts;
      if (limit) {
        return this.posts.slice(0, limit);
      }
      return this.posts;
    },
  },
  components: { TeaserBlog },
};
</script>

<style lang="scss">
.blogPosts {
  .posts-list {
    $gutter: 4rem;
    display: flex;
    flex-wrap: wrap;
    margin-left: -#{$gutter};
    margin-top: -#{$gutter};
    .item {
      margin-left: #{$gutter};
      margin-top: #{$gutter};
      width: calc(33.33% - #{$gutter});
    }
  }
}
</style>