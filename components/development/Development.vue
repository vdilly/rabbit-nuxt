<template lang="pug">
.dev-tools
  ThemeBuilder
  SeoVisualizer
</template>
<script>
import SeoVisualizer from "./SeoVisualizer.vue";
import ThemeBuilder from "@/components/development/ThemeBuilder.vue";
export default {
  components: { ThemeBuilder, SeoVisualizer },
};
</script>