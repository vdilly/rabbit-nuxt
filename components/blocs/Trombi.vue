<template lang="pug">
.trombi.section.section-big
  Container.container--xs
    h2.h2.section-title(v-html="bloc.titre")
    .description.section-description(v-html="bloc.description")
  Container.section-content.hr-top
    .list
      .item(v-for="item in bloc.items")
        .img-cover
          img(:src="item.photo.mobile.src")
        .name(v-html="item.nom")
        .role(v-html="item.role")
</template>
<script>
export default {
  props: ["bloc"],
};
</script>

<style lang="scss">
.trombi {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -4rem;
  }
  .item {
    width: calc(25% - 4rem);
    margin-left: 4rem;
    margin-top: 4rem;
    text-align: center;
  }
  .img-cover {
    height: 30rem;
    border-radius: $bradius;
  }
  .name {
    margin-top: 1rem;
    font-weight: 600;
    color: $color__title;
  }
  .role {
  }
}
</style>