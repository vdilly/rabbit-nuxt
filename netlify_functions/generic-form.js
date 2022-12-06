const validator = require("validator");
const getFiles = require('./process/getFiles');
const getDatas = require('./process/getDatas');
const sendMail = require('./process/mailto');


exports.handler = async (event, context, callback) => {


  try {
    const body = JSON.parse(event.body);
    let HTML = getDatas(body.form);
    let attachments = getFiles(body.files);
    let subject = body.subject || "Nouvelle soumission";
    let to = process.env.ADMIN_EMAIL;
    let from = { Email: process.env.CONTACT_SENDER, Name: `Formulaire ${process.env.SITE_NAME}` }
    const res = await sendMail({ to, from, subject, HTML, attachments });
  } catch (err) {
    // console.warn(err)
    return {
      statusCode: 403,
      body: "Erreur d'envoi de mail"
    }
  }

  return {
    statusCode: 200,
    body: "Formulaire bien envoyé"
  }
}