import Vue from 'vue'

import AOS from "aos";
import "aos/dist/aos.css";

// Vue.use(AOS.init());

Vue.prototype.$aos = AOS;

Vue.prototype.$aos.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

})


/**
 * Animations
Fade animations:

fade
fade-up
fade-down
fade-left
fade-right
fade-up-right
fade-up-left
fade-down-right
fade-down-left
Flip animations:

flip-up
flip-down
flip-left
flip-right
Slide animations:

slide-up
slide-down
slide-left
slide-right
Zoom animations:

zoom-in
zoom-in-up
zoom-in-down
zoom-in-left
zoom-in-right
zoom-out
zoom-out-up
zoom-out-down
zoom-out-left
zoom-out-right
Anchor placements:
top-bottom
top-center
top-top
center-bottom
center-center
center-top
bottom-bottom
bottom-center
bottom-top
Easing functions:
linear
ease
ease-in
ease-out
ease-in-out
ease-in-back
ease-out-back
ease-in-out-back
ease-in-sine
ease-out-sine
ease-in-out-sine
ease-in-quad
ease-out-quad
ease-in-out-quad
ease-in-cubic
ease-out-cubic
ease-in-out-cubic
ease-in-quart
ease-out-quart
ease-in-out-quart
 */