<template lang="pug">
FormGroup.formMultiChoice
  label.form__label
    slot(name="label")
  .form__field
    FormGroup(
      :label="tag.name",
      :id="slugify(tag.name)",
      v-for="tag in tags",
      :key="tag.id"
    )
      FormRadio(
        :name="name",
        :id="slugify(tag.name)",
        :inputValue="tag.id",
        v-model="model",
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