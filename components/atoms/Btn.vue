<template lang="pug">
component.btn(
  :is="forceDiv ? 'div' : href ? 'a' : to ? 'NuxtLink' : 'button'",
  v-bind="computedLinkAttr",
  @click="$emit('click')"
)
  Loader
  .flexbox
    slot(name="pre")
    .btn__text
      slot
    svg.icon.arrow
      use(xlink:href="#arrow")
    slot(name="post")
</template>

<script>
import Loader from "./Loader.vue";
export default {
  props: {
    href: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
    forceDiv: {
      default: false,
    },
  },
  computed: {
    computedLinkAttr() {
      return {
        [`${this.linkAttr}`]: this.linkValue,
      };
    },
    linkAttr() {
      return this.href ? "href" : this.to ? "to" : null;
    },
    linkValue() {
      return this.href ? this.href : this.to ? this.to : null;
    },
  },
  components: { Loader },
};
</script>

<style lang="scss">
.btn {
  user-select: none;
  display: inline-flex;
  padding: 1.8rem 2rem;
  border: solid 2px;
  text-decoration: none;
  border-radius: 10rem;
  position: relative;
  .loader {
    display: none;
    position: absolute;
    top: calc(50% - 2rem);
    left: calc(50% - 2rem);
  }
  .flexbox {
    display: flex;
    align-items: center;
    & > * + .btn__text {
      margin-left: 1rem;
    }
    .btn__text + * {
      margin-left: 1rem;
    }
  }
  &__text {
    font-size: 1.6rem;
    font-family: $font__fancy;
    font-weight: 600;
    color: $color__core;
    display: flex;
    align-items: center;
    span {
      line-height: 1.2;
    }
  }
  .icon {
    width: 1.6rem;
    height: 1.2rem;
    fill: $color__core;
  }

  &:not([class^="h-"]):not([class*=" h-"]) {
    transition: 0.2s ease;
    &:hover {
      transform: translateY(-0.6rem);
      box-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.2);
    }
  }
}

// Colors
.btn.core {
  background-color: $color__core;
  border-color: $color__core;
}
.btn.bg {
  background-color: $color__bg-300;
  border-color: $color__bg-300;
}

.btn.fat {
  padding: 1.3rem 3.5rem;
  border-radius: 6.5px;
}
.btn.no-arrow {
  .btn__text {
    margin-right: 0;
  }
  .arrow {
    display: none;
  }
}
.btn.small {
  padding: 0.7rem 1.8rem;
  .btn__text {
    font-size: 1.4rem;
  }
}
.btn.ghost {
  opacity: 0.7;
}

// Hovers
.btn.h-core {
  transition: background-color 0.25s ease;
  .icon {
    transition: fill 0.25s ease;
  }
  .btn__text {
    transition: color 0.25s ease;
  }
  &:hover {
    background-color: transparent;
    .icon {
      fill: $color__core;
    }
    .btn__text {
      color: $color__core;
    }
  }
}
.btn.h-white {
  transition: background-color 0.25s ease;
  .icon {
    transition: fill 0.25s ease;
  }
  .btn__text {
    transition: color 0.25s ease;
  }
  &:hover {
    background-color: white;
    .icon {
      fill: $color__core;
    }
    .btn__text {
      color: $color__core;
    }
  }
}

// Btn ajax
.btn.loading {
  pointer-events: none;
  .loader {
    display: block;
  }
  .flexbox {
    opacity: 0;
  }
}
</style>
