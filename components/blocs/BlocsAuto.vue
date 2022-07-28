<template lang="pug">
.blocs
  .bloc(v-for="(bloc, index) in blocs")
    component(:is="bloc.acf_fc_layout", :bloc="bloc")
</template>
<script>
import BannerSimple from "@/components/blocs/BannerSimple.vue";
export default {
  props: ["blocs"],
  components: { BannerSimple },
};
</script>