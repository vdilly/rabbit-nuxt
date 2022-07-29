<template lang="pug">
Popin.menu-rwd-popin(panelType="side-right-panel", @close="closeDrawers")
  BurgerIcon(slot="trigger")
  div(slot="close") 
    svg.burger-close.icon
      use(xlink:href="#close-circled")
  nav.main-menu-rwd
    .main-menu-rwd__item(v-for="(item, index) in menu")
      Link.main-menu-rwd__label(
        v-if="item.acf_fc_layout == 'liens'",
        :link="item.liens",
        :class="item.liens.url.indexOf($route.path) != -1 && $route.path != '/' ? 'active' : null",
        :key="index",
        v-html="item.liens.title"
      )
      Drawer.main-menu-rwd__sub(
        v-if="item.acf_fc_layout == 'submenu'",
        :key="index",
        :triggerIsLink="true",
        drawerType="drawer-from-right",
        ref="drawer"
      )
        component.main-menu-rwd__label.main-menu-rwd__sub-label(
          slot="label",
          :is="item.liens ? 'Link' : 'div'",
          :link="item.liens",
          v-html="item.liens ? item.liens.title : item.label",
          :class="getActiveClassFromSublist(item.submenu) && $route.path != '/' ? 'active' : null"
        )
        svg.icon(slot="trigger")
          use(xlink:href="#chevron")
        .main-menu-rwd__label(slot="back")
          svg.icon
            use(xlink:href="#chevron")
          span(v-html="item.liens ? item.liens.title : item.label")
        Link.main-menu-rwd__label(
          v-for="(subitem, subindex) in item.submenu",
          :link="subitem.liens",
          :key="subindex",
          v-html="subitem.liens.title"
        )
</template>

<script>
import BurgerIcon from "@/components/atoms/BurgerIcon.vue";
export default {
  components: { BurgerIcon },
  computed: {
    menu() {
      return this.$store?.state?.globalDatas?.globalDatas?.acf?.menu_header
        ?.menu;
    },
  },
  methods: {
    closeDrawers() {
      if (this.$refs.drawer) {
        this.$refs.drawer.forEach((el) => {
          el.closeDrawer();
        });
      }
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
// Popin
header .popin.menu-rwd-popin {
  @include RWD(desktop) {
    display: none !important;
  }
  .popin__close {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .icon {
      height: 4rem;
      width: 4rem;
    }
  }
  .popin__panel {
    background-color: $color__core;
    width: 50rem;
    padding: 0 4rem;
    @include RWD(mobile) {
      padding: 0 2rem;
    }
  }
}

// Menu RWD
.main-menu-rwd {
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  @include RWD(mobile) {
    min-width: 0;
  }
  &__item {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
  &__label {
    text-decoration: none;
    padding: 1.5rem;
    display: flex;
    align-items: center;

    // Etat actif
    &.active {
    }
  }
  a {
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  &__sub {
    &-label {
      font-weight: 700;
    }
    & > *:not(:first-child) {
      margin-left: 2rem;
    }
  }
  .drawer {
    &__trigger {
      .icon {
        height: 1rem;
        width: 1rem;
        transform: rotate(-90deg);
      }
    }
    &__sub-back {
      .icon {
        height: 1rem;
        width: 1rem;
        transform: rotate(90deg);
        margin-right: 2rem;
        flex-shrink: 0;
      }
      span {
        font-weight: 700;
      }
    }
  }
}
</style>
