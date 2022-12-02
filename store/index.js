import WordPressSource from "../plugins/source-wp";
import Vue from "vue";
export const state = () => ({})

export const actions = {
  async nuxtServerInit({ state, commit, dispatch }, { app, req, ssrContext }) {

    console.log('SERVER INIT')

    let datas = ssrContext.$cache;

    if (!state.pages.pages || state.pages.pages.length <= 0) {
      console.log('Dispatch datas')
      commit('pages/setPages', datas.pages)
      commit('posts/setUsers', datas.users)
      commit('posts/setCategories', datas.categories)
      commit('posts/setTags', datas.tags)
      commit('posts/setPosts', datas.posts)
      commit('globalDatas/setDatas', datas.globalDatas)
    }

    return true

    // Init WordpressSourceModule
    let source = new WordPressSource(this.$axios);
    Vue.prototype.$sourceWp = source;

    // Call tous les GET dans le store
    await dispatch('pages/getPages')
    await dispatch('posts/getCategories')
    await dispatch('posts/getUsers')
    await dispatch('posts/getTags')
    await dispatch('posts/getPosts')
    await dispatch('posts/populateTaxonomies')
    await dispatch('globalDatas/getGlobalDatas')
  }
}