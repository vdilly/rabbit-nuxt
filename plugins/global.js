import Vue from "vue";
import { mapState } from "vuex";


// Components
import Container from "~/components/layouts/Container.vue";
import Dropdown from "~/components/layouts/Dropdown.vue";
import Drawer from "~/components/layouts/Drawer.vue";
import Popin from "~/components/layouts/Popin.vue";
import RTE from "~/components/RTE.vue";
import Btn from "~/components/atoms/Btn.vue";
import Logo from "~/components/atoms/Logo.vue";
import Loader from "~/components/atoms/Loader.vue";
import FormCheckbox from "~/components/form/FormCheckbox.vue";
import FormGroup from "~/components/form/FormGroup.vue";
import FormLine from "~/components/form/FormLine.vue";
import Form from "~/components/form/Form.vue";
import FormMultiChoice from "~/components/form/FormMultiChoice.vue";
import FormSingleChoice from "~/components/form/FormSingleChoice.vue";
import FormInput from "~/components/form/FormInput.vue";
import FormRadio from "~/components/form/FormRadio.vue";
import FormSelect from "~/components/form/FormSelect.vue";
import FormTextarea from "~/components/form/FormTextarea.vue";
import FormFieldset from "~/components/form/FormFieldset.vue";
import FormInfo from "~/components/form/FormInfo.vue";

Vue.component("Container", Container);
Vue.component("Dropdown", Dropdown);
Vue.component("Drawer", Drawer);
Vue.component("Popin", Popin);
Vue.component("RTE", RTE);
Vue.component("Btn", Btn);
Vue.component("Logo", Logo);
Vue.component("Loader", Loader);
Vue.component("FormGroup", FormGroup);
Vue.component("Form", Form);
Vue.component("FormLine", FormLine);
Vue.component("FormFieldset", FormFieldset);
Vue.component("FormSingleChoice", FormSingleChoice);
Vue.component("FormMultiChoice", FormMultiChoice);
Vue.component("FormCheckbox", FormCheckbox);
Vue.component("FormInput", FormInput);
Vue.component("FormRadio", FormRadio);
Vue.component("FormSelect", FormSelect);
Vue.component("FormTextarea", FormTextarea);
Vue.component("FormInfo", FormInfo);

// Plugin

// Global computed related to store
Vue.mixin({
  data() {
    return {
      trads: {
        "pending": "En attente",
        "refused": "Refusée",
        "processing": "En cours de réservation",
        "accepted": "Acceptée"
      },
      url: {
        cms: process?.env?.CMSUrl
      }
    }
  },
  computed: {
    ...mapState("window", ["window"]),
    ...mapState("device", ["device"]),
    // ...mapState("siteLoad", ["siteLoaded", "siteLoad"]),
  },
});