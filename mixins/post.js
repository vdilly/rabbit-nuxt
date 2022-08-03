

export default {
  computed: {
    defaultThumbnail() {
      return this.$store?.state?.globalDatas?.globalDatas?.acf
        ?.default_thumbnail;
    },
    thumbnail() {
      return this.post?.acf?.featured_image || this.defaultThumbnail;
    },

  }
}