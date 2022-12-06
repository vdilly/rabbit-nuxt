const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_PUBLIC_KEY,
  process.env.MAILJET_PRIVATE_KEY
);


// var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
module.exports = async function ({ to, from, subject, HTML, attachments }) {
  // console.log(to, from, subject, HTML, attachments)
  try {
    const request = mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": from,
            "To": [
              {
                "Email": to
              }
            ],
            "Subject": subject,
            "HTMLPart": HTML,
            // "CustomID": "AppGettingStartedTest",
            "Attachments": attachments
          }
        ]
      })
    const res = await request
    console.log('>> Mail envoyé')
  } catch (error) {
    console.log(error.statusCode);
    console.log(error.message);
    return {
      statusCode: 403,
      body: "Erreur d'envoi du mail"
    }
  }
  return {
    statusCode: 200,
    body: "Success"
  }
}