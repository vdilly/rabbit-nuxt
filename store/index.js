import WordPressSource from "../plugins/source-wp";
import WordpressSourceModule from "../modules/source-wp"
import Vue from "vue";
export const state = () => ({})

export const actions = {
  async nuxtServerInit({ state, commit, dispatch }, { app, req, ssrContext }) {

    console.log('SERVER INIT')
    let datas = {}
    if (process.env.forceSSR) {
      console.warn('>>> force SSR on reload à chaque f5 (dev mode)')
      datas = await WordpressSourceModule();
    } else {
      datas = ssrContext.$cache;
    }

    // on s'assure que ce code se lance qu'une fois au build, si on a déjà des datas pas besoin de redispatch
    // En mode dev (ssr) il se lance à chaque F5, si on veut le lancer à chaque changement de page suffit d'enlever la condition
    if (!state.pages.pages || state.pages.pages.length <= 0) {
      console.log('Dispatch datas')
      commit('pages/setPages', datas.pages)
      commit('posts/setUsers', datas.users)
      commit('posts/setCategories', datas.categories)
      commit('posts/setTags', datas.tags)
      commit('posts/setPosts', datas.posts)
      commit('globalDatas/setDatas', datas.globalDatas)
    }
  }
}