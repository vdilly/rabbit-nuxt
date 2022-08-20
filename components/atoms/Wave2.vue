<template>
  <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop
          offset="0%"
          style="stop-color: var(--color-2); stop-opacity: 1"
        ></stop>
        <stop
          offset="100%"
          style="stop-color: var(--color-3); stop-opacity: 1"
        ></stop>
      </linearGradient>
    </defs>
    <path
      :fill="`${fill || 'var(--color-page)'}`"
      fill-opacity="1"
      d="M0,128L120,138.7C240,149,480,171,720,165.3C960,160,1200,128,1320,112L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: ["fill"],
};
</script>