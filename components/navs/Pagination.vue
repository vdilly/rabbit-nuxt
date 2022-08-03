<template lang="pug">
.pagination
  div {{ currentPage }} / {{ totalPages }}
  Btn.core(@click="$emit('prev')", v-if="currentPage > 1")
    span Articles précédents
  Btn.core(@click="$emit('next')", v-if="currentPage < totalPages")
    span Articles suivants
</template>
<script>
export default {
  props: ["currentPage", "totalPages"],
};
</script>
<style lang="scss">
</style>