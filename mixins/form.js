import { getCommonFieldsErrors } from "@/utils/utils"
import validator from "validator";

export default {
  data() {
    return {
      showValidation: false,
      formErrors: [],
      formSuccessMessage: this.form?.success || 'Message bien envoyé',
      formState: '',
      validator: validator,
    }
  },
  methods: {
    getCommonFieldsErrors: getCommonFieldsErrors,
    async getFormData(formNode) {
      let data = {
        form: {},
        files: {},
      };
      let formData = new FormData(formNode);

      let filesCount = 0;

      for (const [key, value] of formData.entries()) {
        // Skips
        if (key.indexOf('radioCheck') != -1) continue;

        // File
        if (value instanceof File) {
          if (value.name) {
            data.files[filesCount] = {
              name: value.name,
              file: await this.readFile(value),
              type: value.type,
            };
            filesCount++;
          }
          // Data
        } else {
          if (key.indexOf('[]') != -1) { // Si y'a [] dans le nom c'est un groupe faut getall
            data.form[key] = formData.getAll(key);
          } else {
            data.form[key] = value;
          }
        }
      }
      // data = JSON.stringify(data);
      return data;
    },
    readFile(file) {
      // Read et convert le fichier en base 64 exploitable par mailjet
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(btoa(reader.result));
        };
        reader.onerror = reject;
        reader.readAsBinaryString(file);
      });
    },
    resetFormState() {
      this.formState = '';
      this.formErrors = []
    },
    startSubmit() {
      this.formErrors = [];
      this.formState = 'pending'
    },
    formError(errors) {
      window.scrollTo({ top: 0 });
      this.formState = 'error'
      this.formErrors = errors;
    },
    formSuccess(msg) {
      this.formState = 'success'
      this.formSuccessMessage = msg || this.formSuccessMessage;
    },
    formSuccessNotify(msg) {
      this.formState = 'success'
      this.formSuccessMessage = msg || this.formSuccessMessage;
    }
  }
}