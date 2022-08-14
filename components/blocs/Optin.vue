<template lang="pug">
.optin
  Container
    h2.h2.titre(v-html="bloc.titre", v-if="bloc.titre")
    .description(v-html="bloc.description", v-if="bloc.description")
    form.form--optin(
      :class="[formState, showValidation ? 'validate' : null]",
      @submit.prevent="submit"
    ) 
      template(v-if="formState != 'success'")
        //- States
        .errors.rte(
          v-if="formErrors && formErrors.length > 0 && formState == 'error'"
        )
          p L'envoi du formulaire a échoué :
          ul
            li(
              v-for="(error, index) in formErrors",
              :key="index",
              v-html="error"
            )
        Loader

        //- Content
        .form-content
          FormGroup(:id="'email'", :required="true")
            FormInput#email(
              type="email",
              name="email",
              v-model="email",
              :placeholder="bloc.label",
              required
            )

        //- Actions
        .form__actions.align-center
          slot(name="cancel")
          Btn.white.ghost.form__send(@click="validate = true", type="submit")
            span(v-html="bloc && bloc.bouton ? bloc.bouton : 'Envoyer'")
      template(v-else)
        .success(
          v-html="formSuccessMessage",
          v-if="formState == 'success' && formSuccessMessage"
        )
</template>

<script>
import FormGroup from "@/components/form/FormGroup.vue";
import FormInput from "@/components/form/FormInput.vue";
import formMixin from "@/mixins/form";
export default {
  props: ["bloc"],
  mixins: [formMixin],
  components: { FormGroup, FormInput },
  data() {
    return {
      email: "",
    };
  },
};
</script>

<style lang="scss">
.optin {
  background-color: $color__core;
  padding: 6rem 0 8rem;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .titre {
    text-align: center;
    margin-bottom: 6rem;
    color: white;
  }
}

.form--optin {
  display: flex;
  flex-direction: row;
  @import "@/assets/scss/forms/material/_states";
  @import "@/assets/scss/forms/material/_input";

  .form__actions {
    margin-top: 0;
    margin-left: 2rem;
  }
  .form__field {
    background-color: white;
    border-color: transparent;
    border-radius: 20rem;
    padding: 1.5rem 3rem;
  }
}
</style>