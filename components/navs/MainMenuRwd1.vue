<template lang="pug">
Popin.menu-rwd-popin(panelType="center", @close="closeDrawers")
  BurgerIcon(slot="trigger")
  svg.burger-close.icon(slot="close") 
    use(xlink:href="#close")
  nav.main-menu-rwd
    .itemRwd(v-for="(item, index) in menu")
      component(
        v-if="item.acf_fc_layout == 'liens'",
        :link="item.liens",
        :class="[item.is_btn ? 'ghost white' : 'labelRwd labelRwd--main', item.liens.url.indexOf($route.path) != -1 && $route.path != '/' ? 'active' : null]",
        :key="index",
        :is="item.is_btn ? 'Btn' : 'Link'"
      )
        span(v-html="item.liens.title")
      Drawer.sub(
        v-if="item.acf_fc_layout == 'submenu'",
        :key="index",
        :triggerIsLink="item.liens",
        drawerType="drawer-from-right",
        ref="drawer"
      )
        component.labelRwd.labelRwd(
          slot="label",
          :is="item.liens ? 'Link' : 'div'",
          :link="item.liens",
          v-html="item.liens ? item.liens.title : item.label",
          :class="getActiveClassFromSublist(item.submenu) && $route.path != '/' ? 'active' : null"
        )
        svg.icon(slot="trigger")
          use(xlink:href="#chevron")
        .labelRwd(slot="back")
          .drawer__sub-back-arrow
            svg.icon
              use(xlink:href="#chevron")
          span(v-html="item.liens ? item.liens.title : item.label")
        Link.labelRwd.labelRwd--sub(
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
$color: white;
$bg: $color__title;
// Popin
header .popin.menu-rwd-popin {
  @include RWD(desktop) {
    display: none !important;
  }
  .popin__overlay {
    background-color: hsla(0, 0%, 92.5%, 0.9);
  }

  // Panel
  .popin__panel {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    width: 135rem;
    max-width: calc(100% - 8rem);
    height: calc(100% - 8rem);
    max-height: 100%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    @media (mobile) {
      max-width: calc(100% - 2rem);
      height: calc(100% - 2rem);
    }
  }
  .popin__panel,
  .drawer__sub {
    background-color: $bg;
  }
  .popin__panel {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6rem 4rem;
    @include RWD(mobile) {
      padding: 6rem 2rem;
    }
  }

  // Close
  .popin__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 100%;
    height: 5rem;
    width: 5rem;
    background-color: $bg;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    // transform: translateX(100%) translateX(2rem) translateY(-2rem);
    .icon {
      height: 40%;
      width: 40%;
      fill: $color;
    }
    @include RWD(mobile) {
      // transform: translate(20%, -2rem);
    }
  }
}

// Labels
.main-menu-rwd .labelRwd {
  text-decoration: none;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  color: $color;
  @include RWD(mobile) {
    padding: 1.5rem;
    font-size: 1.4rem;
  }

  // Etat actif
  &.active {
  }
}
.main-menu-rwd .btn {
  margin-left: 3rem;
}

// Layout du menu
.main-menu-rwd,
.inner-sub {
  display: flex;
  flex-direction: column;
  // min-width: 30rem;
  border-left: solid 5px $color;
  @include RWD(mobile) {
    min-width: 0;
  }
  .itemRwd {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
}

// Drawers
.main-menu-rwd .drawer {
  &__sub {
    top: 6rem; // Laisser la close apparaitre
    // left: 50%;
    // transform: translateX(-50%);
    & > * {
      transform: translateY(
        -3rem
      ); // Recentrer avec l'offset de 6rem de la close
    }
  }
  // Trigger et sub back
  &__trigger,
  &__sub-back {
    .icon {
      height: 1rem;
      width: 1rem;
      transform: rotate(-90deg);
      fill: $bg;
    }
    &-arrow {
      border-color: $color;
      background-color: $color;
      width: 4rem;
      height: 4rem;
      align-self: center;
    }
  }
  &__sub-back {
    .icon {
      transform: rotate(90deg);
      flex-shrink: 0;
    }
    &-arrow {
      margin-right: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  }
}
</style>
