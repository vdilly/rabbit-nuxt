<template lang="pug">
.form__file-wrapper
  template(v-if="oldImage")
    label Image actuelle :
    img(:src="image || oldImage", v-if="image || oldImage")
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
</template>
<script>
export default {
  props: ["id", "name", "accept", "required", "maxsize", "label", "oldImage"],
  data() {
    return {
      image: null,
      text: this.label || "Parcourir...",
      maxFileSize: 2,
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
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    change(e) {
      this.toggleFileName(e);
      this.validateFileWeight(e);

      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      this.$emit("fileChange", files[0]);
    },
  },
};
</script>
<style lang="scss">
.form__group--file {
  display: flex;
  flex-direction: column;

  .form__file {
    order: 1;
  }
  .form__label {
    order: 0;
  }
  .form__subfield {
    order: 2;
  }
  label {
    display: block;
    margin-bottom: 2rem;
  }
  img {
    border-radius: 1.5rem;
  }
}
.form__file {
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dotted $color__core;
  background-color: $color__bg-300;
  width: 100%;
  border-radius: 4px;
  position: relative;

  &-wrapper .img-contain {
    width: 30rem;
    height: 30rem;
  }

  .text {
    font-weight: 600;
    // color: $color__title;
  }

  input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    height: 100%;
    width: 100%;
    z-index: 2;
  }
  .validation-box {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    // border-radius: 0.5rem;
    box-sizing: content-box;
  }
}
</style>
