# Automação Web com Cypress 
## Central de Atendimento ao Cliente TAT

[![End-to-end tests](https://github.com/Rodrigofarnum/cypress-do-zero-a-nuvem/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Rodrigofarnum/cypress-do-zero-a-nuvem/actions/workflows/ci.yml)


Essa aplicação foi criada por @wlsf82 com intuito de colher informações do usuário. Seja um elogio, um feedback ou uma solicitação de ajuda, o site permite vários tipos de interações, podendo até anexar arquivos. 

Foi solicitado a automação de testes end-to-end com integração contínua, a fim de garantir a estabilidade da aplicação a cada nova versão do código.

Automação de testes utilizando Cypress, com integração contínua utilizando GitHub Actions, gerando evidências e métricas dos teste no Cypress Cloud. 

Documentação do Caso de Teste : https://github.com/Rodrigofarnum/cypress-do-zero-a-nuvem/blob/main/Documenta%C3%A7%C3%A3o/Caso-de-Teste-TAT.pdf


## Clone do projeto 

1. Abra o navegador e visite o GitHub do Walmyr https://github.com/wlsf82/cypress-do-zero-a-nuvem.
2. Faça um [fork]((https://docs.github.com/en/get-started/quickstart/fork-a-repo)) da estrutura do projeto.

> É importante que você trabalhe em seu fork, para que ao final, você possa executar os testes em um _workflow_ de integração contínua.

3. Em seu fork, clique no botão **Code**, escolha a opção _clone via SSH_ e copie o link de clone do projeto.

> Para obter detalhes sobre como criar e configurar uma chave SSH no GitHub, leia a [documentação oficial](https://github.com/Rodrigofarnum/cypress-do-zero-a-nuvem/blob/main/Documenta%C3%A7%C3%A3o/Caso%20de%20Teste%20TAT.pdf).

4. Em seu terminal de linha de comando (em uma pasta onde você armazena seus projetos de software), execute o comando `git clone [cole-o-link-copiado-aqui]`.

> Para garantir que você está clonando seu fork corretamente, verifique seu nome de usuário do GitHub na URL de clone do projeto. Deve ser semelhante a `git@github.com:[seu-nome de usuário-aqui]/cypress-do-zero-a-nuvem.git`.

5. Após clonar o projeto, acesse o diretório recém-clonado (`cd cypress-do-zero-a-nuvem/`).


## Pré-requisitos

É necessário ter instalado o Cypress, Node.js, git e npm.

> Eu utilizei as versões `v13.12.0`, `v22.12.0`, `v2.48.1` e `v10.9.0` respectivamente. Sugiro instalar as mesmas versões.

## Instalação

Rode no terminal `npm install` para instalar as dependências dev.

Rode no terminal `npm install cypress@13.12.0 --save-dev` para instalar o Cypress.

Acesse o site oficial do Node.js para realizar a instalação do mesmo.

## Testes

Para escolher o modo de execução dos testes:

Rode `npm run cy:headless` para rodar os testes em modo headless.

Rode `npm run cy:open` para rodar os testes no modo interativo.

Rode `npm run cy:open:mobile` para rodar os testes simulando um dispositivo móvel.

Rode `npm run cy:headless:mobile ` para rodar os testes simulando um dispositivo móvel no modo headless.

## Conclusão

O projeto já está em produção e você pode acompanhar o status do teste E2E no inicio desse README.

Foram automatizados 26 cenários de teste em toda aplicação. 

O teste completo dura em média 18 segundos.


## Ajude esse projeto

Se você quer ajudar esse projeto, deixe uma ⭐.

___

Esse projeto foi criado por Rodrigo Farnum.

Responsável pela estrutura do site @wlsf82 - Cypress do Zero a Nuvem.
