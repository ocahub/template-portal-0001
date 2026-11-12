<script setup lang="ts">
// Titulo e icone da loja (do build, pelo kit).
const store = useRhStore()
useHead({
  titleTemplate: title => (title && title !== store.value?.name ? title : store.value?.name ?? 'Imobiliária'),
  link: [{ rel: 'icon', href: store.value?.logoUrl ?? '/favicon.ico' }]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
