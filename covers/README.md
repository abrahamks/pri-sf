# Book covers

Drop the cover images for the bookshelf in this folder, then point at them from
`../books.js`:

```js
{ title: "Knowing God", author: "J. I. Packer", year: "2019", cover: "covers/knowing-god.jpg" }
```

Notes:

- **Names must match exactly**, including capitalization — GitHub Pages is
  case-sensitive even though macOS is not. Lowercase filenames with dashes are
  the safe habit: `covers/knowing-god.jpg`.
- **Shape**: roughly 2:3 (portrait). Anything else is cropped to fill, centered.
- **Size**: ~400×600 px is plenty. Keep each file under ~200 KB so the page
  stays quick on phones.
- **Formats**: `.jpg`, `.png`, and `.webp` all work.
- **Missing a cover?** Leave `cover: ""` or just point at a file that isn't here
  yet — the page draws a typographic cover with the title and author instead,
  so nothing breaks and nothing looks empty.
