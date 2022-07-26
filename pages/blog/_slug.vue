<template lang="pug">
.container(v-if="page")
  h1(v-html="page.title")
</template>
<script>
export default {
  layout: "Default",
  computed: {
    page() {
      const slug = this.$route.params.slug;
      return this.$store.getters["posts/getPostBySlug"](slug);
    },
  },
};
</script>