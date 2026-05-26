# Refatoração com IA — Clean Code e arquitetura hexagonal

## Objetivo

Refatorar a estrutura inicial do projeto para separar responsabilidades e preparar a aplicação para evoluir com arquitetura hexagonal.

## Prompt utilizado

```text
atualize essa branch com a develop, depois refatore o código inicial aplicando clean code e deixando a estrutura pronta para ser construida com uma arquitetura hexagonal.
```

## Estado anterior

A estrutura inicial possuía arquivos organizados por tipo técnico simples:

```text
src/
  app/
  components/
  domain/
  repositories/
  lib/
  tests/
```

Os arquivos eram placeholders mínimos. A rota `/api/tasks` retornava lista vazia diretamente, o serviço apenas devolvia tarefas recebidas e o repositório H2 ainda não expunha operações completas.

## Problemas identificados

- Regras de negócio ainda não estavam isoladas em caso de uso.
- Porta de repositório estava junto da implementação.
- Componentes estavam em pasta genérica, sem camada de apresentação explícita.
- Rotas ainda não atuavam como adaptadores finos.
- Validação estava em `lib`, sem ligação clara com caso de uso.

## Critérios aplicados

- Clean Code: nomes explícitos, funções pequenas, responsabilidades separadas.
- SOLID: dependência do serviço por porta (`TaskRepository`), não por implementação concreta.
- Arquitetura hexagonal: separação entre domínio, aplicação, infraestrutura e apresentação.

## Resultado após refatoração

Estrutura preparada:

```text
src/
  app/
    api/tasks/route.ts
    page.tsx
  domain/tasks/
    task.ts
    task-priority.ts
  application/tasks/
    task-service.ts
    validation.ts
    ports/task-repository.ts
  infrastructure/persistence/h2/
    h2-client.ts
    h2-task-repository.ts
  presentation/components/tasks/
    task-board.tsx
    task-card.tsx
    task-form.tsx
  tests/
    task-service.test.ts
    tasks-api.test.ts
```

## Ajustes humanos aplicados

- Mantidos arquivos antigos como reexports temporários para evitar quebra imediata de imports já existentes.
- Implementada regra pura de cálculo de prioridade por prazo, peso e urgência.
- Criado serviço de aplicação com injeção de `TaskRepository`.
- Implementado repositório em memória compatível com demonstração acadêmica do H2.
- Atualizados testes para validar regras reais em vez de placeholders triviais.

## Avaliação

A refatoração deixa a base pronta para evoluir sem acoplar Next.js, H2 e regras de negócio. Ainda falta configurar projeto Next.js completo (`package.json`, lint, build e runner de testes) para validação automatizada real em CI.
