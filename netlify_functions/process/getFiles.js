module.exports = function (formFiles) {
  let r = [];
  Object.values(formFiles).forEach(file => {
    r.push({
      "ContentType": file.type,
      "Filename": file.name,
      "Base64Content": file.file
    })
  })
  return r;
};