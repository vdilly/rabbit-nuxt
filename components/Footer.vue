<template lang="pug">
footer.footer(v-if="footer")
  Wave(v-if="theme.cutType == 'wave'", slot="wave")
  Optin(:bloc="footer.optin_footer")
  .footer-content
    Container
      .layout.hr-top(v-if="footer")
        .part.contact
          .img-contain.logo
            img(
              :src="footer.footer_logo.mobile.src",
              v-if="footer.footer_logo"
            )
          .adresse.item
            svg.icon
              use(xlink:href="#home")
            span(v-html="footer.adresse", v-if="footer.adresse")
          a.mail.item(:href="`mailto:${footer.email}`", v-if="footer.email")
            svg.icon
              use(xlink:href="#mail")
            span(v-html="footer.email")
          a.tel.item(:href="`tel:${footer.tel}`", v-if="footer.tel")
            svg.icon
              use(xlink:href="#tel")
            span(v-html="footer.tel")

        .part.menu.menu1(v-if="footer.menu_footer && footer.menu_footer.menu")
          h2.h3 Liens utiles
          ul
            li(v-for="item in footer.menu_footer.menu")
              Link(:link="item.liens")
                span(v-html="item.liens.title")
        .part.menu.menu2(
          v-if="footer.menu_footer_2 && footer.menu_footer_2.menu"
        )
          h2.h3 Ressources
          ul
            li(v-for="item in footer.menu_footer_2.menu")
              Link(:link="item.liens")
                span(v-html="item.liens.title")
        .part.socials(v-if="footer.socials")
          h2.h3 Suivez nous
          ul
            li(v-for="rs in footer.socials")
              a(:href="rs.lien.url", target="_blank")
                svg.icon
                  use(:xlink:href="`#${rs.icone}`")
  .footer-bottom
    Container
      .rte(v-html="footer.footer_bottom", v-if="footer.footer_bottom")
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
      return this.globalDatas?.acf;
    },
    ...mapState("globalDatas", ["globalDatas"]),
  },
};
</script>
<style lang="scss">
.footer {
  padding-top: 6rem 0;
  padding-bottom: 0;
  background: $gradient-1;
  min-height: 34rem;
  overflow: hidden;
  margin-top: 8rem;
  position: relative;

  .wave {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    min-width: 192rem;
    z-index: 1;
    // display: none;
  }
  .optin {
    position: relative;
    z-index: 2;
    padding-top: 8rem;
    background: none;
  }

  // Layiout
  .layout {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    margin-left: -4rem;
    color: $color-1-font;
    font-size: 1.6rem;
    padding-top: 2rem;
    &:before {
      width: 100%;
      max-width: calc(100% - 8rem);
      background-color: $color-1-font;
      opacity: 0.3;
      height: 1px;
      transform: translateX(-50%) translateY(0);
    }
  }
  .part {
    margin-left: 4rem;
    margin-top: 4rem;
  }
  .h3 {
    color: white;
    margin-bottom: 2rem;
    line-height: 1.2;
  }
  p {
    line-height: 1.6;
  }
  a {
    line-height: 1.6;

    text-decoration: none;
    transition: opacity 0.25s ease;
    &:hover {
      opacity: 0.5;
    }
  }
  .icon {
    fill: $color-1-font;
    height: 2rem;
    width: 2rem;
  }
  // Contact
  .contact {
    .item {
      display: flex;
      align-items: center;
      margin-top: 1.5rem;
      text-decoration: none;
      .icon {
        margin-right: 1rem;
      }
    }
  }
  .logo {
    height: 8rem;
    width: 12rem;
    margin-bottom: 2rem;
  }
  // Menu
  .menu {
    ul {
      // margin-top: -1.5rem;
    }
    li {
      margin-top: 1rem;
    }
  }
  .menu1 {
  }
  .menu2 {
  }
  // Socials
  .socials {
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-left: -2rem;
      margin-top: -2rem;
    }
    li {
      margin-left: 2rem;
      margin-top: 2rem;
    }
    .icon {
      width: 3rem;
      height: 3rem;
    }
  }

  .footer-bottom {
    margin-top: 6rem;
    background-color: $color-2;
    color: $color-2-font;
    padding: 1rem 0;
    text-align: center;
    font-size: 1.4rem;
    opacity: 0.8;
  }
}

body.wave footer {
  padding-top: 14rem;
  margin-top: 0rem;
  // padding-top: 0;
  // .optin {
  //   padding-top: 22rem;
  // }
  // .optin .container {
  //   position: relative;
  //   z-index: 10;
  // }
}
body.cut footer {
  // overflow: visible;
  // padding-top: 0rem;
  // .optin {
  //   background-color: $color-1;
  //   padding-bottom: 8rem;
  //   padding-top: 6rem;
  //   position: relative;
  //   &:before {
  //     background-color: $color-1;
  //     content: "";
  //     position: absolute;
  //     top: 0.1rem;
  //     right: 0;
  //     width: 100%;
  //     height: 7rem;
  //     clip-path: polygon(0 100%, 100% 0%, 100% 100%);
  //     z-index: 5;
  //     transform: translateY(-100%);
  //   }
  // }
  // .footer-content {
  //   position: relative;
  // }
  // .layout {
  //   &:before {
  //     display: none;
  //   }
  // }
}
</style>