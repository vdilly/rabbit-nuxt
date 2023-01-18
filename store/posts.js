
export const state = () => ({
  posts: [],
  tags: [],
  categories: [],
  users: []
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
  getCategoryBySlug: (state) => (slug) => {
    return state.categories.find(category => {
      return category.slug == slug
    })
  },
  getTagById: (state) => (id) => {
    return state.tags.find(tag => {
      return tag.id == id
    })
  },
  getTagBySlug: (state) => (slug) => {
    return state.tags.find(tag => {
      return tag.slug == slug
    })
  },
  getUserById: (state) => (id) => {
    return state.users.find(user => {
      return user.id == id
    })
  }
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
  },
  setUsers(state, users) {
    state.users = users;
  }
}

// export const actions = {
//   populateTaxonomies: async ({ state, commit, getters }) => {
//     state.posts = state.posts.map(post => {
//       // Categories
//       post.categories = post.categories.map(categoryId => {
//         return getters.getCategoryById(categoryId)
//       })

//       // Tags
//       post.tags = post.tags.map(tagId => {
//         return getters.getTagById(tagId)
//       })

//       // Users
//       post.author = getters.getUserById(post.author);

//       // console.log(post.categories)
//       return post;
//     })
//   },
//   getPosts: async function ({ state, commit }) {
//     let posts = await this._vm.$sourceWp.getEntries('/posts')
//     commit('setPosts', posts)
//   },
//   getCategories: async function ({ state, commit }) {
//     let categories = await this._vm.$sourceWp.getEntries('/categories')
//     await categories.forEach(async (category) => {
//       let res = await this._vm.$sourceWp.getEntries('/posts?categories=' + category.id)
//       category.posts = res;
//     })
//     commit('setCategories', categories)
//   },
//   getTags: async function ({ state, commit }) {
//     let tags = await this._vm.$sourceWp.getEntries('/tags')
//     await tags.forEach(async (tag) => {
//       let res = await this._vm.$sourceWp.getEntries('/posts?tags=' + tag.id)
//       tag.posts = res;
//     })
//     commit('setTags', tags)
//   },
//   getUsers: async function ({ state, commit }) {
//     let users = await this._vm.$sourceWp.getEntries('/users')
//     await users.forEach(async (user) => {
//       let res = await this._vm.$sourceWp.getEntries('/posts?users=' + user.id)
//       user.posts = res;
//     })
//     commit('setUsers', users)
//   }
// }