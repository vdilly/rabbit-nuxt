<template lang="pug">
component.logo(
  :is="computedLinked ? 'NuxtLink' : 'div'",
  :to="computedLinked ? rootUrl : null",
  :title="computedLinked ? siteName : null"
)
  img(:src="computedLogoUrl", :alt="computedLogoAlt")
</template>

<style lang="scss">
.logo {
  img {
  }
}
</style>

<script>
export default {
  props: ["linked"],
  data() {
    return {
      logoUrl: require("@/assets/images/logo.png"),
      logoAlt: "Logo Click & Live",
    };
  },
  computed: {
    rootUrl() {
      switch (this.auth?.role) {
        case "Artiste":
          return this.url?.artiste?.dashboard;
        case "Organisateur":
          return this.url?.orga?.dashboard;
        case "Admin":
          return this.url?.orga?.dashboard;
        default:
          return "/";
      }
    },
    computedLinked() {
      return this.linked ? true : false;
    },
    computedLogoUrl() {
      return this.logoUrl ? this.logoUrl : this.logo?.url;
    },
    computedLogoAlt() {
      return this.logoAlt ? this.logoAlt : "Logo " + this.siteName;
    },
    siteName() {
      return process.env.siteName;
    },
    logo() {
      // TODO: récup le logo dynamic
      return null;
    },
  },
};
</script>