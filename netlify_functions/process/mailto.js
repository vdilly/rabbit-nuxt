var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix = 'Token';

// Configure API key authorization: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//partnerKey.apiKeyPrefix = 'Token';

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

try {
  await apiInstannce.sendTransacEmail({
    sender: { email: "contact@rabbit.com", name: "Rabbit Contact form" },
    to: ['vdilly.prod@gmail.com'],
    subject: 'Nouvelle soumission sur le formulaire de contact',
    htmlContent: `
        <h1>Cules Coding</h1>
        <a href="https://cules-coding.vercel.app/">Visit</a>
    `,
  })
} catch (err) {
  console.log(err)
}
apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
  console.log('API called successfully. Returned data: ' + data);
}, function (error) {
  console.error(error);
});