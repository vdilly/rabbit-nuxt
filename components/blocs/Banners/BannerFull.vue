<template lang="pug">
.bannerFull.img-cover
  img(:src="bloc.image.mobile.src", v-if="bloc.image")
  //- .bg(:style="`background-image: url(${bloc.image.mobile.src});`")
  Container
    h1.h1(v-html="bloc.titre", v-if="bloc.titre")
    .description.rte(v-html="bloc.description", v-if="bloc.description")
    Btn.core(v-if="bloc.bouton", :link="bloc.bouton")
      span(v-html="bloc.bouton.title")
</template>
<script>
export default {
  props: ["bloc"],
};
</script>

<style lang="scss">
.bannerFull {
}
</style>