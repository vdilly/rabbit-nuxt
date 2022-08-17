
export const state = () => ({
  posts: [],
  tags: [],
  categories: []
})

export const getters = {
  getPostBySlug: (state) => (slug) => {
    return state.posts.find(el => {
      return el.slug == slug
    })
  }
  // Get Category by ID
}

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setTags(state, tags) {
    state.tags = tags;
  }
}

export const actions = {
  getPosts: async function ({ state, commit }) {
    let posts = await this._vm.$sourceWp.getEntries('/posts')
    commit('setPosts', posts)
  },
  getCategories: async function ({ state, commit }) {
    let categories = await this._vm.$sourceWp.getEntries('/categories')
    await categories.forEach(async (category) => {
      let res = await this._vm.$sourceWp.getEntries('/posts?categories=' + category.id)
      category.posts = res;
    })
    commit('setCategories', categories)
  },
  getTags: async function ({ state, commit }) {
    let tags = await this._vm.$sourceWp.getEntries('/tags')
    await tags.forEach(async (tag) => {
      let res = await this._vm.$sourceWp.getEntries('/posts?tags=' + tag.id)
      tag.posts = res;
    })
    commit('setTags', tags)
  }
}