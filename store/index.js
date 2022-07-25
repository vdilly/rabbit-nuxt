
export const state = () => ({})

export const actions = {
  async nuxtServerInit({ state, commit, dispatch }, { app, req }) {
    console.log('---- FETCH WP DATAS ----')
    // Call tous les GET dans le store
    await dispatch('pages/getPages')
  }
}