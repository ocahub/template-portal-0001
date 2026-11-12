<script setup lang="ts">
const props = defineProps<{ section: { id: string, props: Record<string, any> } }>()
const p = computed(() => props.section.props)
const store = useRhStore()
const company = useRhCompany()
const { global, menu } = useRhSite()
const header = computed(() => global('header')?.props ?? {})
const logo = computed(() => header.value.logoImage || store.value?.logoUrl || '')
const name = computed(() => company.text(header.value.logo) || store.value?.name || '')
</script>

<template>
  <footer class="t-footer">
    <div class="t-wrap t-footer__grid">
      <div>
        <div class="t-logo t-logo--footer">
          <img v-if="logo" class="t-logo__img" :src="logo" :alt="name">
          <template v-else><span class="t-logo__mark" />{{ name }}</template>
        </div>
        <RhText tag="p" path="about" :value="p.about" ph="Sobre o portal" ml />
      </div>
      <div>
        <h4>Imóveis</h4>
        <p><NuxtLink to="/imoveis?operacao=VENDA">Comprar</NuxtLink></p>
        <p><NuxtLink to="/imoveis?operacao=LOCACAO">Alugar</NuxtLink></p>
        <p v-for="m in menu" :key="m.id"><NuxtLink :to="m.slug">{{ m.title }}</NuxtLink></p>
      </div>
      <div>
        <RhText tag="h4" path="contactTitle" :value="p.contactTitle" ph="Contato" />
        <RhText tag="p" style="white-space:pre-line" path="contact" :value="p.contact" ph="Contato" ml />
      </div>
    </div>
    <div class="t-wrap">
      <div class="t-footer__copy">© {{ new Date().getFullYear() }} {{ name }} · <RhText path="note" :value="p.note" ph="Nota" /></div>
    </div>
  </footer>
</template>
