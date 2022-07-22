// import express from 'express'
// import validator from "validator"
// import xssFilters from 'xss-filters'
// const app = express()
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENGRID_API_KEY)

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// function getHash() {
//   return Math.floor(Math.random() * 999999);
// }


// app.post('/mail', async (req, res) => {
//   // XSS filter
//   for (const key in req.body) {
//     req.body[key] = xssFilters.inHTMLData(req.body[key])
//   }
//   const { nom, prenom, email, message, a_password } = req.body;

//   // Validations
//   const errors = [];
//   if (a_password != "") {
//     errors.push('Êtes-vous sûr de ne pas être un robot ?')
//   }
//   if (prenom.length < 3) {
//     errors.push('Votre prénom doit comporter au moins 3 caractères')
//   }
//   if (!validator.isEmail(email)) {
//     errors.push('Email invalide')
//   }
//   if (message.length < 25) {
//     errors.push('Votre message doit être d\'au moins 25 caractères')
//   }

//   // S'il y a des erreurs
//   if (errors.length) {
//     return res.status(422).json({ 'errors': errors })
//   }



//   try {
//     // Mise en forme du message
//     const html = `
//     <div>
//       <p> <strong>Nom :</strong> ${nom} </p>
//       <p> <strong>Prénom :</strong> ${prenom} </p>
//       <p> <strong>Email :</strong> ${email} </p>
//       <p> <strong>Message :</strong></p>
//       <p> ${message} </p>
//     </div>
//   `
//     const msg = {
//       from: {
//         name: "Aurélien de Click and Live",
//         email: 'atassart@clickandlive.fr'
//       }, // Change to your verified sender
//       subject: 'Nouvelle soumission sur formulaire de Contact ' + getHash(),
//       html: html,
//       personalizations: [
//         {
//           to: process.env.EMAIL
//         }
//       ]
//     }
//     const mail = await sgMail.send(msg)
//     return res.status(200).json({ "message": "Message envoyé" })
//   } catch (err) {
//     console.log(err)
//     return res.status(400)
//   }

// })

// app.post('/bug', async (req, res) => {
//   // XSS filter
//   for (const key in req.body) {
//     req.body[key] = xssFilters.inHTMLData(req.body[key])
//   }
//   const { nom, prenom, email, message, a_password } = req.body;
//   const errors = [];
//   if (a_password != "") {
//     errors.push('Êtes-vous sûr de ne pas être un robot ?')
//   }
//   if (email && !validator.isEmail(email)) {
//     errors.push('Email invalide')
//   }
//   if (message.length < 25) {
//     errors.push('Votre message doit être d\'au moins 25 caractères')
//   }

//   // S'il y a des erreurs
//   if (errors.length) {
//     return res.status(422).json({ 'errors': errors })
//   }

//   try {
//     const html = `
//     <div>
//       <p> <strong>Email :</strong> ${email} </p>
//       <p> <strong>Message :</strong></p>
//       <p> ${message} </p>
//     </div>
//   `
//     const msg = {
//       from: {
//         name: "Bug de Click and Live",
//         email: 'atassart@clickandlive.fr'
//       }, // Change to your verified sender
//       subject: 'Nouveau rapport de bug ' + getHash(),
//       html: html,
//       personalizations: [
//         {
//           to: "vdilly.prod+cnl@gmail.com"
//         }
//       ]
//     }
//     const mail = await sgMail.send(msg)
//     return res.status(200).json({ "message": "Message envoyé" })
//   } catch (err) {
//     console.log(err)
//     return res.status(400)
//   }

// })

// app.post('/report', async (req, res) => {
//   // XSS filter
//   for (const key in req.body) {
//     req.body[key] = xssFilters.inHTMLData(req.body[key])
//   }
//   const { email, message, ficheArtistId, a_password } = req.body;
//   const errors = [];
//   if (a_password != "") {
//     errors.push('Êtes-vous sûr de ne pas être un robot ?')
//   }
//   if (email && !validator.isEmail(email)) {
//     errors.push('Email invalide')
//   }
//   if (message.length < 15) {
//     errors.push('Votre message doit être d\'au moins 15 caractères')
//   }
//   if (!ficheArtistId) {
//     errors.push('Artiste introuvable')
//   }

//   // S'il y a des erreurs
//   if (errors.length) {
//     return res.status(422).json({ 'errors': errors })
//   }


//   try {
//     const html = `
//     <div>
//       <p><a target="_blank" href="${process.env.ADMIN_URL}/content-manager/collectionType/api::ficheartiste.ficheartiste/${ficheArtistId}">Fiche artiste concernée</a> </p>
//       <p> <strong>Email :</strong> ${email} </p>
//       <p> <strong>Message :</strong></p>
//       <p> ${message} </p>
//     </div>
//   `
//     const msg = {
//       from: {
//         name: "Signalement d'un contenu innaproprié - Click & Live ",
//         email: 'atassart@clickandlive.fr'
//       }, // Change to your verified sender
//       subject: 'Nouveau rapport de bug ' + getHash(),
//       html: html,
//       personalizations: [
//         {
//           to: process.env.EMAIL
//         }
//       ]
//     }
//     const mail = await sgMail.send(msg)
//     return res.status(200).json({ "message": "Message envoyé" })
//   } catch (err) {
//     console.log(err)
//     return res.status(400)
//   }

// })

// app.post('/artisteideal', async (req, res) => {
//   // XSS filter
//   for (const key in req.body) {
//     req.body[key] = xssFilters.inHTMLData(req.body[key])
//   }
//   const { email, message, userId } = req.body;
//   const errors = [];
//   if (email && !validator.isEmail(email)) {
//     errors.push('Email invalide')
//   }
//   if (message.length < 15) {
//     errors.push('Votre message doit être d\'au moins 15 caractères')
//   }
//   if (!userId) {
//     errors.push('Utilisateur introuvable')
//   }

//   // S'il y a des erreurs
//   if (errors.length) {
//     return res.status(422).json({ 'errors': errors })
//   }


//   try {
//     const html = `
//     <div>
//       <p><a target="_blank" href="${process.env.ADMIN_URL}/content-manager/collectionType/plugin::users-permissions.user/${userId}">Organisateur concerné</a> </p>
//       <p> <strong>Email :</strong> ${email} </p>
//       <p> <strong>Message :</strong></p>
//       <p> ${message} </p>
//     </div>
//   `
//     const msg = {
//       from: {
//         name: "Artiste idéal - Click & Live ",
//         email: 'atassart@clickandlive.fr'
//       }, // Change to your verified sender
//       subject: 'Nouvelle demande d\'artiste idéal ' + getHash(),
//       html: html,
//       personalizations: [
//         {
//           to: process.env.EMAIL
//         }
//       ]
//     }
//     const mail = await sgMail.send(msg)
//     return res.status(200).json({ "message": "Message envoyé" })
//   } catch (err) {
//     console.log(err)
//     return res.status(400)
//   }

// })

// app.post('/programmation', async (req, res) => {
//   // XSS filter
//   for (const key in req.body) {
//     req.body[key] = xssFilters.inHTMLData(req.body[key])
//   }
//   const { email, message, userId } = req.body;
//   const errors = [];
//   if (email && !validator.isEmail(email)) {
//     errors.push('Email invalide')
//   }
//   if (message.length < 15) {
//     errors.push('Votre message doit être d\'au moins 15 caractères')
//   }
//   if (!userId) {
//     errors.push('Utilisateur introuvable')
//   }

//   // S'il y a des erreurs
//   if (errors.length) {
//     return res.status(422).json({ 'errors': errors })
//   }


//   try {
//     const html = `
//     <div>
//       <p><a target="_blank" href="${process.env.ADMIN_URL}/content-manager/collectionType/plugin::users-permissions.user/${userId}">Organisateur concerné</a> </p>
//       <p> <strong>Email :</strong> ${email} </p>
//       <p> <strong>Message :</strong></p>
//       <p> ${message} </p>
//     </div>
//   `
//     const msg = {
//       from: {
//         name: "Programmation - Click & Live ",
//         email: 'atassart@clickandlive.fr'
//       }, // Change to your verified sender
//       subject: 'Nouvelle demande de programmation ' + getHash(),
//       html: html,
//       personalizations: [
//         {
//           to: process.env.EMAIL
//         }
//       ]
//     }
//     const mail = await sgMail.send(msg)
//     return res.status(200).json({ "message": "Message envoyé" })
//   } catch (err) {
//     console.log(err)
//     return res.status(400)
//   }

// })


// module.exports = { path: '/api', handler: app };