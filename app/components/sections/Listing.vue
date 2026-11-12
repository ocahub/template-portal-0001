<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const search = (useRuntimeConfig().public.rhfactor as { shelfPath?: string }).shelfPath || '/imoveis'
</script>

<template>
  <section class="t-sec">
    <div class="t-wrap">
      <div class="t-head">
        <div>
          <RhText tag="h2" class="t-h2" path="title" :value="p.title" ph="Título" />
          <RhText tag="p" class="t-sub" path="subtitle" :value="p.subtitle" ph="Subtítulo" ml />
        </div>
        <NuxtLink class="t-more" :to="rhShowcaseLink(search, p.source, p.feature)"><RhText path="button" :value="p.button" ph="Ver todos" /></NuxtLink>
      </div>
      <RhPropertyShowcase :kind="p.source" :feature="p.feature" :count="p.count" :layout="p.layout" />
    </div>
  </section>
</template>
