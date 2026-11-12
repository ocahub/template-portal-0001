import manifest from '~~/template.json'

/**
 * O template.json (00047): secoes, campos, aparencias e o conteudo padrao.
 * O painel le o mesmo arquivo (pelo cloud-management) para montar o editor.
 */
export const TEMPLATE = manifest

type Props = Record<string, any>
type SectionRef = string | { type: string, props?: Props }

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v))

/** "hero" ou { type, props }: o padrao da secao com o que a pagina muda. */
export function templateSection(ref: SectionRef, id: string) {
  const type = typeof ref === 'string' ? ref : ref.type
  const base = (manifest.sectionDefaults as Record<string, Props>)[type] ?? {}
  return { id, type, props: { ...clone(base), ...(typeof ref === 'string' ? {} : clone(ref.props ?? {})) } }
}

/** O conteudo padrao do template, para quando nada foi publicado ainda. */
export function templateDefaultContent() {
  return {
    template: { id: manifest.id, version: manifest.version },
    theme: { ...manifest.defaults.theme },
    globals: {
      header: templateSection('header', 'header'),
      footer: templateSection('footer', 'footer')
    },
    pages: manifest.defaults.pages.map((p, i) => ({
      id: i === 0 ? 'p-home' : `p-${i}`,
      title: p.title, slug: p.slug, menu: p.menu, seoTitle: p.seoTitle, seoDescription: p.seoDescription,
      sections: (p.sections as SectionRef[]).map((s, j) => templateSection(s, `s-${i}-${j}`))
    }))
  }
}

/** Cores e fontes escolhidas no painel, como variaveis CSS. */
export function templateThemeVars(theme: Record<string, string> | undefined) {
  const palette = manifest.theme.palettes.find(p => p.id === theme?.palette) ?? manifest.theme.palettes[0]!
  const fonts = manifest.theme.fonts.find(f => f.id === theme?.fonts) ?? manifest.theme.fonts[0]!
  return {
    '--t-primary': palette.primary,
    '--t-accent': palette.accent,
    '--t-soft': palette.soft,
    '--t-ink': palette.ink,
    '--t-display': fonts.display,
    '--t-body': fonts.body,
    '--t-dw': String(fonts.weight)
  }
}

/** Fundo com imagem e uma sobreposicao opcional. */
export function bg(url?: string | null, overlay?: string) {
  return { backgroundImage: [overlay, url ? `url("${url.replace(/"/g, '%22')}")` : ''].filter(Boolean).join(',') }
}

export const OVERLAY = {
  dark: 'linear-gradient(180deg,rgba(6,18,28,.30),rgba(6,18,28,.72))',
  side: 'linear-gradient(90deg,rgba(6,18,28,.74),rgba(6,18,28,.12))',
  bottom: 'linear-gradient(180deg,rgba(6,18,28,.12),rgba(6,18,28,.86) 72%)'
}
