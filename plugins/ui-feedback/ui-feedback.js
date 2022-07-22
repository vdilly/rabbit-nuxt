/**
 * V-directive à utiliser comme ça : v-feedback=""
 *
 */
import Vue from "vue";
import "./ui-feedback.scss"
function whichAnimationEvent() {
  var t,
    el = document.createElement("fakeelement");

  var animations = {
    animation: "animationend",
    OAnimation: "oAnimationEnd",
    MozAnimation: "animationend",
    WebkitAnimation: "webkitAnimationEnd",
  };

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}

const FeedbackDirective = {
  inserted: function (el, binding, vnode) {
    if (!window.animationEnd) {
      window.animationEnd = whichAnimationEvent();
    }
    let c = document.createElement("div");
    c.classList.add("pulse");
    el.appendChild(c);
    el.classList.add("feedback");
    el.addEventListener("click", function () {
      c.classList.add("clicked");
    });
    c.addEventListener(animationEnd, function () {
      c.classList.remove("clicked");
    });
  },
};

Vue.directive("feedback", FeedbackDirective);