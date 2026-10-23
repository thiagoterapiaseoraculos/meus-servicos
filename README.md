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

As páginas de prévia e os arquivos sem uso do modelo original foram retirados da versão atual. As alterações são aplicadas diretamente ao site oficial, após conferência, com cópia de recuperação. As fotografias e artes fornecidas foram preservadas, apenas realocadas.

## Conteúdo e atendimento

A abertura oferece contato direto pelo WhatsApp. Como agendar aparece antes dos serviços, com ajuda para quem ainda não sabe qual escolher. Dúvidas e contato aparecem antes dos conteúdos sociais. No celular, o atalho de WhatsApp se oculta quando o contato principal ou final está visível.

A seleção de Instagram e YouTube é manual. Os players são carregados após um clique; há links para abrir os conteúdos nas plataformas de origem. Para trocar o vídeo principal, edite `data-youtube`, título e descrição. Para trocar uma publicação, atualize `data-instagram`, o link do cartão e a capa correspondente.

Modalidade, duração, valores, localização, formação e condições de agendamento aguardam confirmação pela ficha Projeto site. A ficha e suas respostas não ficam no repositório público.

## Publicação e manutenção

Em Settings → Pages, use Deploy from a branch, branch `main`, pasta `/(root)` e Custom domain vazio.

As alterações na branch principal são publicadas automaticamente. Os parâmetros de versão nos arquivos CSS e JavaScript são internos e não aparecem no link de divulgação. Atualize-os ao mudar esses arquivos, para evitar estilos ou interações antigos no cache.

Se o endereço público mudar, revise canonical, Open Graph e JSON-LD em `index.html`, além de `robots.txt`, `sitemap.xml` e esta documentação. Os caminhos internos são relativos.

## Recuperação

O histórico Git e as branches `backup/` preservam as revisões anteriores. Antes da organização das pastas, a versão era `3b1065a43f66a94445a0d75b1e52d809ac0bad38`; ela também está em `backup/antes-estrutura-2026-10-23`.

## Créditos

Preservada a licença MIT do modelo original em `LICENSE.md`. Fotografias e artes fornecidas mantêm seus respectivos direitos.
