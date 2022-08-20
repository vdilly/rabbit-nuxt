<template lang="pug">
.teaser-blog(v-if="post")
  component.link-wrapper(:to="post.link", :is="post.link ? 'NuxtLink' : 'div'")
    .img-cover(v-if="thumbnail && thumbnail.mobile")
      img(:src="thumbnail.mobile.src", :alt="thumbnail.mobile.alt")
  .content
    component.link-wrapper(
      :to="post.link",
      :is="post.link ? 'NuxtLink' : 'div'"
    )
      h3.teaser-blog__title(v-html="post.title", v-if="post.title")
      p.teaser-blog__date(v-html="post.date", v-if="post.date")
      .teaser-blog__lead(v-html="post.excerpt", v-if="post.excerpt")
    ul.teaser-blog__tags(v-if="post.tags")
      li.teaser-blog__tag(v-for="(tag, index) in post.tags", :key="index")
        NuxtLink.tag(v-html="tag.name", :to="`/blog/tag/${tag.id}`")
  component.circle(:to="post.link", :is="post.link ? 'NuxtLink' : 'div'")
  svg.icon.arrow
    use(xlink:href="#arrow")
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
  background-color: white;
  border-radius: $bradius;
  overflow: hidden;
  box-shadow: $bshadow;
  height: 100%;
  display: flex;
  flex-direction: column;

  .link-wrapper {
    text-decoration: none;
  }
  .img-cover {
    height: 20rem;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .content {
    padding: 2rem 3rem;
    flex: 1;
  }
  &__title {
    font-size: 2rem;
    margin-bottom: 1.1rem;
    line-height: 1.4;
    color: $color__title;
  }
  &__date {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    line-height: 1.4;
    font-weight: 700;
    color: $color-1;
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

  // hover
  & {
    transition: transform 0.25s ease;
    img {
      transform-origin: 20% center;
      transition: transform 0.5s ease;
    }
    &:after {
      content: "";
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: $gradient-1;
      transform-origin: center;
      transition: opacity 0.4s ease;
      opacity: 0;
      pointer-events: none;
    }
    .circle {
      position: absolute;
      bottom: 0;
      right: 0;
      background: $gradient-1;
      border-radius: 50%;
      height: 16rem;
      width: 16rem;
      transform: translate(50%, 50%) scale(0);
      z-index: 4;
      transition: transform 0.25s ease;
    }
    .arrow {
      width: 2.5rem;
      height: 2.5rem;
      fill: white;
      position: absolute;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 5;
    }

    &:hover,
    &:focus {
      transform: translateY(-1rem);
      &:after {
        opacity: 0.2;
      }
      .circle {
        transform: translate(50%, 50%) scale(1);
      }
      .img-cover {
        img {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>