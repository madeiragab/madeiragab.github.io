/**
 * update-stats.mjs
 * ----------------
 * Roda todo dia via GitHub Actions (.github/workflows/atualizacao-diaria.yml).
 *
 * 1. Busca o calendário de contribuições do usuário via API GraphQL do GitHub
 *    e grava em data/stats.json (usado pela seção "Contribuições em números").
 * 2. Busca todos os repositórios com o topic "portifolio" e grava um cache em
 *    data/projects.json (usado como fallback se a API estourar rate limit
 *    no navegador do visitante).
 *
 * Requer as variáveis de ambiente:
 *   GITHUB_TOKEN — token do workflow (fornecido automaticamente pelo Actions)
 *   GH_USER      — usuário do GitHub (madeiragab)
 */

import { writeFile, mkdir } from 'node:fs/promises';

const TOKEN = process.env.GITHUB_TOKEN;
const USER = process.env.GH_USER || 'madeiragab';
const TOPIC = 'portifolio';

if (!TOKEN) {
  console.error('GITHUB_TOKEN não definido.');
  process.exit(1);
}

/* ---------- 1. Contribuições (GraphQL) ---------- */
const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
    }
  }
`;

const gqlRes = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': USER,
  },
  body: JSON.stringify({ query, variables: { login: USER } }),
});

if (!gqlRes.ok) {
  console.error(`GraphQL falhou: ${gqlRes.status} ${await gqlRes.text()}`);
  process.exit(1);
}

const gql = await gqlRes.json();
if (gql.errors) {
  console.error('GraphQL retornou erros:', JSON.stringify(gql.errors));
  process.exit(1);
}

const calendar = gql.data.user.contributionsCollection.contributionCalendar;
const days = calendar.weeks
  .flatMap(w => w.contributionDays)
  .map(d => ({ date: d.date, count: d.contributionCount }));

const stats = {
  updated_at: new Date().toISOString(),
  user: USER,
  total_last_year: calendar.totalContributions,
  days,
};

/* ---------- 2. Cache dos projetos (REST) ---------- */
const repoRes = await fetch(
  `https://api.github.com/search/repositories?q=user:${USER}+topic:${TOPIC}&sort=updated&per_page=100`,
  {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': USER,
    },
  }
);

if (!repoRes.ok) {
  console.error(`Busca de repositórios falhou: ${repoRes.status}`);
  process.exit(1);
}

const repoData = await repoRes.json();
const projects = (repoData.items || []).map(r => ({
  name: r.name,
  description: r.description,
  html_url: r.html_url,
  homepage: r.homepage,
  language: r.language,
  topics: r.topics,
  stargazers_count: r.stargazers_count,
  updated_at: r.updated_at,
}));

/* ---------- 3. Gravar ---------- */
await mkdir('data', { recursive: true });
await writeFile('data/stats.json', JSON.stringify(stats, null, 2) + '\n');
await writeFile('data/projects.json', JSON.stringify(projects, null, 2) + '\n');

console.log(`OK — ${stats.total_last_year} contribuições no último ano, ${projects.length} projetos com topic "${TOPIC}".`);
