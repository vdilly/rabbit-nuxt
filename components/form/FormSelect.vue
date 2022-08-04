
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
</style>
