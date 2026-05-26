# AGENTS.md

Guia obrigatório para agentes de IA e desenvolvedores deste repositório. Use este arquivo para conduzir o desenvolvimento até cumprir todo o checklist final de entrega do projeto avaliativo M1.2.

## Objetivo do projeto

Construir uma aplicação funcional, demonstrável e documentada, com uso explícito de IA em todo o ciclo de desenvolvimento: planejamento, arquitetura, geração de código, refinamento, refatoração, testes, documentação, pipeline CI/CD e preparação da entrega.

A entrega deve demonstrar não apenas o produto final, mas também o processo: prompts usados, decisões técnicas, ciclos de refinamento, análise crítica das saídas da IA, branches, commits, quadro GitHub, vídeo e README completo.

## Regra principal

Antes de considerar qualquer etapa concluída, verifique se ela atende ao item 7 do documento `docs/requisitos-entrega.md`.

Nenhuma tarefa deve ser tratada como pronta sem evidência no repositório, no quadro GitHub, nos commits, nos prompts salvos ou no README.

## Checklist obrigatório de entrega

### 1. Repositório e organização

O projeto deve conter:

- Repositório privado no GitHub.
- Colaboradores obrigatórios adicionados:
  - professor responsável indicado pela turma;
  - `lab365-operacao`.
- Estrutura clara de pastas.
- `README.md` completo.
- `docs/prompts/` com prompts usados em cada etapa.
- `.env.example` sem chaves reais, caso variáveis de ambiente sejam usadas.
- Entradas e dados de exemplo para demonstração.
- Exemplos de saída gerados pela aplicação.

### 2. Quadro GitHub

Criar e manter um quadro Kanban no GitHub com exatamente estas colunas:

- Backlog
- A Fazer
- Em Andamento
- Bloqueado
- Em Revisão
- Concluído

Cada card deve ter:

- título coerente com a tarefa;
- descrição clara;
- objetivo;
- escopo;
- critérios de conclusão;
- relação com branch, commit ou funcionalidade, quando aplicável.

Cards mínimos recomendados:

- Criar repositório privado e adicionar colaboradores.
- Definir domínio e escopo da aplicação.
- Planejar arquitetura com suporte de IA.
- Criar estrutura inicial do projeto.
- Gerar código das funcionalidades principais com IA.
- Avaliar saída da IA e aplicar refinamento.
- Implementar terceiro ciclo com padrão de prompting diferente.
- Refatorar código com suporte de IA.
- Documentar refatoração com antes/depois.
- Gerar suíte de testes com IA.
- Validar e ajustar testes gerados.
- Gerar documentação técnica com IA.
- Configurar pipeline CI/CD com IA.
- Testar pipeline.
- Salvar prompts em `docs/prompts/`.
- Documentar caso de saída incorreta da IA.
- Atualizar README.
- Gravar vídeo de demonstração.
- Revisar checklist final.
- Submeter links no AVA.

O quadro deve refletir progresso real. Não criar cards apenas no fim.

### 3. Git, branches e commits

Usar fluxo:

```text
main <- develop <- feature/* ou docs/*
```

Branches obrigatórias:

- `main`
- `develop`
- `feature/especificacao-arquitetura`
- `feature/geracao-codigo-ia`
- `feature/refatoracao-ia`
- `feature/testes-automatizados`
- `feature/pipeline-ci-cd`
- `docs/prompts-readme`

Regras:

- Criar branches a partir de `develop`.
- Fazer pull request para integrar mudanças.
- Manter branches mesmo após merge.
- Garantir que versão final esteja mergeada em `main`.
- Ter no mínimo 8 commits.
- Usar commits pequenos, claros e incrementais.
- Não fazer todas as alterações diretamente em `main`.

Exemplos de mensagens:

```text
feat: cria estrutura inicial do projeto com arquitetura definida via IA
feat: implementa funcionalidade principal gerada com Chain of Thought
feat: adiciona segunda funcionalidade com refinamento documentado
feat: refatora modulo principal seguindo SOLID com suporte de IA
feat: adiciona testes unitarios com apoio de IA
feat: configura pipeline CI/CD com GitHub Actions via IA
docs: salva prompts organizados por etapa
docs: atualiza README com instrucoes completas
fix: corrige erro identificado na saida gerada pela IA
```

## Requisitos da aplicação

A aplicação deve ser executável e demonstrável. Pode ser CLI, API, interface simples, web app, notebook ou composição local, desde que tenha instruções claras.

Obrigatório:

- Receber entrada do usuário por formulário, terminal, arquivo ou requisição de API.
- Executar pelo menos duas funcionalidades principais com lógica de negócio real.
- Gerar saída estruturada e validável.
- Demonstrar pelo menos dois cenários de uso.
- Não depender apenas de dados fixos no código.

Cada funcionalidade deve deixar claro:

- entrada recebida;
- processamento executado;
- resultado produzido;
- validações ou regras aplicadas;
- limitações conhecidas.

## Uso obrigatório de IA no desenvolvimento

Documentar uso de IA nas etapas abaixo:

- especificação do domínio e escopo;
- planejamento de arquitetura;
- geração inicial de código;
- ciclos de refinamento;
- refatoração;
- criação de testes;
- documentação técnica;
- pipeline CI/CD;
- análise crítica de saída incorreta ou insuficiente.

### Prompts

Todos os prompts devem ficar em `docs/prompts/`, organizados e nomeados por etapa.

Sugestão de estrutura:

```text
docs/prompts/
  01-especificacao-dominio.md
  02-arquitetura.md
  03-geracao-codigo-ciclo-1.md
  04-refinamento-ciclo-2.md
  05-refinamento-ciclo-3.md
  06-refatoracao.md
  07-testes.md
  08-documentacao.md
  09-pipeline-ci-cd.md
  10-analise-critica.md
```

Cada arquivo de prompt deve conter:

- objetivo;
- contexto fornecido à IA;
- padrão de prompting usado;
- prompt completo;
- resumo da resposta obtida;
- avaliação crítica do resultado;
- ajustes humanos aplicados.

### Padrões de prompting

Aplicar pelo menos dois padrões distintos, entre:

- Chain of Thought;
- Few-shot;
- Role-based;
- ReAct;
- Tree of Thought.

Cada prompt deve ter contexto suficiente, objetivo claro, restrições e critério de aceite.

### Ciclos de geração e refinamento

Documentar pelo menos três ciclos completos de geração/refinamento de código.

Cada ciclo deve registrar:

- prompt usado;
- saída da IA;
- problema ou melhoria identificada;
- correção/refinamento aplicado;
- resultado final aceito.

## Refatoração obrigatória

Executar pelo menos uma refatoração com suporte de IA.

Documentar:

- prompt usado;
- código antes;
- problema técnico identificado;
- critério aplicado: Clean Code, SOLID, otimização ou conversão arquitetural;
- código depois;
- avaliação do resultado.

A refatoração deve ser real, não apenas formatação.

## Testes obrigatórios

Criar suíte de testes com apoio de IA.

Os testes devem cobrir cenários relevantes das funcionalidades principais.

Podem ser:

- testes unitários;
- testes de API;
- testes E2E;
- combinação dos tipos acima.

Obrigatório documentar:

- prompt de geração dos testes;
- cenários cobertos;
- ajustes feitos pelo grupo;
- evidência de execução bem-sucedida.

Não aceitar testes triviais que não validam regra de negócio.

## Pipeline CI/CD

Configurar pipeline com GitHub Actions ou equivalente.

Pipeline deve executar automaticamente, no mínimo:

- lint;
- testes.

Obrigatório:

- salvar prompt usado para gerar/configurar pipeline;
- manter arquivo de workflow no repositório;
- validar execução no GitHub Actions;
- mostrar pipeline funcionando no vídeo.

## README.md obrigatório

O `README.md` deve conter:

- nome da aplicação;
- descrição do problema resolvido;
- domínio e escopo;
- tecnologias usadas;
- ferramentas de IA usadas e em quais etapas;
- padrões de prompting aplicados;
- links ou referências aos prompts em `docs/prompts/`;
- diagrama ou descrição clara da arquitetura;
- decisões técnicas justificadas;
- instruções completas de instalação;
- instruções de configuração;
- instruções de execução;
- cenários de uso com entradas e saídas esperadas;
- exemplos de saída gerados pela aplicação;
- caso documentado de saída incorreta da IA;
- correção aplicada e lição aprendida;
- melhorias futuras;
- link do vídeo no YouTube como não listado.

Se ainda não houver link do vídeo, usar marcador claro:

```text
Link do vídeo: pendente de publicação
```

Atualizar antes da entrega final.

## Documentação técnica

A documentação técnica pode incluir:

- docstrings;
- Swagger/OpenAPI;
- Mermaid;
- diagrama de arquitetura;
- README detalhado;
- exemplos de uso;
- relatórios de testes.

A documentação deve explicar como outra pessoa consegue instalar, executar, testar e entender a solução.

## Análise crítica obrigatória

Documentar pelo menos um caso em que a IA produziu saída incorreta, incompleta ou insuficiente.

Registrar:

- o que foi pedido;
- qual foi a saída da IA;
- qual problema foi identificado;
- por que o problema era relevante;
- qual correção foi aplicada;
- qual lição foi aprendida.

Esse caso deve aparecer em `docs/prompts/` e no `README.md`.

## Vídeo de demonstração

Gravar vídeo de até 10 minutos e publicar no YouTube como não listado.

O vídeo deve mostrar:

- aplicação funcionando;
- pelo menos dois cenários de uso;
- estrutura do repositório;
- branches criadas;
- histórico de commits;
- quadro GitHub com cards;
- pasta `docs/prompts/`;
- pelo menos um ciclo de geração e refinamento com IA;
- refatoração documentada com antes, prompt e depois;
- testes sendo executados;
- pipeline CI/CD funcionando no GitHub Actions;
- documentação técnica gerada com IA;
- caso de análise crítica de saída incorreta da IA.

Após publicar:

- inserir link no `README.md`;
- submeter link do vídeo junto aos demais links no AVA, se solicitado.

## Submissão final

Antes de submeter no AVA, confirmar:

- link do repositório GitHub privado disponível;
- link do quadro GitHub disponível;
- colaboradores obrigatórios adicionados;
- `main` contém versão final;
- README completo;
- vídeo publicado como não listado;
- link do vídeo no README;
- pipeline funcionando;
- testes passando;
- prompts salvos;
- mínimo de 8 commits;
- branches obrigatórias existentes;
- entrega feita antes de 01/06/2026 às 15h.

Após submissão, não modificar o código até receber a nota.

## Critério de pronto

Uma tarefa só está pronta quando:

- código funciona;
- testes relacionados passam;
- documentação foi atualizada;
- prompt correspondente foi salvo, quando houve uso de IA;
- card do GitHub foi movido corretamente;
- commit representa avanço incremental;
- evidência necessária aparece no README, docs ou vídeo.

## Como agentes devem trabalhar neste repositório

Ao receber uma tarefa:

1. Verifique qual item do checklist ela atende.
2. Use branch adequada ao tipo de tarefa.
3. Faça alteração mínima necessária.
4. Salve prompts em `docs/prompts/` quando usar IA como parte da evidência.
5. Atualize README ou documentação quando a mudança afetar uso, arquitetura, testes, pipeline ou evidências.
6. Rode lint e testes antes de concluir.
7. Não marcar nada como concluído sem evidência.

## Não fazer

- Não commitar segredos.
- Não colocar chaves reais em `.env.example`.
- Não criar documentação genérica sem relação com a aplicação real.
- Não aceitar saída da IA sem revisão crítica.
- Não criar testes superficiais só para cumprir requisito.
- Não deixar README incompleto.
- Não apagar branches obrigatórias.
- Não alterar repositório após entrega final.
- Não criar cards retroativos sem descrição adequada.

## Ordem recomendada de execução

1. Definir domínio e escopo.
2. Criar quadro GitHub.
3. Criar `develop` e branches obrigatórias.
4. Planejar arquitetura com IA.
5. Criar estrutura inicial.
6. Implementar funcionalidade principal 1.
7. Implementar funcionalidade principal 2.
8. Documentar três ciclos de IA.
9. Refatorar com IA.
10. Criar testes com IA.
11. Configurar lint.
12. Configurar pipeline CI/CD.
13. Completar README.
14. Validar aplicação com dois cenários.
15. Gravar vídeo.
16. Inserir link do vídeo no README.
17. Revisar checklist final.
18. Submeter links no AVA.

## Checklist rápido para agente antes de finalizar resposta

- Algum item do checklist foi atendido?
- Evidência foi criada ou atualizada?
- README precisa mudar?
- Algum prompt precisa ser salvo?
- Testes e lint foram considerados?
- Mudança respeita fluxo de branches?
- Resultado ajuda entrega final?
