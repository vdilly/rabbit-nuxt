<template lang="pug">
footer.footer
  Wave(v-if="theme.cutType == 'wave'")
  Container
    Optin(:bloc="footer.optin_footer")
    .layout(v-if="footer")
      .part
        .img-contain.logo
          img(:src="footer.footer_logo.mobile.src", v-if="footer.footer_logo")
        h2.h2 Contact
        .adresse(v-html="footer.adresse", v-if="footer.adresse")
        a.mail(:href="`mailto:${footer.email}`", v-if="footer.email")
          svg.icon
            use(xlink:href="#mail")
          span(v-html="footer.email")
        a.tel(:href="`tel:${footer.tel}`", v-if="footer.tel")
          svg.icon
            use(xlink:href="#tel")
          span(v-html="footer.tel")

      .part(v-if="footer.socials")
        h2.h2 Suivez nous
        ul
          li(v-for="rs in footer.socials")
            a(:href="rs.lien.url", target="_blank")
              svg.icon
                use(:xlink:href="`#${rs.icone}`")
      .part(v-if="footer.menu_footer && footer.menu_footer.menu")
        h2.h2 Liens utiles
        ul
          li(v-for="item in footer.menu_footer.menu")
            Link(:link="item.liens")
              span(v-html="item.liens.title")
      .part(v-if="footer.menu_footer_2 && footer.menu_footer_2.menu")
        h2.h2 Ressources
        ul
          li(v-for="item in footer.menu_footer_2.menu")
            Link(:link="item.liens")
              span(v-html="item.liens.title")
  ThemeBuilder
</template>
<script>
import { mapState } from "vuex";
import ThemeBuilder from "@/components/ThemeBuilder.vue";
import Optin from "./blocs/Optin.vue";
export default {
  components: { ThemeBuilder, Optin },
  computed: {
    footer() {
      return this.globalDatas.acf;
    },
    ...mapState("globalDatas", ["globalDatas"]),
  },
};
</script>
<style lang="scss">
.footer {
  padding: 5rem 0;
  padding-top: 0;
  background: $gradient-1;
  min-height: 34rem;
  overflow: hidden;
  margin-top: 8rem;

  .wave {
    margin-bottom: -20rem;
    margin-top: -6rem;
    // display: none;
  }
  .menu {
    text-align: center;
    font-size: 1.6rem;
    a {
      color: white;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .logo {
    height: 8rem;
    width: 12rem;
  }
  .optin {
    background: none;
    // background-color: rgb(66, 66, 66);
  }
}
</style>