import validator from "validator";

export const flattenStrapiEntry = (strapiEntry) => {
  if (!strapiEntry) return null;
  // If nested in parent data, get rid of "data" key
  let entry = Object.assign({}, strapiEntry);
  entry = Object.seal(entry)
  entry = entry.data ? entry.data : entry;

  if (!entry.attributes) return entry; // Déjà flatten

  // Save l'id
  const entryId = entry.id;
  // Flatten les attributes
  entry = entry.attributes;
  entry.id = entryId;
  delete entry.__typename;

  return entry;
}

export const StrapiIndexToIndex = (strapiIndex) => {
  if (!strapiIndex) return null;
  return (parseInt(strapiIndex) - 1).toString();
}

export const IndexToStrapiIndex = (index) => {
  if (!index) return null;
  return (parseInt(index) + 1).toString();
}

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