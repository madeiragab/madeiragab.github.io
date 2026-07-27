> 🇧🇷 **Português** · 🇬🇧 [English](adicionar-projetos.en.md)

# Como adicionar (ou remover) um projeto do portfólio

O site https://madeiragab.github.io lista **todos os repositórios públicos do
usuário `madeiragab` que tenham o topic `portifolio`**. A lista vem da API do
GitHub em tempo real — nenhum código do site precisa ser alterado.

## Adicionar pelo site do GitHub (jeito fácil)

1. Abra o repositório que você quer exibir.
2. Na página inicial do repo, clique na **engrenagem ⚙** ao lado de *About*
   (canto superior direito).
3. No campo **Topics**, digite `portifolio` e confirme.
4. Aproveite e preencha também:
   - **Description** → é o texto que aparece no card do projeto;
   - **1 topic de categoria** (vira o filtro no site):

     | Topic | Filtro no site |
     |---|---|
     | `backend` | BACKEND |
     | `web` | WEB |
     | `game` | GAME |
     | `ai` | IA |
     | `hardware` | HARDWARE |
     | `tool` | FERRAMENTA |
     | `security` | SECURITY |
     | `mobile` | MOBILE |
     | `dashboard` | DASHBOARD |

   - **topics de tecnologia** (viram os chips do card): `python`, `django`,
     `postgresql`, `godot`, `pygame`, etc.
5. **Save changes.** Recarregue o site — o projeto já aparece.

> Sem topic de categoria, o card recebe a etiqueta genérica `PROJETO`.
> Sem description, aparece "Sem descrição (ainda!)".

## Adicionar pela API / linha de comando

Com o [GitHub CLI](https://cli.github.com/) autenticado:

```bash
gh repo edit madeiragab/NOME-DO-REPO --add-topic portifolio --add-topic backend --add-topic python --description "Descrição que aparece no card"
```

Ou direto na API REST:

```bash
gh api -X PUT repos/madeiragab/NOME-DO-REPO/topics -f "names[]=portifolio" -f "names[]=backend" -f "names[]=python"
```

## Remover um projeto do site

Basta remover o topic `portifolio` do repositório (mesma tela da engrenagem ⚙).

```bash
gh repo edit madeiragab/NOME-DO-REPO --remove-topic portifolio
```

## Observações

- Só repositórios **públicos** aparecem (a busca é feita sem autenticação no
  navegador do visitante).
- A ordem dos cards segue a **última atualização** do repositório (mais
  recente primeiro).
- Se a API do GitHub estiver com *rate limit* no navegador do visitante, o
  site usa o cache `data/projects.json` (regenerado todo dia às 12:34 pelo
  workflow) — por isso um projeto recém-adicionado pode demorar até 1 dia
  para aparecer para *alguns* visitantes.
- O nome exibido no card é o nome do repositório com `-` trocado por espaço.
