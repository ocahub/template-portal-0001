<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
</script>

<template>
  <section class="t-sec t-soft">
    <div class="t-wrap">
      <RhText tag="h2" class="t-h2 t-center" path="title" :value="p.title" ph="Título" />
      <div class="t-quotes">
        <figure v-for="(it, i) in p.items" :key="i" class="t-quote">
          <RhText tag="blockquote" :path="`items.${i}.quote`" :value="it.quote" ph="Depoimento" ml />
          <figcaption>
            <RhText tag="b" :path="`items.${i}.name`" :value="it.name" ph="Nome" />
            <RhText tag="small" :path="`items.${i}.detail`" :value="it.detail" ph="Detalhe" />
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
