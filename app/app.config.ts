import { templateDefaultContent } from './utils/template'

// Sem conteudo publicado no painel, o site mostra o padrao do template.
export default defineAppConfig({
  rhfactor: {
    siteDefault: templateDefaultContent()
  }
})
