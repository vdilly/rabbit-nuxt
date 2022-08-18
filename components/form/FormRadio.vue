<template lang="pug">
input(type="radio", v-model="model", :value="inputValue", ref="input")
</template>
<script>
export default {
  props: {
    inputValue: {
      type: [String, Number],
    },
    value: {
      type: String,
    },
    max: {
      type: Number,
    },
    required: {
      type: Boolean,
      default: false,
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