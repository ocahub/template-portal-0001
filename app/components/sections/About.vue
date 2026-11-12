<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
</script>

<template>
  <section class="t-sec">
    <div class="t-wrap t-about">
      <div class="t-about__img" :style="bg(p.image)" />
      <div>
        <RhText tag="h2" class="t-h2" path="title" :value="p.title" ph="Título" />
        <RhText tag="p" class="t-body" path="text" :value="p.text" ph="Texto" ml />
        <div v-if="p.stats?.length" class="t-stats">
          <div v-for="(st, i) in p.stats" :key="i">
            <RhText tag="b" :path="`stats.${i}.value`" :value="st.value" ph="00" />
            <RhText tag="small" :path="`stats.${i}.label`" :value="st.label" ph="legenda" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
