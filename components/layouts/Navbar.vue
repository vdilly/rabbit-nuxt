<template lang="pug">
.navbar(ref="navbar")
  slot
</template>

<script>
export default {};
</script>

<style lang="scss">
/**

1. gérer la position fix ou pas (var) et la couleur
2. gérer la height desktop et mobile et scrolled, si la nav est 100% static on peut mettre auto (var)
3. gérer la boxshadow au scroll (var)
4. go header.vue

*/

// Position
$navbar-position: fixed; // Si on passe en absolute, mettre false aux autres options
$navbar-height: 10rem; // Appliquer le padding sur le body si position != static
$navbar-height-m: 8rem;
$navbar-height-scrolled: 9rem;
$navbar-apply-ptop: false; // applique un padding top sur le main
$navbar-disappear-onscroll: false;
$navbar-appear-onscrolltop: false; // $navbar-disappear-onscroll must be true

// Shadow
$navbar-bshadow: none;
$navbar-scrolled-bshadow: 0 2px 20px 0 rgb(0 0 0 / 15%); // none - $bshadow

.navbar {
  background-color: $color__page-bg;
  z-index: $z-header;
  position: $navbar-position;
  width: 100%;
  height: $navbar-height;
  box-shadow: $navbar-bshadow;

  @if ($navbar-disappear-onscroll) {
    transition: all $transition-m, box-shadow 0s;
  } @else {
    transition: box-shadow $transition-m, height $transition-m;
  }

  @include RWD(mobile) {
    height: $navbar-height-m;
  }
}

// Etat scroll
body.js-scrolled .navbar {
  box-shadow: $navbar-scrolled-bshadow;
  height: $navbar-height-scrolled;
  background-color: white !important;
  @import "@/assets/scss/headers/_header-black";
}
@if $navbar-disappear-onscroll {
  @if $navbar-appear-onscrolltop {
    body.js-scrolled.downward .navbar {
      transform: translateY(-100%);
    }
  } @else {
    body.js-scrolled .navbar {
      transform: translateY(-100%);
    }
  }
}
// Padding sur le main
@if $navbar-apply-ptop {
  body .main {
    padding-top: $navbar-height;
    transition: padding-top $transition-m;
    @include RWD(mobile) {
      padding-top: $navbar-height-m;
    }
  }
  body.js-scrolled .main {
    // padding-top: 0;
  }
}
</style>