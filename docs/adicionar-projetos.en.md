> 🇧🇷 [Português](adicionar-projetos.md) · 🇬🇧 **English**

# How to add (or remove) a project from the portfolio

The site https://madeiragab.github.io lists **every public repository owned by the user `madeiragab` that carries the `portifolio` topic**. The list comes from the GitHub API in real time — no site code needs to change.

## Adding through the GitHub website (the easy way)

1. Open the repository you want to show.
2. On the repo's home page, click the **gear ⚙** next to *About* (top right).
3. In the **Topics** field, type `portifolio` and confirm.
4. While you're there, fill in:
   - **Description** → this is the text shown on the project card;
   - **1 category topic** (becomes the filter on the site):

     | Topic | Filter on the site |
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

   - **technology topics** (become the card's chips): `python`, `django`, `postgresql`, `godot`, `pygame`, etc.
5. **Save changes.** Reload the site — the project is already there.

> Without a category topic, the card gets the generic `PROJETO` label.
> Without a description, it shows "Sem descrição (ainda!)".

## Adding through the API / command line

With the [GitHub CLI](https://cli.github.com/) authenticated:

```bash
gh repo edit madeiragab/REPO-NAME --add-topic portifolio --add-topic backend --add-topic python --description "Description shown on the card"
```

Or straight through the REST API:

```bash
gh api -X PUT repos/madeiragab/REPO-NAME/topics -f "names[]=portifolio" -f "names[]=backend" -f "names[]=python"
```

## Removing a project from the site

Just remove the `portifolio` topic from the repository (same gear ⚙ screen).

```bash
gh repo edit madeiragab/REPO-NAME --remove-topic portifolio
```

## Notes

- Only **public** repositories show up (the query runs unauthenticated in the visitor's browser).
- Card order follows the repository's **last update** (most recent first).
- If the GitHub API is rate-limiting the visitor's browser, the site falls back to the `data/projects.json` cache (regenerated every day at 12:34 by the workflow) — so a freshly added project may take up to a day to appear for *some* visitors.
- The name shown on the card is the repository name with `-` replaced by spaces.
