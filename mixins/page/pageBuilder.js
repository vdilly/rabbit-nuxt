export default {
  computed: {
    bannerBlocs() {
      return this.page?.acf?.page_builder?.banner?.blocs;
    },
    preContentBlocs() {
      return this.page?.acf?.page_builder?.pre_content?.blocs;
    },
    contentBlocs() {
      return this.page?.acf?.page_builder?.content?.blocs;
    },
    postContentBlocs() {
      return this.page?.acf?.page_builder?.post_content?.blocs;
    },
  }
}