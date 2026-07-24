# Darosa.dev — Portfólio de Gabriel Madeira

> Portfólio pessoal em **preto, vermelho e branco**, com projetos carregados
> **automaticamente da API do GitHub** e atualização diária via GitHub Actions.

**Site no ar:** https://madeiragab.github.io

---

## ✨ Como funciona

O site é 100% estático (HTML + CSS + JavaScript puro, sem framework e sem build),
hospedado no **GitHub Pages**. Duas coisas o tornam "vivo":

1. **Projetos dinâmicos** — a seção *Projetos* busca na API do GitHub todos os
   repositórios do usuário `madeiragab` que tenham o topic **`portifolio`**.
   Adicionou o topic → o projeto aparece no site. Sem editar código.
2. **Atualização diária** — um workflow do GitHub Actions roda **todo dia às
   12:34 (horário de Brasília)**, busca os números reais de contribuição do
   GitHub, grava em `data/stats.json` + `data/projects.json` e commita a
   mudança. Isso mantém a seção *Contribuições em números* sempre atual.

## 📂 Estrutura do repositório

```text
/
├─ index.html                          → página única do portfólio
├─ css/
│  └─ style.css                        → tema preto/vermelho/branco + responsivo
├─ js/
│  ├─ i18n.js                          → traduções PT · EN · ES
│  └─ main.js                          → API do GitHub, filtros, tema, animações
├─ assets/
│  └─ favicon.svg                      → favicon ">_"
├─ data/                               → gerado automaticamente todo dia
│  ├─ stats.json                       → calendário de contribuições
│  └─ projects.json                    → cache dos projetos (fallback)
├─ scripts/
│  └─ update-stats.mjs                 → script que o workflow roda
├─ .github/workflows/
│  └─ atualizacao-diaria.yml           → agendamento diário (12:34 BRT)
└─ docs/
   └─ adicionar-projetos.md            → guia: como adicionar um projeto
```

## ➕ Como adicionar um projeto ao site

**Você não precisa mexer em nenhuma linha de código.**

1. Abra o repositório no GitHub.
2. Na página principal do repo, clique na engrenagem ⚙ ao lado de *About*.
3. Em **Topics**, adicione `portifolio`.
4. (Opcional, recomendado) Adicione também:
   - **1 topic de categoria** → vira o filtro no site:
     `backend`, `web`, `game`, `ai`, `hardware`, `tool`, `security`, `mobile`, `dashboard`
   - **topics de tecnologia** → viram os chips do card: `python`, `django`, `postgresql`…
   - **uma descrição** no campo *Description* → vira o texto do card.
5. Pronto. O site mostra o projeto no próximo carregamento da página.

Guia detalhado (com exemplos e API): [docs/adicionar-projetos.md](docs/adicionar-projetos.md)

## 🔄 A atualização diária (12:34)

Arquivo: [`.github/workflows/atualizacao-diaria.yml`](.github/workflows/atualizacao-diaria.yml)

- Roda no cron `34 15 * * *` (15:34 UTC = **12:34 em Brasília**).
- Executa [`scripts/update-stats.mjs`](scripts/update-stats.mjs), que:
  - busca o calendário de contribuições via **API GraphQL** do GitHub;
  - busca os repositórios com topic `portifolio` via **API REST**;
  - grava `data/stats.json` e `data/projects.json`.
- Commita as mudanças na branch `main` **com autoria de Gabriel Madeira**
  — commits na branch padrão com o seu e-mail contam no gráfico de
  contribuições, então a atualização diária também mantém o gráfico ativo.
  (PRs abertas por bot **não** contam como contribuição sua — por isso o
  workflow commita direto na `main` em vez de abrir PR.)
- Também pode ser executado manualmente: aba **Actions → Atualização diária
  do portfólio → Run workflow**.

## 📊 Seção "Contribuições em números"

Mostra: contribuições **hoje**, **este mês**, **último ano** e a **sequência
de dias seguidos** contribuindo.

Fontes de dados, em ordem de prioridade:

1. `data/stats.json` (gerado pelo workflow diário — dado oficial via GraphQL);
2. fallback: API pública `github-contributions-api.jogruber.de`.

## 🌍 Idiomas (PT · EN · ES)

O site inteiro troca de idioma pelo seletor no menu, sem recarregar a página.
Toda a tradução vive em [`js/i18n.js`](js/i18n.js).

- O idioma escolhido fica salvo no navegador (`localStorage`). Na primeira
  visita, o site detecta o idioma do navegador e cai no português se não for
  um dos três.
- O atributo `lang` do `<html>`, o `<title>` e a meta description também
  mudam — importante para buscadores e leitores de tela.
- As datas seguem o formato de cada idioma (`24/07/2026`, `7/24/2026`,
  `24/7/2026`).

### Como traduzir um texto novo

1. No HTML, marque o elemento com um destes atributos:

   | Atributo | O que troca |
   |---|---|
   | `data-i18n` | o texto do elemento |
   | `data-i18n-html` | o HTML interno (textos com `<strong>`, `<span>`) |
   | `data-i18n-ph` | o `placeholder` |
   | `data-i18n-aria` | o `aria-label` |
   | `data-i18n-alt` | o `alt` de imagens |

2. Adicione a chave nos três idiomas em `js/i18n.js`, dentro de `TEXTOS`.

Se uma chave faltar em algum idioma, o site usa o texto em português em vez
de quebrar.

### Descrição dos projetos

Os cards vêm da API do GitHub, então a descrição original é a do repositório
(em português). Para exibir uma versão traduzida, adicione o nome do
repositório no objeto `DESCRICOES` em `js/i18n.js`, em `en` e `es`. Projeto
sem tradução cadastrada aparece com a descrição do GitHub mesmo — nada
quebra.

## ✉️ Formulário de contato

O formulário envia e-mail de verdade para `gabrielmadeira1504@gmail.com` usando o
[FormSubmit](https://formsubmit.co) (gratuito, sem conta, sem backend).

- **Ativação (uma única vez):** no primeiro envio, o FormSubmit manda um e-mail
  de confirmação para o seu Gmail — clique em **Activate** e pronto; a partir
  daí toda mensagem do site chega na sua caixa de entrada.
- Se o serviço estiver fora do ar, o site abre o cliente de e-mail do visitante
  (`mailto:`) como plano B.
- Para trocar o destino, edite a constante `FORM_ENDPOINT` em `js/main.js`.

## 🎨 Personalização

| O quê | Onde |
|---|---|
| Cores do tema | Variáveis CSS em `css/style.css` (`:root` e `[data-theme="light"]`) |
| Usuário do GitHub | Constante `GH_USER` em `js/main.js` e env `GH_USER` no workflow |
| Topic que define o que aparece | Constante `GH_TOPIC` em `js/main.js` |
| Categorias de filtro | Objeto `CATEGORIAS` em `js/main.js` |
| Textos (bio, jornada, skills) | `js/i18n.js` — nos três idiomas |
| Adicionar um idioma novo | `IDIOMAS` + um bloco em `TEXTOS` (`js/i18n.js`) e um botão no menu |
| Horário da atualização diária | Campo `cron` do workflow (em UTC!) |
| Foto de perfil | `index.html` usa o avatar do GitHub — troque a URL da `<img>` na seção Sobre |

## 🖥️ Rodando localmente

Por causa do `fetch()` dos arquivos JSON, abra com um servidor local
(não com duplo clique no arquivo):

```bash
python -m http.server 8000
```

Depois acesse http://localhost:8000.

## 🧰 Stack do site

- HTML5 + CSS3 (variáveis, grid, `color-mix`) + JavaScript vanilla
- API REST e GraphQL do GitHub
- GitHub Actions (cron diário) + GitHub Pages
- Fontes: JetBrains Mono + Archivo (Google Fonts)

---

Feito com curiosidade e café por **Gabriel Madeira** ·
[github.com/madeiragab](https://github.com/madeiragab) ·
gabrielmadeira1504@gmail.com
