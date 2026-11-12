<script setup lang="ts">
/** As paginas que a tenant criou no painel (Sobre, Lançamentos...). */
const route = useRoute()
const { page } = useRhSite()
const current = computed(() => page(route.path))
if (!current.value) throw createError({ statusCode: 404, statusMessage: 'Página não encontrada', fatal: true })
useSeoMeta({
  title: () => current.value?.seoTitle || current.value?.title,
  description: () => current.value?.seoDescription || undefined
})
</script>

<template>
  <RhSiteSections :sections="current?.sections" />
</template>
