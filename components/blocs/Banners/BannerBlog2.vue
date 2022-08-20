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
        span(v-for="category in bloc.categories", v-html="category.name")
      h1.h1(v-html="bloc.titre", v-if="bloc.titre")
      .author(v-if="author")
        img.avatar(v-if="author.avatar", :src="author.avatar.logo.src")
        .text
          .name(v-html="author.nom_a_afficher", v-if="author.nom_a_afficher")
          //- .role(v-html="author.role", v-if="author.role")
          .date(v-html="bloc.date", v-if="bloc.date")
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
  padding-top: 18rem;
  padding-bottom: 20rem;
  position: relative;
  background: $gradient-1;
  &:after {
    background-color: white;
    content: "";
    position: absolute;
    bottom: -0.1rem;
    right: 0;
    width: 100%;
    height: 7rem;
    clip-path: polygon(0 100%, 100% 100%, 100% 0);
    // transform: translateY(100%);
    z-index: 1;
  }
  .container {
    position: relative;
    z-index: 3;
    // margin-bottom: 4rem;
    // background-color: $color__page-bg;
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

    span {
      background-color: $color-1;
      color: $color-1-font;
      padding: 0.3rem 0.5rem;
      border-radius: $bradius;
    }
  }
  .h1 {
    font-size: 7rem;
    font-weight: 600;
    color: $color-1-font;
  }
  .author {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    color: $color-1-font;
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
    color: $color-1-font;
  }
  .name {
    letter-spacing: -0.02em;
    font-weight: 700;
    color: $color-1-font;
    line-height: 1;
  }
  .date {
    font-size: 1.3rem;
    opacity: 0.8;
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