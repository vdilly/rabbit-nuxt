<template lang="pug">
input.form__single-checkbox(
  type="checkbox",
  v-model="model",
  :value="inputValue",
  ref="input"
)
</template>
<script>
export default {
  props: {
    inputValue: {
      type: String,
    },
    value: {
      type: Boolean,
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
};
</script>