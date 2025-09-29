#  Gerenciador de Tarefas com LocalStorage

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Aplicação web simples para gerenciamento de tarefas pessoais, desenvolvida como atividade acadêmica para consolidar conhecimentos em desenvolvimento front-end com foco em JavaScript puro e manipulação do DOM.

## 🎯 Objetivo do Projeto

O objetivo principal foi desenvolver uma aplicação web com funcionalidades completas de **CRUD (Create, Read, Update, Delete)** sem a necessidade de um back-end. Todos os dados são persistidos localmente no navegador do usuário através da **Web Storage API (LocalStorage)**.

---

## ✨ Funcionalidades

O projeto conta com uma gama completa de funcionalidades para uma experiência de usuário robusta e eficiente.

#### 📝 Gerenciamento de Tarefas (CRUD)
- **Adicionar Tarefas:** Formulário intuitivo para cadastrar novas tarefas com nome, descrição, data de vencimento e status.
- **Visualizar Tarefas:** Todas as tarefas são exibidas em uma tabela clara e de fácil leitura.
- **Editar Tarefas:** Permite a modificação de qualquer informação de uma tarefa já existente.
- **Remover Tarefas:** Exclui tarefas da lista com uma confirmação para evitar remoções acidentais.

#### 🚀 Funcionalidades Avançadas
- **Busca Dinâmica:** Campo de pesquisa que filtra as tarefas em tempo real pelo nome ou descrição.
- **Filtro por Status:** Permite visualizar apenas tarefas com um status específico (Pendente, Em Andamento, Concluída).
- **Ordenação da Tabela:** É possível ordenar a lista de tarefas clicando nos cabeçalhos da tabela (Nome, Vencimento, Status), tanto em ordem crescente quanto decrescente.
- **Validação de Formulário:** Garante que os campos essenciais sejam preenchidos antes de salvar uma tarefa.

#### 💾 Portabilidade de Dados
- **Exportar para JSON:** Funcionalidade para baixar um arquivo `.json` contendo todas as tarefas, permitindo backups e portabilidade.
- **Imprimir Lista:** Gera uma versão otimizada para impressão da lista de tarefas, removendo elementos da interface como botões e formulários.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando apenas tecnologias web fundamentais, sem o uso de frameworks ou bibliotecas externas, para focar nos conceitos base.

- **HTML5:** Estruturação semântica do conteúdo.
- **CSS3:** Estilização e design responsivo da interface.
- **JavaScript (Puro/Vanilla):** Implementação de toda a lógica, interatividade, manipulação do DOM e comunicação com o LocalStorage.

---

## 🚀 Como Executar o Projeto

A aplicação é totalmente estática e não requer um servidor para ser executada.

1.  **Clone o repositório:**
    ```bash
    git clone
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd nome-da-pasta-do-projeto
    ```

3.  **Abra o arquivo `index.html` no seu navegador de preferência.**

E pronto! A aplicação estará funcionando.

---

## 📂 Estrutura de Arquivos

O projeto está organizado da seguinte forma para uma clara separação de responsabilidades:

```
.
├── css/
│   └── style.css
├── js/
│   └── script.js
└── index.html
```

---

## 👨‍💻 Autor

Desenvolvido por **Pedro Paulo**.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
