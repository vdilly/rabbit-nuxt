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
      :label="tag.label",
      :id="hash + slugify(tag.label)",
      v-for="tag in tags",
      :key="slugify(tag.label)"
    )
      FormCheckbox(
        :name="name",
        :id="hash + slugify(tag.label)",
        :inputValue="slugify(tag.label)",
        v-model="model",
        :max="max",
        :min="min",
        :required="required"
      )
  .form__info(v-html="infos")
</template>
<script>
import slugify from "~/utils/slugify";
export default {
  data() {
    return {
      hash: null,
      value: [],
    };
  },
  props: {
    infos: {
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
    },
    inputValue: {
      type: Array,
    },
    max: {
      type: Number,
    },
    min: {
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
        this.value = value;
        this.$emit("input", value);
      },
    },
  },
  methods: {
    slugify: slugify,
  },
  mounted() {
    this.value = this.inputValue || [];
    this.hash = Math.random().toString(36).substring(7);
  },
};
</script>