
export const state = () => ({
  theme: {
    cutType: 'wave'
  }
})

export const getters = {
}

export const mutations = {
  setCutType(state, value) {
    state.theme.cutType = value;
  }
}