import Vue from "vue";

export default {
  mounted() {
    if (!process.client) return;
    const vm = this;

    // Device
    this.$debug("> current-device");
    let currentDevice = require("current-device")["default"];
    this.$store.dispatch("device/updateDevice", currentDevice);
    if (!window.gotTouchstartEvent)
      window.addEventListener("touchstart", function () {
        vm.$store.commit("device/setNoMouse");
      }, { once: true });
    window.gotTouchstartEvent = true;
  },
}