<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
</script>

<template>
  <section class="t-sec t-soft">
    <div class="t-wrap">
      <div class="t-head">
        <div>
          <RhText tag="h2" class="t-h2" path="title" :value="p.title" ph="Título" />
          <RhText tag="p" class="t-sub" path="subtitle" :value="p.subtitle" ph="Subtítulo" ml />
        </div>
      </div>
      <div class="t-cities">
        <NuxtLink v-for="(it, i) in p.items" :key="i" class="t-city" :to="it.link || '/imoveis'" :style="bg(it.image, OVERLAY.bottom)">
          <RhText :path="`items.${i}.name`" :value="it.name" ph="Bairro" />
          <small>Ver imóveis →</small>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
