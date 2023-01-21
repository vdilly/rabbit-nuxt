import Vue from "vue";

const pageMixin = {
  head() {
    let seo = {}
    if (this.page) {
      seo = this.page.seo
    }
    return {
      bodyAttrs: {
        class: [this.window.windowScrolled ? 'js-scrolled ' + this.window.scrollDirection : '', this.$route.name ? this.$route.name.toLowerCase() : "", this.theme.cutType]
      },
      ...seo
    }
  },
  computed: {
    devTools() {
      return process.env.devTools;
    },
  },
  async mounted() {
    // // Scripts à lancer quand le dom change ou est ready
    // // Loadsite + Callback lazyImg
    // // Dom change (trigger dom scripts quand un élément [domchange] du dom écoute un changement dans ses childs (ajax))
    // domChange(domScripts);

    // Emiter pour devtool
    if (this.devTools) {
      setTimeout(() => {
        this.$nuxt.$emit('update-seoVisualizer', this.page.seo || null)
      }, 500)
    }
  },
}

// Des computed sont aussi déclarées au niveaux Global
import deviceMixin from "./device";
import windowMixin from "./window";
import siteLoadMixin from "./siteLoad";

export default {
  mixins: [deviceMixin, windowMixin, siteLoadMixin, pageMixin]
}