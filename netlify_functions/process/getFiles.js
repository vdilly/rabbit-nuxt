module.exports = function (formFiles) {
  let r = [];
  Object.values(formFiles).forEach(file => {
    r.push({
      "name": file.name,
      "content": file.file
    })
  })
  return r;
};