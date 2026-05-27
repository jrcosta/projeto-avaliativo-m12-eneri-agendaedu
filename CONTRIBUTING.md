# Contributing to Agenda Edu

Gostaria de contribuir para a Agenda Edu? Que legal! Siga as diretrizes abaixo para manter o repositório organizado e o código seguro.

## Regras de Fluxo de Trabalho (GitFlow Adaptado)

1. **Nunca comite diretamente na branch `main`.**
2. Todas as novas features, correções de bugs ou documentações devem nascer a partir da branch `develop`.
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nome-da-sua-feature
   ```
3. Nomes de branches devem seguir os prefixos:
   - `feature/` para novas funcionalidades.
   - `fix/` para correção de bugs.
   - `docs/` para melhorias de documentação.
   - `chore/` para tarefas de manutenção (ex: atualizar pacotes).

## Commits Semânticos

Utilize a convenção do [Conventional Commits](https://www.conventionalcommits.org/):
- `feat: adiciona dark mode`
- `fix: corrige o travamento do form no mobile`
- `docs: atualiza readme com nova rota da api`
- `test: adiciona cobertura de teste para serviço X`

## Pull Requests

1. Faça o *push* da sua branch.
2. Abra o Pull Request (PR) apontando para a branch `develop`.
3. Preencha o corpo do PR descrevendo suas mudanças e qual Issue (se existir) ele resolve (ex: `Closes #12`).
4. Se o CI/CD (GitHub Actions) falhar, corrija sua branch localmente e faça *push* novamente.
5. Aguarde o *Code Review* de pelo menos um aprovador.

## Regras de Inteligência Artificial

Como este projeto nasceu e é mantido com o auxílio de Agentes de IA, sempre registre o contexto da geração.
Se você usou IA (ChatGPT, Claude, Gemini, etc.) para refatorar ou construir blocos significativos de código, **você deve salvar os prompts utilizados** no arquivo `docs/prompts/prompts.md`.

*Obrigado por ajudar a melhorar o Agenda Edu!*
