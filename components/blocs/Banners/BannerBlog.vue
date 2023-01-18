<template lang="pug">
.bannerBlog
  .img-cover(v-if="bloc")
    img(:src="bloc.image.full.src", :alt="bloc.image.alt", v-if="bloc.image")
  Container.container--article
    slot(name="pre")
    .categories(v-if="bloc.categories")
      NuxtLink(
        v-for="category in bloc.categories",
        v-html="category.name",
        :to="category.link",
        :key="category.slug"
      )
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
.bannerBlog {
  .img-cover {
    position: relative;
    height: 80vw;
    max-height: 40rem;
    background: $gradient-1;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: linear-gradient(
        to bottom,
        rgba(black, 0.2) 0%,
        rgba(white, 0.4) 60%,
        rgba(white, 1) 100%
      );
    }
  }
  .container {
    position: relative;
    z-index: 3;
    margin-top: -8rem;
    margin-bottom: 4rem;
  }
  .categories {
    color: $color__title;
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
    font-weight: 600;
  }
  .author {
    display: flex;
    align-items: center;
    margin-top: 2rem;
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
  }
  .name {
    letter-spacing: -0.02em;
    font-weight: 700;
    color: $color__title;
    line-height: 1;
  }
  .date {
    font-size: 1.3rem;
  }
}

// Ariane
.bannerBlog .ariane {
  opacity: 0.7;
}
</style>