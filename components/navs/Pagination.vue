<template lang="pug">
.pagination
  Btn.core.no-arrow(@click="$emit('prev')", :disabled="currentPage <= 1")
    span Articles précédents
  div {{ currentPage }} / {{ totalPages }}
  Btn.core(@click="$emit('next')", :disabled="currentPage >= totalPages")
    span Articles suivants
</template>
<script>
export default {
  props: ["currentPage", "totalPages"],
};
</script>
<style lang="scss">
.pagination {
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>