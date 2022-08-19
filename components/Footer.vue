<template lang="pug">
footer.footer
  Container
    ul.menu
      li
  ThemeBuilder
</template>
<script>
import ThemeBuilder from "@/components/ThemeBuilder.vue";
export default {
  components: { ThemeBuilder },
};
</script>
<style lang="scss">
.footer {
  padding: 2rem 0;

  .menu {
    text-align: center;
    font-size: 1.6rem;
    a {
      color: white;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>