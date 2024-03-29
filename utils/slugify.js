export default function (string) {
  if (!string) return null
  if (typeof string == 'number') return string
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");
  string = string
    .toLowerCase()
    .trim()
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/\./g, "") // Remove multiple spaces
    .replace(/\s{2,}/g, " ") // Remove multiple spaces
    .trim()
    .replace(/\s+/g, "_") // Replace spaces with _
    .replace(/\?/g, ""); // Remove question marks
  return string;
}
