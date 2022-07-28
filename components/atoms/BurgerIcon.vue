<template lang="pug">
.burger-icon
  span
  span
  span
</template>

<style lang="scss">
.burger-icon {
  height: 2.5rem;
  width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  backface-visibility: hidden;
  perspective: 1000;
  transform: translateZ(0);
  span {
    width: 100%;
    height: 0.3rem;
    border-radius: 5rem;
    background-color: $color__core;
    backface-visibility: hidden;
    perspective: 1000;
    transition: width 0.2s, transform 0.2s;
  }
  span:last-child {
    width: 60%;
  }

  &:hover {
    span:first-child {
      transform: translateY(-0.5rem);
    }
    span:last-child {
      width: 100%;
      transform: translateY(0.5rem);
    }
  }
}
</style>