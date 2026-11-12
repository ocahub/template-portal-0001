<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const store = useRhStore()
const { menu, editing } = useRhSite()
const company = useRhCompany()
const logo = computed(() => p.value.logoImage || store.value?.logoUrl || '')
const name = computed(() => company.text(p.value.logo) || store.value?.name || '')
const open = ref(false)
const external = computed(() => /^https?:\/\//.test(p.value.ctaLink || ''))
</script>

<template>
  <header class="t-header">
    <div class="t-wrap t-header__row">
      <NuxtLink to="/" class="t-logo" :aria-label="name">
        <img v-if="logo" class="t-logo__img" :src="logo" :alt="name">
        <template v-else><span class="t-logo__mark" /><RhText path="logo" :value="p.logo" ph="Nome do portal" /></template>
      </NuxtLink>
      <nav class="t-nav" :class="{ 't-nav--open': open }" aria-label="Menu">
        <NuxtLink to="/imoveis?operacao=VENDA" @click="open = false">Comprar</NuxtLink>
        <NuxtLink to="/imoveis?operacao=LOCACAO" @click="open = false">Alugar</NuxtLink>
        <NuxtLink v-for="m in menu" :key="m.id" :to="m.slug" @click="open = false">{{ m.title }}</NuxtLink>
      </nav>
      <div v-if="p.cta || editing" class="t-header__cta">
        <NuxtLink class="t-btn t-btn--accent" :to="p.ctaLink || '/'" :external="external" :target="external ? '_blank' : undefined"><RhText path="cta" :value="p.cta" ph="Botão" /></NuxtLink>
      </div>
      <button type="button" class="t-burger" :aria-expanded="open" aria-label="Abrir menu" @click="open = !open"><i /><i /><i /></button>
    </div>
  </header>
</template>
