<template lang="pug">
.blocs
  .bloc(v-for="(bloc, index) in blocs", :class="'bloc-' + getBlocName(bloc)")
    Container.bloc-name(v-if="displayName")
      h2.h2(v-html="index + ' - ' + getBlocName(bloc) + '.vue'")
    AllBlocs(:bloc="bloc")
</template>
<script>
import AllBlocs from './AllBlocs.vue'
export default {
  components: { AllBlocs },
  props: ["blocs", "displayName"],
  methods: {
    getBlocName(bloc) {
      return bloc.component || bloc.acf_fc_layout;
      if (bloc.acf_fc_layout == "Banner") {
        return bloc.banner_type
          ? bloc.acf_fc_layout + bloc.banner_type
          : bloc.acf_fc_layout;
      } else if (bloc.acf_fc_layout == "LogoList") {
        return bloc.display == "slider" ? "LogoSlider" : "LogoList";
      }
      return bloc.acf_fc_layout;
    },
  },
};
</script>

<style lang="scss">
.blocs {
  .bloc-name {
    padding: 4rem;
    border: solid 1px black;
    margin-bottom: 8rem;
    margin-top: 8rem;
  }

  .bloc-ContentSBS + .bloc-ContentSBS {
    margin-top: 8rem;
  }
}
</style>