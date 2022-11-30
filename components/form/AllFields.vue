<template lang="pug">
FormGroup(
  :id="id",
  :label="field.label",
  :required="field.requis",
  :class="'form__field--' + field.acf_fc_layout"
)
  h3.h3(v-if="field.acf_fc_layout == 'titre'", v-html="field.titre")
  FormSelect(
    v-if="field.acf_fc_layout == 'select'",
    :name="id",
    :id="id",
    :required="field.requis",
    :value="getSelectValueFromOptions(field.options)"
  )
    option(
      v-for="(option, index) in field.options",
      :value="slugify(option.value)",
      :key="index",
      :selected="option.selected",
      v-html="option.value"
    )
  FormCountrySelect(
    v-if="field.acf_fc_layout == 'country_selector'",
    :name="id",
    :id="id",
    :required="field.requis"
  )
  FormTextarea(
    v-if="field.acf_fc_layout == 'textarea'",
    :name="id",
    :id="id",
    :placeholder="field.placeholder",
    :required="field.requis",
    :value="field.default_value"
  )
  FormInput(
    v-if="field.acf_fc_layout == 'input'",
    :type="field.type",
    :name="id",
    :id="id",
    :placeholder="field.placeholder",
    :required="field.requis",
    :value="field.default_value"
  )
  FormFile(
    v-if="field.acf_fc_layout == 'file'",
    :type="field.type",
    :name="id",
    :id="id",
    :placeholder="field.placeholder",
    :required="field.requis",
    :value="field.default_value"
  )
  FormCheckbox(
    v-if="field.acf_fc_layout == 'single_checkbox'",
    :label="field.label",
    :name="id",
    :id="id",
    :required="field.requis",
    :checked="field.checked",
    :inputValue="'oui'"
  )
  FormMultiChoice(
    v-if="field.acf_fc_layout == 'checkboxes'",
    :name="slugify(field.label) + '[]'",
    :tags="field.checkboxes",
    :required="field.requis",
    :max="parseInt(field.max)",
    :min="parseInt(field.min)",
    :inputValue="getCheckedValuesFromMultipleField(field.checkboxes)",
    :infos="field.infos"
  )
  FormSingleChoice(
    v-if="field.acf_fc_layout == 'radios'",
    :name="slugify(field.label)",
    :tags="field.radios",
    :required="field.requis",
    :max="parseInt(field.max)",
    :min="parseInt(field.min)",
    :inputValue="getSelectValueFromOptions(field.radios)",
    :infos="field.infos"
  )
</template>
<script>
import FormFile from "@/components/form/FormFile.vue";
import FormGroup from "~/components/form/FormGroup.vue";
import FormSelect from "~/components/form/FormSelect.vue";
import FormCountrySelect from "~/components/form/FormCountrySelect.vue";
import FormTextarea from "~/components/form/FormTextarea.vue";
import FormInput from "~/components/form/FormInput.vue";
import FormCheckbox from "~/components/form/FormCheckbox.vue";
import FormRadio from "~/components/form/FormRadio.vue";
import slugify from "~/utils/slugify";
import FormSingleChoice from "./FormSingleChoice.vue";
export default {
  props: ["field", "parent_labels_display", "parent_id"],
  computed: {
    id() {
      if (!this.field.label) return null;
      let id = this.slugify(this.field.label);
      return id;
    },
  },
  components: {
    FormGroup,
    FormSelect,
    FormCountrySelect,
    FormTextarea,
    FormInput,
    FormCheckbox,
    FormRadio,
    AllFields: () => import("~/components/form/AllFields.vue"),
    FormFile,
    FormSingleChoice,
  },
  methods: {
    slugify: slugify,
    getCheckedValuesFromMultipleField(tags) {
      let selected = [];
      tags.forEach((el) => {
        if (el.checked || el.selected) {
          selected.push(slugify(el.label));
        }
      });
      return selected;
    },
    getSelectValueFromOptions(options) {
      let selected = "";
      options.some((el) => {
        if (el.selected) {
          // Cas d'un select ou radio
          selected = el.value ? slugify(el.value) : slugify(el.label);
          return true;
        }
      });
      return selected;
    },
  },
};
</script>
