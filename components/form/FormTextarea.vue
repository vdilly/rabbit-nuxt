<template lang="pug">
textarea.form__field(
  cols="30",
  rows="10",
  ref="textarea",
  v-model="model",
  :filled="filled"
)
</template>
<script>
export default {
  props: ["value"],
  computed: {
    filled() {
      if (!this.model || this.model.length == 0) return false;
      return true;
    },
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
<style lang="scss">
textarea {
  resize: none;
}
</style>
