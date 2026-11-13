# =============================================================================
# Imagem do site do template-imobiliaria-0001 (Nuxt 4, SSR) - 00047.
#
# O @ocahub/kit vem do npm (versao no package.json):
#
#   docker build --build-arg RHFACTOR_STORE_ID=... -t template-imobiliaria-0001 .
#
# Os dados da loja (nome, logotipo) e o CONTEUDO PUBLICADO das paginas entram
# no BUILD: o sales-api (RHFACTOR_API_BASE) e o cloud-management
# (RHFACTOR_CLOUD_BASE) precisam responder nesse momento. Sem conteudo
# publicado, o site sai com o padrao do template.json.
# =============================================================================

# Kit local (so no dev): o cloud-management passa `--build-context kit-local=...`
# com o kit em desenvolvimento empacotado (ocahub-kit.tgz). Sem isso, este
# estagio fica vazio e vale o kit do npm.
FROM scratch AS kit-local

FROM node:24-alpine AS builder
WORKDIR /src/site
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY --from=kit-local / /tmp/kit-local/
RUN if [ -f /tmp/kit-local/ocahub-kit.tgz ]; then \
      echo "Kit local: $(tar -xOzf /tmp/kit-local/ocahub-kit.tgz package/package.json | grep '"version"')" && \
      npm install --no-save --ignore-scripts --no-audit --no-fund /tmp/kit-local/ocahub-kit.tgz; \
    fi
COPY . .

ARG RHFACTOR_STORE_ID=""
ARG RHFACTOR_API_BASE="http://host.docker.internal:8085"
# Muda a cada publicacao (o cloud-management manda a geracao do site): sem
# ele, o build sairia do cache do Docker com os dados ANTIGOS da loja, ja que
# nada no contexto mudou. So este passo e refeito; o npm ci continua em cache.
ARG RHFACTOR_BUILD_ID=""
# Google (00035), do painel: Analytics e a meta do Search Console. Vazio = sem.
ARG RHFACTOR_GOOGLE_ANALYTICS_ID=""
ARG RHFACTOR_GOOGLE_SITE_VERIFICATION=""
# Tag Manager e Meta Pixel (00037): o kit le no build.
ARG RHFACTOR_GOOGLE_TAG_MANAGER_ID=""
ARG RHFACTOR_META_PIXEL_ID=""
# Site de imobiliaria (00039): o kit no modo imob (busca de imoveis e pedido de visita).
ARG RHFACTOR_IMOB=""
# Portal (00040): o kit no modo portal (imoveis de varias imobiliarias).
ARG RHFACTOR_PORTAL=""
# Conteudo do site (00047): de onde vem a versao publicada e quais paineis abrem o editor.
ARG RHFACTOR_CLOUD_BASE="http://host.docker.internal:8088"
ARG RHFACTOR_PANEL_ORIGIN=""
# Blog (00049): os posts no ar, lidos no build (as paginas do blog sao estaticas).
ARG RHFACTOR_MEDIA_BASE="http://host.docker.internal:8100"
ENV RHFACTOR_STORE_ID=$RHFACTOR_STORE_ID \
    RHFACTOR_API_BASE=$RHFACTOR_API_BASE \
    RHFACTOR_GOOGLE_ANALYTICS_ID=$RHFACTOR_GOOGLE_ANALYTICS_ID \
    RHFACTOR_GOOGLE_SITE_VERIFICATION=$RHFACTOR_GOOGLE_SITE_VERIFICATION \
    RHFACTOR_GOOGLE_TAG_MANAGER_ID=$RHFACTOR_GOOGLE_TAG_MANAGER_ID \
    RHFACTOR_META_PIXEL_ID=$RHFACTOR_META_PIXEL_ID \
    RHFACTOR_IMOB=$RHFACTOR_IMOB \
    RHFACTOR_PORTAL=$RHFACTOR_PORTAL \
    RHFACTOR_CLOUD_BASE=$RHFACTOR_CLOUD_BASE \
    RHFACTOR_PANEL_ORIGIN=$RHFACTOR_PANEL_ORIGIN \
    RHFACTOR_MEDIA_BASE=$RHFACTOR_MEDIA_BASE \
    NODE_ENV=production
RUN npx nuxt prepare && npm run build

# -----------------------------------------------------------------------------
FROM node:24-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nuxt && adduser --system --uid 1001 --ingroup nuxt nuxt
COPY --from=builder --chown=nuxt:nuxt /src/site/.output ./.output
USER nuxt

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000
EXPOSE 3000
# NUXT_RHFACTOR_API_BASE: o sales-api visto de dentro da rede (troca sem novo build).
CMD ["node", ".output/server/index.mjs"]
