<template lang="pug">
.logoSlider.section.section--grey
  Container
    h2.section-title(v-html="bloc.titre")
  ClientOnly
    .section-content
      .swipe(v-swiper:myswiper="swiperOption", js-observe-scroll="")
        .swiper-wrapper(ref="wrapper")
          .swiper-slide(v-for="logo in bloc.logos")
            .img-contain
              img(:src="logo.logo.src", width="120", height="60")
</template>

<script>
import Vue from "vue";
import "swiper/dist/css/swiper.css";
export default {
  props: ["bloc"],
  data() {
    const _this = this;
    return {
      swiperOption: {
        autoplay: {
          delay: 1,
        },
        loop: true,
        speed: 5000,
        spaceBetween: 100,
        grabCursor: true,
        slidesPerView: "auto",
        // centeredSlides: true,
        slidesOffsetBefore: 80,
        slidesOffsetAfter: 80,
        freeMode: true,
        touchRatio: 1,
        longSwipesRatio: 0.4,
        touchStartPreventDefault: false, // Utile pour le Follow Cursor
        breakpoints: {
          768: {
            spaceBetween: 40,
          },
        },
        on: {
          touchStart: function (e) {
            // if (
            //   e.target.classList.contains(".swiper-wrapper") ||
            //   e.target.closest(".swiper-wrapper")
            // ) {
            //   document
            //     .querySelector(".swipe-sample .swiper-wrapper")
            //     .classList.add("grabbing");
            // }
          },
          touchEnd: function (e) {
            // document
            //   .querySelector(".swipe-sample .swiper-wrapper")
            //   .classList.remove("grabbing");
          },
        },
      },
    };
  },
  computed: {},
  methods: {},
  mounted() {
    if (process.browser) {
      const VueAwesomeSwiper = require("vue-awesome-swiper/dist/ssr");
      Vue.use(VueAwesomeSwiper);
    }
  },
};
</script>

<style lang="scss">
.logoSlider {
  .section-title {
    font-family: $font__fancy;
    font-weight: 600;
    font-size: 2rem;
  }
  .swiper-wrapper {
    transition-timing-function: linear !important;
  }
  .swiper-slide {
    width: 14rem;
    display: flex;
    align-items: center;
    padding: 2rem 0;

    .img-contain {
      width: 12rem;
      height: 6rem;
    }
    img {
      filter: grayscale(1);
      opacity: 0.5;
      transition: 0.25s ease;
      &:hover {
        opacity: 1;
        filter: none;
      }
    }
  }
}
</style>