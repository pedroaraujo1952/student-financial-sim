# Student Financial Simulator

Este projeto é um simulador financeiro para estudantes. Siga as instruções abaixo para executar a aplicação utilizando Docker Compose.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados em sua máquina:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Passos para executar

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/student-financial-sim.git
cd student-financial-sim
```

2. **Configure as variáveis de ambiente**:

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias. Consulte o arquivo `.env.example` para referência.

3. **Inicie a aplicação com Docker Compose**:

```bash
docker-compose up
```

4. **Acesse a aplicação**:

Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

## Scripts adicionais

- **Parar os containers**:

  ```bash
  docker-compose down
  ```

- **Recriar os containers (se necessário)**:

  ```bash
  docker-compose up --build
  ```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
