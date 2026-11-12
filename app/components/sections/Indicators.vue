<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
</script>

<template>
  <section class="t-sec">
    <div class="t-wrap">
      <div class="t-head">
        <div>
          <RhText tag="h2" class="t-h2" path="title" :value="p.title" ph="Título" />
          <RhText tag="p" class="t-sub" path="subtitle" :value="p.subtitle" ph="Subtítulo" ml />
        </div>
      </div>
      <div class="t-ind" :style="{ '--n': p.items?.length ?? 1 }">
        <div v-for="(it, i) in p.items" :key="i">
          <RhText tag="small" :path="`items.${i}.name`" :value="it.name" ph="Índice" />
          <RhText tag="b" :path="`items.${i}.value`" :value="it.value" ph="Valor" />
          <RhText class="t-ind__detail" :path="`items.${i}.detail`" :value="it.detail" ph="Detalhe" />
        </div>
      </div>
    </div>
  </section>
</template>
