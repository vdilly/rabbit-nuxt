<template lang="pug">
.navbar(ref="navbar")
  slot
</template>

<script>
export default {};
</script>

<style lang="scss">
// Position
$navbar-position: absolute; // Si on passe en absolute, mettre false aux autres options
$navbar-height: 12rem; // Appliquer le padding sur le body si position != static
$navbar-height-m: 12rem;
$navbar-apply-ptop: true; // applique un padding top sur le main
$navbar-disappear-onscroll: false;
$navbar-appear-onscrolltop: true; // $navbar-disappear-onscroll must be true

// Shadow
$navbar-bshadow: none;
$navbar-scrolled-bshadow: none; // none - $bshadow

.navbar {
  z-index: $z-header;
  position: $navbar-position;
  width: 100%;
  height: $navbar-height;
  box-shadow: $navbar-bshadow;

  @if ($navbar-disappear-onscroll) {
    transition: all $transition-m, box-shadow 0s;
  } @else {
    transition: box-shadow $transition-m;
  }

  @include RWD(mobile) {
    height: $navbar-height-m;
  }
}

// Etat scroll
body.js-scrolled .navbar {
  box-shadow: $navbar-scrolled-bshadow;
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
  body .nuxt-content {
    padding-top: $navbar-height;
    transition: padding-top $transition-m;
    @include RWD(mobile) {
      padding-top: $navbar-height-m;
    }
  }
  body.js-scrolled .nuxt-content {
    // padding-top: 0;
  }
}
</style>