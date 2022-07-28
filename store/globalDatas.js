
export const state = () => ({
  globalDatas: {}
})

export const getters = {
}

export const mutations = {
  setDatas(state, datas) {
    state.globalDatas = datas;
  }
}

export const actions = {
  getGlobalDatas: async function ({ state, commit }) {
    let datas = await this._vm.$sourceWp.getGlobalDatas()
    commit('setDatas', datas)
  }
}