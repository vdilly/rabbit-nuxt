import path from 'path'
import fs from 'fs'
let routes = [];

const excludes = [
  '/showcase-blocs'
]

export default async function () {

  this.nuxt.hook('generate:routeCreated', ({ route, path, errors }) => {
    routes.push(route);
  })
  this.nuxt.hook('generate:done', async (generator, errors) => {
    const sitemapPath = path.join(
      generator.nuxt.options.generate.dir,
      'sitemap.xml'
    )
    routes = excludeRoutes(routes);
    let xml = buildXml(routes);
    await writeXml(xml, sitemapPath);
    console.log('✔ Sitemap.xml generated')
  })
}


function excludeRoutes(routes) {
  excludes.forEach(excludePath => {
    let index = routes.indexOf(excludePath);
    if (index == -1) return
    routes.splice(index, 1)
  })
  return routes;
}

// Write le sitemap.xml
async function writeXml(xml, path) {
  await fs.writeFileSync(path, xml)
}

// Build le contenu du fichier sitemap
function buildXml(routes) {
  // Build le xml
  let xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';

  routes.forEach(route => {
    xml += `<url><loc>${process.env.SITE_URL + route}</loc></url>`
  })

  xml += '</urlset>'

  return xml;

}