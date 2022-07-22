export const state = () => ({
  device: {
    type: "desktop",
    orientation: "landscape",
    os: "windows",
    useMouse: true
  }
})

export const mutations = {
  setDevice: function (state, device) {
    this._vm.$debug(device);
    state.device = { ...state.device, ...device };
  },
  setNoMouse: function (state) {
    this._vm.$debug("User mouse :" + false);
    state.device.useMouse = false;
  }
}

export const actions = {
  updateDevice: function ({ state, commit }, device) {
    commit("setDevice", {
      type: device.type,
      orientation: device.orientation,
      os: device.os
    });
  }
}