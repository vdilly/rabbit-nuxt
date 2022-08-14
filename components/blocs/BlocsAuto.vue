<template lang="pug">
.blocs
  .bloc(v-for="(bloc, index) in blocs")
    Container.bloc-name(v-if="displayName")
      h2.h2(v-html="index + ' - ' + getBlocName(bloc) + '.vue'")
    component(:is="getBlocName(bloc)", :bloc="bloc")
</template>
<script>
import BannerFull from "@/components/blocs/Banners/BannerFull.vue";
import BannerStack from "@/components/blocs/Banners/BannerStack.vue";
import BlogPosts from "@/components/blocs/BlogPosts.vue";
import ContentSBS from "@/components/blocs/ContentSBS.vue";
import Optin from "@/components/blocs/Optin.vue";
export default {
  props: ["blocs", "displayName"],
  components: { BannerFull, BannerStack, BlogPosts, ContentSBS, Optin },
  methods: {
    getBlocName(bloc) {
      if (bloc.acf_fc_layout == "Banner") {
        return bloc.banner_type
          ? bloc.acf_fc_layout + bloc.banner_type
          : bloc.acf_fc_layout;
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
}
</style>