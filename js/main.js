/* ============================================================
   DAROSA.DEV — lógica do site
   - Projetos: carregados da API do GitHub (topic "portifolio")
   - Contribuições: data/stats.json (atualizado diariamente por
     GitHub Actions) com fallback para API pública
   ============================================================ */

const GH_USER = 'madeiragab';
const GH_TOPIC = 'portifolio';

/* Topics que funcionam como CATEGORIA (viram filtro).
   Qualquer outro topic vira chip de tecnologia no card. */
const CATEGORIAS = {
  backend: 'BACKEND',
  web: 'WEB',
  game: 'GAME',
  ai: 'IA',
  hardware: 'HARDWARE',
  tool: 'FERRAMENTA',
  security: 'SECURITY',
  mobile: 'MOBILE',
  dashboard: 'DASHBOARD',
};

/* Fallback caso a API do GitHub esteja fora do ar ou com rate limit */
const PROJETOS_FALLBACK = [
  { name: 'social-network', category: 'BACKEND', tech: 'Django · DRF · PostgreSQL', description: 'Rede social backend-first: domínio modelado em UML antes do código, regras de negócio no servidor e documentação completa.', html_url: 'https://github.com/madeiragab/social-network', stargazers_count: 1 },
  { name: 'rpg-panel', category: 'WEB', tech: 'Django · Python · JS', description: 'Painel web privado para gerenciar campanhas de RPG de mesa — campanhas, personagens, inventário e papéis de mestre/jogador.', html_url: 'https://github.com/madeiragab/rpg-panel', stargazers_count: 0 },
  { name: 'tcc-simulador-ia', category: 'IA', tech: 'Godot · GDScript · Python', description: 'Simulador tático (TCC) para avaliar a qualidade estratégica de agentes de IA em ambientes de decisão.', html_url: 'https://github.com/madeiragab/tcc-simulador-ia', stargazers_count: 1 },
  { name: 'Guns-and-boots', category: 'GAME', tech: 'Python · Pygame', description: 'Jogo 2D retrô-futurista por turnos, com máquina de estados, sistema de save e modo mobile.', html_url: 'https://github.com/madeiragab/Guns-and-boots', stargazers_count: 1 },
  { name: 'darkos-ga36-port', category: 'HARDWARE', tech: 'Linux · Engenharia reversa', description: 'Autópsia, preservação e documentação de um console portátil clone (GA36-MB / Allwinner A33).', html_url: 'https://github.com/madeiragab/darkos-ga36-port', stargazers_count: 2 },
];

/* ============ TEMA ============ */
const themeToggle = document.getElementById('themeToggle');
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo) document.documentElement.dataset.theme = temaSalvo;
atualizaIconeTema();

themeToggle.addEventListener('click', () => {
  const novo = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = novo;
  localStorage.setItem('tema', novo);
  atualizaIconeTema();
});

function atualizaIconeTema() {
  themeToggle.textContent = document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙';
}

/* ============ MENU MOBILE ============ */
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('aberto'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('aberto'))
);

/* ============ PROJETOS (API GitHub) ============ */
const projGrid = document.getElementById('projGrid');
const filtrosEl = document.getElementById('filtros');
const projCount = document.getElementById('projCount');
let projetos = [];

async function carregarProjetos() {
  try {
    const url = `https://api.github.com/search/repositories?q=user:${GH_USER}+topic:${GH_TOPIC}&sort=updated&per_page=100`;
    const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    if (!data.items || data.items.length === 0) throw new Error('sem repositórios com o topic');
    projetos = data.items.map(normalizarRepo);
  } catch (e) {
    /* Plano B: cache gerado pelo workflow diário */
    try {
      const res = await fetch('data/projects.json');
      if (!res.ok) throw new Error('sem cache');
      projetos = (await res.json()).map(normalizarRepo);
    } catch {
      /* Plano C: lista embutida */
      projetos = PROJETOS_FALLBACK;
    }
  }
  renderFiltros();
  renderProjetos('TODOS');
  const stat = document.getElementById('statProjects');
  if (stat) stat.textContent = projetos.length;
  projCount.textContent = `${projetos.length} no total`;
}

function normalizarRepo(repo) {
  const topics = (repo.topics || []).filter(t => t !== GH_TOPIC);
  const catTopic = topics.find(t => CATEGORIAS[t]);
  const tech = topics
    .filter(t => t !== catTopic)
    .map(t => t.replace(/-/g, ' '))
    .join(' · ');
  return {
    name: repo.name,
    category: catTopic ? CATEGORIAS[catTopic] : 'PROJETO',
    tech: tech || (repo.language || ''),
    description: repo.description || 'Sem descrição (ainda!).',
    html_url: repo.html_url,
    homepage: repo.homepage,
    stargazers_count: repo.stargazers_count || 0,
  };
}

function renderFiltros() {
  const cats = ['TODOS', ...new Set(projetos.map(p => p.category))];
  filtrosEl.innerHTML = cats
    .map(c => `<button class="filtro${c === 'TODOS' ? ' ativo' : ''}" data-cat="${c}">${c}</button>`)
    .join('');
  filtrosEl.querySelectorAll('.filtro').forEach(btn =>
    btn.addEventListener('click', () => {
      filtrosEl.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      renderProjetos(btn.dataset.cat);
    })
  );
}

function renderProjetos(categoria) {
  const lista = categoria === 'TODOS' ? projetos : projetos.filter(p => p.category === categoria);
  projGrid.innerHTML = lista.map(p => `
    <article class="proj-card">
      <div class="proj-head">
        <h3 class="proj-nome">${esc(p.name.replace(/-/g, ' '))}</h3>
        <span class="proj-cat">${esc(p.category)}</span>
      </div>
      ${p.tech ? `<p class="proj-tech">${esc(p.tech)}</p>` : ''}
      <p class="proj-desc">${esc(p.description)}</p>
      <div class="proj-links">
        <a href="${esc(p.html_url)}" target="_blank" rel="noopener">Ver no GitHub ↗</a>
        ${p.homepage ? `<a href="${esc(p.homepage)}" target="_blank" rel="noopener">Demo ↗</a>` : ''}
        ${p.stargazers_count ? `<span class="proj-stars">★ ${p.stargazers_count}</span>` : ''}
      </div>
    </article>
  `).join('');
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/* ============ CONTRIBUIÇÕES ============ */
async function carregarContribuicoes() {
  let dias = null;
  let atualizadoEm = null;

  /* Fonte 1: stats.json gerado diariamente pelo GitHub Actions */
  try {
    const res = await fetch('data/stats.json');
    if (res.ok) {
      const stats = await res.json();
      dias = stats.days;
      atualizadoEm = stats.updated_at;
    }
  } catch { /* segue pro fallback */ }

  /* Fonte 2: API pública de contribuições */
  if (!dias) {
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`);
      if (res.ok) {
        const data = await res.json();
        dias = data.contributions.map(c => ({ date: c.date, count: c.count }));
      }
    } catch { /* sem dados */ }
  }

  if (!dias || dias.length === 0) {
    document.getElementById('contribUpdated').textContent = '// não foi possível carregar os dados agora';
    return;
  }

  const hojeStr = new Date().toISOString().slice(0, 10);
  const mesStr = hojeStr.slice(0, 7);
  const porData = new Map(dias.map(d => [d.date, d.count]));

  const hoje = porData.get(hojeStr) || 0;
  const mes = dias.filter(d => d.date.startsWith(mesStr)).reduce((s, d) => s + d.count, 0);
  const ano = dias.reduce((s, d) => s + d.count, 0);

  /* streak: dias consecutivos com contribuição, terminando hoje ou ontem */
  let streak = 0;
  const cursor = new Date();
  if (!porData.get(hojeStr)) cursor.setDate(cursor.getDate() - 1);
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (porData.get(key) > 0) { streak++; cursor.setDate(cursor.getDate() - 1); }
    else break;
  }

  animaNumero('cHoje', hoje);
  animaNumero('cMes', mes);
  animaNumero('cAno', ano);
  animaNumero('cStreak', streak);

  if (atualizadoEm) {
    const d = new Date(atualizadoEm);
    document.getElementById('contribUpdated').textContent =
      `// última atualização automática: ${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  }
}

function animaNumero(id, alvo) {
  const el = document.getElementById(id);
  if (!el) return;
  const dur = 900;
  const t0 = performance.now();
  let terminou = false;
  function passo(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(passo);
    else terminou = true;
  }
  requestAnimationFrame(passo);
  /* garante o valor final mesmo se a aba estiver em segundo plano
     (requestAnimationFrame não dispara em abas ocultas) */
  setTimeout(() => { if (!terminou) el.textContent = alvo; }, dur + 300);
}

/* ============ SKILL BARS (anima ao aparecer) ============ */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.skill-fill');
      fill.style.width = e.target.dataset.nivel + '%';
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill').forEach(s => skillObserver.observe(s));

/* ============ REVEAL DAS SEÇÕES ============ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.section > *').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ============ FORM DE CONTATO ============
   Envia e-mail de verdade via FormSubmit (https://formsubmit.co).
   Se o serviço falhar, cai no mailto: como plano B. */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/gabrielmadeira1504@gmail.com';

document.getElementById('contatoForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const botao = form.querySelector('button[type="submit"]');
  const nome = document.getElementById('fNome').value;
  const email = document.getElementById('fEmail').value;
  const assunto = document.getElementById('fAssunto').value;
  const msg = document.getElementById('fMsg').value;

  botao.disabled = true;
  botao.textContent = 'ENVIANDO…';

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: nome,
        email: email,
        _subject: `[portfólio] ${assunto}`,
        message: msg,
        _template: 'table',
      }),
    });
    if (!res.ok) throw new Error(`FormSubmit ${res.status}`);
    form.reset();
    botao.textContent = '✓ MENSAGEM ENVIADA';
    setTimeout(() => { botao.textContent = 'ENVIAR MENSAGEM'; botao.disabled = false; }, 4000);
  } catch {
    /* plano B: abre o cliente de e-mail do visitante */
    const corpo = encodeURIComponent(`${msg}\n\n— ${nome} (${email})`);
    window.location.href =
      `mailto:gabrielmadeira1504@gmail.com?subject=${encodeURIComponent(assunto)}&body=${corpo}`;
    botao.textContent = 'ENVIAR MENSAGEM';
    botao.disabled = false;
  }
});

/* ============ INIT ============ */
carregarProjetos();
carregarContribuicoes();
