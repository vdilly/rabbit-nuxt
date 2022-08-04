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
      if (this.max) return value.length <= this.max;
      return true;
    },
    validRequired(value) {
      if (!this.required) return true;
      return value ? value.length > 0 : false;
    },
  },
};
</script>