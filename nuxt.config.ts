// Template de site de PORTAL de imoveis (00047, portal 00040): feito a partir do
// template-imobiliaria-0001. O site e da plataforma (sem tenant): o SysAdmin escolhe
// o template e edita as paginas em Plataforma › Portais. O conteudo (paginas, secoes, textos
// e imagens) a tenant edita no painel em Loja › Site › Páginas; o build le a
// versao publicada no cloud-management. O que mora aqui: as secoes
// (app/components/sections), o visual e o template.json (o contrato com o painel).
export default defineNuxtConfig({
  modules: ['@ocahub/kit'],
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  rhfactor: {
    storeId: process.env.RHFACTOR_STORE_ID ?? '',
    apiBase: process.env.RHFACTOR_API_BASE ?? 'http://localhost:8085',
    iamBase: process.env.RHFACTOR_IAM_BASE ?? 'http://localhost:8080',
    contractsBase: process.env.RHFACTOR_CONTRACTS_BASE ?? 'http://localhost:8082',
    paymentsBase: process.env.RHFACTOR_PAYMENTS_BASE ?? 'http://localhost:8089',
    // Portal (00040): os imoveis de todas as imobiliarias, com a imobiliaria no endereco do imovel.
    portal: true,
    pages: { shelf: '/imoveis' },
    siteContent: true
  },

  // Cada tipo de secao e um componente global Section{Tipo}: o kit monta a pagina pelo tipo.
  components: [
    { path: '~/components/sections', prefix: 'Section', global: true },
    '~/components'
  ],

  css: ['~/assets/css/template.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap' }
      ]
    }
  }
})
