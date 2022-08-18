

export default {
  computed: {
    defaultThumbnail() {
      return this.$store?.state?.globalDatas?.globalDatas?.acf
        ?.default_thumbnail;
    },
    thumbnail() {
      return this.page?.acf?.featured_image || this.post?.acf?.featured_image || this.defaultThumbnail;
    },

  }
}