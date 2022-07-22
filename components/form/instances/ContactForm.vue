<template lang="pug">
Form.form.form--contact(
  @submit="sendMail",
  :formErrors="formErrors",
  :formSuccessMessage="formSuccessMessage",
  :formState="formState"
)
  FormLine
    FormGroup(:id="'nom'", label="Nom")
      FormInput#nom(name="nom", v-model="nom")
    FormGroup(:id="'prenom'", label="Prenom", :required="true")
      FormInput#prenom(name="prenom", v-model="prenom", required)
  FormGroup(:id="'email'", label="Email", :required="true")
    FormInput#email(type="email", name="email", v-model="email", required)
  //- FormGroup(:id="'tel'", label="tel")
  //-   FormInput#tel(name="tel", v-model="tel")
  FormGroup(:id="'message'", label="Message", :required="true")
    FormTextarea#message(
      type="message",
      name="message",
      v-model="message",
      required
    )
  FormHoneypot(v-model="a_password")

  Btn.core(v-feedback)
    span Envoyer mon message
</template>
<script>
import formMixin from "@/mixins/form";
import FormHoneypot from "../FormHoneypot.vue";
export default {
  mixins: [formMixin],
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      message: "",
      a_password: "",
    };
  },
  methods: {
    getFormErrors() {
      let errors = [];
      if (!this.validator.isEmail(this.email)) errors.push("Email invalide");
      if (!this.validator.isLength(this.message, { min: 25, max: undefined }))
        errors.push("Votre message doit être de 25 caractères minimum");
      if (!this.validator.isLength(this.prenom, { min: 3, max: undefined }))
        errors.push("Votre prénom doit contenir 3 caractères minimum");
      if (this.a_password !== "")
        errors.push("Êtes vous sûr de ne pas être un robot ?");
      return errors;
    },
    async sendMail(e) {
      const vm = this;
      // Errors ?
      const errors = this.getFormErrors();
      if (errors.length) {
        vm.formError(errors);
        return false;
      }
      vm.formState = "pending";
      if (window) {
        const postMail = await fetch("/api/mail", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: vm.nom,
            prenom: vm.prenom,
            email: vm.email,
            message: vm.message,
            a_password: vm.a_password,
          }),
        });
        const res = await postMail;
        if (res.ok) {
          vm.formSuccess(
            "Merci pour votre message, nous vous recontactons au plus vite !"
          );
        } else {
          const { errors } = await postMail.json();
          vm.formError(errors);
        }
      }
    },
  },
  components: { FormHoneypot },
};
</script>