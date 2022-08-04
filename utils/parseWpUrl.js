export default function (string, debug = false) {
  const urls = [
    process.env.WP_URL,
    process.env.IMAGE_URL,
  ];

  urls.forEach(url => {
    if (!url) return;
    if (debug) console.log("--------------");
    if (debug) console.log("Search for " + url + " in " + string);
    const wpurl = new RegExp(url, "g");
    string = string.replace(wpurl, '');
    if (debug) console.log("Result: " + string);
  });

  return string;
}
