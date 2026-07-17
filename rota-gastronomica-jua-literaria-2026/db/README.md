# Visitas consolidadas

## Configuração

1. Crie um banco PostgreSQL no Neon.
2. Execute o conteúdo de `schema.sql` no SQL Editor do Neon.
3. Configure `DATABASE_URL` nas variáveis de ambiente da Vercel para Preview e Production.
4. Publique o projeto na Vercel.

## Endpoints

- `POST /api/visitas`: registra uma visita única por visitante e estabelecimento.
- `GET /api/dashboard/visitas`: retorna totais consolidados para o dashboard.

O passaporte continua armazenando os selos localmente. A API recebe apenas o identificador anônimo do visitante, o slug do estabelecimento e o evento.
