<template lang="pug">
.themeBuilder(v-show="visible", :class="reduced ? 'reduced' : null")
  .inner
    .actions
      button(@click="toggleReduce")
        svg.icon
          use(xlink:href="#chevron")
      button(@click="visible = !visible")
        svg.icon
          use(xlink:href="#close")
    h2.h3 Changer les couleurs
    .form--material(style="margin-top: 2rem")
      .form__info Refresh la page pour reset les couleurs
      .wrapper
        FormGroup(label="Color 1")
          FormInput(v-model="color1")
        Verte(v-model="color1", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color 2")
          FormInput(v-model="color2")
        Verte(v-model="color2", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color 1 font")
          FormInput(v-model="color1font")
        Verte(v-model="color1font", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color 2 font")
          FormInput(v-model="color2font")
        Verte(v-model="color2font", model="hex", menuPosition="top")
</template>
<script>
import Verte from "verte";
import "verte/dist/verte.css";
export default {
  components: { Verte },
  data() {
    return {
      reduced: true,
      visible: false,
      color1: null,
      color1font: null,
      color2font: null,
      color2: null,
      root: null,
    };
  },
  methods: {
    toggleReduce() {
      this.reduced = !this.reduced;
    },
    display() {
      this.visible = true;
    },
    setValue(index, hex) {
      this.root.style.setProperty("--color-" + index, hex);
    },
    getValues() {
      if (!window) return null;
      let styles = getComputedStyle(this.root);
      this.color1 = styles.getPropertyValue("--color-1").trim();
      this.color1font = styles.getPropertyValue("--color-1-font").trim();
      this.color2 = styles.getPropertyValue("--color-2").trim();
      this.color2font = styles.getPropertyValue("--color-2-font").trim();
    },
  },
  watch: {
    color1: function (value, old) {
      if (!window) return;
      this.setValue(1, value);
    },
    color2: function (value, old) {
      if (!window) return;
      this.setValue(2, value);
    },
    color1font: function (value, old) {
      if (!window) return;
      this.setValue("1-font", value);
    },
    color2font: function (value, old) {
      if (!window) return;
      this.setValue("2-font", value);
    },
  },
  mounted() {
    // Get values
    if (document) {
      this.root = document.querySelector(":root");
      this.getValues();
    }

    // Konami
    const kode = [84, 72, 69, 77, 69, 66, 85, 73, 76, 68];
    const length = kode.length;
    var pos = 0;
    const vm = this;
    document.addEventListener(
      "keydown",
      function (event) {
        if (event.keyCode === kode[pos++]) {
          if (length === pos) {
            vm.display();
            pos = 0; // ability to start over
            return false;
          }
        } else {
          pos = 0;
        }
      },
      false
    );
  },
};
</script>
<style lang="scss">
.themeBuilder {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  z-index: 9999;
  background-color: rgba(black, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  .inner {
    height: auto;
    width: 50rem;
    border-radius: 1rem;
    background-color: white;
    padding: 6rem 5rem;
    position: relative;
  }

  .wrapper {
    position: relative;
    .verte {
      position: absolute;
      top: 1.5rem;
      left: -3rem;
    }
  }

  .actions {
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: flex;
    button {
      margin-left: 1rem;
      background-color: $color__grey;
      border-radius: 50%;
      height: 3rem;
      width: 3rem;
      position: relative;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 50%;
      width: 50%;
    }
  }

  // Réduit
  &.reduced {
    background-color: transparent;
    height: auto;
    width: auto;
    top: unset;
    left: unset;
    transform-origin: bottom right;
    // transform: scale(0.8);
    transform: none;
    bottom: 2rem;
    right: 2rem;

    .h3 {
      font-size: 1.6rem;
    }
    .form__info {
      display: none;
    }
    .form__field {
      height: 4rem;
    }
    .form__group {
      margin-bottom: 0.5rem;
    }

    .inner {
      box-shadow: $bshadow;
      height: auto;
      padding: 2rem;
      padding-left: 5rem;
      padding-bottom: 0;
    }
  }
}
</style>