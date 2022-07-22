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
<style lang="scss">
.formMultiChoice {
  background-color: white;
  border-radius: 15px;
  position: relative;
  .form__field {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 1.5rem 2rem 0.5rem 2rem;
  }
  & > .form__label {
    pointer-events: none;
    transform: translateX(2rem) translateY(0.8rem);
  }
  .form__group {
    margin-right: 1rem;
    margin-bottom: 1rem !important;
    .form__label {
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      border: solid 2px $color__core;
      color: $color__core;
      font-weight: 600;
      transition: 0.25s;
      user-select: none;
      &:hover {
        opacity: 0.5;
      }
      &:before {
        display: none;
      }
    }
    input:checked + label {
      background-color: $color__core;
      color: white;
    }
  }
  input[type="radio"] {
    opacity: 0;
    position: absolute;
  }
}
</style>