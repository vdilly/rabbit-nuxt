const validator = require("validator");
const getFiles = require('./process/getFiles');
const getDatas = require('./process/getDatas');


exports.handler = async (event, context, callback) => {

  const body = JSON.parse(event.body);
  console.log(body);
  const formData = body.form;
  const formFiles = body.files;
  return {
    statusCode: 200,
    body: body
  }
}