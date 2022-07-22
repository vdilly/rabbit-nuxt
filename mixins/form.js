import { getCommonFieldsErrors } from "@/utils/utils"
import validator from "validator";

export default {
  data() {
    return {
      showValidation: false,
      formErrors: [],
      formSuccessMessage: 'Message bien envoyé',
      formState: '',
      validator: validator,
    }
  },
  methods: {
    getCommonFieldsErrors: getCommonFieldsErrors,
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