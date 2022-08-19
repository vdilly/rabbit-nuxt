<template lang="pug">
nav.ariane(role="navigation", aria-label="Fil d'ariane")
  ul.ariane__list
    li.ariane__item
      NuxtLink(to="/")
        svg.icon
          use(xlink:href="#home")
    li.ariane__item(v-for="item in ariane", :key="item.link")
      component(
        :to="item.link",
        v-html="item.label",
        :is="item.link ? 'NuxtLink' : 'div'"
      )
</template>

<script>
export default {
  props: ["ariane"],
};
</script>

<style lang="scss">
.ariane {
  margin-bottom: 4rem;
  &__list {
    display: flex;
    align-items: flex-end;
  }
  &__item {
    display: flex;
    align-items: center;
    &:not(:last-child):after {
      content: ">";
      margin: 0 0.8rem;
      font-family: $font__fancy;
      font-weight: 400;
    }

    color: $color__title;
    font-weight: 400;
    font-size: 1.5rem;

    a {
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      &:hover {
        text-decoration: underline;
      }
    }
    .icon {
      height: 1.7rem;
      width: 1.7rem;
      fill: $color__title;
    }
  }
}
</style>