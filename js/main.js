/* ============================================================
   DAROSA.DEV — lógica do site
   - Projetos: carregados da API do GitHub (topic "portifolio")
   - Contribuições: data/stats.json (atualizado diariamente por
     GitHub Actions) com fallback para API pública
   - Idiomas: ver js/i18n.js
   ============================================================ */

const GH_USER = 'madeiragab';
const GH_TOPIC = 'portifolio';
/* Repositório com este topic sobe para o começo da grade e ganha selo.
   Serve para o visitante que só vai olhar os três primeiros cartões. */
const GH_TOPIC_DESTAQUE = 'destaque';

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
  { name: 'lastro', categoria: 'cat.tool', tech: 'Rust · B+Tree · WAL', description: 'Banco de dados relacional embutido escrito do zero em Rust: pager, B+Tree, WAL com recuperação de crash, parser SQL e MVCC.', html_url: 'https://github.com/madeiragab/lastro', homepage: 'https://madeiragab.github.io/lastro/', stargazers_count: 0 },
  { name: 'market-direction', categoria: 'cat.ai', tech: 'Python · scikit learn · LightGBM · pandas', description: 'Previsão direcional de ações para B3 e S&P 500, construída em torno de medir se dá para acreditar na previsão. Walk-forward com embargo, auditoria de vazamento e custo de transação.', html_url: 'https://github.com/madeiragab/market-direction', homepage: 'https://madeiragab.github.io/market-direction/', stargazers_count: 0 },
  { name: 'rastro', categoria: 'cat.backend', tech: 'FastAPI · PostGIS · TypeScript · Docker', description: 'Rastreamento em tempo real e geocerca para rebanho bovino, com autenticação Argon2id e simulador de rebanho embutido.', html_url: 'https://github.com/madeiragab/rastro', stargazers_count: 1 },
  { name: 'ascensao-dos-semideuses', categoria: 'cat.game', tech: 'Python · HTML · Game design', description: 'RPG de mesa autoral: Livro do Jogador, Bestiário e simulador de balanceamento com 40 mil combates medidos.', html_url: 'https://github.com/madeiragab/ascensao-dos-semideuses', homepage: 'https://madeiragab.github.io/ascensao-dos-semideuses/', stargazers_count: 2 },
  { name: 'geicis-ponto', categoria: 'cat.backend', tech: 'Django · DRF · React', description: 'Sistema de ponto para estagiários: ranking de horas, mínimo semanal e alerta por e-mail. Domínio fechado antes do código.', html_url: 'https://github.com/madeiragab/geicis-ponto', stargazers_count: 1 },
  { name: 'social-network', categoria: 'cat.backend', tech: 'Django · DRF · PostgreSQL', description: 'Rede social backend-first: domínio modelado em UML antes do código, regras de negócio no servidor e documentação completa.', html_url: 'https://github.com/madeiragab/social-network', stargazers_count: 2 },
  { name: 'tcc-simulador-ia', categoria: 'cat.ai', tech: 'Godot · GDScript · Python', description: 'Simulador tático (TCC) para avaliar a qualidade estratégica de agentes de IA em ambientes de decisão.', html_url: 'https://github.com/madeiragab/tcc-simulador-ia', stargazers_count: 2 },
  { name: 'darkos-ga36-port', categoria: 'cat.hardware', tech: 'Linux · Engenharia reversa', description: 'Autópsia, preservação e documentação de um console portátil clone (GA36-MB / Allwinner A33).', html_url: 'https://github.com/madeiragab/darkos-ga36-port', stargazers_count: 4 },
  { name: 'rpg-panel', categoria: 'cat.web', tech: 'Django · Python · JS', description: 'Painel web para gerenciar campanhas de RPG de mesa — campanhas, personagens, inventário e papéis de mestre/jogador.', html_url: 'https://github.com/madeiragab/rpg-panel', stargazers_count: 2 },
  { name: 'Guns-and-boots', categoria: 'cat.game', tech: 'Python · Pygame', description: 'Jogo 2D retrô-futurista por turnos, com máquina de estados, sistema de save e modo mobile.', html_url: 'https://github.com/madeiragab/Guns-and-boots', stargazers_count: 2 },
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

/** Busca os projetos. Com aoVivo=true ignora qualquer cache e exige
    resposta da API do GitHub (usado pelo botão "Atualizar agora"). */
async function carregarProjetos(aoVivo = false) {
  let ok = false;
  try {
    const url = `https://api.github.com/search/repositories?q=user:${GH_USER}+topic:${GH_TOPIC}&sort=updated&per_page=100`;
    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    if (!data.items || data.items.length === 0) throw new Error('sem repositórios com o topic');
    projetos = data.items.map(normalizarRepo);
    ok = true;
  } catch (e) {
    /* Num refresh manual, falhou é falhou: mantém o que já está na tela
       em vez de substituir dados bons por cache velho. */
    if (aoVivo) return false;

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
  renderProjetos(categoriaAtiva);
  const stat = document.getElementById('statProjects');
  if (stat) stat.textContent = projetos.length;
  projCount.textContent = i18n.t('proj.count', { n: projetos.length });
  return ok;
}

function normalizarRepo(repo) {
  const destaque = (repo.topics || []).includes(GH_TOPIC_DESTAQUE);
  const topics = (repo.topics || [])
    .filter(t => t !== GH_TOPIC && t !== GH_TOPIC_DESTAQUE);
  const catTopic = topics.find(t => CATEGORIAS[t]);
  const tech = topics
    .filter(t => t !== catTopic)
    .map(t => t.replace(/-/g, ' '))
    .join(' · ');
  return {
    name: repo.name,
    destaque,
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
  const lista = (categoria ? projetos.filter(p => p.categoria === categoria) : projetos)
    .slice()
    .sort((a, b) => Number(b.destaque) - Number(a.destaque));
  projGrid.innerHTML = lista.map(p => {
    const desc = i18n.descricaoProjeto(p.name, p.description) || i18n.t('proj.semDesc');
    return `
    <article class="proj-card${p.destaque ? ' destaque' : ''}">
      ${p.destaque ? `<p class="proj-selo">${esc(i18n.t('proj.destaque'))}</p>` : ''}
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
let contribAoVivo = false;

/** Busca as contribuições. Com aoVivo=true pula o snapshot diário
    (data/stats.json) e vai direto na API pública, trazendo os números
    do momento em vez dos das 12:34. */
async function carregarContribuicoes(aoVivo = false) {
  let dias = null;

  /* Fonte 1: stats.json gerado diariamente pelo GitHub Actions */
  if (!aoVivo) {
    try {
      const res = await fetch('data/stats.json');
      if (res.ok) {
        const stats = await res.json();
        dias = stats.days;
        contribAtualizadoEm = stats.updated_at;
        contribAoVivo = false;
      }
    } catch { /* segue pro fallback */ }
  }

  /* Fonte 2: API pública de contribuições (sempre ao vivo) */
  if (!dias) {
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`,
        { cache: 'no-store' }
      );
      if (res.ok) {
        const data = await res.json();
        dias = data.contributions.map(c => ({ date: c.date, count: c.count }));
        contribAtualizadoEm = new Date().toISOString();
        contribAoVivo = true;
      }
    } catch { /* sem dados */ }
  }

  if (!dias || dias.length === 0) {
    if (aoVivo) return false;   // mantém os números que já estão na tela
    document.getElementById('contribUpdated').textContent = i18n.t('contrib.erro');
    return false;
  }

  const hojeStr = new Date().toISOString().slice(0, 10);
  const mesStr = hojeStr.slice(0, 7);

  const mes = dias.filter(d => d.date.startsWith(mesStr)).reduce((s, d) => s + d.count, 0);
  const ano = dias.reduce((s, d) => s + d.count, 0);

  /* Constância, não pico. "Hoje" e "dias seguidos" zeram num fim de semana
     e passam a impressão errada sobre um ano inteiro de trabalho; estes dois
     saem da mesma série e descrevem o hábito ao longo do ano. */
  let maiorSeq = 0, seqAtual = 0;
  for (const d of dias) {
    seqAtual = d.count > 0 ? seqAtual + 1 : 0;
    if (seqAtual > maiorSeq) maiorSeq = seqAtual;
  }
  const mediaSemana = Math.round(ano / (dias.length / 7));

  animaNumero('cMaiorSeq', maiorSeq);
  animaNumero('cMes', mes);
  animaNumero('cAno', ano);
  animaNumero('cMediaSemana', mediaSemana);

  renderContribAtualizado();
  return true;
}

function renderContribAtualizado() {
  const el = document.getElementById('contribUpdated');
  if (!el || !contribAtualizadoEm) return;
  const loc = LOCALES[i18n.idioma] || 'pt-BR';
  const d = new Date(contribAtualizadoEm);
  const hora = d.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' });
  el.textContent = contribAoVivo
    ? i18n.t('contrib.agora', { hora })
    : i18n.t('contrib.atualizado', { data: d.toLocaleDateString(loc), hora });
}

/* ============ BOTÃO "ATUALIZAR AGORA" ============
   Rebusca projetos e contribuições direto das APIs, sem esperar o
   workflow diário das 12:34. */
const btnAtualizar = document.getElementById('btnAtualizar');

btnAtualizar.addEventListener('click', async () => {
  estadoBotao('carregando');

  const [projOk, contribOk] = await Promise.all([
    carregarProjetos(true),
    carregarContribuicoes(true),
  ]);

  estadoBotao(projOk || contribOk ? 'ok' : 'erro');
  setTimeout(() => estadoBotao('idle'), 3000);
});

function estadoBotao(estado) {
  btnAtualizar.classList.remove('girando', 'ok', 'erro');
  if (estado === 'idle') {
    btnAtualizar.dataset.i18n = 'atualizar.btn';
    btnAtualizar.textContent = i18n.t('atualizar.btn');
    btnAtualizar.disabled = false;
    return;
  }
  /* enquanto mostra um estado temporário, tira o data-i18n para a
     troca de idioma não sobrescrever a mensagem */
  btnAtualizar.removeAttribute('data-i18n');
  btnAtualizar.disabled = true;
  if (estado === 'carregando') {
    btnAtualizar.classList.add('girando');
    btnAtualizar.textContent = i18n.t('atualizar.carregando');
  } else if (estado === 'ok') {
    btnAtualizar.classList.add('ok');
    btnAtualizar.textContent = i18n.t('atualizar.ok');
  } else {
    btnAtualizar.classList.add('erro');
    btnAtualizar.textContent = i18n.t('atualizar.erro');
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

/* As barras de percentual saíram: os itens de stack agora são texto com link
   para o repositório, e não precisam de animação nem de observer. */

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
