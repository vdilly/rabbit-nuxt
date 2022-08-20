<template lang="pug">
.logoList.section.section--grey
  Container
    h2.section-title(v-html="bloc.titre")
    .section-content
      ul.list
        li.item(v-for="logo in bloc.logos")
          .img-contain
            img(:src="logo.logo.src", width="120", height="60")
</template>
<style lang="scss">
.logoList {
  padding-top: 6rem;
  padding-bottom: 8rem;
  .section-title {
    font-family: $font__fancy;
    // color: $color__title;
    // opacity: 0.8;
    font-weight: 600;
    font-size: 2rem;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: -4rem;
    margin-top: -4rem;
  }
  .item {
    margin-left: 4rem;
    margin-top: 4rem;
  }
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
</style>
<script>
export default {
  props: ["bloc"],
};
</script>