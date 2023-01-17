<template lang="pug">
main(v-if="page")
  TemplateContact(:page="page")
</template>
<script>
import pageMixin from "@/mixins/page/page";
import TemplateContact from "@/templates/TemplateContact.vue";
export default {
  layout: "Default",
  mixins: [pageMixin],
  components: { TemplateContact },
  async asyncData({ store, params, error }) {
    let page = store.getters["pages/getPageBySlug"]("contact");
    if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    let unboundPage = JSON.parse(JSON.stringify(page)); // Unbind from store
    return { page: unboundPage };
  },
};
</script>
<style lang="scss">
body.contact {
  @include layoutImmersion($decale: true);
}
</style>