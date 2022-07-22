<template lang="pug">
input.form__field(ref="input", v-model="model", :filled="filled")
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
<style lang="scss"></style>
