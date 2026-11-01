# Thiago Sousa · Terapias & Oráculos

Site profissional independente da Casa de Umbanda Luz de Oxalá. HTML, CSS e JavaScript estáticos, sem instalação de dependências ou etapa de build.

## Endereços

- Site para divulgação: https://thiagoterapiaseoraculos.github.io/meus-servicos/
- Repositório: https://github.com/thiagoterapiaseoraculos/meus-servicos
- Instagram: https://www.instagram.com/thiago.terapiaseoraculos/
- YouTube: https://www.youtube.com/@thiagocaprino5149

O nome do repositório é `meus-servicos`. Compartilhe o endereço do site acima. Parâmetros antigos de revisão (`v`, `preview`, `revisao`, `analise` e `versao`) são retirados da barra de endereço ao abrir a página. O fragmento `#inicio` também é retirado. Links para seções, como `#atendimentos`, continuam disponíveis.

## Organização dos arquivos

```text
index.html
assets/
  css/site.css
  js/site.js
  fonts/
  images/
    marca/
    perfil/
    atendimentos/
    conteudos/
manifest.json
robots.txt
sitemap.xml
sw.js
LICENSE.md
README.md
```

- `index.html`: textos, oito serviços, contato e conteúdos selecionados.
- `assets/css/site.css`: identidade visual e adaptação ao celular.
- `assets/js/site.js`: apresentações, vídeos, compartilhamento e contato móvel.
- `assets/fonts/`: fontes locais utilizadas pelo site.
- `assets/images/marca/`: símbolo da identidade.
- `assets/images/perfil/`: apresentação de Thiago.
- `assets/images/atendimentos/`: materiais originais dos oito serviços.
- `assets/images/conteudos/`: capas das publicações selecionadas.
- `sw.js`: desativa o cache offline herdado do modelo anterior.

As páginas de prévia e os arquivos sem uso do modelo original foram retirados da versão atual. As alterações são aplicadas diretamente ao site oficial, após conferência, com cópia de recuperação. As imagens de apresentação foram recortadas para retirar barras do celular, cabeçalhos, botões e demais margens de captura. As artes e a fotografia são exibidas a partir de arquivos limpos, sem depender de deslocamentos em CSS. A imagem de compartilhamento também usa o recorte limpo. Os arquivos anteriores continuam no histórico e em `backup/antes-recortes-2026-10-23`.

## Conteúdo e atendimento

A abertura oferece contato direto pelo WhatsApp. Como agendar aparece antes dos serviços, com ajuda para quem ainda não sabe qual escolher. Dúvidas e contato aparecem antes dos conteúdos sociais. No celular, o atalho de WhatsApp se oculta quando o contato principal ou final está visível.

Os cartões selecionados de Instagram e YouTube têm seleção manual; a janela do perfil do Instagram carrega o conteúdo do próprio Instagram. Os players são carregados após um clique; há links para abrir os conteúdos nas plataformas de origem. Para trocar o vídeo principal, edite `data-youtube`, título e descrição. Para trocar uma publicação, atualize `data-instagram`, o link do cartão e a capa correspondente.

Valores e modalidades já confirmados estão publicados nos respectivos serviços. Duração, formação e condições ainda não confirmadas devem ser preenchidas na ficha Projeto site. A ficha e suas respostas não ficam no repositório público.

## Publicação e manutenção

Em Settings → Pages, use Deploy from a branch, branch `main`, pasta `/(root)` e Custom domain vazio.

As alterações na branch principal são publicadas automaticamente. Os parâmetros de versão nos arquivos CSS e JavaScript são internos e não aparecem no link de divulgação. Atualize-os ao mudar esses arquivos, para evitar estilos ou interações antigos no cache.

Se o endereço público mudar, revise canonical, Open Graph e JSON-LD em `index.html`, além de `robots.txt`, `sitemap.xml` e esta documentação. Os caminhos internos são relativos.

## Recuperação

O histórico Git e as branches `backup/` preservam as revisões anteriores. Antes da organização das pastas, a versão era `3b1065a43f66a94445a0d75b1e52d809ac0bad38`; ela também está em `backup/antes-estrutura-2026-10-23`.

## Créditos

Preservada a licença MIT do modelo original em `LICENSE.md`. Fotografias e artes fornecidas mantêm seus respectivos direitos.

## Manutenção por planilha

O projeto e as instruções estão em [docs/manutencao-por-planilha.md](docs/manutencao-por-planilha.md). A integração ainda não está conectada; a edição de uma planilha não altera esta versão do site.

## Revisão final — 24/10/2026

Oito serviços, treze valores confirmados e doze relatos. A abertura informa online e Brasília; a mentoria identifica a sessão única; a FAQ explica os dados do mapa astral; o rodapé inclui acesso direto a valores e contato. Navegação compactada em telas intermediárias e muito pequenas, com foco visível também nos fundos claros.

## Página para a bio

`links/` reúne atendimentos, WhatsApp, e-book gratuito, vídeo Água Flórida e redes sociais. O download é livre. O PDF de divulgação está em `assets/downloads/ebook-agua-florida-(@thiago.terapiaseoraculos).pdf`; fontes e critérios editoriais em `docs/ebook-agua-florida.md`.

## Revisão de 01/11/2026

Entrevista Dê Passagem EP.06 em destaque na seção Conteúdos, com player youtube-nocookie responsivo carregado após clique. Acesso à entrevista na biografia e na página Links; presente gratuito acessível na abertura e em Conteúdos, com destino `links/#presente`. Contraste dos números dos cartões corrigido. Diagnóstico, critérios e limites em [docs/revisao-2026-11-01.md](docs/revisao-2026-11-01.md).

## Player e páginas informativas — 01/11/2026

Entrevista com player nativo visível no site e em Links, proporção 16:9, sem autoplay. A decisão substitui o pôster e carregamento por botão anteriores. Ícones novos usam SVG. Privacidade e termos em `informacoes/`, acessíveis nos dois rodapés. O [checklist de 20 pontos](docs/checklist-site-20-itens.md) distingue implantação de pendências de dados e validação jurídica; não declara conformidade integral.

## Checklist exato do usuário — 19 itens

Estado atual em [docs/checklist-site-19-itens.md](docs/checklist-site-19-itens.md). Inclui 404, favicons, metadados e preferências funcionais para mídias externas. Analytics aguarda configuração; não existe formulário próprio nem confirmação de contratação por abrir WhatsApp. A lista anterior de vinte pontos fica apenas como histórico.
