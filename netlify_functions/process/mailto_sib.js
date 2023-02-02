var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix = 'Token';

// Configure API key authorization: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//partnerKey.apiKeyPrefix = 'Token';

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
module.exports = async function ({ to, from, subject, HTML, attachments }) {
  // console.log(to, from, subject, HTML, attachments)
  try {
    let config = {
      sender: from,
      to: to,
      subject: subject,
      htmlContent: HTML,
    }
    if (attachments) {
      config.attachment = attachments;
    }
    const res = await apiInstance.sendTransacEmail(config)
  } catch (err) {
    console.log(err.response.body)
    throw new Error(err)
  }
}