<template lang="pug">
.bannerSimple
  Container
    img(:src="bloc.image.mobile.src")
    h1(v-html="bloc.titre")
    .description.rte(v-html="bloc.description")
    Btn(
      v-if="bloc.bouton",
      :href="bloc.bouton.url",
      :target="bloc.bouton.target"
    )
      span(v-html="bloc.bouton.title")
</template>
<script>
export default {
  props: ["bloc"],
};
</script>