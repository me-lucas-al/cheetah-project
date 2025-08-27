Perfeito! Aqui está o README completo do **Cheetah Project** já com a seção “Como rodar” formatada corretamente para GitHub:

````markdown
# 🐆 Cheetah Project

O Cheetah é uma plataforma em desenvolvimento que conecta alunos com interesses em comum — como o mesmo curso ou universidade — por meio de chats individuais e em grupo.

O objetivo é promover a troca de experiências e dicas sobre vestibulares, com apoio tanto de quem está se preparando quanto de quem já faz parte da instituição desejada. Além disso, monitores acompanham as conversas para garantir um ambiente saudável, educativo e colaborativo, incentivando a troca de conhecimento de forma respeitosa e segura.

---

## 🎯 Visão Geral

O **Cheetah Project** é uma aplicação fullstack desenvolvida em **React** no frontend e **Spring Boot** no backend. Ela permite o cadastro, autenticação e gerenciamento de usuários com perfis distintos, integrando uma base sólida em Java com uma interface responsiva e moderna.

---

## ⚙️ Tecnologias Utilizadas

### Backend – Spring Boot
- Java 17+
- Spring Data JPA
- Spring Web
- MySQL
- Lombok
- Hibernate
- Validações com Bean Validation
- Herança com `@Inheritance(strategy = InheritanceType.SINGLE_TABLE)`

### Frontend – React
- React.js com Vite
- Tailwind CSS
- Axios
- React Hook Form
- Validação com Validator
- React Router DOM

---

## 🧪 Funcionalidades

- Cadastro e login de usuários
- Cadastro separado para Alunos e Monitores
- Upload de arquivos (RG, diploma, etc.)
- Validação de formulários
- Listagem de usuários cadastrados
- Integração com banco de dados MySQL
- Consumo e envio de dados via API REST

---

## 🚀 Como rodar o projeto

### Backend (Spring Boot)

1. Acesse a pasta do backend:

```bash
cd cheetah-backend
````

2. Configure o arquivo `.env` ou `application.properties` com as variáveis do banco de dados, por exemplo:

```
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/cheetahdb
SPRING_DATASOURCE_USERNAME=seu_usuario
SPRING_DATASOURCE_PASSWORD=sua_senha
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=true
```

3. Certifique-se de que o MySQL está rodando e que o banco `cheetahdb` existe.

4. Execute o backend:

```bash
./mvnw spring-boot:run
# ou, se estiver usando Gradle
./gradlew bootRun
```

O backend será iniciado em `http://localhost:8080`.

---

### Frontend (React + Vite)

1. Acesse a pasta do frontend:

```bash
cd cheetah-frontend
```

2. Configure o arquivo `.env` com a URL da API do backend:

```
VITE_API_URL=http://localhost:8080/api
```

3. Instale as dependências:

```bash
npm install
# ou
yarn install
```

4. Execute o frontend:

```bash
npm run dev
# ou
yarn dev
```

O frontend será iniciado em `http://localhost:5173`.

---

### 🔗 Observações

* Sempre rode o **backend antes do frontend**.
* Configure corretamente as variáveis do `.env` tanto no backend quanto no frontend.
* Para produção, configure CORS e aponte o frontend para o endereço real do backend.

```

Se você quiser, posso também criar uma **versão ainda mais enxuta**, com instruções mínimas de rodar backend e frontend, ideal para GitHub sem poluir o README. Quer que eu faça?
```
