<template lang="pug">
input.form__field(
  ref="input",
  v-model="model",
  onkeyup="this.setAttribute('value', this.value);"
)
</template>
<script>
export default {
  props: ["value"],
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
