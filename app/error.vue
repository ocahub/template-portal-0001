<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
useHead({ title: notFound.value ? 'Página não encontrada' : 'Site indisponível' })
</script>

<template>
  <NuxtLayout>
    <section class="t-wrap t-error">
      <p class="t-error__code">{{ error.statusCode }}</p>
      <h1 class="t-h2">{{ notFound ? 'Não encontramos esta página' : 'O site está indisponível no momento' }}</h1>
      <p>{{ notFound ? 'O imóvel pode ter saído do site, ou o endereço mudou.' : 'Tente de novo em alguns instantes.' }}</p>
      <button type="button" class="t-btn t-btn--accent" @click="clearError({ redirect: '/' })">Voltar para o início</button>
    </section>
  </NuxtLayout>
</template>
