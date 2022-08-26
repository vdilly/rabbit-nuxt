<template lang="pug">
footer.footer
  Wave(v-if="theme.cutType == 'wave'")
  Container
    h2.h2 Footer
    ul.menu
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
  padding: 5rem 0;
  padding-top: 0;
  background: $gradient-1;

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