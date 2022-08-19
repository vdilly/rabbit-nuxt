<template lang="pug">
.blogPosts(v-if="bloc")
  Container
    h2.h2(v-html="bloc.titre", v-if="bloc.titre")
    .description(v-html="bloc.description", v-if="bloc.description")
    .filters.form--blog-filters(v-if="bloc.display_cats || bloc.display_tags")
      .filters__categories(v-if="bloc.display_cats")
        FormSingleChoice(
          name="categories",
          :tags="categories",
          labelPropName="name",
          valuePropName="id",
          v-model="pickedCategories",
          :inputValue="pickedCategories",
          @input="changeCategory"
        )
          //- h2.h3(slot="label") Catégories
      .filters__tags(v-if="bloc.display_tags")
        FormMultiChoice(
          name="tags",
          :tags="tags",
          labelPropName="name",
          valuePropName="id",
          v-model="pickedTags"
        )
          h2.h3(slot="label") Tags
    ul.posts-list(v-if="currentPage")
      li.item(v-for="post in currentPage.posts")
        TeaserBlog(:post="post")
    .rte(v-else) Aucun résultat
    Pagination(
      v-if="totalPages > 1",
      :currentPage="currentIndex",
      :totalPages="totalPages",
      @next="nextPage",
      @prev="prevPage"
    )
</template>

<script>
import { mapState } from "vuex";
import TeaserBlog from "@/components/teasers/TeaserBlog.vue";
import Pagination from "@/components/navs/Pagination.vue";
import FormMultiChoice from "@/components/form/FormMultiChoice.vue";
import FormSingleChoice from "@/components/form/FormSingleChoice.vue";
export default {
  props: ["bloc"], // titre, description, posts_par_page, nombre_de_posts, display_tags, display_cats, forceCats, forceTags
  components: { TeaserBlog, Pagination, FormMultiChoice, FormSingleChoice },
  data() {
    return {
      currentIndex: 1,
      totalPages: 1,
      pickedCategories: -1,
      pickedTags: [],
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
    filteredPosts() {
      const categories = this.pickedCategories || this.bloc.forcedCats || null;
      const tags =
        this.pickedTags && this.pickedTags.length > 0
          ? this.pickedTags
          : this.bloc.forcedTags || null;

      let filteredPosts = this.posts;
      if (tags) {
        filteredPosts = filteredPosts.filter((post) => {
          return post.tags.find((tag) => {
            return tags.includes(tag.id);
          });
        });
      }
      if (categories && categories != -1) {
        // si -1 = all
        filteredPosts = filteredPosts.filter((post) => {
          return post.categories.find((category) => {
            return categories == category.id;
          });
        });
      }
      return filteredPosts; // Retourne all posts
    },
    limitedPosts() {
      // Limit
      const limit = parseInt(this.bloc?.nombre_de_posts);
      if (limit && limit != -1) {
        return this.filteredPosts.slice(0, limit);
      }
      return this.filteredPosts;
    },
  },
  methods: {
    changeCategory() {
      // On change category on revient première page
      this.currentIndex = 1;
    },
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
// Filtres
.form--blog-filters {
  @import "@/assets/scss/forms/material/_layout";
  @import "@/assets/scss/forms/material/_input";
  @import "@/assets/scss/forms/material/_info";

  @import "@/assets/scss/forms/material/_checkbox";
  @import "@/assets/scss/forms/material/_radio";
  @import "@/assets/scss/forms/material/_multichoice";
  margin-bottom: 4rem;
  & > * {
    margin-top: 2rem;
  }
  // Global fields
  .formMultiChoice > .form__label {
    margin-bottom: 2rem;
  }
  .formMultiChoice > .form__field {
    border: none;
    padding: 0;
  }

  // Specific
  .filters__categories {
    .form__field {
      width: 100%;
      border-bottom: solid 1px grey;
      border-radius: 0;
    }
    .form__group .form__label {
      margin-right: 2rem;
      border: none;
      color: $color__text;
      font-size: 1.6rem;
      font-weight: 600;
      &:hover {
        opacity: 1 !important;
      }
    }
    .form__group input:checked + label {
      background-color: transparent;
      color: $color__title;
    }
  }
  .filters__tags {
  }
}

// Liste articles
.blogPosts {
  .h2 {
    text-align: center;
    margin-bottom: 4rem;
  }
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