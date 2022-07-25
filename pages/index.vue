<template lang="pug">
.hp
  .page(v-for="(page, index) in pages") 
    pre(v-html="page.title")
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
