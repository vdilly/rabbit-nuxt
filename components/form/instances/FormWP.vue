<template lang="pug">
form.formWp(
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
        li(v-for="(error, index) in formErrors", :key="index", v-html="error")
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
      Btn.core.form__send(@click="validate = true", type="submit")
        span(v-html="form && form.formSend ? form.formSend : 'Envoyer'")
  template(v-else)
    .success(
      v-html="formSuccessMessage",
      v-if="formState == 'success' && formSuccessMessage"
    )
</template>
<script>
/**
    Mixin : 

    import formMixin from "@/mixins/form";
    export default {
      mixins: [formMixin],


    Le mixin expose les data formErrors, formSuccessMessage, formState
    startSubmit()
    success : call formSuccess(successMessage)
    error : formError([arrayofErrors])
 */
import Loader from "@/components/atoms/Loader.vue";
import formMixin from "@/mixins/form";
import "@/assets/scss/forms/material.scss";
import FormMultiChoice from "../FormMultiChoice.vue";
export default {
  props: ["form"],
  components: { Loader, FormMultiChoice },
  mixins: [formMixin],
  data() {
    return {
      showValidation: true,
    };
  },
  methods: {
    async submit(e) {
      this.startSubmit();
      const data = await this.getFormData(e.target);
      console.log(data.form);
      setTimeout(() => {
        this.formError(["C pas bon"]);
      }, 1000);
      // this.formSuccess();
      // this.$emit("submit");
    },
  },
};
</script>

<style lang="scss">
</style>