import lazyImg from "@/mixins/page/lazyImg/lazyImg";
import domChange from "./domChange";



export default {
  mounted() {
    if (!process.client) return;
    const vm = this;

    // Scripts dom dependants à lancer au siteLoad
    const domDependantScripts = ($root) => {
      $root = $root ? $root : document; // si pas d'element root spécifique, c'est le document qui est root
      lazyImg($root);

      vm.$debug('Refresh AOS')
      vm.$aos.refreshHard()

    }

    this.$debug("> site-load");
    this.$store.dispatch("siteLoad/siteLoad", () => {
      // Au site load, on charge les dom dependant script
      // Et on lance l'écouteur de dom pour refresh les dom dependant scripts
      domDependantScripts()
      domChange(domDependantScripts);
    });
  },
}