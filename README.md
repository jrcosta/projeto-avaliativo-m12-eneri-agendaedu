# Agenda Edu - Organizador Escolar Inteligente

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-concluído-success.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

Agenda Edu é uma aplicação *fullstack* serverless desenvolvida com **Next.js** para ajudar estudantes a organizar suas tarefas acadêmicas. O sistema vai além de um simples *to-do list*, oferecendo um **cálculo inteligente de prioridade** que avalia o tipo da atividade, peso acadêmico, urgência percebida e a proximidade da data de entrega, organizando visualmente o que deve ser feito primeiro.

Este projeto foi integralmente desenvolvido e refatorado com apoio e validação de Inteligência Artificial Generativa, cumprindo os requisitos acadêmicos da atividade avaliativa **M1.2 - IA para Desenvolvedores**.

## 🎥 Demonstração

Link do vídeo: pendente de publicação

## 🚀 Funcionalidades Principais (Cenários de Uso)

1. **Cadastrar Tarefa com Cálculo de Prioridade:**
   - **Entrada:** O estudante acessa a aba "Cadastrar Tarefa" e insere: Título ("Trabalho de Biologia"), Matéria, Tipo de Atividade ("Trabalho"), Prazo ("Amanhã"), Peso ("Alto") e Urgência ("Alta").
   - **Processamento:** O backend intercepta os dados e a lógica de domínio os converte em um "score". Sabendo que é uma atividade de peso alto, que vence logo e possui grande urgência, a pontuação alcança o nível máximo.
   - **Saída:** A tarefa é registrada no banco e classificada com a *tag* `HIGH` (Prioridade Alta) destacada em vermelho no painel principal.

2. **Visualizar e Organizar Rotina:**
   - **Entrada:** O usuário abre o sistema e visualiza a tela inicial ("Minhas Tarefas").
   - **Processamento:** A aplicação busca os dados salvos em memória (`GET /api/tasks`).
   - **Saída:** O usuário recebe uma lista estilizada (SaaS-like) com as tarefas. A hierarquia de cores e ícones (`lucide-react`) deixa nítido o que é Prova, o que é Trabalho e o que tem urgência imediata. O usuário também pode usar o *Dark Mode* para maior conforto visual.

## 🧠 Arquitetura e Decisões Técnicas

O projeto segue a **Clean Architecture (Arquitetura Hexagonal)** simplificada para integrar-se ao App Router do Next.js:

- **Domínio (`src/domain`):** Regras de negócio puras (cálculo de prioridades e *scores*).
- **Aplicação (`src/application`):** Casos de uso (`TaskService`) e validações isoladas da web.
- **Infraestrutura (`src/infrastructure`):** Implementação de persistência. Utilizamos um **Repositório JSON Local** (salvo em `data/tasks.json`) para garantir que os dados não sejam perdidos entre reinicializações do servidor.
- **Apresentação (`src/presentation` e `src/app`):** Componentes React puros e rotas Next.js serverless.

> **Configuração de Persistência:** A aplicação detecta automaticamente a ausência do arquivo de dados e cria a pasta `data/` com uma tarefa de exemplo inicial para facilitar a primeira navegação.

## 🤖 Uso de Inteligência Artificial Generativa

A Inteligência Artificial não foi utilizada apenas para "escrever código", mas como parceira estratégica em cada etapa (evidências gravadas em [docs/prompts/prompts.md](docs/prompts/prompts.md)):

1. **Planejamento:** IA sugeriu a divisão arquitetural hexagonal e desenhou o `AGENTS.md`.
2. **Geração (Zero-Shot / Few-Shot):** Geração da estrutura de pastas, repositório em memória e regras iniciais de domínio.
3. **Refatoração UI (Role-Based):** Solicitou-se à IA que assumisse o papel de "Designer SaaS" para refatorar o Tailwind, transformando uma interface bruta em um sistema com Dark Mode, animações e ícones (`lucide-react`).
4. **Testes Automatizados (Chain of Thought):** IA criou os testes orientada a validar 100% dos fluxos e comportamentos.
5. **CI/CD e Documentação:** Geração automática do Swagger e do *pipeline* GitHub Actions.

### Caso de Análise Crítica: "Problema do Fetch Reativo"
- **O que ocorreu:** Após refinar a UI, a requisição `fetch` de criação de tarefas (POST) dava sucesso no servidor (status 201), mas a interface levantava um "Erro de Conexão".
- **Análise da IA:** Identificou-se que tentar aplicar `e.currentTarget.reset()` do React **após** um `await fetch(...)` causava um crash silencioso do lado do cliente, pois o navegador descartava a referência original do formulário. O crash interrompia a thread Javascript e caía no bloco `catch`, dando a falsa impressão de erro no backend.
- **Correção:** A IA orientou capturar a referência (`const form = e.currentTarget`) antes da promise. A lição aprendida foi que gerenciar eventos DOM assíncronos no React requer o salvamento de referências em variáveis síncronas antes do envio da requisição. Essa correção foi documentada no Ciclo 2.

## 🛠️ Tecnologias Utilizadas

- **Next.js (App Router) + React 18**
- **TypeScript** (Tipagem forte)
- **Tailwind CSS** (Estilização avançada com suporte a *Dark Mode*)
- **Lucide React** (Iconografia)
- **Vitest & v8 Coverage** (Suíte de Testes)
- **GitHub Actions** (CI/CD Pipelines)
- **Swagger / OpenAPI** (Documentação da API Serverless)

## 💻 Instalação e Configuração

**Pré-requisitos:**
- Node.js (versão 18+ recomendada)
- Git

**Passos:**
1. Clone este repositório:
   ```bash
   git clone https://github.com/IA-para-DEVs-SCTEC-T2/projeto-avaliativo-m12-eneri-agendaedu.git
   cd projeto-avaliativo-m12-eneri-agendaedu
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o ambiente de desenvolvimento local:
   ```bash
   npm run dev
   ```
4. Acesse no navegador:
   - **Aplicação:** `http://localhost:3000`
   - **Documentação da API:** `http://localhost:3000/api-docs`

## ☁️ Deploy na Vercel

Para que o projeto funcione corretamente na Vercel, siga estes passos:

1. Importe o repositório na Vercel.
2. Nas configurações do projeto, adicione a **Environment Variable**:
   - `MONGODB_URI`: Sua string de conexão do MongoDB Atlas.
3. O Vercel detectará automaticamente as configurações do Next.js.
4. Clique em **Deploy**.

## 🧪 Rodando os Testes (100% Coverage)

A aplicação conta com 100% de cobertura nos arquivos lógicos e de integração de API.
```bash
npm run test -- --coverage
```

## 🔮 Melhorias Futuras

- Integração com um banco de dados relacional persistente (como PostgreSQL via Prisma/Drizzle).
- Inclusão de um sistema de Autenticação (NextAuth).
- Funcionalidade para editar e excluir tarefas.
- Relatório e dashboard visual mostrando o aproveitamento escolar do aluno.
