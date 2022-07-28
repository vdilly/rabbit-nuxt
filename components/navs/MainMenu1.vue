<template lang="pug">
nav.main-menu
  .main-menu__item(v-for="(item, index) in menu")
    Link.main-menu__label(
      v-if="item.acf_fc_layout == 'liens'",
      :link="item.liens",
      :class="item.liens.url.indexOf($route.path) != -1 && $route.path != '/' ? 'active' : null",
      :key="index",
      v-html="item.liens.title"
    )
    Dropdown(v-if="item.acf_fc_layout == 'submenu'", :key="index")
      component.main-menu__label(
        slot="trigger",
        :is="item.liens ? 'Link' : 'div'",
        :link="item.liens",
        v-html="item.liens ? item.liens.title : item.label",
        :class="getActiveClassFromSublist(item.submenu) && $route.path != '/' ? 'active' : null"
      )
      Link.main-menu__label(
        v-for="(subitem, subindex) in item.submenu",
        :link="subitem.liens",
        :key="subindex",
        v-html="subitem.liens.title"
      )
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$store?.state?.globalDatas?.globalDatas?.acf?.menu_header
        ?.menu;
    },
  },
  methods: {
    isInternalLink(link) {
      console.log(link, this.url.site, link.indexOf(this.url.site));
      return link.indexOf(this.url.site) != -1;
    },
    getActiveClassFromSublist(submenu) {
      let vm = this;
      let r = false;
      submenu.forEach((el) => {
        if (el.liens && el.liens.url.indexOf(vm.$route.path) != -1) {
          r = true;
        }
      });
      return r;
    },
  },
};
</script>

<style lang="scss">
.main-menu {
  display: flex;
  &__item {
    position: relative;
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
  &__label {
    text-decoration: none;
    padding: 1.5rem;
    display: flex;
    align-items: center;

    &.active {
      &:after {
        content: "";
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: $color__core;
        height: 0.5rem;
        width: 0.5rem;
        border-radius: 50%;
      }
    }
  }
  a {
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  .dropdown {
    height: 100%;
  }
  .main-menu__highlight-btn {
    align-self: center;
  }
}
</style>