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

