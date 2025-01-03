# Ignite Gym

![GitHub repo size](https://img.shields.io/github/repo-size/lizandramalta/ignitegym?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/lizandramalta/ignitegym?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/lizandramalta/ignitegym?style=for-the-badge)

## Sobre o projeto

O Ignite Gym é uma aplicação mobile desenvolvida para proporcionar uma experiência prática e organizada para usuários que desejam acompanhar suas rotinas de exercícios na academia. Após realizar login, os usuários podem:

- Visualizar uma lista de exercícios com informações detalhadas sobre séries, repetições e imagens de demonstração.
- Marcar exercícios como concluídos, que serão automaticamente adicionados ao histórico.
- Acessar um histórico detalhado de exercícios realizados, organizados por dia e com registro do horário de conclusão.
- Personalizar seu perfil, incluindo a adição de uma foto, alteração de nome e atualização de senha.

![Demonstração do app](assets/images/demonstration.gif)

## Tecnologias utilizadas

- Framework: Expo
- Linguagem: Typescript
- Bibliotecas:
  - React Native (para construção da interface mobile)
  - React Navigation (para gerenciamento de navegação)
  - Gluestack UI v1 (para componentes visuais)
- Autenticação: JWT (JSON Web Token) com implementação de refresh token

## Como funciona

1. Login e autenticação:
   - Ao fazer login, um token JWT é gerado para autenticação do usuário. O sistema também utiliza refresh tokens para garantir a renovação segura do acesso.
2. Exercícios:
   - Após o login, o usuário tem acesso a uma lista de exercícios. Cada exercício exibe o número de séries, repetições e uma imagem de demonstração.
   - O usuário pode marcar os exercícios como concluídos, o que registra automaticamente o exercício no histórico com a hora de finalização.
3. Histórico:
   - O histórico é organizado por dias e permite que o usuário acompanhe os exercícios realizados, promovendo uma visão clara do progresso.
4. Perfil:
   - Os usuários podem adicionar uma foto ao perfil, alterar o nome e atualizar a senha diretamente pelo aplicativo.
5. Integração com backend:
   - A API foi disponibilizada para que a aplicação pudesse exercitar a integração com o backend, simulando um ambiente de produção completo.

## Executando o projeto mobile

Certifique-se de ter o yarn instalado em sua máquina. Além disso, é possível abrir o projeto em um emulador ou através do aplicativo [Expo Go](https://expo.dev/client) no dispositivo físico.

1. Clone o repositório.
2. Dentro do diretório `mobile`, instale as dependências com o comando: `yarn`.
3. Dentro do diretório `mobile`, execute o projeto com o comando: `yarn start`.
4. Siga as intruções do terminal para conectar com o emulador ou dispositivo físico.
5. Siga as instruções de integração com a API para que a aplicação mobile funcione corretamente.

## Integração com a API

_Esta API foi disponibilizada e desenvolvida pela Rocketseat para auxiliar no projeto._

Certifique-se de ter o npm instalado em sua máquina.

1. Dentro do diretório `api`, instale as dependências com o comando: `npm install`.
2. Dentro do diretório `api`, execute o projeto com o comando: `npm start`.
3. Dentro do direório `mobile`, na pasta raiz crie um arquivo .env e siga o exemplo do arquivo .env.example para configurar o endereço IP (provavelmente da sua máquina) que a API está rodando.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções neste projeto. Crie um fork do repositório, faça suas alterações e envie um pull request. Estamos abertos a sugestões!

---

**Desenvolvido por Lizandra Malta - github.com/lizandramalta**

_Este projeto foi desenvolvido durante a formação de React Native da Rocketseat._
