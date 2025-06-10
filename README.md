# Automação Cypress - Central de Atendimento ao Cliente TAT

[![End-to-end tests](https://github.com/Rodrigofarnum/cypress-do-zero-a-nuvem/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Rodrigofarnum/cypress-do-zero-a-nuvem/actions/workflows/ci.yml)

Projeto de automação da página Central de Atendimento ao Cliente TAT.


## Clone do projeto 

1. Abra o navegador e visite a URL https://github.com/wlsf82/cypress-do-zero-a-nuvem.
2. Faça um [fork]((https://docs.github.com/en/get-started/quickstart/fork-a-repo)) do projeto.

> É importante que você trabalhe em seu fork, para que ao final, você possa executar os testes em um _workflow_ de integração contínua.

3. Em seu fork, clique no botão **Code**, escolha a opção _clone via SSH_ e copie o link de clone do projeto.

> Para obter detalhes sobre como criar e configurar uma chave SSH no GitHub, leia a [documentação oficial](https://docs.github.com/pt/authentication/connecting-to-github-with-ssh/about-ssh).

4. Em seu terminal de linha de comando (em uma pasta onde você armazena seus projetos de software), execute o comando `git clone [cole-o-link-copiado-aqui]`.

> Para garantir que você está clonando seu fork corretamente, verifique seu nome de usuário do GitHub na URL de clone do projeto. Deve ser semelhante a `git@github.com:[seu-nome de usuário-aqui]/cypress-do-zero-a-nuvem.git`.

5. Após clonar o projeto, acesse o diretório recém-clonado (`cd cypress-do-zero-a-nuvem/`).

> **Obs.:** Dentro do diretório `cypress-do-zero-a-nuvem/`, você deve ter os subdiretórios `.git/` (diretório oculto), `lessons/` e `src/`, e os arquivos `.gitignore` (arquivo oculto), `LICENSE`, `package.json` e `README.md`.
>
> Dentro do diretório `src/`, você deverá ver os arquivos `index.html`, `privacy.html`, `script.js` e `style.css`. Este é o código fonte da aplicação em teste.

## Pré-requisitos

É necessário ter instalado o Cypress, Node.js, git e npm.

> Eu utilizei as versões `v13.12.0`, `v22.12.0`, `v2.48.1` and `v10.9.0` respectivamente. Sugiro instalar as mesmas versões.

## Instalação

Rode no terminal `npm install` para instalar as dependências dev.

Rode no terminal `npm install cypress@13.12.0 --save-dev` para instalar o Cypress.

Acesse o site oficial do Node.js para realizar a instalação do mesmo.

## Testes

> **Observação:** Antes de executar os testes, faça uma cópia do arquivo `cypress.env.example.json` como `cypress.env.json`, para que você informe suas credênciais validas.
> 
> O `cypress.env.json` está incluso no [`.gitignore`](./.gitignore) para que você tenha certeza que informações confidenciais não serão versionadas.

Rode `npm run cy:headless` para rodar os testes em modo headless.

Rode `npm run cy:open` para rodar os testes no modo interativo.

Ou rode `npm run cy:headless:mobile ` para rodar os testes simulando um dispositivo móvel.

## Ajude esse projeto

Se você quer ajudar esse projeto, deixe uma ⭐.

___

Esse projeto foi criado por [Rodrigo Farnum]([https://walmyr.dev](https://github.com/Rodrigofarnum)).
