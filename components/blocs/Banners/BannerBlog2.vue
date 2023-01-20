<template lang="pug">
.bannerBlog2(v-if="bloc")
  Container
    slot(name="pre")
  Container
    .left
      img.featured-img(
        :src="bloc.image.full.src",
        :alt="bloc.image.alt",
        v-if="bloc.image"
      )
    .right
      .categories(v-if="bloc.categories")
        NuxtLink.item(
          v-for="category in bloc.categories",
          v-html="category.name",
          :to="category.link",
          :key="category.slug"
        )
      h1.h1(v-html="bloc.titre", v-if="bloc.titre")
      ul.tags(v-if="bloc.tags")
        li.item(v-for="(tag, index) in bloc.tags", :key="index")
          NuxtLink.tag(v-html="tag.name", :to="`/blog/tag/${tag.slug}`")
      .author(v-if="author")
        img.avatar(v-if="author.avatar", :src="author.avatar.logo.src")
        .text
          .name(v-html="author.nom_a_afficher", v-if="author.nom_a_afficher")
          //- .role(v-html="author.role", v-if="author.role")
          .date(v-html="bloc.date", v-if="bloc.date")
  Wave2(v-if="theme.cutType == 'wave'")
</template>
<script>
export default {
  props: ["bloc"],
  computed: {
    author() {
      return this.bloc?.author?.acf;
    },
  },
};
</script>

<style lang="scss">
.bannerBlog2 {
  position: relative;
  .container {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
    }
    .right {
      width: 60rem;
      margin-left: 4rem;
    }
  }
  .featured-img {
    border-radius: $bradius;
  }

  .categories {
    color: $color-1-font;
    // opacity: 0.5;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 1rem;

    .item {
      display: inline-flex;
      background-color: $color-1;
      color: $color-1-font;
      padding: 0.5rem 1rem;
      border-radius: $bradius;
      text-decoration: none;
      line-height: 0.8;
    }
  }
  .h1 {
    line-height: 1.1;
    font-size: 7rem;
    font-weight: 600;
    // color: $color-1-font;
  }
  .author {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    // color: $color-1-font;
  }
  .avatar {
    border-radius: 50rem;
    height: 5rem;
    width: 5rem;
    margin-right: 1.5rem;
  }
  .text {
    display: flex;
    flex-direction: column;
    // color: $color-1-font;
  }
  .name {
    letter-spacing: -0.02em;
    font-weight: 700;
    // color: $color-1-font;
    line-height: 1;
  }
  .date {
    font-size: 1.3rem;
    opacity: 0.8;
  }
}

// Tags

.tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: $m1;
  pointer-events: none;
  position: relative;
  z-index: 2;
  margin-top: 2rem;
  margin-left: -1rem;
  .item {
    pointer-events: all;
    position: relative;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  .tag {
    background-color: $color__grey;
    border-radius: $bradius;
    padding: 0.3rem 1rem;
    font-size: 1.2rem;
    line-height: 1.2;
    text-decoration: none;
    transition: color 0.25s ease, background-color 0.25s ease;
    &:hover {
      background-color: darken($color__grey, 50);
      color: $color-1-font;
    }
  }
}

// Ariane
.bannerBlog2 .ariane {
  margin-bottom: 2rem;
  transform: translateY(-2rem);
  .icon {
    fill: white;
  }
  &__item {
    color: white;
  }
}
.bannerBlog2 ~ .region--content {
  margin-top: -14rem;
  position: relative;
  z-index: 4;
  .main-container,
  .container {
    max-width: 80rem;
    padding-left: 5rem;
    padding-right: 5rem;
  }
  .main-container {
    padding: 4rem 5rem;
    border-radius: $bradius;
    background-color: $color__page-bg;
  }
}
</style>