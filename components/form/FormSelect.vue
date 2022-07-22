
<template lang="pug">
select.form__field.input-box(v-model="model", ref="select", :filled="filled")
  option(value, selected)
  slot
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
  mounted() {},
};
</script>
<style lang="scss">
select.input-box {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%233B3B3B'><polygon points='0,0 100,0 50,50'/></svg>")
    no-repeat;
  background-size: 1.2rem;
  background-position: calc(100% - 20px) calc(50% + 6px);
  background-repeat: no-repeat;
}
</style>
