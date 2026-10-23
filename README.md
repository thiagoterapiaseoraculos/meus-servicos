# Thiago Sousa · Terapias & Oráculos

Site pessoal de Thiago Sousa, independente da Casa de Umbanda Luz de Oxalá.

Desenvolvido em HTML, CSS e JavaScript estáticos, sem instalação de dependências ou etapa de build.

## Endereços

- Site: https://thiagoterapiaseoraculos.github.io/meus-servicos/
- Repositório: https://github.com/thiagoterapiaseoraculos/meus-servicos
- Instagram: https://www.instagram.com/thiago.terapiaseoraculos/

## Conteúdo

Oito atendimentos com descrição, apresentação visual e links específicos para consulta pelo WhatsApp:

1. Oráculos
2. Mentoria espiritual
3. Atendimento espiritual
4. Leitura astrológica — mapa astral
5. ThetaHealing
6. Terapias vibracionais e xamânicas
7. Constelação sistêmica
8. Mesa radiônica

O site também reúne apresentação de Thiago, Instagram, YouTube, dúvidas frequentes e compartilhamento.

Valores, disponibilidade e condições dos atendimentos são informados diretamente pelo WhatsApp.

## Estrutura

- Página principal: `index.html`
- Design responsivo: `assets/css/thiago.css`
- Interações: `js/thiago.js`
- Fotografias e apresentações: `assets/images/thiago/`
- Identificação do site: `manifest.json`
- Indexação: `robots.txt` e `sitemap.xml`

Os materiais fornecidos foram preservados. O enquadramento das apresentações é feito no CSS para ocultar a interface do Instagram.

## Publicação

Em Settings → Pages → Build and deployment:

| Campo | Valor |
| --- | --- |
| Source | Deploy from a branch |
| Branch | main |
| Pasta | /(root) |

Para utilizar o endereço padrão do GitHub Pages, mantenha Custom domain vazio.

As alterações salvas na branch main são publicadas automaticamente. Acompanhe o processamento na aba Actions.

## Manutenção dos endereços

Endereço principal:

https://thiagoterapiaseoraculos.github.io/meus-servicos/

Se o domínio ou o nome do repositório mudar, atualize:

- `index.html`: canonical, Open Graph e JSON-LD;
- `robots.txt`: endereço do sitemap;
- `sitemap.xml`: endereço da página;
- `README.md`: documentação.

O compartilhamento usa automaticamente o endereço da página aberta. Os links internos e arquivos usam caminhos relativos.

## Conteúdos do Instagram

A seção `#conteudos`, após a apresentação de Thiago, mostra três publicações selecionadas. As capas WebP ficam em `assets/images/thiago/`; o conteúdo original é carregado no diálogo somente após um clique. Há também um link direto para cada publicação, caso o Instagram solicite login ou não exiba a incorporação.

A seleção é manual e não atualiza automaticamente com novos posts. Para trocar um conteúdo, atualize o endereço em `data-instagram` e no link do cartão, além da capa, do título e da descrição em `index.html`. Não há token, plugin pago ou conta de terceiros.

## Recuperação

O histórico Git preserva as versões anteriores, inclusive as anteriores à transferência da conta.

- Antes do redesenho: `96b22e7c809cfc892fe29ad217fb0757b85e4b82`
- Redesenho com os oito atendimentos: `1294693950f0c5ff0955304dc9bb67d583349a3a`

Mantenha também uma cópia ZIP do site para recuperação.

## Créditos

Preservada a licença MIT do modelo original em `LICENSE.md`.

As fotografias e artes fornecidas para esta página mantêm seus respectivos direitos.
