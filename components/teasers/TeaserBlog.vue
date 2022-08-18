<template lang="pug">
.teaser-blog(v-if="post")
  component.link-wrapper(:to="post.link", :is="post.link ? 'NuxtLink' : 'div'")
    .img-cover(v-if="thumbnail && thumbnail.mobile")
      img(:src="thumbnail.mobile.src", :alt="thumbnail.mobile.alt")
    h3.teaser-blog__title(v-html="post.title", v-if="post.title")
    p.teaser-blog__date(v-html="post.date", v-if="post.date")
    .teaser-blog__lead(v-html="post.excerpt", v-if="post.excerpt")
  ul.teaser-blog__tags(v-if="post.tags")
    li.teaser-blog__tag(v-for="(tag, index) in post.tags", :key="index")
      NuxtLink.tag(v-html="tag.name", :to="`/blog/tag/${tag.id}`")
</template>

<script>
import postMixin from "@/mixins/post";
export default {
  props: ["post"],
  mixins: [postMixin],
};
</script>

<style lang="scss">
// https://codepen.io/pwkip/pen/oGMZjb link inside link
.teaser-blog {
  position: relative;
  .link-wrapper {
    text-decoration: none;
  }
  .img-cover {
    height: 20rem;
    width: 100%;
    margin-bottom: 2rem;
    border-radius: 0.7rem;
    position: relative;
    overflow: hidden;

    &:after {
      content: "";
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: linear-gradient(
        to bottom left,
        rgba($color__core, 0.2) 0%,
        rgba($color__core, 0.3) 80%,
        rgba($color__core, 0.8) 100%
      );
      transform-origin: center;
      transition: opacity 0.25s ease;
      opacity: 0;
    }
  }
  &__title {
    font-size: 2rem;
    margin-bottom: 1.2rem;
    line-height: 1.4;
    color: $color__title;
  }
  &__date {
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    line-height: 1.4;
    font-weight: 700;
  }
  &__lead {
    font-size: 1.6rem;
    line-height: 1.4;
  }
  &__tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: $m1;
    pointer-events: none;
    position: relative;
    z-index: 2;
    margin-top: 0.5rem;
    margin-left: -1rem;
  }
  &__tag {
    pointer-events: all;
    position: relative;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  .tag {
    background-color: $color__grey;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    font-size: 1.2rem;
    line-height: 1.2;
    text-decoration: none;
    transition: color 0.25s ease, background-color 0.25s ease;
    &:hover {
      background-color: darken($color__grey, 50);
      color: $color__core-font;
    }
  }
  // hover
  .link-wrapper {
    img {
      transform-origin: 20% center;
      transition: transform 0.5s ease;
    }
    &:hover,
    &:focus {
      .teaser-blog__title {
        // text-decoration: underline;
      }
      .img-cover {
        img {
          transform: scale(1.1);
        }
        &:after {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>