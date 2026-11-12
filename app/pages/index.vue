<script setup lang="ts">
const { page } = useRhSite()
const home = computed(() => page('/'))
useSeoMeta({
  title: () => home.value?.seoTitle || undefined,
  description: () => home.value?.seoDescription || undefined
})
</script>

<template>
  <RhSiteSections :sections="home?.sections" />
</template>
