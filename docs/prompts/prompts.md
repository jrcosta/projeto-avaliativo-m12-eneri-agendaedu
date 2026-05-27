# Prompts enviados ao agente

Este arquivo registra os prompts enviados durante o desenvolvimento do projeto, como evidência de uso de IA no fluxo exigido pelo documento de entrega.

## 2026-05-26

### Prompt 1 — Criar guia de agentes

```text
com base no arquivo @docs/requisitos-entrega.md produza um AGENTS.md que guie o desenvolvimento para atender TODO o item 7 do documento.
```

### Prompt 2 — Criar branch, commit e PR para develop

```text
crie uma branch, faça um commit e crie um pr para a develop, tudo seguindo as exigencias do documento @docs/requisitos-entrega.md
```

### Prompt 3 — Abrir PR develop para main e atualizar branches remotas

```text
abra um pr da develop para a main, e depois atualize todas as branchs remotas existentes.
```

### Prompt 4 — Atualizar branch atual com main

```text
atualize essa branch com a main
```

### Prompt 5 — Criar issue com user story da arquitetura básica

```text
crie uma issue no github com use story vinculada a essa branch que vamos criar a arquitetura basica do projeto, que será em nextjs uma agenda escolar, como um taskboard de prioridades mais escolar, servless.
```

### Prompt 6 — Registrar prompts e criar regra no AGENTS.md

```text
crie uma pasta prompts dentro de docs e crie um arquivo prompts.md e dentro coloque todos os prompts que enviei até agora e coloque no agents uma regra que meus prompts devem ser salvos lá.
```

### Prompt 7 — Criar arquitetura básica do projeto

```text
crie um arquivo contendo a arquitetura basica do projeto, quero fullstack nextjs, com banco h2 em memoria, servless.
```

### Prompt 8 — Atualizar branch com develop e criar estrutura inicial

```text
atualize e branch com a develop, e depois crie a estrutura inicial de pastas do projeto conforme descrito no documento de arquitetura.
```

### Prompt 9 — Criar user story, commit, push e PR da estrutura inicial

```text
crie uma user story para essa implementação, faça commit e push e crie um pr.
```

### Prompt 10 — Criar branch e obrigar fluxo de branch, commit e PR

```text
crie uma branch nova e adicione o seguinte fluxo no agents.md como obrigatorio: criar uma branch criar uma branch feature/nome-da-mudança ou fix/nome-da-correcao ou docs/chore etc > fazer a mudança > commitar com commit semantico > criar um pull request seguindo o padrão do repo.
```

### Prompt 11 — Atualizar branch e refatorar para Clean Code/hexagonal

```text
atualize essa branch com a develop, depois refatore o código inicial aplicando clean code e deixando a estrutura pronta para ser construida com uma arquitetura hexagonal.
```

### Prompt 12 — Criar PR do Ciclo 1 para a main

```text
crie um pr da develop para a main, descrevendo como ciclo 1 de desenvolvimento e detalhando as mudanças que subirão.
```

### Prompt 13 — Criar issue com User Story e vincular ao PR

```text
crie uma issue e vincule ao pr com o descritivo em user story
```

### Prompt 14 — Solicitar execução do projeto local

```text
quero rodar o projeto local, o que falta?
```

### Prompt 15 — Alterar peso para modelo categórico

```text
o peso não deve ser em nr, o usuário seleciona entre baixo, médio, alto e a data de prazo e o sistema cria um score e peso.
```

### Prompt 16 — Adicionar tipo de atividade no cálculo de prioridade

```text
coloque o um campo tipo de atividade, para compor o peso, la deve ter prova, trabalho, exercicio, etc
```

### Prompt 17 — Corrigir interface vazia e reatividade

```text
preenchi, cliquei em criar tarefa mas nada apareceu em minhas tarefas.
```

### Prompt 18 — Corrigir erro de conexão no formulário

```text
agora apareceu erro de conexão com o servidor ao salvar
```

### Prompt 19 — Corrigir estado vazio após reload e documentar prompts

```text
salve meus prompts no arqui @docs/prompts/prompts.md, crie uma branch, faça commit semantico, crie uma issue um pr e vincule os dois, faça tudo seguindo as recomendações do @docs/requisitos-entrega.md e o @AGENTS.md
```

### Prompt 20 — Implementar navegação em abas

```text
quero que ele seja em abas, ao abrir a primeira aba exibe as minhas tarefas e a aba ao lado é cadastrar a tarefa, como está agora mas dividido em abas.
```

### Prompt 21 — Refatorar interface visual

```text
faça a modificação pedida no arquivo @docs\prompts\prompt-refatorar-ui.md
```

### Prompt 22 — Adicionar suporte a Dark Mode

```text
ainda no pr 19 coloque uma opção na pagina de tema escuro ou claro.
```

### Prompt 23 — Cobertura completa de testes unitários

```text
na branch atual deixe a cobertura de testes automatizados unitários completa para cobrir o código atual.
```

### Prompt 24 — Release Ciclo 2 (PR para Main)

```text
crie um pr da develop para a main chamando de ciclo 2
```

### Prompt 25 — Criar Pipelines CI/CD

```text
crie uma pipeline que rode o build da aplicação e um outro que rode os testes automatizados.
```

### Prompt 26 — Preparar Entrega Final (README, Swagger e Contributing)

```text
atualiza a branch, prepare o readme e o contributing, mencione a pasta dos prompts no readme, e juntamente crie uma documentação automatica da api com swagger.
```
