<template lang="pug">
input(
  ref="input",
  v-model="model",
  type="text",
  name="a_password",
  style="display: none !important",
  tabindex="-1",
  autocomplete="nope"
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
  mounted() {},
};
</script>