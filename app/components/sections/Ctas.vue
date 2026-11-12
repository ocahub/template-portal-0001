<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const company = useRhCompany()
/** Sem link, a chamada abre o WhatsApp da loja. */
const href = (link?: string) => link || company.whatsappUrl() || '#'
</script>

<template>
  <section class="t-sec">
    <div class="t-wrap t-ctas" :style="{ '--n': p.items?.length ?? 1 }">
      <NuxtLink v-for="(it, i) in p.items" :key="i" class="t-cta" :to="href(it.link)" :external="href(it.link).startsWith('http')" :style="bg(it.image, OVERLAY.bottom)">
        <RhText tag="h3" :path="`items.${i}.title`" :value="it.title" ph="Título" />
        <RhText tag="p" :path="`items.${i}.text`" :value="it.text" ph="Texto" ml />
        <span class="t-btn t-btn--light"><RhText :path="`items.${i}.button`" :value="it.button" ph="Botão" /></span>
      </NuxtLink>
    </div>
  </section>
</template>
