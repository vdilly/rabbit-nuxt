<template lang="pug">
form.formWp(:class="formState", @submit.prevent="submit")
  //- States
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

  //- Content
  .form-content
    template(v-for="(field, index) in form.fields")
      FormFieldset(
        v-if="field.acf_fc_layout == 'group_field'",
        :fieldsetTitle="field.label",
        :required="field.requis",
        :key="index"
      )
        FormFieldsWP(
          v-for="(subfield, index) in field.fields",
          :field="subfield",
          :key="index"
        )
      FormFieldsWP(v-else, :field="field", :key="index")

  //- Actions
  .form__actions.align-center
    slot(name="cancel")
    Btn.form__send(@click="validate = true", type="submit")
      span(v-html="form && form.formSend ? form.formSend : 'Envoyer'")
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
import Loader from "@/components/atoms/Loader.vue";
import formMixin from "@/mixins/form";
import "@/assets/scss/forms/material.scss";
export default {
  props: ["form"],
  components: { Loader },
  mixins: [formMixin],
  methods: {
    submit(e) {
      // this.formError(["C pas bon"]);
      this.formSuccess();
      // this.$emit("submit");
    },
  },
};
</script>

<style lang="scss">
</style>