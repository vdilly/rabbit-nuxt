<template lang="pug">
main(v-if="page")
  TemplateContact(v-if="page.template == 'contact.php'", :page="page")
  TemplatePage(v-else, :page="page")
</template>
<script>
import pageMixin from "@/mixins/page/page";
import BannerStack from "@/components/blocs/Banners/BannerStack.vue";
import TemplatePage from "@/templates/TemplatePage.vue";
import TemplateContact from "@/templates/TemplateContact.vue";
export default {
  layout(ctx) {
    return ctx.params.slug == "contact" || ctx.params.slug == "about"
      ? "Decale"
      : "Default";
  },
  mixins: [pageMixin],
  components: { BannerStack, TemplatePage, TemplateContact },
  async asyncData({ store, params, error }) {
    let page = store.getters["pages/getPageBySlug"](params.slug);
    if (!page) return error({ statusCode: 404, message: "Page introuvable" });
    return { page };
  },
};
</script>
