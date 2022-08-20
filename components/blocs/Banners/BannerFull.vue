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
    //- button.scrollDown
    //-   svg(viewBox="0 0 200 200", xmlns="http://www.w3.org/2000/svg")
    //-     defs
    //-       linearGradient#grad1(x1="0%", y1="0%", x2="100%", y2="100%")
    //-         stop(offset="0%", style="stop-color: #ffa69e; stop-opacity: 1")
    //-         stop(offset="100%", style="stop-color: #861657; stop-opacity: 1")
    //-     path(
    //-       fill="url(#grad1)",
    //-       d="M42.2,-46.8C53.2,-31.1,59.8,-15.6,61.7,1.9C63.6,19.4,60.8,38.7,49.8,55.3C38.7,71.9,19.4,85.7,-1,86.7C-21.4,87.8,-42.8,76,-56.6,59.4C-70.4,42.8,-76.7,21.4,-76,0.7C-75.4,-20.1,-67.8,-40.2,-54,-55.9C-40.2,-71.6,-20.1,-82.9,-2.3,-80.6C15.6,-78.3,31.1,-62.5,42.2,-46.8Z",
    //-       transform="translate(100 100)"
    //-     )
  Wave2
</template>
<script>
export default {
  props: ["bloc"],
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
        rgba(black, 0.7) 0%,
        rgba(black, 0.5) 60%,
        rgba(black, 0.8) 100%
      );
      // background: $gradient-1;
      opacity: 0.5;
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
    border-radius: 1rem;
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
  // .scrollDown {
  //   position: absolute;
  //   bottom: 0rem;
  //   left: 50%;
  //   z-index: 12;
  //   transform: translateX(-50%) translateY(50%);
  //   svg {
  //     height: 8rem;
  //     width: 8rem;
  //   }
  // }
  // Wave bot
  .wave {
    width: 192rem;
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 10;
    transform: translateX(-50%) translateY(40%) translateY(3rem);
  }
}
</style>