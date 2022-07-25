
export const state = () => ({
  pages: []
})

export const mutations = {
  setPages(state, pages) {
    state.pages = pages;
  }
}

export const actions = {
  getPages: async function ({ state, commit }) {
    let pages = await this._vm.$sourceWp.getEntries('/pages')
    commit('setPages', pages)
  }
}