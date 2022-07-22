<template lang="pug">
.form__line
  slot
</template>
<style lang="scss">
.form__line {
  display: flex;
  margin-left: -2rem;
  margin-top: -2rem;

  .form__group {
    margin-bottom: 0;
    margin-left: 2rem;
    margin-top: 2rem;
    flex: 1;
  }

  @include RWD(mobile) {
    flex-direction: column;
  }

  &.small {
    .form__group {
      width: 50%;
      flex: unset;
    }
  }
}
</style>