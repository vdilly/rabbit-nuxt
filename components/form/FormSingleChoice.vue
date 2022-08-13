<template lang="pug">
FormGroup.formMultiChoice
  label.form__label
    slot(name="label")
  .form__field
    FormGroup(
      :label="tag.label",
      :id="hash + slugify(tag.label)",
      v-for="tag in tags",
      :key="slugify(tag.label)"
    )
      FormRadio(
        :name="name",
        :id="hash + slugify(tag.label)",
        :inputValue="slugify(tag.label)",
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
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hash: null,
      value: "",
    };
  },
  computed: {
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