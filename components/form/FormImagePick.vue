<template lang="pug">
.form__group.formImagePick.custom
  ul.unstyled
    li(v-for="image in images", :key="image.id")
      input.unstyled(
        type="radio",
        :value="image.id",
        :name="name",
        :id="name + '-' + image.id",
        v-model="model",
        :required="required"
      )
      label(:for="name + '-' + image.id")
        img(:src="image.image.data.attributes.url")
  label.form__label
    slot(name="label")
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    inputValue: {
      type: String,
    },
    value: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss">
.form .formImagePick {
  .form__label {
    font-size: 1.6rem;
    color: white;
    margin-bottom: 1rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-left: -2rem;
    margin-top: -2rem;
    li {
      max-width: calc(50% - 2rem);
      width: 18rem;
      margin-left: 2rem;
      margin-top: 2rem;
    }
  }
  li {
    position: relative;
    input {
      position: absolute;
      top: 1rem;
      left: 1rem;
      opacity: 0.1;
    }
    label {
      border: solid 2px transparent;
      opacity: 0.7;
      transition: opacity 0.25s ease;
      cursor: pointer;
      height: 15rem;
      border-radius: 15px;
      overflow: hidden;
      display: flex;
      &:hover {
        opacity: 1;
      }
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    input:checked + label {
      border-color: $color__bg-100;
      opacity: 1;
    }
  }
}

// RWD
@include RWD(mobile) {
  .formImagePick {
  }
}
</style>