<template lang="pug">
input.form__checkbox(
  type="checkbox",
  v-model="model",
  :value="inputValue",
  ref="input",
  :valid="valid"
)
</template>
<script>
export default {
  props: {
    inputValue: {
      type: String,
    },
    value: {
      type: Array,
    },
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    valid() {
      let valid =
        this.validRequired(this.value) && this.validLength(this.value);
      return false;
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        const validLength = this.validLength(value);
        const validRequired = this.validRequired(value);
        if (validLength && validRequired) {
          // Si tout est valide on emit
          this.$emit("input", value);
        } else {
          // Sinon on reset l'action de l'user
          this.$refs.input.checked = !this.$refs.input.checked;
        }
      },
    },
  },
  methods: {
    validLength(value) {
      // Si option défini, on test sinon on bypass le test
      let maxValid = this.max ? false : true;
      let minValid = this.min ? false : true;

      if (!maxValid) maxValid = value.length <= this.max;
      if (!minValid) minValid = value.length >= this.min;
      return maxValid && minValid;
    },
    validRequired(value) {
      if (!this.required) return true;
      return value ? value.length > 0 : false;
    },
  },
};
</script>