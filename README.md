# Persekutuan Reformed Indonesia San Francisco

The fellowship's landing page. Plain HTML, CSS, and JavaScript — no build step,
no dependencies, nothing to install. Open `index.html` in a browser and it runs.

```
index.html    the page itself (title, schedule, address, contact)
books.js      THE BOOK LIST — the file you'll edit most
styles.css    colors, type, layout (all knobs are at the top)
script.js     builds the scrolling shelf, assembles the email address
covers/       cover images go here (see covers/README.md)
favicon.svg   the little icon in the browser tab
```

## Updating the bookshelf

Open `books.js` and edit the list. Each book is one line:

```js
{ title: "Knowing God", author: "J. I. Packer", year: "2019", cover: "covers/knowing-god.jpg" },
```

Only `title` is required. Drop the cover image into `covers/` and point `cover`
at it; if the file isn't there, the page draws a typographic cover from the
title and author instead, so the shelf never looks broken. The animation speed
adjusts automatically as you add books.

**The 12 entries currently in `books.js` are placeholders** — replace them with
the real books.

## Changing the details

Time, room, address, and contact address are all plain text in `index.html`,
under the "Time & Location" section. The email is assembled in `script.js` so it
isn't sitting in the HTML for scrapers to harvest; if the address changes, edit
the `user` and `domain` lines near the bottom of that file.

## Previewing locally

Double-clicking `index.html` works. To see it exactly as GitHub will serve it:

```sh
cd pri-sf-website
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publishing on GitHub Pages

Create an empty repository on GitHub first (no README, no .gitignore), then:

```sh
cd pri-sf-website
git init -b main
git add .
git commit -m "Initial site"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then in the repository on github.com: **Settings → Pages → Build and deployment**
→ Source: **Deploy from a branch** → Branch: **main**, folder: **/ (root)** → Save.

A minute or so later the site is live at
`https://<your-username>.github.io/<your-repo>/`.

Naming the repository `<your-username>.github.io` instead publishes it at
`https://<your-username>.github.io/` with no subfolder.

To publish later changes, just push again:

```sh
git add . && git commit -m "Update book list" && git push
```

### A custom domain (optional)

Add a file named `CNAME` containing only your domain (e.g. `prisf.org`), point
the domain's DNS at GitHub Pages, then set it under Settings → Pages.

---

`.nojekyll` tells GitHub to serve the files as-is instead of running them
through Jekyll. Leave it in place.
