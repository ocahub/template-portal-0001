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
      <RhPropertyCategories :id="section.id" :items="p.items ?? []">
        <template #label="{ index }"><RhText tag="b" :path="`items.${index}.label`" :value="p.items[index].label" ph="Categoria" /></template>
      </RhPropertyCategories>
    </div>
  </section>
</template>
