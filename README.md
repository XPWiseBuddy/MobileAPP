# WiseBuddy

## Visao Geral
WiseBuddy e um aplicativo mobile criado para ajudar investidores a entenderem seu perfil, acompanhar recomendacoes e interagir com um assistente virtual. A aplicacao consome a WiseBuddyAPI, uma API escrita em Java 17 com Spring Boot que gerencia usuarios, planos, pagamentos, cartoes, sessoes, recomendacoes e suitability.

## Time
- Caique Walter Silva - RM550693
- Carlos Eduardo Caramante Ribeiro - RM552159
- Felipe Heilmann Marques - RM551026
- Guilherme Nobre Bernardo - RM98604
- Matheus Jose de Lima Costa - RM551157

---

## Funcionalidades Principais
- **Autenticacao:** Login e cadastro com armazenamento seguro via AsyncStorage.
- **Perfil do Investidor:** Questionario de suitability com historico de respostas.
- **Historico:** Consulta das respostas anteriores do usuario.
- **Chat:** Conversa com o assistente virtual WiseBuddy.
- **Perfil:** Edicao de dados pessoais, configuracoes de privacidade e logout.

## Tecnologias
- **Mobile:** React Native, Expo, Typescript, React Navigation, Axios, AsyncStorage.
- **Backend:** Java 17, Spring Boot, Spring Data JPA, MySQL, Swagger/OpenAPI, Docker, Lombok, Maven Wrapper.

---

## Executando o aplicativo mobile

### Requisitos
- Node.js 18+ e npm (ou yarn).
- Expo CLI (`npm install -g expo-cli`) e aplicativo Expo Go (para testar em dispositivo fisico).
- Git para clonar o repositorio.

### Passo a passo
1. **Clonar este repositorio**
   ```bash
   git clone <URL-do-repositorio-mobile>
   cd MobileAPP
   ```
2. **Instalar dependencias**
   ```bash
   npm install
   ```
3. **Configurar o endpoint da API**
   - Confira o arquivo `apiConfig.ts` e garanta que a constante da base URL aponte para `http://localhost:8085` (ou para o endereco onde a API estiver publicada).
4. **Iniciar o Expo**
   ```bash
   npx expo start
   ```
5. **Executar**
   - Siga as instrucoes do Expo para abrir em um emulador Android/iOS ou no aplicativo Expo Go lendo o QR Code.

> A API precisa estar acessivel (veja as instrucoes a seguir) para que todas as funcionalidades do app funcionem.

---

## Executando a WiseBuddyAPI com Docker (guia para iniciantes)

### O que voce vai precisar
- Git.
- Docker Desktop (ou Docker Engine) ativo.
- JDK 17 instalado (necessario para gerar o arquivo JAR antes de montar a imagem).

### 1. Clonar a API
```bash
git clone https://github.com/MatheusCosta616/WiseBuddyAPI.git
cd WiseBuddyAPI
```

### 2. Gerar o JAR com o Maven Wrapper
Este passo compila o codigo e cria `target/wiseBuddy-0.0.1-SNAPSHOT.jar`, que sera copiado para o contenedor.

- Em sistemas Unix (Linux/macOS):
  ```bash
  ./mvnw clean package -DskipTests
  ```
- No Windows (PowerShell ou CMD):
  ```powershell
  .\mvnw.cmd clean package -DskipTests
  ```

Se tudo ocorrer bem, a pasta `target` aparecera com o JAR.

### 3. Criar uma rede Docker para os contenedores conversarem
```bash
docker network create wisebuddy-net
```

### 4. Subir o MySQL em um contenedor
```bash
docker run --name wisebuddy-mysql ^
  --network wisebuddy-net ^
  -e MYSQL_ROOT_PASSWORD=123 ^
  -e MYSQL_DATABASE=wisebuddy ^
  -p 3306:3306 ^
  -d mysql:8.0
```

- Em shells Unix use `\` ao inves de `^`.
- O banco sera exposto na porta 3306 com usuario `root` e senha `123`.
- Caso voce ja tenha MySQL rodando localmente nessa porta, pare o servico ou altere a porta no comando (`-p 3307:3306`, por exemplo).

### 5. Construir a imagem da API
```bash
docker build -t wisebuddy-api .
```

### 6. Executar o contenedor da API
```bash
docker run --name wisebuddy-api ^
  --network wisebuddy-net ^
  -p 8085:8085 ^
  -e SPRING_DATASOURCE_URL=jdbc:mysql://wisebuddy-mysql:3306/wisebuddy ^
  -e SPRING_DATASOURCE_USERNAME=root ^
  -e SPRING_DATASOURCE_PASSWORD=123 ^
  wisebuddy-api
```

Explicando os parametros:
- `--network wisebuddy-net` coloca a API e o banco na mesma rede virtual.
- `-p 8085:8085` libera a porta interna 8085 para acesso via `http://localhost:8085`.
- As variaveis `SPRING_DATASOURCE_*` garantem que a API use o banco do contenedor MySQL.

A primeira subida pode demorar alguns segundos enquanto o Spring Boot cria as tabelas.

### 7. Confirmar se deu tudo certo
- Veja os contenedores ativos: `docker ps`.
- Acompanhe os logs da API: `docker logs -f wisebuddy-api`.
- Abra o Swagger em `http://localhost:8085/swagger-ui/index.html`.

### 8. Parar e limpar quando terminar
```bash
docker stop wisebuddy-api wisebuddy-mysql
docker rm wisebuddy-api wisebuddy-mysql
docker network rm wisebuddy-net
```

---

## Principais recursos da API
- **Usuarios:** Cadastro, consulta, atualizacao e remocao de usuarios (`/wise-buddy/v1/users`).
- **Planos:** Planos de assinatura com valores e descricao (`/wise-buddy/v1/plans`).
- **Contratos:** Relaciona usuarios a planos contratados.
- **Pagamentos:** Registra pagamentos realizados.
- **Cartoes:** Cadastro de cartoes de credito ou debito para faturamento.
- **Sessoes:** Controle de atendimentos do consultor virtual.
- **Recomendacoes:** Sugestoes personalizadas geradas apos sessoes e suitability.
- **Suitability:** Persistencia dos perfis de investidor mapeados pelo app.

A collection `WiseBuddyAPI.postman_collection.json` ajuda a testar os endpoints via Postman.

---

## Integracao entre app e API
- Certifique-se de que a API esteja acessivel em `http://localhost:8085`.
- No mobile, atualize `apiConfig.ts` caso use outro host/porta.
- As rotas do app foram pensadas para os endpoints prefixados por `/wise-buddy/v1/...`, compativeis com o Swagger.

---

## Problemas comuns e solucoes
- **Erro `Connection refused` ou `Unknown host` ao iniciar a API:** confirme que o contenedor MySQL esta rodando e que a variavel `SPRING_DATASOURCE_URL` usa `wisebuddy-mysql`.
- **Porta 3306 ocupada:** ajuste o parametro `-p` no contenedor MySQL e atualize a URL da API para a porta escolhida.
- **Erro `JAR not found` ao montar a imagem:** execute novamente o passo 2 para gerar o arquivo em `target/wiseBuddy-0.0.1-SNAPSHOT.jar`.

Seguindo estes passos, mesmo um usuario iniciante consegue preparar todo o ambiente, subir a API via Docker e consumir os dados diretamente pelo aplicativo WiseBuddy.
