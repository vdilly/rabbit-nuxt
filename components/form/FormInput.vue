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
  mounted() {
    // Je sais pas pourquoi sur le textarea uniquement faut forcer une value alors que l'input c'est ok
    this.$refs.input.setAttribute("value", this.model);
  },
};
</script>
