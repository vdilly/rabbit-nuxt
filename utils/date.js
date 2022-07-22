

// export function formatDate(string, override) {
//   let date = new Date(string);
//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric"
//   };

//   return date.toLocaleDateString(process.env.GRIDSOME_BUILD_LANG, options);
// }

// export function formatDateFromFr(date) { // utilisé que pour les offres d'emploi so far
//   if (!date) return null;
//   let from = date.split('-')
//   return [from[2], from[1], from[0]].join('-');
// }

export function getDuration(string) {
  let date = new Date(string);
  let now = new Date();

  let duration = now.getTime() - date.getTime();
  let unite = 's';
  duration = Math.floor(duration / 1000); // secondes
  if (duration > 60) {
    duration = Math.floor(duration / 60);
    unite = 'mn'
  }
  if (duration > 60) {
    duration = Math.floor(duration / 60);
    unite = 'h'
  }
  if (duration > 24) {
    duration = Math.floor(duration / 24);
    unite = 'j'
  }

  return { duration: duration, unite: unite }
}

export const getDateFromStrapi = (date) => {
  // 2022 - 12 - 15
  if (!date) return null;
  let from = date.split('-')
  return [from[2], from[1], from[0]].join('-');
}