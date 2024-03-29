/**
 * Lance le chargement des éléments (img, bg) avvec l'attribut [lazy] en différé
 * [lazy] = img ou bg
 * [lazy-src] = src de l'image à load
 * [src] = pour gérer le placeholder blurry en attendant le chargement, /!\ pour les images il faut définir une taille d'image
 * @TODO: video
 */
import { debug } from "@/plugins/debug";
function observeIntersection(el, cb) {
  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            cb();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px 100px 0px",
      }
    );
    observer.observe(el);
  } else {
    cb();
  }
}

function dispatchType($el) {
  let type = $el.getAttribute("lazy"),
    src = $el.getAttribute("lazy-src");

  if (!src) return;

  observeIntersection($el, function () {
    if (type == "img") {
      lazyImg($el, src);
    }
    if (type == "bg") {
      lazyBg($el, src);
    }
    if (type == "video") {
      lazyVideo($el, src);
    }
  });
}
function lazyImg($el, src) {
  let img = new Image();
  img.onload = function () {
    $el.setAttribute("src", src);
    $el.removeAttribute("lazy");
    $el.removeAttribute("lazy-src");
  };
  img.src = src;
  if (img.complete) img.onload();
}
function lazyBg($el, src) {
  let img = new Image();
  img.onload = function () {
    $el.style.backgroundImage = "url(" + src + ")";
    $el.removeAttribute("lazy");
    $el.removeAttribute("lazy-src");
  };
  img.src = src;
  if (img.complete) img.onload();
}
function lazyVideo($el, src) { }

export default function ($root) {
  debug("Lazyload imgs and bgs");
  $root = $root ? $root : document;
  let $els = $root.querySelectorAll("[lazy]");
  $els.forEach(($el) => {
    dispatchType($el);
  });
}
