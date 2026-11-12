<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
</script>

<template>
  <section class="t-hero" :style="bg(p.image, OVERLAY.dark)">
    <div class="t-wrap">
      <RhText tag="p" class="t-eyebrow" path="eyebrow" :value="p.eyebrow" ph="Chamada pequena" />
      <RhText tag="h1" class="t-h1" path="title" :value="p.title" ph="Título" />
      <RhText tag="p" class="t-lead" path="subtitle" :value="p.subtitle" ph="Subtítulo" ml />
      <RhPropertySearchBox class="t-search" :ops="p.ops ?? []" :chips="p.chips ?? []">
        <template #chip="{ index }"><RhText :path="`chips.${index}.label`" :value="p.chips[index].label" ph="Característica" /></template>
      </RhPropertySearchBox>
      <RhText tag="p" class="t-stat" path="stat" :value="p.stat" ph="Frase abaixo da busca" />
    </div>
  </section>
</template>
