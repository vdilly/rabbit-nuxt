<template lang="pug">
.form__group.formImagePick.custom
  ul.unstyled
    li(v-for="image in images", :key="image.id")
      input.unstyled(
        type="radio",
        :value="image.id",
        :name="name",
        :id="name + '-' + image.id",
        v-model="model",
        :required="required"
      )
      label(:for="name + '-' + image.id")
        img(:src="image.image.data.attributes.url")
  label.form__label
    slot(name="label")
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    inputValue: {
      type: String,
    },
    value: {
      type: String,
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