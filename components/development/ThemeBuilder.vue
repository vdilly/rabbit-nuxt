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
        FormGroup(label="Theme")
          FormSelect(v-model="pickedTheme")
            option(
              v-for="(theme, index) in themes",
              v-html="theme.name",
              :value="index"
            )
      .wrapper
        FormGroup(label="Color page")
          FormInput(v-model="colorPage")
        Verte(v-model="colorPage", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color text")
          FormInput(v-model="colorText")
        Verte(v-model="colorText", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color title")
          FormInput(v-model="colorTitle")
        Verte(v-model="colorTitle", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color1 : ppale")
          FormInput(v-model="color1")
        Verte(v-model="color1", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color 2 : gradient sombre")
          FormInput(v-model="color2")
        Verte(v-model="color2", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color 3 : gradient light")
          FormInput(v-model="color3")
        Verte(v-model="color3", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color 1 font")
          FormInput(v-model="color1font")
        Verte(v-model="color1font", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color 2 font")
          FormInput(v-model="color2font")
        Verte(v-model="color2font", model="hex", menuPosition="top")
      .wrapper
        FormGroup(label="Color 3 font")
          FormInput(v-model="color3font")
        Verte(v-model="color3font", model="hex", menuPosition="top")
      h3 Variables
      .wrapper
        FormGroup(label="Cut Type (wave, cut)")
          FormInput(v-model="cutType")
      .wrapper
        FormGroup(label="Bradius")
          FormInput(v-model="bradius")
      .wrapper
        FormGroup(label="Bradius Bt")
          FormInput(v-model="bradiusBtn")
</template>
<script>
import Verte from "verte";
import "verte/dist/verte.css";
import FormGroup from "@/components/form/FormGroup.vue";
import FormSelect from "@/components/form/FormSelect.vue";
export default {
  components: { Verte, FormGroup, FormSelect },
  data() {
    return {
      reduced: false,
      visible: false,
      color1: null,
      colorPage: null,
      colorText: null,
      colorTitle: null,
      color1font: null,
      color2font: null,
      color3font: null,
      color2: null,
      color3: null,
      root: null,
      bradius: null,
      bradiusBtn: null,
      cutType: null,
      pickedTheme: null,
      themes: [
        {
          name: "cerisier",
          colorPage: "#ffffff",
          colorText: "#7d7e85",
          colorTitle: "#000000",
          color1: "#861657",
          color2: "#861657",
          color3: "#FFa69e",
          color1Font: "#FFFFFF",
          color2Font: "#FFFFFF",
          color3Font: "#2f1c1c",
          bradius: "1rem",
          bradiusBtn: "20rem",
          cutType: "wave",
        },
        {
          name: "natif1",
          colorPage: "#ffffff",
          colorText: "#7d7e85",
          colorTitle: "#000000",
          color1: "#D2193C",
          color2: "#D2193C",
          color3: "#ff6565",
          color1Font: "#FFFFFF",
          color2Font: "#FFFFFF",
          color3Font: "#2f1c1c",
          bradius: "4px",
          bradiusBtn: "5px",
          cutType: "wave",
        },
        {
          name: "natif2",
          colorPage: "#ffffff",
          colorText: "#7d7e85",
          colorTitle: "#000000",
          color1: "#D2193C",
          color2: "#3ec5b1",
          color3: "#82eede",
          color1Font: "#FFFFFF",
          color2Font: "#FFFFFF",
          color3Font: "#2f1c1c",
          bradius: "4px",
          bradiusBtn: "5px",
          cutType: "wave",
        },
        {
          name: "natif3",
          colorPage: "#ffffff",
          colorText: "#7d7e85",
          colorTitle: "#000000",
          color1: "#3920AE",
          color2: "#3920AE",
          color3: "#9b82ff",
          color1Font: "#FFFFFF",
          color2Font: "#FFFFFF",
          color3Font: "#2f1c1c",
          bradius: "4px",
          bradiusBtn: "5px",
          cutType: "wave",
        },
        {
          name: "metal",
          colorPage: "#ffffff",
          colorText: "#7d7e85",
          colorTitle: "#000000",
          color1: "#ffb517",
          color2: "#2a373b",
          color3: "#99a7b7",
          color1Font: "#FFFFFF",
          color2Font: "#FFFFFF",
          color3Font: "#2f1c1c",
          bradius: ".5rem",
          bradiusBtn: ".5rem",
          cutType: "cut",
        },
        {
          name: "small business",
          colorPage: "#ffffff",
          colorText: "#7d7e85",
          colorTitle: "#000000",
          color1: "#5196e9",
          color2: "#5196e9",
          color3: "#37d5d6",
          color1Font: "#FFFFFF",
          color2Font: "#FFFFFF",
          color3Font: "#2f1c1c",
          bradius: "1rem",
          bradiusBtn: "20rem",
          cutType: "wave",
        },
        {
          name: "Big Log",
          colorPage: "#ffffff",
          colorText: "#7d7e85",
          colorTitle: "#000000",
          color1: "#772F1A",
          color2: "#772F1A",
          color3: "#F2A65A",
          color1Font: "#FFFFFF",
          color2Font: "#FFFFFF",
          color3Font: "#2f1c1c",
          bradius: "2rem",
          bradiusBtn: "20rem",
          cutType: "wave",
        },
        {
          name: "Leaf",
          colorPage: "#ffffff",
          colorText: "#7d7e85",
          colorTitle: "#000000",
          color1: "#6dad2e",
          color2: "#6dad2e",
          color3: "#e0f127",
          color1Font: "#FFFFFF",
          color2Font: "#FFFFFF",
          color3Font: "#2f1c1c",
          bradius: "1rem",
          bradiusBtn: "20rem",
          cutType: "wave",
        },
        {
          name: "cloudy",
          colorPage: "#ffffff",
          colorText: "#7d7e85",
          colorTitle: "#3a3b40",
          color1: "#6563dd",
          color2: "#9795EF",
          color3: "#F9C5D1",
          color1Font: "#FFFFFF",
          color2Font: "#FFFFFF",
          color3Font: "#2f1c1c",
          bradius: "1rem",
          bradiusBtn: "20rem",
          cutType: "wave",
        },
      ],
    };
  },
  methods: {
    toggleReduce() {
      this.reduced = !this.reduced;
    },
    display() {
      this.visible = true;
    },
    setValue(property, value) {
      this.root.style.setProperty(property, value);
    },
    getValues() {
      if (!window) return null;
      let styles = getComputedStyle(this.root);
      this.colorPage = styles.getPropertyValue("--color-page").trim();
      this.colorText = styles.getPropertyValue("--color-text").trim();
      this.colorTitle = styles.getPropertyValue("--color-title").trim();
      this.color1 = styles.getPropertyValue("--color-1").trim();
      this.color1font = styles.getPropertyValue("--color-1-font").trim();
      this.color2 = styles.getPropertyValue("--color-2").trim();
      this.color2font = styles.getPropertyValue("--color-2-font").trim();
      this.color3 = styles.getPropertyValue("--color-3").trim();
      this.color3font = styles.getPropertyValue("--color-3-font").trim();
      this.bradiusBtn = styles.getPropertyValue("--bradius-btn").trim();
      this.bradius = styles.getPropertyValue("--bradius").trim();
      this.cutType = this.theme.cutType;
    },
  },
  watch: {
    colorPage: function (value, old) {
      if (!window) return;
      this.setValue("--color-page", value);
    },
    colorText: function (value, old) {
      if (!window) return;
      this.setValue("--color-text", value);
    },
    colorTitle: function (value, old) {
      if (!window) return;
      this.setValue("--color-title", value);
    },
    color1: function (value, old) {
      if (!window) return;
      this.setValue("--color-1", value);
    },
    color2: function (value, old) {
      if (!window) return;
      this.setValue("--color-2", value);
    },
    color3: function (value, old) {
      if (!window) return;
      this.setValue("--color-3", value);
    },
    color1font: function (value, old) {
      if (!window) return;
      this.setValue("--color-1-font", value);
    },
    color2font: function (value, old) {
      if (!window) return;
      this.setValue("--color-2-font", value);
    },
    color3font: function (value, old) {
      if (!window) return;
      this.setValue("--color-3-font", value);
    },
    cutType: function (value, old) {
      if (!window) return;
      this.$store.commit("theme/setCutType", value);
    },
    bradius: function (value, old) {
      if (!window) return;
      this.setValue("--bradius", value);
    },
    bradiusBtn: function (value, old) {
      if (!window) return;
      this.setValue("--bradius-btn", value);
    },
    pickedTheme: function (value, old) {
      if (value == null) return;
      let theme = this.themes[value];
      if (!theme || !theme.name) return null;
      this.setValue("--color-page", theme.colorPage);
      this.setValue("--color-text", theme.colorText);
      this.setValue("--color-title", theme.colorTitle);
      this.setValue("--color-1", theme.color1);
      this.setValue("--color-2", theme.color2);
      this.setValue("--color-3", theme.color3);
      this.setValue("--color-1-font", theme.color1Font);
      this.setValue("--color-2-font", theme.color2Font);
      this.setValue("--color-3-font", theme.color3Font);
      this.setValue("--bradius", theme.bradius);
      this.setValue("--bradius-btn", theme.bradiusBtn);
      this.$store.commit("theme/setCutType", theme.cutType);
      this.getValues();
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
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

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

  .inner {
    height: auto;
    width: 50rem;
    border-radius: $bradius;
    background-color: white;
    padding: 6rem 5rem;
    position: relative;
    .h3 {
      color: black;
    }
  }

  .wrapper {
    position: relative;
    margin-bottom: 0.5rem;
    .form__group {
      margin-bottom: 0 !important;
    }
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
  .h3 {
    font-size: 1.6rem;
  }
  .form__info {
    display: none;
  }
  .form__field {
    height: 4rem !important;
    padding-top: 1.3rem !important;
    padding-bottom: 0.5rem !important;
  }
  .actions {
    top: 1rem;
    right: 1rem;
  }

  .inner {
    width: 30rem;
    box-shadow: $bshadow;
    height: auto;
    padding: 4rem 2rem;
    padding-left: 5rem;
    padding-bottom: 1rem;
  }
  &.reduced {
    .form--material {
      display: none;
    }
  }
}
</style>