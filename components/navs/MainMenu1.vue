<template lang="pug">
nav.main-menu
  .item(v-for="(item, index) in menu")
    component(
      v-if="item.acf_fc_layout == 'liens'",
      :link="item.liens",
      :class="[item.is_btn ? 'core h-white' : 'label label--main', item.liens.url.indexOf($route.path) != -1 && $route.path != '/' ? 'active' : null]",
      :key="index",
      :is="item.is_btn ? 'Btn' : 'Link'"
    )
      span(v-html="item.liens.title")
    Dropdown(v-if="item.acf_fc_layout == 'submenu'", :key="index")
      component.label.label--trigger(
        slot="trigger",
        :is="item.liens ? 'Link' : 'div'",
        :link="item.liens",
        :class="getActiveClassFromSublist(item.submenu) && $route.path != '/' ? 'active' : null"
      )
        span(v-html="item.liens ? item.liens.title : item.label")
        svg.icon.dropdown-arrow
          use(xlink:href="#chevron")
      Link.label.label--sub(
        v-for="(subitem, subindex) in item.submenu",
        :link="subitem.liens",
        :key="subindex",
        v-html="subitem.liens.title",
        :class="subitem.liens.url.indexOf($route.path) != -1 && $route.path != '/' ? 'active' : null"
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
  @include RWD(tablet) {
    display: none;
  }
  .item {
    position: relative;
    &:not(:last-child) {
      margin-right: 2rem;
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
}

// Labels (menu, dropdown et popin)
.main-menu .label {
  // Shared avec tous les labels
  & {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    text-decoration: none !important;
    padding: 1rem 2rem;
    display: inline-flex;
    cursor: pointer;
    font-weight: 600;
  }

  // Label ppal
  &--main {
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) translateX(-30%);
      opacity: 0;
      width: 100%;
      height: 3rem;
      background-color: rgba($color__core, 0.1);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      border-radius: 4px;
    }
    &:hover:after,
    &.active:after {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    // Active
    &.active {
      &:after {
      }
    }
  }
  // Label sub
  &--sub {
    font-size: 1.5rem;
    padding: 1.5rem 2rem;
    width: 100%;
    transition: box-shadow 0.25s ease, background-color 0.25s ease;

    &:hover {
      background-color: rgba($color__core, 0.07);
    }
    &.active {
      box-shadow: inset 0.1rem 0.1rem 0.5rem rgb(0 0 0 / 10%);
      background-color: rgba($color__core, 0.07);
    }
  }
  // Label rwd
}

// Label menu desktop only (non sub)
.label--main:not(.btn) {
}

// Dropdown
.main-menu .dropdown {
  // Flèche dropdown
  .dropdown-arrow {
    height: 12px;
    width: 12px;
    margin-left: 1.5rem;
  }

  // Panel
  .dropdown__sub {
    width: 15rem;
    box-shadow: 0 0 2rem rgb(0 0 0 / 10%);
    // border-bottom-left-radius: 1rem;
    // border-bottom-right-radius: 1rem;
    border-radius: 7px;
    border-top: solid 7px $color__core;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    bottom: 2rem;
  }
}
</style>