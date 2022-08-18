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
      :label="tag[labelPropName]",
      :id="hash + slugify(tag[labelPropName])",
      v-for="tag in tags",
      :key="slugify(tag[labelPropName])"
    )
      FormCheckbox(
        :name="name",
        :id="hash + slugify(tag[labelPropName])",
        :inputValue="slugify(tag[valuePropName])",
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
      type: [String, Number],
      required: true,
    },
    tags: {
      type: Array,
    },
    labelPropName: {
      default: "label",
    },
    valuePropName: {
      default: "label",
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