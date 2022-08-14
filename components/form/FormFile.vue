<template lang="pug">
.form__file-wrapper
  .form__file.input-box(ref="input")
    .text(v-html="text")
    input(
      type="file",
      :id="id",
      :name="name",
      :accept="accept",
      @change="change",
      ref="input",
      :required="required"
    )
    .validation-box
  //- template(v-if="oldImage || image")
  //-   label Aperçu :
  //-   img(:src="image || oldImage", v-if="image || oldImage")
</template>
<script>
export default {
  props: ["id", "name", "accept", "required", "maxsize", "label", "oldImage"],
  data() {
    return {
      image: null,
      text: this.label || "Parcourir...",
      maxFileSize: 2, // MO
    };
  },
  beforeMount() {
    if (this.maxsize) this.maxFileSize = this.maxsize;
  },
  mounted() {
    // this.$refs.input.setAttribute("value", this.$refs.input.value);
  },
  methods: {
    toggleFileName(e) {
      if (e.target.files[0]) {
        this.text = e.target.files[0].name;
      } else {
        e.target.value = "";
        this.text = "Parcourir ...";
      }
    },
    validateFileWeight(e) {
      if (!e.target.files[0]) return;
      const file = e.target.files[0];
      let size = file.size / 1024 / 1024;
      if (size > this.maxFileSize) {
        e.target.setCustomValidity(
          "Fichier trop volumineux, max : " + this.maxFileSize + "Mo"
        );
      } else {
        e.target.setCustomValidity("");
      }
    },
    createImage(file) {
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result != undefined ? e.target.result : null;
      };
      reader.readAsDataURL(file);
    },
    change(e) {
      this.toggleFileName(e);
      this.validateFileWeight(e);

      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].type.indexOf("image") != -1) this.createImage(files[0]);
      this.$emit("fileChange", files[0]);
    },
  },
};
</script>