module.exports = function (formData) {
  let r = "<h2>Détail de la soumission </h2><table>";
  for (let [key, value] of Object.entries(formData)) {
    if (key != "only_honey" && key != "g-recaptcha-response") {
      if (key == "adresse_vous_serez_redirige_vers_le_site_de_production_le_plus_proche") {
        key = "adresse"
      }
      r += `
      <tr>
        <td><strong>${key}</strong></td> : <td>${value}</td>
      </tr>
      `;
    }
  }
  r+="</table>"
  return r;
};