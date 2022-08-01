
import { formatDate } from "@/utils/date";

export default {
  computed: {
    excerpt() {
      return this.post.excerpt
        ? this.post.excerpt
        : htmlToText(this.post.content, {
          wordwrap: null,
          tags: {
            a: { format: "skip" },
            img: { format: "skip" },
          },
        }).substring(0, 600) + "[...]";
    },
    date() {
      return formatDate(this.post.date);
    },
    defaultThumbnail() {
      return this.$store?.state?.globalDatas?.globalDatas?.acf
        ?.default_thumbnail;
    },
    link() {
      return "/blog/" + this.post.slug + "/";
    },
    thumbnail() {
      return this.post?.acf?.featured_media || this.defaultThumbnail;
    },

  }
}