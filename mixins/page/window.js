export default {
  mounted() {
    const vm = this;
    this.$debug("> window-events");
    this.$store.dispatch("window/update");
    if (!window.gotScrollEvent) {
      window.addEventListener("scroll", function () {
        vm.$store.dispatch("window/updateScroll");
      });
      window.gotScrollEvent = true;
    }
    if (!window.gotResizeEvent) {
      window.addEventListener("resize", function () {
        vm.$store.dispatch("window/updateRange");
      });
      window.gotResizeEvent = true;
    }
  }
}