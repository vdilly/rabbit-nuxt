<template lang="pug">
component(:is="is", :title="title", :target="target", v-bind="computedLinkAttr")
  slot
</template>
<script>
export default {
  props: ["link"],
  computed: {
    isInternalLink() {
      return this.link?.url[0] == "/";
    },
    target() {
      return this.link?.target;
    },
    title() {
      return this.link?.title;
    },
    is() {
      return this.isInternalLink ? "NuxtLink" : "a";
    },
    computedLinkAttr() {
      if (!this.link) return null;
      return {
        [`${this.linkAttr}`]: this.link.url,
      };
    },
    linkAttr() {
      if (!this.link) return null;
      return !this.isInternalLink ? "href" : "to";
    },
  },
};
</script>