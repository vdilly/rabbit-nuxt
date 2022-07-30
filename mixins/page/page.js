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
  mixins: [deviceMixin, windowMixin, siteLoadMixin, pageMixin],
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