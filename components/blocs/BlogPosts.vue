<template lang="pug">
.blogPosts
  Container
    h2.h2(v-html="bloc.titre", v-if="bloc.titre")
    .description(v-html="bloc.description", v-if="bloc.description")
    ul.posts-list(v-if="currentPage")
      li.item(v-for="post in currentPage.posts")
        TeaserBlog(:post="post")
    Pagination(
      :currentPage="currentIndex",
      :totalPages="totalPages",
      @next="nextPage",
      @prev="prevPage"
    )
</template>

<script>
import { mapState } from "vuex";
import TeaserBlog from "@/components/teasers/TeaserBlog.vue";
import Pagination from "../navs/Pagination.vue";
export default {
  props: ["bloc"],
  components: { TeaserBlog, Pagination },
  data() {
    return {
      currentIndex: 1,
      totalPages: 1,
    };
  },
  computed: {
    ...mapState("posts", ["posts", "categories", "tags"]),
    pages() {
      const perPage = parseInt(this.bloc.posts_par_page);

      // Si pas de limite par page on affiche tout
      if (!perPage || perPage == -1) {
        return [
          {
            totalPages: 1,
            currentPage: 1,
            hasNext: false,
            hasPrev: false,
            posts: this.limitedPosts,
          },
        ];
      }

      // Sinon on pagine
      let pages = [];
      let currentPage = 1;
      let cursor = 0;
      let endCursor = perPage;
      const totalPages = Math.ceil(this.limitedPosts.length / perPage);
      this.totalPages = totalPages;
      while (currentPage <= totalPages) {
        pages.push({
          totalPages: totalPages,
          currentPage: currentPage,
          hasNext: currentPage < totalPages,
          hasPrev: currentPage > 1,
          posts: this.limitedPosts.slice(cursor, endCursor),
        });
        currentPage++;
        cursor = endCursor;
        endCursor += perPage;
      }
      return pages;
    },
    currentPage() {
      return this.pages[this.currentIndex - 1];
    },
    limitedPosts() {
      // Limit
      const limit = this.bloc?.nombre_de_posts;
      if (limit) {
        return this.posts.slice(0, limit);
      }
      return this.posts;
    },
  },
  methods: {
    nextPage() {
      if (this.currentIndex >= this.totalPages) return;
      this.currentIndex++;
      $nuxt.$emit("blogpage-change");
    },
    prevPage() {
      if (this.currentIndex <= 1) return;
      this.currentIndex--;
      $nuxt.$emit("blogpage-change");
    },
  },
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

      @include RWD(tablet) {
        width: calc(50% - #{$gutter});
      }
      @include RWD(mobile) {
        width: 100%;
      }
    }
  }
}
</style>