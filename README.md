# LabDash

Sistema de faturamento desenvolvido para um cliente real: um restaurante que controlava entregas para empresas e vendas de balcão em anotações e mensagens de WhatsApp. O fechamento do mês era feito somando tudo à mão.

O LabDash centraliza esses dados e gera os totais por dia, por empresa, por cliente e por período. **Está em produção e é usado no dia a dia do restaurante.**

**[Acessar o sistema](https://frontend-production-8efdd.up.railway.app)** — na tela de login, use o botão **"Entrar como demonstração"**.

## Funcionalidades

- **Dashboard** com gráficos de entregas e vendas dos últimos 7 dias
- **Entregas para empresas**: cadastro com cálculo automático do valor (quantidade × preço do cliente), tabela paginada e filtros
- **Vendas de balcão**: registro diário separado por Pix, cartão e dinheiro
- **Relatórios** por período: entregas, vendas e financeiro consolidado
- **Configurações**: CRUD de clientes, empresas e usuários
- **Autenticação** com JWT e perfis de acesso (ADMIN e USER), com rotas protegidas no back-end e no front-end

## Tecnologias

| Camada | Stack |
| --- | --- |
| Back-end | Java 21, Spring Boot 3, Spring Security, JWT (java-jwt), Spring Data JPA, Bean Validation, Lombok |
| Banco de dados | PostgreSQL 16 |
| Front-end | React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui, TanStack Query, React Hook Form + Zod, Zustand, Recharts |
| Infra | Docker Compose (ambiente local), Railway (deploy com CI/CD a partir do GitHub) |

## Arquitetura

```
FrontEnd/ (React + Vite)  ──HTTP + JWT──▶  BackEnd/api (Spring Boot)  ──JPA──▶  PostgreSQL
```

O back-end é organizado em camadas:

- `domain/controller`: endpoints REST
- `domain/service`: regras de negócio e transações
- `domain/repository`: acesso a dados (Spring Data JPA)
- `dto`: objetos de entrada e saída da API, separados das entidades
- `security`: filtro e geração/validação do token JWT
- `exception`: tratamento global de erros, com respostas 404 e 409 padronizadas

### Principais endpoints

| Recurso | Rotas |
| --- | --- |
| Autenticação | `POST /auth/login`, `POST /auth/register` |
| Entregas | `GET/POST /orders`, `GET/PUT/DELETE /orders/{id}`, `GET /orders/search` |
| Vendas de balcão | `GET/POST /counter-sales`, `GET/PUT/DELETE /counter-sales/{id}`, `GET /counter-sales/search` |
| Clientes e empresas | `/clients` e `/companies` (CRUD + busca) |
| Usuários | `GET /users`, `PUT/DELETE /users/{id}` |
| Relatórios | `POST /reports/orders`, `POST /reports/sales`, `POST /reports/financial`, `GET /reports/orders/last-7`, `GET /reports/sales/last-7` |

## Como rodar localmente

Pré-requisitos: Java 21, Node 20+ e Docker.

```bash
# 1. Banco de dados (crie um .env na raiz com POSTGRES_USER, POSTGRES_PASSWORD e POSTGRES_DB)
docker compose up -d db

# 2. Back-end (porta 8080)
cd BackEnd/api
./mvnw spring-boot:run

# 3. Front-end (porta 5173)
cd FrontEnd
cp .env.example .env   # defina VITE_API_URL=http://localhost:8080
npm install
npm run dev
```

Variáveis do back-end (todas têm valor padrão para desenvolvimento): `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` e `JWT_SECRET`.

## Desafios técnicos

- **Paginação** com `Page<T>` do Spring Data integrada à tabela do front-end
- **Fuso horário** consistente entre front-end e back-end nas datas dos lançamentos
- **CORS em produção** com origens definidas por variável de ambiente
- **Deploy do Vite no Railway** sem Dockerfile
- **Agregação no back-end** dos totais diários, para os gráficos não dependerem de cálculo no navegador

## Próximos passos

- [ ] Testes automatizados (JUnit 5 + Mockito) nos services
- [ ] Documentação da API com Swagger/OpenAPI
- [ ] Exportação de relatórios em CSV
- [ ] Responsividade completa no celular

## Autor

**Guilherme Guerra de Paulo**, desenvolvedor back-end Java.
[LinkedIn](https://www.linkedin.com/in/guilhermeguerradepaulo) · [GitHub](https://github.com/guilhermeguerradev)
