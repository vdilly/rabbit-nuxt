<template lang="pug">
FormGroup.formMultiChoice
  label.form__label
    slot(name="label")
  .form__field
    input.unstyled(
      type="radio",
      :name="'radioCheck-' + name",
      :required="required",
      :checked="valid"
    )
    FormGroup(
      :label="tag.name",
      :id="slugify(tag.name)",
      v-for="tag in tags",
      :key="tag.id"
    )
      FormCheckbox(
        :name="name",
        :id="slugify(tag.name)",
        :inputValue="tag.id",
        v-model="model",
        :max="max",
        :required="required"
      )
</template>
<script>
import slugify from "~/utils/slugify";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
    },
    inputValue: {
      type: String,
    },
    value: {
      type: Array,
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
    valid() {
      if (!this.value) return false;
      // Gère la validation du radio
      const isRequired = this.required;
      const atLeastOnechecked = this.value.length > 0;
      return isRequired && atLeastOnechecked;
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        // Il emit sans se poser de question, la validation se fait au niveau de la checkbox
        this.$emit("input", value);
      },
    },
  },
  methods: {
    slugify: slugify,
  },
};
</script>