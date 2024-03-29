/**
 * ça serait cool de le refacto, avoir des fonctions pour aller getById etc...
 */

import axios from 'axios';
import WordPressSource from "../plugins/source-wp";

export default async function () {

  // Create client
  const client = axios.create({
    baseURL: process.env.WP_API_URL + '/wp/v2'
  })
  // Create sourceWP instance
  console.log("%c ✔️ Fetch WP datas", "font-size: large; color: green; font-weight: bold; ");
  let source = new WordPressSource(client);
  let data = {};

  try {
    // Globaldata
    data.globalDatas = await source.getGlobalDatas();

    // Pages
    data.pages = await source.getEntries('/pages');

    // Categories
    data.categories = await source.getEntries('/categories')
    await data.categories.forEach(async (category) => {
      let res = await source.getEntries('/posts?categories=' + category.id)
      category.posts = res;
    })

    // Users
    data.users = await source.getEntries('/users')
    await data.users.forEach(async (user) => {
      let res = await source.getEntries('/posts?users=' + user.id)
      user.posts = res;
    })

    // Tags
    data.tags = await source.getEntries('/tags');
    await data.tags.forEach(async (tag) => {
      let res = await source.getEntries('/posts?tags=' + tag.id)
      tag.posts = res;
    })

    // Posts
    data.posts = await source.getEntries('/posts');

    // populate taxonomies
    data.posts = data.posts.map(post => {
      // Categories
      post.categories = post.categories.map(categoryId => {
        return data.categories.find(category => {
          return category.id == categoryId
        })
      })

      // Tags
      post.tags = post.tags.map(tagId => {
        return data.tags.find(el => {
          return el.id == tagId
        })
      })

      // Users
      post.author = data.users.find(el => {
        return el.id == post.author
      })
      return post;
    })

    // Ajout de la catégorie "tous", elle doit pas être créé avant de populate, on la populate pas
    data.categories.unshift({
      name: "Tous",
      id: -1
    })

    // Log quiet errors
    source.logQuietErrors()



  }
  catch (e) {
    console.log(e);
    throw new Error(e)
  }
  if (process.env.forceSSR) {
    return data;
  } else {
    // attention à pas confondre, on parle de SSR ici, mais c'est en fait passer les datas static à la fonction de SSR, donc c'est le static mode
    this.nuxt.hook('vue-renderer:ssr:prepareContext', (ssrContext) => {
      ssrContext.$cache = data
    })
  }
}