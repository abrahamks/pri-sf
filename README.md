# Persekutuan Reformed Indonesia San Francisco

The fellowship's landing page. Plain HTML, CSS, and JavaScript — no build step,
no dependencies, nothing to install. Open `index.html` in a browser and it runs.

```
index.html    the page itself (title, schedule, address, contact, about)
books.js      THE BOOK LIST — the file you'll edit most
videos.js     the Selected Teachings row
styles.css    colors, type, layout (all knobs are at the top)
script.js     builds both scrolling rows, assembles the email address
covers/       book cover images (see covers/README.md)
thumbs/       video thumbnails
favicon.svg   the little icon in the browser tab
```

## Updating the bookshelf

Open `books.js` and add an entry at the top of the list (newest first):

```js
{
  title:  "Knowing God",
  author: "J. I. Packer",
  period: "March - May 2019",
  link:   "https://www.ivpress.com/knowing-god",   // makes the cover clickable
  cover:  "covers/knowing-god.jpg",
},
```

Only `title` is required. Save the cover image into `covers/` and point `cover`
at it — see `covers/README.md` for the one-line command that resizes it. If the
file isn't there, the page draws a typographic cover from the title and author
instead, so the shelf never looks broken. Scroll speed adjusts on its own as
the list grows.

Covers are stored in this repo rather than hotlinked from publishers' sites, so
the shelf keeps working when those sites reorganize.

## Updating Selected Teachings

Open `videos.js`. Each talk needs at minimum the YouTube video id — the part
after `watch?v=` in the URL:

```js
{
  id:       "qbWpVCCGKxs",
  title:    "The Call to be in but not of the World",
  speaker:  "Pdt. Heru Lin",
  date:     "May 30, 2026",
  duration: "1:00:27",
  thumb:    "thumbs/06-the-call-to-be-in-but-not-of-the-world.jpg",
},
```

Thumbnails are saved in `thumbs/` rather than hotlinked from YouTube. To grab
one for a new video:

```sh
curl -sL -o /tmp/t.jpg https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg
sips -s format jpeg -s formatOptions 80 -Z 632 /tmp/t.jpg --out thumbs/my-talk.jpg
```

Leave `thumb` as `""` and the card still works — it just shows a plain panel
where the image would be.

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
