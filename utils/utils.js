import validator from "validator";

/**
 * Valide le pattern des champs de formulaire présents
 * Ne gère pas leur required
 * @param {Object} data 
 * @returns {[errors]} 
 */
export const getCommonFieldsErrors = (data) => {
  let errors = [];

  // Nom
  if (data.nom && data.nom.length < 3) errors.push('Votre nom doit contenir 3 caractères minimum')

  // Prénom
  if (data.prenom && data.prenom.length < 3) errors.push('Votre prénom doit contenir 3 caractères minimum')

  // Email
  if (data.email && !validator.isEmail(data.email)) errors.push("Email invalide");

  // Tel
  // if (
  //   data.tel
  // ) {
  //   const pn = new PhoneNumber(data.tel);
  //   if (!pn.isValid()) errors.push("Téléphone invalide, merci de respecter la notation E.164. Exemple FR : +33 123456789");
  // }

  // CP
  if (
    data.codepostal &&
    !validator.isPostalCode(data.codepostal, ["FR"])
  )
    errors.push("Code postal invalide");
  return errors;
}