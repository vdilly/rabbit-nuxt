import Vue from "vue";

const pageMixin = {
  head() {
    return {
      bodyAttrs: {
        class: [this.window.windowScrolled ? 'js-scrolled ' + this.window.scrollDirection : '', this.$route.name ? this.$route.name.toLowerCase() : ""]
      }
    }
  },
  async mounted() {
    // Get user notifications à chaque page load
    if (this.auth.user)
      await this.$store.dispatch('userNotifications/getUserNotifications')

    // // Scripts à lancer quand le dom change ou est ready
    // // Loadsite + Callback lazyImg
    // // Dom change (trigger dom scripts quand un élément [domchange] du dom écoute un changement dans ses childs (ajax))
    // domChange(domScripts);
  },
}

// Des computed sont aussi déclarées au niveaux Global
import deviceMixin from "./device";
import windowMixin from "./window";
import siteLoadMixin from "./siteLoad";

export default {
  mixins: [deviceMixin, windowMixin, siteLoadMixin, pageMixin]
}