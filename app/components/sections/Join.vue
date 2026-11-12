<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const external = computed(() => /^https?:\/\//.test(p.value.link || ''))
</script>

<template>
  <section id="anuncie" class="t-contact">
    <div class="t-wrap t-contact__row">
      <div>
        <RhText tag="h2" class="t-h2" path="title" :value="p.title" ph="Título" />
        <RhText tag="p" path="text" :value="p.text" ph="Texto" ml />
      </div>
      <div class="t-contact__cta">
        <NuxtLink class="t-btn t-btn--accent t-btn--big" :to="p.link || '/'" :external="external" :target="external ? '_blank' : undefined"><RhText path="button" :value="p.button" ph="Botão" /></NuxtLink>
        <RhText tag="small" path="note" :value="p.note" ph="Aviso" />
      </div>
    </div>
  </section>
</template>
