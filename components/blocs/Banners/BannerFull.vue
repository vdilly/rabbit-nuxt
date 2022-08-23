<template lang="pug">
.bannerFull
  .img-cover(v-if="bloc")
    img.banner-img(
      :src="bloc.image.full.src",
      :alt="bloc.image.alt",
      v-if="bloc.image"
    )
    //- .bg(:style="`background-image: url(${bloc.image.mobile.src});`")
    Container
      .text
        h1.h1(v-html="bloc.titre", v-if="bloc.titre")
        .description.rte(v-html="bloc.description", v-if="bloc.description")
        Btn.core(v-if="bloc.bouton", :link="bloc.bouton")
          span(v-html="bloc.bouton.title")
    button.scrollDown(@click="scrollContent")
      .inner
        span Scroll
        svg.icon
          use(xlink:href="#arrow")
  template(v-if="theme.cutType == 'wave'")
    Wave2.wave-gradient(fill="url(#grad1)")
    Wave2
</template>
<script>
import smoothScroll from "@/utils/smoothScroll";
export default {
  props: ["bloc"],
  methods: {
    scrollContent() {
      smoothScroll(".region--content", 80);
    },
  },
};
</script>

<style lang="scss">
.bannerFull {
  overflow: hidden;
  position: relative;
  &:after {
    z-index: 4;
  }
  .img-cover {
    position: relative;
    height: 80vw;
    max-height: 80rem;
    display: flex;
    align-items: flex-end;
    @include RWD(mobile) {
      max-height: 45rem;
    }
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
        rgba(black, 0.6) 0%,
        rgba(black, 0.3) 60%,
        rgba(black, 1) 100%
      );
      // background: $gradient-1;
      opacity: 0.6;
    }
  }
  .banner-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .container {
    position: relative;
    margin-bottom: 20rem;
    z-index: 4;
    display: flex;
  }
  .text {
    padding: 6rem 5rem 5rem;
    border-radius: $bradius;
    background: $gradient-1;
    width: 54rem;
  }
  .h1 {
    // font-weight: 500;
    font-size: 7rem;
    color: white;
  }
  .description {
    color: white;
    font-size: 2rem;
    font-weight: 600;
    margin-top: 1rem;
  }
  .btn {
    margin-top: 3rem;
  }

  // ScrollDown
  .scrollDown {
    position: absolute;
    bottom: calc(10rem + 1vw);
    right: 10%;
    z-index: 12;
    color: white;
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.1em;
    font-family: $font__fancy;
    opacity: 0.9;
    animation: bounce infinite 3s;
    .inner {
      display: flex;
      align-items: center;
      transform-origin: center;
      transform: rotate(90deg);
    }
    .icon {
      fill: white;
      width: 2rem;
      height: 2rem;
      margin-left: 1rem;
    }
  }
  // Wave bot
  .wave {
    min-width: 192rem;
    width: 100vw;
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 10;
    transform: translateX(-50%) translateY(40%) translateY(3rem) rotate(1deg);
  }
  .wave-gradient {
    bottom: 0rem;
    transform: translateX(-50%) translateY(40%) translateY(3rem) rotate(-0.5deg);
  }
}
</style>