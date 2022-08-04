<template lang="pug">
textarea.form__field(
  cols="30",
  rows="10",
  ref="textarea",
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
  mounted() {
    // Je sais pas pourquoi sur le textarea uniquement faut forcer une value alors que l'input c'est ok
    this.$refs.textarea.setAttribute("value", this.value);
  },
};
</script>