/* ============================================================
   DAROSA.DEV — lógica do site
   - Projetos: carregados da API do GitHub (topic "portifolio")
   - Contribuições: data/stats.json (atualizado diariamente por
     GitHub Actions) com fallback para API pública
   - Idiomas: ver js/i18n.js
   ============================================================ */

const GH_USER = 'madeiragab';
const GH_TOPIC = 'portifolio';

/* Topics que funcionam como CATEGORIA (viram filtro).
   O valor é a chave de tradução em js/i18n.js.
   Qualquer outro topic vira chip de tecnologia no card. */
const CATEGORIAS = {
  backend: 'cat.backend',
  web: 'cat.web',
  game: 'cat.game',
  ai: 'cat.ai',
  hardware: 'cat.hardware',
  tool: 'cat.tool',
  security: 'cat.security',
  mobile: 'cat.mobile',
  dashboard: 'cat.dashboard',
};
const CATEGORIA_PADRAO = 'cat.outro';

/* Fallback caso a API do GitHub esteja fora do ar ou com rate limit */
const PROJETOS_FALLBACK = [
  { name: 'social-network', categoria: 'cat.backend', tech: 'Django · DRF · PostgreSQL', description: 'Rede social backend-first: domínio modelado em UML antes do código, regras de negócio no servidor e documentação completa.', html_url: 'https://github.com/madeiragab/social-network', stargazers_count: 1 },
  { name: 'rpg-panel', categoria: 'cat.web', tech: 'Django · Python · JS', description: 'Painel web privado para gerenciar campanhas de RPG de mesa — campanhas, personagens, inventário e papéis de mestre/jogador.', html_url: 'https://github.com/madeiragab/rpg-panel', stargazers_count: 0 },
  { name: 'tcc-simulador-ia', categoria: 'cat.ai', tech: 'Godot · GDScript · Python', description: 'Simulador tático (TCC) para avaliar a qualidade estratégica de agentes de IA em ambientes de decisão.', html_url: 'https://github.com/madeiragab/tcc-simulador-ia', stargazers_count: 1 },
  { name: 'Guns-and-boots', categoria: 'cat.game', tech: 'Python · Pygame', description: 'Jogo 2D retrô-futurista por turnos, com máquina de estados, sistema de save e modo mobile.', html_url: 'https://github.com/madeiragab/Guns-and-boots', stargazers_count: 1 },
  { name: 'darkos-ga36-port', categoria: 'cat.hardware', tech: 'Linux · Engenharia reversa', description: 'Autópsia, preservação e documentação de um console portátil clone (GA36-MB / Allwinner A33).', html_url: 'https://github.com/madeiragab/darkos-ga36-port', stargazers_count: 2 },
];

const LOCALES = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };

/* ============ IDIOMA ============ */
document.querySelectorAll('.lang-btn').forEach(btn =>
  btn.addEventListener('click', () => i18n.aplicar(btn.dataset.lang))
);

/* Quando o idioma muda, redesenha tudo que veio de dados. */
window.addEventListener('idiomamudou', () => {
  if (projetos.length) {
    renderFiltros();
    renderProjetos(categoriaAtiva);
    projCount.textContent = i18n.t('proj.count', { n: projetos.length });
  }
  renderContribAtualizado();
});

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
let categoriaAtiva = null;   // null = todos

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
  renderProjetos(null);
  const stat = document.getElementById('statProjects');
  if (stat) stat.textContent = projetos.length;
  projCount.textContent = i18n.t('proj.count', { n: projetos.length });
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
    categoria: catTopic ? CATEGORIAS[catTopic] : CATEGORIA_PADRAO,
    tech: tech || (repo.language || ''),
    description: repo.description || '',
    html_url: repo.html_url,
    homepage: repo.homepage,
    stargazers_count: repo.stargazers_count || 0,
  };
}

function renderFiltros() {
  const cats = [...new Set(projetos.map(p => p.categoria))];
  const botoes = [
    `<button class="filtro${categoriaAtiva === null ? ' ativo' : ''}" data-cat="">${esc(i18n.t('proj.todos'))}</button>`,
    ...cats.map(c =>
      `<button class="filtro${categoriaAtiva === c ? ' ativo' : ''}" data-cat="${c}">${esc(i18n.t(c))}</button>`
    ),
  ];
  filtrosEl.innerHTML = botoes.join('');
  filtrosEl.querySelectorAll('.filtro').forEach(btn =>
    btn.addEventListener('click', () => {
      categoriaAtiva = btn.dataset.cat || null;
      filtrosEl.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      renderProjetos(categoriaAtiva);
    })
  );
}

function renderProjetos(categoria) {
  const lista = categoria ? projetos.filter(p => p.categoria === categoria) : projetos;
  projGrid.innerHTML = lista.map(p => {
    const desc = i18n.descricaoProjeto(p.name, p.description) || i18n.t('proj.semDesc');
    return `
    <article class="proj-card">
      <div class="proj-head">
        <h3 class="proj-nome">${esc(p.name.replace(/-/g, ' '))}</h3>
        <span class="proj-cat">${esc(i18n.t(p.categoria))}</span>
      </div>
      ${p.tech ? `<p class="proj-tech">${esc(p.tech)}</p>` : ''}
      <p class="proj-desc">${esc(desc)}</p>
      <div class="proj-links">
        <a href="${esc(p.html_url)}" target="_blank" rel="noopener">${esc(i18n.t('proj.verGithub'))}</a>
        ${p.homepage ? `<a href="${esc(p.homepage)}" target="_blank" rel="noopener">${esc(i18n.t('proj.demo'))}</a>` : ''}
        ${p.stargazers_count ? `<span class="proj-stars">★ ${p.stargazers_count}</span>` : ''}
      </div>
    </article>`;
  }).join('');
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/* ============ CONTRIBUIÇÕES ============ */
let contribAtualizadoEm = null;

async function carregarContribuicoes() {
  let dias = null;

  /* Fonte 1: stats.json gerado diariamente pelo GitHub Actions */
  try {
    const res = await fetch('data/stats.json');
    if (res.ok) {
      const stats = await res.json();
      dias = stats.days;
      contribAtualizadoEm = stats.updated_at;
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
    document.getElementById('contribUpdated').textContent = i18n.t('contrib.erro');
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

  renderContribAtualizado();
}

function renderContribAtualizado() {
  const el = document.getElementById('contribUpdated');
  if (!el || !contribAtualizadoEm) return;
  const loc = LOCALES[i18n.idioma] || 'pt-BR';
  const d = new Date(contribAtualizadoEm);
  el.textContent = i18n.t('contrib.atualizado', {
    data: d.toLocaleDateString(loc),
    hora: d.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' }),
  });
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
  botao.removeAttribute('data-i18n');      // impede que a tradução sobrescreva o estado
  botao.textContent = i18n.t('form.enviando');

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
    botao.textContent = i18n.t('form.enviado');
    setTimeout(() => restauraBotao(botao), 4000);
  } catch {
    /* plano B: abre o cliente de e-mail do visitante */
    const corpo = encodeURIComponent(`${msg}\n\n— ${nome} (${email})`);
    window.location.href =
      `mailto:gabrielmadeira1504@gmail.com?subject=${encodeURIComponent(assunto)}&body=${corpo}`;
    restauraBotao(botao);
  }
});

function restauraBotao(botao) {
  botao.dataset.i18n = 'form.enviar';
  botao.textContent = i18n.t('form.enviar');
  botao.disabled = false;
}

/* ============ INIT ============ */
i18n.aplicar();
carregarProjetos();
carregarContribuicoes();
