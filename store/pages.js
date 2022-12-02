
export const state = () => ({
  pages: []
})

export const getters = {
  getPageByTemplate: (state) => (template) => {
    return state.pages.find(el => {
      return el.template == template
    })
  },
  getPageBySlug: (state) => (slug) => {
    return state.pages.find(el => {
      return el.slug == slug
    })
  }
}

export const mutations = {
  setPages(state, pages) {
    state.pages = pages;
  }
}

// export const actions = {
//   getPages: async function ({ state, commit }) {
//     let pages = await this._vm.$sourceWp.getEntries('/pages')
//     commit('setPages', pages)
//   }
// }