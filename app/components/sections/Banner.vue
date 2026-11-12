<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
</script>

<template>
  <section class="t-banner" :style="bg(p.image, OVERLAY.side)">
    <div class="t-wrap">
      <RhText tag="h2" class="t-h2" path="title" :value="p.title" ph="Título" />
      <RhText tag="p" path="subtitle" :value="p.subtitle" ph="Texto" ml />
      <NuxtLink v-if="p.link" class="t-btn t-btn--light" :to="p.link"><RhText path="button" :value="p.button" ph="Botão" /></NuxtLink>
      <RhWhatsappButton v-else class="t-btn t-btn--light" source="banner"><RhText path="button" :value="p.button" ph="Botão" /></RhWhatsappButton>
    </div>
  </section>
</template>
