<template lang="pug">
.teaser-blog(v-if="post")
  NuxtLink.teaser-blog__overlay-link(:to="post.link", v-if="post.link")
  .teaser-blog__bg(
    :style="`background-image: url(${thumbnail.mobile.src});`",
    v-if="thumbnail && thumbnail.mobile"
  )
  h3.teaser-blog__title(v-html="post.title", v-if="post.title")
  p.teaser-blog__date(v-html="post.date", v-if="post.date")
  .teaser-blog__lead(v-html="post.excerpt", v-if="post.excerpt")
  ul.teaser-blog__tags(v-if="post.tags")
    li.teaser-blog__tag(v-for="(tag, index) in post.tags", :key="index")
      .blogpost-tag.blogpost-tag--grey(v-html="tag.title")
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
  &__overlay-link {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  &__bg {
    height: 20rem;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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
    margin-bottom: 0.5rem;
    color: $color__core;
  }
  &__date {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    font-weight: 700;
  }
  &__lead {
    font-size: 1.6rem;
  }
  &__tag {
    pointer-events: all;
    position: relative;
    &s {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: $m1;
      pointer-events: none;
      position: relative;
      z-index: 2;
    }
    & + & {
      margin-left: 0.5rem;
    }
  }
  // hover
  &__overlay-link {
    &:hover,
    &:focus {
      & ~ .teaser-blog__title {
        text-decoration: underline;
      }
      & ~ .teaser-blog__bg {
        &:after {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>