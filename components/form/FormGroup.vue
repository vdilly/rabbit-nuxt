<template lang="pug">
.form__group
  slot
  label.form__label(:for="id", v-if="label")
    span(v-html="label")
    span.form__required(v-if="required") *
  slot(name="info")
</template>

<script>
export default {
  props: ["id", "label", "required"],
};
</script>

<style lang="scss">
// Material
%form__label {
  font-family: $font__main;
  font-weight: 500;
  font-size: 1.2rem;
  color: $color__error;
  // line-height: 1.4em;
}
.form {
  .form__group {
    display: flex;
    flex-direction: column;
    & > * {
      max-width: 100%;
    }
    &.custom {
      flex-direction: column-reverse;
    }
    &.form__field--checkboxes,
    &.form__field--radios {
      label {
        order: 0;
      }
      .form__group {
        order: 1;
      }
    }
    .formInfo {
      margin-left: 2rem;
      margin-bottom: 0;
    }
  }
  .form__label {
    @extend %form__label;
  }

  .form__field {
    border-radius: 15px;
    padding: 1.9rem 2rem 1rem 2rem;
    width: 100%;
    font-family: $font__main;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.2em;
    color: $color__bg-500;
    background-color: white;
    border-color: transparent;

    &[disabled] {
      // background-color: #dddddd;
      color: rgba(black, 0.5);

      & + label {
        color: rgba(black, 0.5) !important;
      }
    }

    &::placeholder {
      opacity: 0.5;
    }

    &:focus {
      border-color: $color__title;
      outline: none;
    }
  }
  input.form__field {
    height: 5rem;
  }
  // Champs Input, select, textarea , label en placeholder
  input:not([type="radio"]):not([type="checkbox"]),
  select,
  textarea {
    pointer-events: all;
    & + label {
      pointer-events: none;
      position: absolute;
      top: 2.5rem;
      left: 2rem;
      transform: translateY(-50%);
      // padding: 0 5px;
      transition: font-size 0.25s, top 0.25s, transform 0.25s,
        background 0s 0.25s, opacity 0.25s;
      opacity: 0.8;
      @extend %form__label;
    }
    &:focus + label,
    &[filled] + label {
      top: 0px;
      transform: none;
      font-size: 1rem;
      opacity: 1;
    }
  }
  textarea.form__field {
    padding-top: 2.5rem;
  }
  textarea + label {
    top: 2.5rem;
  }
}

// custom
.form .form__group.custom {
}
</style>
