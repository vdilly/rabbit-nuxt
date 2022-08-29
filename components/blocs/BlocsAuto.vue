<template lang="pug">
.blocs
  .bloc(v-for="(bloc, index) in blocs", :class="'bloc-' + getBlocName(bloc)")
    Container.bloc-name(v-if="displayName")
      h2.h2(v-html="index + ' - ' + getBlocName(bloc) + '.vue'")
    component(:is="getBlocName(bloc)", :bloc="bloc")
</template>
<script>
import LogoList from "@/components/blocs/LogoList.vue";
import LogoSlider from "@/components/blocs/LogoSlider.vue";
import BannerFull from "@/components/blocs/Banners/BannerFull.vue";
import BannerStack from "@/components/blocs/Banners/BannerStack.vue";
import BannerSBS from "@/components/blocs/Banners/BannerSBS.vue";
import BannerDecale from "@/components/blocs/Banners/BannerDecale.vue";
import BlogPosts from "@/components/blocs/BlogPosts.vue";
import ContentSBS from "@/components/blocs/ContentSBS.vue";
import SectionSBS from "@/components/blocs/SectionSBS.vue";
import Optin from "@/components/blocs/Optin.vue";
import ArgumentList from "@/components/blocs/ArgumentList.vue";
import Trombi from "@/components/blocs/Trombi.vue";
export default {
  props: ["blocs", "displayName"],
  components: {
    BannerFull,
    BannerStack,
    BannerDecale,
    BannerSBS,
    SectionSBS,
    BlogPosts,
    ContentSBS,
    Optin,
    LogoList,
    LogoSlider,
    ArgumentList,
    Trombi,
  },
  methods: {
    getBlocName(bloc) {
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