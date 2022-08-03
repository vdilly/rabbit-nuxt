import WordPressSource from "../plugins/source-wp";
import Vue from "vue";
export const state = () => ({})

export const actions = {
  async nuxtServerInit({ state, commit, dispatch }, { app, req }) {

    // Init WordpressSourceModule
    let source = new WordPressSource(this.$axios);
    Vue.prototype.$sourceWp = source;

    console.log('---- FETCH WP DATAS ----')
    // Call tous les GET dans le store
    await dispatch('pages/getPages')
    await dispatch('posts/getPosts')
    await dispatch('globalDatas/getGlobalDatas')
  }
}