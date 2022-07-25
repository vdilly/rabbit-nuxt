import { fetchPaged, formatWpEntity, getEntries } from "../utils/source-wp";

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
    let pages = await getEntries(this.$axios, '/pages')
    commit('setPages', pages)
  }
}