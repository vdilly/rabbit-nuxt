
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
  },
  getCategoryById: (state) => (id) => {
    return state.categories.find(category => {
      return category.id == id
    })
  },
  getTagById: (state) => (id) => {
    return state.tags.find(tag => {
      return tag.id == id
    })
  }
}

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setCategories(state, categories) {
    state.categories = categories;
    state.categories.unshift({
      name: "Tous",
      id: -1
    })
  },
  setTags(state, tags) {
    state.tags = tags;
  }
}

export const actions = {
  populateTaxonomies: async ({ state, commit, getters }) => {
    state.posts = state.posts.map(post => {
      // Categories
      post.categories = post.categories.map(categoryId => {
        return getters.getCategoryById(categoryId)
      })

      // Tags
      post.tags = post.tags.map(tagId => {
        return getters.getTagById(tagId)
      })

      // console.log(post.categories)
      return post;
    })
  },
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