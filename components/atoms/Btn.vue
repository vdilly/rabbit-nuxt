<template lang="pug">
component.btn(
  :is="link ? 'Link' : forceDiv ? 'div' : 'button'",
  :link="link",
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
import Link from "./Link.vue";
export default {
  props: {
    link: {
      default: null,
    },
    forceDiv: {
      default: false,
    },
  },
  computed: {},
  components: { Loader, Link },
};
</script>

<style lang="scss">
.btn {
  user-select: none;
  display: inline-flex;
  padding: 1.8rem 2rem;
  border: solid 2px;
  text-decoration: none !important;
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
  .btn__text {
    color: white;
  }
  .icon {
    fill: white;
  }
}
.btn.bg {
  background-color: $color__bg-300;
  border-color: $color__bg-300;
}
.btn.white {
  background-color: white;
  border-color: white;
  .btn__text {
    color: white;
  }
  .icon {
    fill: white;
  }
}

// Sizes
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
  background-color: transparent !important;
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
    border-color: white;
    .icon {
      fill: $color__core;
    }
    .btn__text {
      color: $color__core;
    }
  }
}
.btn.h-ghost {
  transition: background-color 0.25s ease;
  .icon {
    transition: fill 0.25s ease;
  }
  .btn__text {
    transition: color 0.25s ease;
  }
  &:hover {
    background-color: transparent;
    // border-color: white;
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
