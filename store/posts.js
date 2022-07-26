
export const state = () => ({
  posts: []
})

export const getters = {
  getPostBySlug: (state) => (slug) => {
    return state.posts.find(el => {
      return el.slug == slug
    })
  }
}

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  }
}

export const actions = {
  getPosts: async function ({ state, commit }) {
    let posts = await this._vm.$sourceWp.getEntries('/posts')
    commit('setPosts', posts)
  }
}