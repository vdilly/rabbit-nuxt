const validator = require("validator");


exports.handler = async (event, context, callback) => {

  const body = JSON.parse(event.body);
  console.log(body);
  return {
    statusCode: 200,
    body: { formData, formFiles }
  }
}