<template lang="pug">
.toggle-wrap
  input(type="checkbox", v-model="model", ref="input", :id="id", :name="id")
  label.toggle(:for="id", :title="title", @click="clickHandler")
    .ball
</template>
<script>
export default {
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    value: {
      type: Boolean,
    },
    required: {
      type: Boolean,
      default: false,
    },
    prevent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    clickHandler(e) {
      if (this.prevent) {
        e.preventDefault();
        this.$emit("click");
      }
    },
  },
};
</script>

<style lang="scss">
.toggle-wrap {
  position: relative;
  font-size: 1.3rem;
  width: 4em;
  height: 2em;

  input {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    z-index: -20;
  }
}
.toggle {
  width: 100%;
  height: 100%;
  background-color: $color__bg-300;
  border-radius: 2em;
  display: flex;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.25s ease;

  .ball {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-1.5em, -50%);
    background-color: $color__bg-100;
    border-radius: 50%;
    height: 1.2em;
    width: 1.2em;
    transition: transform 0.25s ease;
  }
}
.toggle-wrap input:checked + .toggle {
  opacity: 1;
  .ball {
    transform: translate(0.3em, -50%);
    background-color: $color__core;
  }
}
</style>