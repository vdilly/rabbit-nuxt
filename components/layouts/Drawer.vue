<template lang="pug">
.drawer
  .drawer__trigger(v-if="triggerIsLink")
    .drawer__trigger-label 
      slot(name="label")
    button.drawer__trigger-arrow(@click.stop="openDrawer($event)")
      slot(name="trigger")
  .drawer__trigger(v-else, @click.stop="openDrawer($event)")
    .drawer__trigger-label 
      slot(name="label")
    .drawer__trigger-arrow
      slot(name="trigger")
  transition(:name="drawerType")
    .drawer__sub(v-show="drawerOpen")
      .inner-sub
        button.drawer__sub-back(@click.stop="closeDrawer($event)")
          slot(name="back")
        slot
</template>

<script>
export default {
  props: ["triggerIsLink", "drawerType"],
  props: {
    triggerIsLink: {
      default: false,
    },
    drawerType: {
      default: "drawer-from-left",
    },
  },
  data() {
    return {
      drawerOpen: false,
    };
  },
  methods: {
    openDrawer: function () {
      this.$emit("open");
      this.drawerOpen = true;
    },
    closeDrawer: function () {
      this.$emit("close");
      this.drawerOpen = false;
    },
  },
};
</script>

<style lang="scss">
.drawer {
  display: flex;
  &__trigger {
    display: flex;
    width: 100%;
    cursor: pointer;

    &-arrow {
      width: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: solid 2px $color-1;
    }
    &-label {
      flex: 1;
    }
  }
  &__sub {
    margin: 0 !important;
    position: absolute;
    top: 0rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    & > * {
      max-width: 100%;
    }

    & > * {
      white-space: nowrap;
    }
  }
}

.drawer-from-left-enter-active,
.drawer-from-left-leave-active {
  transition: $transition-m;
}
.drawer-from-left-enter,
.drawer-from-left-leave-to {
  transform: translateX(-100%);
}

.drawer-from-right-enter-active,
.drawer-from-right-leave-active {
  transition: $transition-m;
}
.drawer-from-right-enter,
.drawer-from-right-leave-to {
  transform: translateX(100%);
}

.drawer-from-bottom-enter-active,
.drawer-from-bottom-leave-active {
  transition: transform $transition-m, opacity $transition-s;
}
.drawer-from-bottom-enter,
.drawer-from-bottom-leave-to {
  transform: translateY(10rem);
  opacity: 0;
}
</style>