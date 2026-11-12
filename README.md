# template-portal-0001

Template de site de **portal de imóveis** da plataforma (atividades 00040 e 00047),
feito a partir do `template-imobiliaria-0001`. O portal é da plataforma (sem tenant):
o SysAdmin escolhe este template em **Plataforma › Portais › (portal) › Template do
site** e monta as páginas em **Editar páginas**: textos, ordem das seções, páginas
novas, cores e fontes. O build lê a versão **publicada** no cloud-management.

O `template.json` pede o módulo `portal`: o template não aparece para as tenants.

## Como funciona

- **Modo portal do `@ocahub/kit`**: a busca (`/imoveis`) e as vitrines trazem os
  imóveis de todas as imobiliárias participantes; o imóvel fica em
  `/imovel/{imobiliaria}/{slug}`.
- **Seções**: as da imobiliária (busca no topo, vitrines, categorias, bairros,
  chamadas, sobre, indicadores, depoimentos, texto), sem o corretor e sem o WhatsApp
  da loja (o portal não tem loja), mais **Imobiliárias do portal** (a lista das
  participantes, cada uma leva ao site dela) e **Convite para anunciar** (`/#anuncie`).
- **Páginas estáticas (00048)**: as páginas do editor saem prontas do build; as
  vitrines, as contagens e a lista de imobiliárias atualizam quando aparecem na tela.
- **Imagens**: o portal não tem loja para enviar arquivos; no editor, a imagem é um
  endereço (https://...) ou uma das imagens do template.
- **Variável** nos textos: `{empresa}` (o nome do portal).

## Versão nova

Mude o `template.json` (e a `version`), faça o push e, no painel, **Plataforma ›
Templates de site › Ler template.json**.
