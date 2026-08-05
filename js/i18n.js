/* ============================================================
   DAROSA.DEV — internacionalização (pt · en · es)

   Como funciona:
   - No HTML, marque o elemento com um destes atributos:
       data-i18n       → troca o textContent
       data-i18n-html  → troca o innerHTML (para textos com <strong>, <span>)
       data-i18n-ph    → troca o placeholder
       data-i18n-aria  → troca o aria-label
   - O valor do atributo é a chave dentro de TEXTOS abaixo.
   - Ao trocar de idioma é disparado o evento "idiomamudou", que o
     main.js escuta para redesenhar o conteúdo vindo da API.
   ============================================================ */

const IDIOMAS = ['pt', 'en', 'es'];
const IDIOMA_PADRAO = 'pt';

const TEXTOS = {
  /* ---------------------------------------------------------- */
  pt: {
    'meta.lang': 'pt-BR',
    'meta.title': 'Darosa % Dev Backend',
    'meta.desc': 'Gabriel Madeira — estudante de Ciência da Computação focado em backend, Django, PostgreSQL e APIs REST. Portfólio de projetos reais.',

    'nav.sobre': 'SOBRE',
    'nav.projetos': 'PROJETOS',
    'nav.backend': 'BACKEND',
    'nav.stack': 'STACK',
    'nav.jornada': 'JORNADA',
    'nav.contato': 'CONTATO',
    'aria.menu': 'Abrir menu',
    'aria.tema': 'Alternar tema',
    'aria.idioma': 'Mudar idioma',

    'hero.badge': '● DISPONÍVEL PARA TRABALHAR',
    'hero.badgeSub': 'BACKEND • APIS REST • DJANGO • POSTGRESQL',
    'hero.title': 'DESENVOLVEDOR<br /><span class="stroke">BACKEND</span> &amp;<br /><span class="red">BUILDER</span><span class="cursor">_</span>',
    'hero.desc': 'Sistemas funcionais, MVPs e backends bem modelados — construídos entre a faculdade de Ciência da Computação, o TCC e a curiosidade de entender como as coisas funcionam por dentro (até console clone eu já abri).',
    'hero.ctaProjetos': 'VER PROJETOS →',
    'hero.ctaGithub': '>_ GITHUB',
    'hero.imgAlt': 'Ilustração de Gabriel Madeira de terno preto e gravata vermelha',

    'sobre.eyebrow': '/* um pouco sobre mim */ <span class="red">quem está por trás do código</span>',
    'sobre.titulo': 'QUEM ESTÁ POR TRÁS DO CÓDIGO.',
    'sobre.p1': 'Sou <strong>Gabriel Madeira</strong>, estudante de <strong>Ciência da Computação</strong> no IFSulDeMinas, apaixonado por construir <span class="red">coisas reais</span> — não só tutoriais.',
    'sobre.p2': 'Meu foco é <strong>backend</strong>: modelagem de domínio, regras de negócio bem definidas, APIs REST e banco de dados relacional. Django e PostgreSQL são as ferramentas do dia a dia.',
    'sobre.p3': 'Também gosto de sair da zona de conforto: já fiz jogo por turnos em Pygame, simulador de IA em Godot pro TCC e até engenharia reversa de um console portátil clone — porque entender como as coisas <span class="red">quebram</span> é a melhor forma de aprender a construí-las melhor.',
    'sobre.p4': 'Com curiosidade como motor, código como ferramenta e documentação como religião.',
    'sobre.fotoAlt': 'Foto de Gabriel Madeira',

    'stat.anos': 'ANOS ESTUDANDO',
    'stat.projetos': 'PROJETOS REAIS ATÉ AGORA',
    'stat.stacks': 'STACKS',
    'stat.cafes': 'CAFÉS',

    'contrib.eyebrow': '/* atividade no github */ <span class="red">commits · PRs · issues</span>',
    'contrib.titulo': 'CONTRIBUIÇÕES EM NÚMEROS.',
    'contrib.desc': 'Atividade real, direto do meu GitHub — atualizada todos os dias de forma automática.',
    'contrib.hoje': 'CONTRIBUIÇÕES HOJE',
    'contrib.mes': 'CONTRIBUIÇÕES ESTE MÊS',
    'contrib.ano': 'NO ÚLTIMO ANO',
    'contrib.streak': 'DIAS SEGUIDOS CONTRIBUINDO',
    'contrib.atualizado': '// última atualização automática: {data} às {hora}',
    'contrib.agora': '// dados ao vivo, buscados agora ({hora})',
    'contrib.erro': '// não foi possível carregar os dados agora',
    'atualizar.btn': '↻ Atualizar agora',
    'atualizar.carregando': '↻ Atualizando…',
    'atualizar.ok': '✓ Dados atualizados',
    'atualizar.erro': '✕ Falhou — tente em 1 min',

    'proj.eyebrow': '/* projetos que construí */',
    'proj.titulo': 'ONDE BACKEND, JOGOS E HARDWARE SE ENCONTRAM.',
    'proj.desc': 'Cada projeto abaixo é uma tentativa diferente de resolver um problema real. Esta lista vem <strong>direto da API do GitHub</strong>: todo repositório meu com o topic <code>portifolio</code> aparece aqui automaticamente.',
    'proj.loading': '>_ buscando repositórios na API do GitHub',
    'proj.count': '{n} no total',
    'proj.verGithub': 'Ver no GitHub ↗',
    'proj.demo': 'Demo ↗',
    'proj.semDesc': 'Sem descrição (ainda!).',
    'proj.todos': 'TODOS',

    'cat.backend': 'BACKEND',
    'cat.web': 'WEB',
    'cat.game': 'JOGO',
    'cat.ai': 'IA',
    'cat.hardware': 'HARDWARE',
    'cat.tool': 'FERRAMENTA',
    'cat.security': 'SEGURANÇA',
    'cat.mobile': 'MOBILE',
    'cat.dashboard': 'DASHBOARD',
    'cat.outro': 'PROJETO',

    'be.eyebrow': '/* backend e arquitetura */ <span class="red">domínio · dados · APIs</span>',
    'be.titulo': 'QUANDO A INTERFACE SILENCIA, ENTRA O BACKEND.',
    'be.whoami': 'estudante de ciência da computação · backend dev',
    'be.foco': 'modelagem de domínio, APIs REST, PostgreSQL e docs',
    'be.ferramentas': 'FERRAMENTAS',
    'be.projetosTitulo': 'PROJETOS BACKEND',
    'be.projetos': '<a href="https://github.com/madeiragab/rastro"><strong class="red">Rastro</strong></a> — FastAPI e PostGIS. A geocerca é <code>ST_Contains</code> mais distância em <code>geography</code>: a regra roda no banco, e o CI a testa contra PostGIS de verdade a cada push, junto com as 124 asserções de autenticação Argon2id e rotação de refresh token.',
    'be.projetos2': '<a href="https://github.com/madeiragab/geicis-ponto"><strong class="red">GEICIS Ponto</strong></a> — Django e DRF. Domínio e contrato da API fechados em <code>docs/</code> antes da primeira linha de código; as horas são agregação SQL, não laço em Python. 58 testes no CI, mais a checagem de que nenhum modelo ficou sem migração.',
    'be.projetos3': 'Antes deles vieram <a href="https://github.com/madeiragab/social-network">Social Network</a> (domínio em UML antes do código, regras garantidas por constraint no banco) e <a href="https://github.com/madeiragab/rpg-panel">RPG Panel</a> (controle de acesso por papéis).',

    'stack.eyebrow': '/* stack que uso */ <span class="red">linguagens, ferramentas e infra</span>',
    'stack.titulo': 'AS TECNOLOGIAS POR TRÁS DOS MEUS PROJETOS.',
    'stack.desc': 'De linguagens a banco de dados — o que uso no dia a dia pra construir, documentar e colocar no ar. Cada item aponta para onde a tecnologia está sendo usada.',
    'skill.apis': '▸ APIs REST',
    'skill.hardware': '▸ Linux / Hardware',
    'skill.onde.python': 'Backend do <a href="https://github.com/madeiragab/rastro">Rastro</a> (FastAPI) e do <a href="https://github.com/madeiragab/geicis-ponto">GEICIS Ponto</a> (Django); simulador do <a href="https://github.com/madeiragab/tcc-simulador-ia">TCC</a>, com +14.000 partidas medidas.',
    'skill.onde.django': '<a href="https://github.com/madeiragab/geicis-ponto">GEICIS Ponto</a> — 58 testes no CI — e <a href="https://github.com/madeiragab/social-network">Social Network</a>, com o domínio modelado em UML antes do código.',
    'skill.onde.postgres': 'A geocerca do <a href="https://github.com/madeiragab/rastro">Rastro</a> é <code>ST_Contains</code> mais distância em <code>geography</code>: a regra roda no banco, e o CI testa contra PostGIS de verdade.',
    'skill.onde.apis': 'Contrato fechado em <code>docs/</code> antes do código nos dois sistemas; autenticação com Argon2id e rotação de refresh token no <a href="https://github.com/madeiragab/rastro">Rastro</a>.',
    'skill.onde.docker': '<a href="https://github.com/madeiragab/rastro">Rastro</a> sobe inteiro com <code>docker compose up</code>; o CI ainda constrói as imagens de produção a cada push.',
    'skill.onde.js': 'Front mobile-first do <a href="https://github.com/madeiragab/rastro">Rastro</a> em TypeScript; React no <a href="https://github.com/madeiragab/geicis-ponto">GEICIS Ponto</a>; este site é JS puro, sem framework.',
    'skill.onde.godot': 'Ambiente de simulação do <a href="https://github.com/madeiragab/tcc-simulador-ia">TCC</a>, onde os agentes de IA jogam e são medidos.',
    'skill.onde.hardware': 'Autópsia do <a href="https://github.com/madeiragab/darkos-ga36-port">GA36-MB</a>: console clone que mente sobre o próprio hardware, documentado por porta serial.',

    'jornada.eyebrow': '/* trajetória */ <span class="red">ciência da computação</span>',
    'jornada.titulo': 'MINHA JORNADA ATÉ AQUI.',
    'tl0.quando': '2026 — AGORA',
    'tl0.titulo': 'Estágio — reformulação do Laboratório de Redes',
    'tl0.desc': 'Estagiário bolsista no Laboratório de Redes de Computadores do IFSulDeMinas — Campus Muzambinho, atuando em um projeto de reformulação para recolocar em funcionamento um laboratório que estava abandonado.',
    'tl1.quando': '2026',
    'tl1.titulo': 'TCC: simulador tático de IA',
    'tl1.desc': 'Desenvolvendo em Godot um ambiente de simulação para comparar estratégias de tomada de decisão de agentes de IA — com análise de dados em Python.',
    'tl2.quando': '2025 — 2026',
    'tl2.titulo': 'Backend de verdade',
    'tl2.desc': 'De projetos simples para sistemas completos: modelagem de domínio com UML, autenticação, APIs REST com Django REST Framework e PostgreSQL. Social Network e RPG Panel são frutos dessa fase.',
    'tl3.quando': '2024 — 2025',
    'tl3.titulo': 'Fundamentos + projetos reais',
    'tl3.desc': 'Ciência da Computação no IFSulDeMinas. Jogo por turnos em Pygame (Guns and Boots) e o hábito de documentar tudo — até a engenharia reversa de um console portátil clone.',

    'contato.eyebrow': '/* contato */ <span class="red">fale comigo</span>',
    'contato.titulo': 'VAMOS TRABALHAR JUNTOS?',
    'contato.desc': 'Tem um projeto em mente, uma vaga ou quer bater um papo sobre backend e tecnologia? Me manda uma mensagem, respondo o mais breve possível.',
    'form.nome': 'nome',
    'form.email': 'email',
    'form.assunto': 'assunto',
    'form.msg': 'mensagem',
    'form.enviar': 'ENVIAR MENSAGEM',
    'form.enviando': 'ENVIANDO…',
    'form.enviado': '✓ MENSAGEM ENVIADA',

    'footer.1': 'DAROSA <span class="red">%</span> DEV BACKEND — construído com curiosidade e café.',
    'footer.2': '>_ projetos carregados ao vivo da API do GitHub',
  },

  /* ---------------------------------------------------------- */
  en: {
    'meta.lang': 'en',
    'meta.title': 'Darosa % Backend Dev',
    'meta.desc': 'Gabriel Madeira — Computer Science student focused on backend, Django, PostgreSQL and REST APIs. Portfolio of real projects.',

    'nav.sobre': 'ABOUT',
    'nav.projetos': 'PROJECTS',
    'nav.backend': 'BACKEND',
    'nav.stack': 'STACK',
    'nav.jornada': 'JOURNEY',
    'nav.contato': 'CONTACT',
    'aria.menu': 'Open menu',
    'aria.tema': 'Toggle theme',
    'aria.idioma': 'Change language',

    'hero.badge': '● OPEN TO WORK',
    'hero.badgeSub': 'BACKEND • REST APIS • DJANGO • POSTGRESQL',
    'hero.title': 'BACKEND<br /><span class="stroke">DEVELOPER</span> &amp;<br /><span class="red">BUILDER</span><span class="cursor">_</span>',
    'hero.desc': 'Working systems, MVPs and well-modeled backends — built between a Computer Science degree, my thesis, and the curiosity to understand how things work inside (I have even torn a handheld console apart).',
    'hero.ctaProjetos': 'SEE PROJECTS →',
    'hero.ctaGithub': '>_ GITHUB',
    'hero.imgAlt': 'Illustration of Gabriel Madeira in a black suit and red tie',

    'sobre.eyebrow': '/* a bit about me */ <span class="red">who is behind the code</span>',
    'sobre.titulo': 'WHO IS BEHIND THE CODE.',
    'sobre.p1': "I'm <strong>Gabriel Madeira</strong>, a <strong>Computer Science</strong> student at IFSulDeMinas, passionate about building <span class=\"red\">real things</span> — not just tutorials.",
    'sobre.p2': 'My focus is <strong>backend</strong>: domain modeling, well-defined business rules, REST APIs and relational databases. Django and PostgreSQL are my everyday tools.',
    'sobre.p3': 'I also like leaving my comfort zone: I built a turn-based game in Pygame, an AI simulator in Godot for my thesis, and even reverse-engineered a clone handheld console — because understanding how things <span class="red">break</span> is the best way to learn how to build them better.',
    'sobre.p4': 'Curiosity as the engine, code as the tool, and documentation as religion.',
    'sobre.fotoAlt': 'Photo of Gabriel Madeira',

    'stat.anos': 'YEARS STUDYING',
    'stat.projetos': 'REAL PROJECTS SO FAR',
    'stat.stacks': 'STACKS',
    'stat.cafes': 'COFFEES',

    'contrib.eyebrow': '/* github activity */ <span class="red">commits · PRs · issues</span>',
    'contrib.titulo': 'CONTRIBUTIONS IN NUMBERS.',
    'contrib.desc': 'Real activity, straight from my GitHub — updated automatically every day.',
    'contrib.hoje': 'CONTRIBUTIONS TODAY',
    'contrib.mes': 'CONTRIBUTIONS THIS MONTH',
    'contrib.ano': 'IN THE LAST YEAR',
    'contrib.streak': 'DAY CONTRIBUTION STREAK',
    'contrib.atualizado': '// last automatic update: {data} at {hora}',
    'contrib.agora': '// live data, fetched just now ({hora})',
    'contrib.erro': '// could not load the data right now',
    'atualizar.btn': '↻ Refresh now',
    'atualizar.carregando': '↻ Refreshing…',
    'atualizar.ok': '✓ Data refreshed',
    'atualizar.erro': '✕ Failed — try in 1 min',

    'proj.eyebrow': '/* projects I built */',
    'proj.titulo': 'WHERE BACKEND, GAMES AND HARDWARE MEET.',
    'proj.desc': 'Each project below is a different attempt at solving a real problem. This list comes <strong>straight from the GitHub API</strong>: every repository of mine tagged with the <code>portifolio</code> topic shows up here automatically.',
    'proj.loading': '>_ fetching repositories from the GitHub API',
    'proj.count': '{n} in total',
    'proj.verGithub': 'View on GitHub ↗',
    'proj.demo': 'Demo ↗',
    'proj.semDesc': 'No description (yet!).',
    'proj.todos': 'ALL',

    'cat.backend': 'BACKEND',
    'cat.web': 'WEB',
    'cat.game': 'GAME',
    'cat.ai': 'AI',
    'cat.hardware': 'HARDWARE',
    'cat.tool': 'TOOL',
    'cat.security': 'SECURITY',
    'cat.mobile': 'MOBILE',
    'cat.dashboard': 'DASHBOARD',
    'cat.outro': 'PROJECT',

    'be.eyebrow': '/* backend and architecture */ <span class="red">domain · data · APIs</span>',
    'be.titulo': 'WHEN THE INTERFACE GOES QUIET, THE BACKEND SPEAKS.',
    'be.whoami': 'computer science student · backend dev',
    'be.foco': 'domain modeling, REST APIs, PostgreSQL and docs',
    'be.ferramentas': 'TOOLS',
    'be.projetosTitulo': 'BACKEND PROJECTS',
    'be.projetos': '<a href="https://github.com/madeiragab/rastro"><strong class="red">Rastro</strong></a> — FastAPI and PostGIS. The geofence is <code>ST_Contains</code> plus distance in <code>geography</code>: the rule runs in the database, and CI tests it against real PostGIS on every push, alongside the 124 assertions covering Argon2id auth and refresh-token rotation.',
    'be.projetos2': '<a href="https://github.com/madeiragab/geicis-ponto"><strong class="red">GEICIS Ponto</strong></a> — Django and DRF. Domain and API contract settled in <code>docs/</code> before the first line of code; hours are SQL aggregation, not a Python loop. 58 tests in CI, plus a check that no model was left without its migration.',
    'be.projetos3': 'Before them came <a href="https://github.com/madeiragab/social-network">Social Network</a> (domain in UML before any code, rules enforced by database constraints) and <a href="https://github.com/madeiragab/rpg-panel">RPG Panel</a> (role-based access control).',

    'stack.eyebrow': '/* my stack */ <span class="red">languages, tools and infra</span>',
    'stack.titulo': 'THE TECHNOLOGIES BEHIND MY PROJECTS.',
    'stack.desc': 'From languages to databases — what I use every day to build, document and ship. Each item points to where the technology is actually used.',
    'skill.apis': '▸ REST APIs',
    'skill.hardware': '▸ Linux / Hardware',
    'skill.onde.python': 'Backend of <a href="https://github.com/madeiragab/rastro">Rastro</a> (FastAPI) and <a href="https://github.com/madeiragab/geicis-ponto">GEICIS Ponto</a> (Django); the <a href="https://github.com/madeiragab/tcc-simulador-ia">thesis</a> simulator, with 14,000+ measured matches.',
    'skill.onde.django': '<a href="https://github.com/madeiragab/geicis-ponto">GEICIS Ponto</a> — 58 tests in CI — and <a href="https://github.com/madeiragab/social-network">Social Network</a>, with the domain modeled in UML before any code.',
    'skill.onde.postgres': 'The geofence in <a href="https://github.com/madeiragab/rastro">Rastro</a> is <code>ST_Contains</code> plus distance in <code>geography</code>: the rule runs in the database, and CI tests against real PostGIS.',
    'skill.onde.apis': 'The contract was settled in <code>docs/</code> before the code in both systems; Argon2id auth with refresh-token rotation in <a href="https://github.com/madeiragab/rastro">Rastro</a>.',
    'skill.onde.docker': '<a href="https://github.com/madeiragab/rastro">Rastro</a> comes up whole with <code>docker compose up</code>; CI also builds the production images on every push.',
    'skill.onde.js': 'Mobile-first front end of <a href="https://github.com/madeiragab/rastro">Rastro</a> in TypeScript; React in <a href="https://github.com/madeiragab/geicis-ponto">GEICIS Ponto</a>; this site is plain JS, no framework.',
    'skill.onde.godot': 'The simulation environment of the <a href="https://github.com/madeiragab/tcc-simulador-ia">thesis</a>, where the AI agents play and get measured.',
    'skill.onde.hardware': 'Autopsy of the <a href="https://github.com/madeiragab/darkos-ga36-port">GA36-MB</a>: a clone console that lies about its own hardware, documented over a serial port.',

    'jornada.eyebrow': '/* trajectory */ <span class="red">computer science</span>',
    'jornada.titulo': 'MY JOURNEY SO FAR.',
    'tl0.quando': '2026 — NOW',
    'tl0.titulo': 'Internship — rebuilding the Computer Networks Lab',
    'tl0.desc': 'Scholarship intern at the Computer Networks Laboratory of IFSulDeMinas — Muzambinho Campus, working on a project to bring a long-abandoned lab back into operation.',
    'tl1.quando': '2026',
    'tl1.titulo': 'Thesis: tactical AI simulator',
    'tl1.desc': 'Building a simulation environment in Godot to compare decision-making strategies of AI agents — with data analysis in Python.',
    'tl2.quando': '2025 — 2026',
    'tl2.titulo': 'Real backend work',
    'tl2.desc': 'From simple projects to complete systems: domain modeling with UML, authentication, REST APIs with Django REST Framework and PostgreSQL. Social Network and RPG Panel came out of this phase.',
    'tl3.quando': '2024 — 2025',
    'tl3.titulo': 'Fundamentals + real projects',
    'tl3.desc': 'Computer Science at IFSulDeMinas. A turn-based game in Pygame (Guns and Boots) and the habit of documenting everything — including reverse-engineering a clone handheld console.',

    'contato.eyebrow': '/* contact */ <span class="red">get in touch</span>',
    'contato.titulo': 'SHALL WE WORK TOGETHER?',
    'contato.desc': 'Got a project in mind, a job opening, or just want to talk about backend and technology? Send me a message and I will reply as soon as I can.',
    'form.nome': 'name',
    'form.email': 'email',
    'form.assunto': 'subject',
    'form.msg': 'message',
    'form.enviar': 'SEND MESSAGE',
    'form.enviando': 'SENDING…',
    'form.enviado': '✓ MESSAGE SENT',

    'footer.1': 'DAROSA <span class="red">%</span> BACKEND DEV — built with curiosity and coffee.',
    'footer.2': '>_ projects loaded live from the GitHub API',
  },

  /* ---------------------------------------------------------- */
  es: {
    'meta.lang': 'es',
    'meta.title': 'Darosa % Dev Backend',
    'meta.desc': 'Gabriel Madeira — estudiante de Ciencias de la Computación enfocado en backend, Django, PostgreSQL y APIs REST. Portafolio de proyectos reales.',

    'nav.sobre': 'SOBRE MÍ',
    'nav.projetos': 'PROYECTOS',
    'nav.backend': 'BACKEND',
    'nav.stack': 'STACK',
    'nav.jornada': 'TRAYECTORIA',
    'nav.contato': 'CONTACTO',
    'aria.menu': 'Abrir menú',
    'aria.tema': 'Cambiar tema',
    'aria.idioma': 'Cambiar idioma',

    'hero.badge': '● DISPONIBLE PARA TRABAJAR',
    'hero.badgeSub': 'BACKEND • APIS REST • DJANGO • POSTGRESQL',
    'hero.title': 'DESARROLLADOR<br /><span class="stroke">BACKEND</span> &amp;<br /><span class="red">BUILDER</span><span class="cursor">_</span>',
    'hero.desc': 'Sistemas funcionales, MVPs y backends bien modelados — construidos entre la carrera de Ciencias de la Computación, la tesis y la curiosidad por entender cómo funcionan las cosas por dentro (hasta abrí una consola portátil clon).',
    'hero.ctaProjetos': 'VER PROYECTOS →',
    'hero.ctaGithub': '>_ GITHUB',
    'hero.imgAlt': 'Ilustración de Gabriel Madeira con traje negro y corbata roja',

    'sobre.eyebrow': '/* un poco sobre mí */ <span class="red">quién está detrás del código</span>',
    'sobre.titulo': 'QUIÉN ESTÁ DETRÁS DEL CÓDIGO.',
    'sobre.p1': 'Soy <strong>Gabriel Madeira</strong>, estudiante de <strong>Ciencias de la Computación</strong> en el IFSulDeMinas, apasionado por construir <span class="red">cosas reales</span> — no solo tutoriales.',
    'sobre.p2': 'Mi enfoque es el <strong>backend</strong>: modelado de dominio, reglas de negocio bien definidas, APIs REST y bases de datos relacionales. Django y PostgreSQL son mis herramientas del día a día.',
    'sobre.p3': 'También me gusta salir de la zona de confort: hice un juego por turnos en Pygame, un simulador de IA en Godot para la tesis y hasta ingeniería inversa de una consola portátil clon — porque entender cómo las cosas <span class="red">se rompen</span> es la mejor forma de aprender a construirlas mejor.',
    'sobre.p4': 'Con la curiosidad como motor, el código como herramienta y la documentación como religión.',
    'sobre.fotoAlt': 'Foto de Gabriel Madeira',

    'stat.anos': 'AÑOS ESTUDIANDO',
    'stat.projetos': 'PROYECTOS REALES HASTA AHORA',
    'stat.stacks': 'STACKS',
    'stat.cafes': 'CAFÉS',

    'contrib.eyebrow': '/* actividad en github */ <span class="red">commits · PRs · issues</span>',
    'contrib.titulo': 'CONTRIBUCIONES EN NÚMEROS.',
    'contrib.desc': 'Actividad real, directo de mi GitHub — actualizada automáticamente todos los días.',
    'contrib.hoje': 'CONTRIBUCIONES HOY',
    'contrib.mes': 'CONTRIBUCIONES ESTE MES',
    'contrib.ano': 'EN EL ÚLTIMO AÑO',
    'contrib.streak': 'DÍAS SEGUIDOS CONTRIBUYENDO',
    'contrib.atualizado': '// última actualización automática: {data} a las {hora}',
    'contrib.agora': '// datos en vivo, obtenidos ahora ({hora})',
    'contrib.erro': '// no se pudieron cargar los datos ahora',
    'atualizar.btn': '↻ Actualizar ahora',
    'atualizar.carregando': '↻ Actualizando…',
    'atualizar.ok': '✓ Datos actualizados',
    'atualizar.erro': '✕ Falló — intenta en 1 min',

    'proj.eyebrow': '/* proyectos que construí */',
    'proj.titulo': 'DONDE BACKEND, JUEGOS Y HARDWARE SE ENCUENTRAN.',
    'proj.desc': 'Cada proyecto de abajo es un intento distinto de resolver un problema real. Esta lista viene <strong>directo de la API de GitHub</strong>: todo repositorio mío con el topic <code>portifolio</code> aparece aquí automáticamente.',
    'proj.loading': '>_ buscando repositorios en la API de GitHub',
    'proj.count': '{n} en total',
    'proj.verGithub': 'Ver en GitHub ↗',
    'proj.demo': 'Demo ↗',
    'proj.semDesc': 'Sin descripción (¡todavía!).',
    'proj.todos': 'TODOS',

    'cat.backend': 'BACKEND',
    'cat.web': 'WEB',
    'cat.game': 'JUEGO',
    'cat.ai': 'IA',
    'cat.hardware': 'HARDWARE',
    'cat.tool': 'HERRAMIENTA',
    'cat.security': 'SEGURIDAD',
    'cat.mobile': 'MÓVIL',
    'cat.dashboard': 'DASHBOARD',
    'cat.outro': 'PROYECTO',

    'be.eyebrow': '/* backend y arquitectura */ <span class="red">dominio · datos · APIs</span>',
    'be.titulo': 'CUANDO LA INTERFAZ CALLA, HABLA EL BACKEND.',
    'be.whoami': 'estudiante de ciencias de la computación · backend dev',
    'be.foco': 'modelado de dominio, APIs REST, PostgreSQL y docs',
    'be.ferramentas': 'HERRAMIENTAS',
    'be.projetosTitulo': 'PROYECTOS BACKEND',
    'be.projetos': '<a href="https://github.com/madeiragab/rastro"><strong class="red">Rastro</strong></a> — FastAPI y PostGIS. La geocerca es <code>ST_Contains</code> más distancia en <code>geography</code>: la regla corre en la base, y el CI la prueba contra PostGIS de verdad en cada push, junto con las 124 aserciones de autenticación Argon2id y rotación de refresh token.',
    'be.projetos2': '<a href="https://github.com/madeiragab/geicis-ponto"><strong class="red">GEICIS Ponto</strong></a> — Django y DRF. Dominio y contrato de la API cerrados en <code>docs/</code> antes de la primera línea de código; las horas son agregación SQL, no bucle en Python. 58 pruebas en CI, más la verificación de que ningún modelo quedó sin migración.',
    'be.projetos3': 'Antes de ellos vinieron <a href="https://github.com/madeiragab/social-network">Social Network</a> (dominio en UML antes del código, reglas garantizadas por constraints en la base) y <a href="https://github.com/madeiragab/rpg-panel">RPG Panel</a> (control de acceso por roles).',

    'stack.eyebrow': '/* mi stack */ <span class="red">lenguajes, herramientas e infra</span>',
    'stack.titulo': 'LAS TECNOLOGÍAS DETRÁS DE MIS PROYECTOS.',
    'stack.desc': 'De lenguajes a bases de datos — lo que uso a diario para construir, documentar y publicar. Cada ítem apunta a dónde se usa la tecnología.',
    'skill.apis': '▸ APIs REST',
    'skill.hardware': '▸ Linux / Hardware',
    'skill.onde.python': 'Backend de <a href="https://github.com/madeiragab/rastro">Rastro</a> (FastAPI) y de <a href="https://github.com/madeiragab/geicis-ponto">GEICIS Ponto</a> (Django); simulador del <a href="https://github.com/madeiragab/tcc-simulador-ia">TFG</a>, con +14.000 partidas medidas.',
    'skill.onde.django': '<a href="https://github.com/madeiragab/geicis-ponto">GEICIS Ponto</a> — 58 pruebas en CI — y <a href="https://github.com/madeiragab/social-network">Social Network</a>, con el dominio modelado en UML antes del código.',
    'skill.onde.postgres': 'La geocerca de <a href="https://github.com/madeiragab/rastro">Rastro</a> es <code>ST_Contains</code> más distancia en <code>geography</code>: la regla corre en la base, y el CI prueba contra PostGIS de verdad.',
    'skill.onde.apis': 'Contrato cerrado en <code>docs/</code> antes del código en los dos sistemas; autenticación con Argon2id y rotación de refresh token en <a href="https://github.com/madeiragab/rastro">Rastro</a>.',
    'skill.onde.docker': '<a href="https://github.com/madeiragab/rastro">Rastro</a> levanta entero con <code>docker compose up</code>; el CI además construye las imágenes de producción en cada push.',
    'skill.onde.js': 'Front mobile-first de <a href="https://github.com/madeiragab/rastro">Rastro</a> en TypeScript; React en <a href="https://github.com/madeiragab/geicis-ponto">GEICIS Ponto</a>; este sitio es JS puro, sin framework.',
    'skill.onde.godot': 'Entorno de simulación del <a href="https://github.com/madeiragab/tcc-simulador-ia">TFG</a>, donde los agentes de IA juegan y son medidos.',
    'skill.onde.hardware': 'Autopsia del <a href="https://github.com/madeiragab/darkos-ga36-port">GA36-MB</a>: consola clon que miente sobre su propio hardware, documentada por puerto serie.',

    'jornada.eyebrow': '/* trayectoria */ <span class="red">ciencias de la computación</span>',
    'jornada.titulo': 'MI TRAYECTORIA HASTA AQUÍ.',
    'tl0.quando': '2026 — AHORA',
    'tl0.titulo': 'Prácticas — reforma del Laboratorio de Redes',
    'tl0.desc': 'Becario en el Laboratorio de Redes de Computadoras del IFSulDeMinas — Campus Muzambinho, en un proyecto de reforma para volver a poner en funcionamiento un laboratorio que estaba abandonado.',
    'tl1.quando': '2026',
    'tl1.titulo': 'Tesis: simulador táctico de IA',
    'tl1.desc': 'Desarrollando en Godot un entorno de simulación para comparar estrategias de toma de decisiones de agentes de IA — con análisis de datos en Python.',
    'tl2.quando': '2025 — 2026',
    'tl2.titulo': 'Backend de verdad',
    'tl2.desc': 'De proyectos simples a sistemas completos: modelado de dominio con UML, autenticación, APIs REST con Django REST Framework y PostgreSQL. Social Network y RPG Panel son fruto de esta etapa.',
    'tl3.quando': '2024 — 2025',
    'tl3.titulo': 'Fundamentos + proyectos reales',
    'tl3.desc': 'Ciencias de la Computación en el IFSulDeMinas. Un juego por turnos en Pygame (Guns and Boots) y el hábito de documentar todo — hasta la ingeniería inversa de una consola portátil clon.',

    'contato.eyebrow': '/* contacto */ <span class="red">hablemos</span>',
    'contato.titulo': '¿TRABAJAMOS JUNTOS?',
    'contato.desc': '¿Tienes un proyecto en mente, una vacante o quieres charlar sobre backend y tecnología? Mándame un mensaje y respondo lo antes posible.',
    'form.nome': 'nombre',
    'form.email': 'email',
    'form.assunto': 'asunto',
    'form.msg': 'mensaje',
    'form.enviar': 'ENVIAR MENSAJE',
    'form.enviando': 'ENVIANDO…',
    'form.enviado': '✓ MENSAJE ENVIADO',

    'footer.1': 'DAROSA <span class="red">%</span> DEV BACKEND — construido con curiosidad y café.',
    'footer.2': '>_ proyectos cargados en vivo desde la API de GitHub',
  },
};

/* Descrições dos projetos por idioma, indexadas pelo nome do repositório.
   Se um projeto novo não estiver aqui, o site usa a descrição do GitHub. */
const DESCRICOES = {
  en: {
    'social-network': 'Backend-first social network: domain modeled in UML before any code, business rules on the server and full documentation.',
    'rpg-panel': 'Private web panel for managing tabletop RPG campaigns — campaigns, characters, inventory and master/player roles.',
    'tcc-simulador-ia': 'Tactical simulator (thesis) for evaluating the strategic quality of AI agents in decision-making environments.',
    'Guns-and-boots': 'Retro-futuristic 2D turn-based game, with a state machine, save system and mobile mode.',
    'darkos-ga36-port': 'Autopsy, preservation and documentation of a clone handheld console (GA36-MB / Allwinner A33).',
  },
  es: {
    'social-network': 'Red social backend-first: dominio modelado en UML antes del código, reglas de negocio en el servidor y documentación completa.',
    'rpg-panel': 'Panel web privado para gestionar campañas de rol de mesa — campañas, personajes, inventario y roles de máster/jugador.',
    'tcc-simulador-ia': 'Simulador táctico (tesis) para evaluar la calidad estratégica de agentes de IA en entornos de decisión.',
    'Guns-and-boots': 'Juego 2D retro-futurista por turnos, con máquina de estados, sistema de guardado y modo móvil.',
    'darkos-ga36-port': 'Autopsia, preservación y documentación de una consola portátil clon (GA36-MB / Allwinner A33).',
  },
};

/* ---------------------------------------------------------- */

function detectarIdioma() {
  const salvo = localStorage.getItem('idioma');
  if (salvo && IDIOMAS.includes(salvo)) return salvo;
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  return IDIOMAS.includes(nav) ? nav : IDIOMA_PADRAO;
}

let idiomaAtual = detectarIdioma();

/** Traduz uma chave, com substituição opcional de {variáveis}. */
function t(chave, vars) {
  let txt = (TEXTOS[idiomaAtual] && TEXTOS[idiomaAtual][chave])
    || TEXTOS[IDIOMA_PADRAO][chave]
    || chave;
  if (vars) {
    for (const k in vars) txt = txt.replaceAll(`{${k}}`, vars[k]);
  }
  return txt;
}

/** Descrição traduzida de um projeto, com fallback para a do GitHub. */
function descricaoProjeto(nomeRepo, descricaoOriginal) {
  const mapa = DESCRICOES[idiomaAtual];
  return (mapa && mapa[nomeRepo]) || descricaoOriginal;
}

/** Aplica o idioma a todo o HTML marcado com data-i18n*. */
function aplicarIdioma(lang) {
  if (lang && IDIOMAS.includes(lang)) {
    idiomaAtual = lang;
    localStorage.setItem('idioma', lang);
  }

  document.documentElement.lang = t('meta.lang');
  document.title = t('meta.title');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = t('meta.desc');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    el.alt = t(el.dataset.i18nAlt);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('ativo', btn.dataset.lang === idiomaAtual);
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === idiomaAtual));
  });

  window.dispatchEvent(new CustomEvent('idiomamudou', { detail: { idioma: idiomaAtual } }));
}

window.i18n = {
  get idioma() { return idiomaAtual; },
  t,
  descricaoProjeto,
  aplicar: aplicarIdioma,
  IDIOMAS,
};
