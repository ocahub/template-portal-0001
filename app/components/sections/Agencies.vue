<script setup lang="ts">
/**
 * As imobiliarias do portal (00040): logo e nome, cada uma leva ao site dela.
 * Pagina estatica (00048): a lista do build no HTML; a atual quando aparece na tela.
 */
interface Agency { handle: string, name: string, logoUrl: string | null, siteUrl: string | null }
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const { editing } = useRhSite()
const api = useRhPublic()
const live = useRhLive('imob:agencies', () => api.get<Agency[]>('imob', '/agencies'))
const liveEl = live.el
const list = computed(() => (live.data.value ?? []).slice(0, Number(p.value.count) || 12))
</script>

<template>
  <section v-if="list.length || live.loading.value || editing" ref="liveEl" class="t-sec">
    <div class="t-wrap">
      <div class="t-head">
        <div>
          <RhText tag="h2" class="t-h2" path="title" :value="p.title" ph="Título" />
          <RhText tag="p" class="t-sub" path="subtitle" :value="p.subtitle" ph="Subtítulo" ml />
        </div>
      </div>
      <div class="t-agencies">
        <template v-if="live.loading.value"><div v-for="i in 4" :key="i" class="t-agency rh-skeleton" /></template>
        <component :is="a.siteUrl ? 'a' : 'div'" v-for="a in list" v-else :key="a.handle" class="t-agency" :href="a.siteUrl || undefined" target="_blank" rel="noopener">
          <img v-if="a.logoUrl" :src="a.logoUrl" :alt="a.name" loading="lazy">
          <span v-else class="t-agency__initial" aria-hidden="true">{{ a.name.slice(0, 1) }}</span>
          <b>{{ a.name }}</b>
        </component>
      </div>
      <p v-if="!list.length && !live.loading.value" class="t-sub">Nenhuma imobiliária no portal ainda. No site, esta seção não aparece.</p>
    </div>
  </section>
</template>
