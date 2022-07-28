<template lang="pug">
.container(v-if="page")
  h1(v-html="page.title")
</template>
<script>
import pageMixin from "@/mixins/page/page";
export default {
  layout: "Default",
  mixins: [pageMixin],
  computed: {
    page() {
      const slug = this.$route.params.slug;
      return this.$store.getters["pages/getPageBySlug"](slug);
    },
  },
};
</script>