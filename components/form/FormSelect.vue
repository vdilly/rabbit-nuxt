
<template lang="pug">
select.form__field.input-box(
  v-model="model",
  ref="select",
  onchange="this.setAttribute('value', this.value);"
)
  option(value)
  slot
</template>
<script>
export default {
  props: ["value"],
  computed: {
    model: {
      get() {
        return this.value ? this.value : "";
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    this.$refs.select.setAttribute("value", this.model);
  },
};
</script>
<style lang="scss">
</style>
