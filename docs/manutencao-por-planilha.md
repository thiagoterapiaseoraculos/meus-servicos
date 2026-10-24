# Projeto de manutenção simples — Serviços Thiago

Status em 24/10/2026: site final revisado e publicado. Integração com Google Planilhas ainda não implementada nem conectada. Hoje, editar uma planilha não altera o site.

## Solução recomendada

Usar uma planilha na conta Google do Thiago como painel de conteúdo. Após a conexão inicial, ele altera células e o site atualiza os campos previstos. O visual, a estrutura das páginas e os recursos do site continuam sendo mantidos no projeto. Não é necessário dar acesso de edição da planilha aos visitantes nem fornecer senha no código.

## Como organizar a planilha

| Aba | O que Thiago poderá editar | Campos previstos |
| --- | --- | --- |
| Valores | Valores de cada modalidade e total dos pacotes | Serviço, modalidade, valor em reais, quantidade de sessões, observação, publicar |
| Serviços | Apresentação dos oito atendimentos | Identificador fixo, nome, resumo, explicação, publicar |
| Informações | Contato e orientações práticas | WhatsApp comercial, Instagram, YouTube, modalidades, cidade, prazo de retorno, aviso |
| Feedbacks | Acrescentar relatos autorizados | Atendimento, texto fiel, origem pública, publicar, ordem |
| Conteúdos | Trocar os conteúdos em destaque | Título, plataforma, link, descrição, publicar, ordem |

A primeira versão da integração deve priorizar Valores, Serviços e Informações. Feedbacks e Conteúdos podem ser incluídos na mesma configuração ou em uma segunda etapa. Novos tipos de serviço, nova organização das páginas ou troca da identidade visual exigem ajuste no projeto. Capas e fotografias precisam de arquivos próprios e não devem ser extraídas automaticamente de links sociais.

## Preparação inicial

1. Criar uma planilha chamada **Site Thiago — Conteúdo público**, na conta dele. Usar as abas acima e preencher primeiro com os dados publicados.
2. Reservar essa planilha exclusivamente para o conteúdo que aparecerá no site. Agendas, pagamentos, nomes de clientes, conversas, dados pessoais e registros de atendimentos ficam em outro arquivo privado.
3. Dar acesso de edição somente ao Thiago e às pessoas responsáveis pela manutenção. Proteger cabeçalhos e identificadores fixos para evitar alterações acidentais.
4. No computador, usar **Arquivo → Compartilhar → Publicar na Web**. Selecionar as abas de conteúdo e o formato CSV. Manter a republicação automática habilitada. Publicar para leitura não significa liberar edição para o público.
5. Guardar os links CSV gerados para cada aba. Eles são os endereços necessários para a conexão inicial. Não enviar senha ou código de acesso.
6. Conectar esses links ao projeto, validar a leitura real do Google e publicar a integração. Essa etapa ainda precisa ser executada; publicar a planilha sozinho não conecta o site.
7. Testar uma alteração pequena, conferir os cartões e a aba de valores e restaurar o valor inicial. Só então entregar a manutenção ao Thiago.

## Funcionamento previsto após a conexão

Thiago abre a planilha pelo celular ou computador, altera o valor ou texto, aguarda a sincronização e confere o site. O Google informa que a versão publicada pode levar alguns minutos para atualizar; não prometer atualização instantânea. A integração deve evitar depender da planilha a cada clique do visitante.

Para preservar a leitura do site, recomenda-se importar e validar os dados antes da publicação e manter a última versão válida se a planilha estiver indisponível ou incompleta. A publicação deve registrar um histórico de recuperação. O valor no cartão, na lista completa e a equivalência por sessão devem vir do mesmo dado, evitando divergências.

## Regras para o preenchimento

- Preencher valores como número, por exemplo `300`, sem digitar `R$` na célula numérica.
- Informar o **total** do pacote e a quantidade de sessões. A equivalência por sessão será calculada, não digitada em outro local.
- Valor vazio significa **sob consulta**, não atendimento gratuito.
- Usar `Sim` ou `Não` no campo Publicar. Não apagar a identificação do serviço.
- Manter cada modalidade em uma linha. Não mesclar células nem trocar os cabeçalhos.
- Não anunciar desconto com base em serviços diferentes sem confirmar que a comparação é equivalente.
- Manter a redação de terapia holística, espiritualidade e autoconhecimento. Não cadastrar o serviço como psicologia, psicoterapia ou atendimento psicológico.
- Depoimentos devem manter as palavras recebidas. Publicar apenas relatos autorizados e sem dados que identifiquem clientes.
- Alterar nome ou modalidade não pode deixar os links de WhatsApp e o catálogo com informação antiga; isso deve fazer parte da validação da integração.

## Valores publicados como ponto de partida

| Serviço | Modalidade | Valor total (R$) | Sessões |
| --- | --- | ---: | ---: |
| Oráculos — Tarot e Búzios | Áudio e foto · até 7 perguntas | 200 | 1 |
| Oráculos — Tarot e Búzios | Online ao vivo | 250 | 1 |
| Oráculos — Tarot e Búzios | Presencial | 300 | 1 |
| Mentoria espiritual | Sessão única experimental | 300 | 1 |
| Mentoria espiritual | Pacote remoto | 1100 | 4 |
| Mentoria espiritual | Pacote presencial | 1200 | 4 |
| Leitura astrológica | Mapa simples · fotos e áudio | 200 | 1 |
| Leitura astrológica | Online ao vivo | 250 | 1 |
| Leitura astrológica | Presencial | 300 | 1 |
| ThetaHealing | Sessão individual | 300 | 1 |
| Terapias vibracionais e xamânicas | Online | 270 | 1 |
| Terapias vibracionais e xamânicas | Presencial | 320 | 1 |
| Constelação sistêmica | Online ou presencial | 300 | 1 |
| Atendimento espiritual | Sob consulta | — | — |
| Mesa radiônica | Sob consulta | — | — |

Os demais oráculos permanecem sob consulta. A mentoria remota equivale a R$ 275 por sessão e a presencial a R$ 300 por sessão; isso não estabelece, por si só, desconto em relação à sessão experimental.

## Critérios de entrega da futura integração

- Os preços novos devem aparecer nos cartões e na aba de valores de forma consistente.
- Um valor inválido, uma aba ausente ou uma falha do Google não deve apagar informações válidas do site.
- Texto de planilha deve ser tratado como texto, sem executar HTML ou scripts.
- Publicação deve validar links e aceitar apenas destinos adequados, sem expor senhas ou credenciais.
- A planilha deve poder ser revertida por histórico de versões e o site pelo histórico do repositório.
- Testar leitura pública, atualização, recuperação, exibição móvel e links antes de ativar.

## Referência do Google

https://support.google.com/docs/answer/183965?hl=pt-BR

O recurso permite publicar páginas específicas de uma planilha e republicar alterações automaticamente. A conexão com este site é uma implementação adicional, não uma função automática do compartilhamento do Google.
