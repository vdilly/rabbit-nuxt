<template lang="pug">
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
  props: ['bloc'],
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
}
</script>