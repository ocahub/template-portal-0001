<script setup lang="ts">
/** Cabecalho e rodape vem do conteudo do site (secoes globais); as cores e fontes, da aparencia escolhida no painel. */
const { content, global } = useRhSite()
const vars = computed(() => templateThemeVars(content.value?.theme))
const header = computed(() => global('header'))
const footer = computed(() => global('footer'))
</script>

<template>
  <div class="tpl" :style="vars">
    <RhSiteSection v-if="header" :section="header" label="Cabeçalho" />
    <main class="tpl-main">
      <slot />
    </main>
    <RhSiteSection v-if="footer" :section="footer" label="Rodapé" />
  </div>
</template>
