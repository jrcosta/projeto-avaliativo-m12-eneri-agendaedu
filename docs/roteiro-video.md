# Roteiro de gravação do vídeo de demonstração

**Projeto:** Agenda Edu - Organizador Escolar Inteligente  
**Duração alvo:** até 10 minutos  
**Objetivo:** demonstrar a aplicação funcionando e evidenciar os artefatos exigidos na entrega M1.2.

## 1. Abertura (0:00 - 0:30)

**Fala sugerida:**  
"Olá, este é o Agenda Edu, uma aplicação para organizar tarefas acadêmicas com prioridade inteligente. Neste vídeo vou mostrar o sistema em funcionamento, a estrutura do repositório, o quadro do GitHub, os prompts salvos, os testes, o pipeline e a documentação de IA usada no projeto."

**Mostrar na tela:**
- nome da aplicação;
- link do repositório privado;
- breve visão geral do problema resolvido.

## 2. Contexto e escopo (0:30 - 1:10)

**Fala sugerida:**  
"O objetivo do projeto é ajudar estudantes a organizar tarefas como provas, trabalhos e exercícios, calculando prioridade com base em regras de negócio reais."

**Mostrar na tela:**
- README.md;
- seção de descrição do domínio e escopo;
- resumo das duas funcionalidades principais.

## 3. Estrutura do repositório e branches (1:10 - 2:00)

**Fala sugerida:**  
"Aqui está a estrutura do repositório e o fluxo de branches usado durante o desenvolvimento."

**Mostrar na tela:**
- pastas principais do projeto;
- branch `main`;
- branch `develop`;
- branches `feature/*` e `docs/*`;
- histórico de commits.

**Ponto importante:** destacar que os commits são pequenos e incrementais.

## 4. Quadro do GitHub (2:00 - 2:50)

**Fala sugerida:**  
"O desenvolvimento foi acompanhado no quadro do GitHub, organizado em Kanban com as colunas exigidas pela entrega."

**Mostrar na tela:**
- quadro do GitHub;
- colunas Backlog, A Fazer, Em Andamento, Bloqueado, Em Revisão e Concluído;
- cards relacionados a arquitetura, geração de código, refatoração, testes, pipeline e documentação.

**Destacar:**
- descrição dos cards;
- relação com branches ou funcionalidades;
- movimentação real dos cards ao longo do projeto.

## 5. Pasta de prompts e uso de IA (2:50 - 3:40)

**Fala sugerida:**  
"As interações com IA foram registradas em `docs/prompts/`, com organização por etapa, objetivo e avaliação crítica."

**Mostrar na tela:**
- `docs/prompts/prompts.md`;
- arquivos de prompt por etapa, se existirem;
- exemplo de prompt com padrão aplicado, como Chain of Thought ou Role-based.

**Destaques obrigatórios:**
- especificação do domínio;
- arquitetura;
- geração de código;
- refinamento;
- refatoração;
- testes;
- documentação;
- pipeline.

## 6. Demonstração do sistema - cenário 1 (3:40 - 5:00)

**Cenário:** cadastrar uma tarefa acadêmica com prioridade alta.

**Fala sugerida:**  
"Agora vou demonstrar o primeiro cenário: o cadastro de uma tarefa com regra de prioridade."

**Mostrar na tela:**
- abrir a aplicação;
- preencher o formulário;
- salvar a tarefa;
- exibir o resultado na lista.

**Explicar:**
- entrada recebida;
- processamento executado;
- saída estruturada;
- regra de prioridade aplicada.

## 7. Demonstração do sistema - cenário 2 (5:00 - 6:10)

**Cenário:** visualizar e organizar as tarefas já cadastradas.

**Fala sugerida:**  
"Neste segundo cenário, mostro como o sistema lista as tarefas e destaca o que precisa de atenção primeiro."

**Mostrar na tela:**
- lista de tarefas;
- cores, ícones ou tags de prioridade;
- filtros, abas ou modo de visualização, se houver;
- comportamento no tema claro/escuro, se estiver disponível.

## 8. Testes automatizados (6:10 - 7:00)

**Fala sugerida:**  
"A solução também possui testes automatizados cobrindo os cenários principais do domínio."

**Mostrar na tela:**
- terminal com execução dos testes;
- saída do Vitest ou framework usado;
- cobertura, se disponível.

**O que explicar:**
- quais regras de negócio os testes validam;
- como os testes ajudam a proteger refatorações.

## 9. Pipeline de CI/CD (7:00 - 7:40)

**Fala sugerida:**  
"O repositório também tem pipeline automatizado para executar lint e testes."

**Mostrar na tela:**
- arquivo de workflow em `.github/workflows/`;
- execução no GitHub Actions;
- status com sucesso.

## 10. Documentação técnica (7:40 - 8:20)

**Fala sugerida:**  
"A documentação técnica foi produzida com apoio de IA e inclui README, arquitetura e instruções de uso."

**Mostrar na tela:**
- README completo;
- diagrama ou descrição da arquitetura;
- instruções de instalação, execução e configuração;
- exemplos de entrada e saída.

## 11. Caso de análise crítica da IA (8:20 - 9:10)

**Fala sugerida:**  
"Também documentamos um caso em que a IA gerou uma saída incorreta ou insuficiente, e mostramos a correção aplicada."

**Mostrar na tela:**
- trecho do README ou `docs/prompts/` com o caso crítico;
- antes e depois do ajuste;
- lição aprendida.

**Pontos para mencionar:**
- o que foi pedido;
- o problema encontrado;
- por que isso importava;
- como foi corrigido.

## 12. Encerramento (9:10 - 10:00)

**Fala sugerida:**  
"Com isso, o projeto atende aos requisitos da entrega: aplicação funcional, documentação, testes, pipeline, prompts organizados e demonstração do uso de IA em todo o fluxo. Obrigado."

**Mostrar na tela:**
- checklist final de entrega;
- link do vídeo no README;
- repositório e quadro do GitHub.

## Checklist final antes de gravar

- vídeo com no máximo 10 minutos;
- dois cenários de uso demonstrados;
- repositório privado exibido;
- branches e commits mostrados;
- quadro do GitHub exibido;
- `docs/prompts/` exibida;
- testes executados;
- pipeline no GitHub Actions exibido;
- documentação técnica mostrada;
- caso crítico de IA apresentado.
