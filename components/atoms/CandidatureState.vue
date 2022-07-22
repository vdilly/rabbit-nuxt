<template lang="pug">
.candidatureState(
  v-if="state",
  v-html="trads[state] ? trads[state] : state",
  :class="state"
)
</template>
<script>
export default {
  props: ["state"],
};
</script>

<style lang="scss">
.candidatureState {
  margin-top: 1rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  color: $color__bg-100;
  &:before {
    margin-right: 1rem;
    content: "";
    height: 1rem;
    width: 1rem;
    background-color: $color__bg-100;
    border-radius: 50%;
  }
  &.refused {
    color: $color__error;
    &:before {
      background-color: $color__error;
    }
  }
  &.accepted {
    color: $color__success;
    &:before {
      background-color: $color__success;
    }
  }
  &.processing {
    color: $color__success;
    animation: fade 0.7s infinite alternate ease-in-out;
    &:before {
      background-color: $color__success;
    }
  }
}
</style>