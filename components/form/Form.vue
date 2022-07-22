<template lang="pug">
form.this-form(:class="formState", @submit.prevent="submit")
  .errors.rte(
    v-if="formErrors && formErrors.length > 0 && formState == 'error'"
  )
    p L'envoi du formulaire a échoué :
    ul
      li(v-for="(error, index) in formErrors", :key="index", v-html="error")
  .success(
    v-html="formSuccessMessage",
    v-if="formState == 'success' && formSuccessMessage"
  )
  Loader
  .form-content
    slot
</template>
<script>
/**
   use : 
    template: 
    Form.form.form--contact(
        @submit="sendMail",
        :formErrors="formErrors",
        :formSuccessMessage="formSuccessMessage",
        :formState="formState"
      )

    Mixin : 

    import formMixin from "@/mixins/form";
    export default {
      mixins: [formMixin],


    Le mixin expose les data formErrors, formSuccessMessage, formState
    success : call formSuccess(successMessage)
    error : formError([arrayofErrors])
 */
import Loader from "../atoms/Loader.vue";
export default {
  props: ["formErrors", "formState", "formSuccessMessage"],
  methods: {
    submit(e) {
      this.$emit("submit");
    },
  },
  components: { Loader },
};
</script>

<style lang="scss">
// Errors
.form {
  .errors {
    background-color: $color__core;
    border-radius: 1rem;
    margin-bottom: 4rem;
    padding: 2rem;
    font-size: 1.4rem;

    a {
      color: white;
      text-decoration: underline;
    }
  }
  &.error {
  }
}

// Success
.form {
  .success {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 2rem;
    line-height: 1.6;
    width: calc(100% + 4rem);
    height: calc(100% + 4rem);
    border-radius: 2rem;
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    z-index: 90;
  }
  &:not(.success) .success {
    display: none;
  }
  &.success {
    .form-content {
      opacity: 0.05;
      pointer-events: none;
    }
  }
}

// Pending
.this-form {
  position: relative;
  .loader {
    position: absolute;
    top: 40%;
    left: 40%;
    z-index: 90;
  }
  .form__group > * {
    // transition: opacity 0.25s ease;
  }
  &:not(.pending) {
    .loader {
      display: none;
    }
  }
  &.pending {
    .form__group {
      cursor: not-allowed;
    }
    .form-content {
      opacity: 0.2;
      pointer-events: none;
    }
  }
}
</style>