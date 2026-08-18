# Book covers

Drop the cover images for the bookshelf in this folder, then point at them from
`../books.js`:

```js
{
  title:  "Knowing God",
  author: "J. I. Packer",
  period: "March - May 2019",
  link:   "https://www.ivpress.com/knowing-god",
  cover:  "covers/knowing-god.jpg",
}
```

Notes:

- **Names must match exactly**, including capitalization — GitHub Pages is
  case-sensitive even though macOS is not. Lowercase filenames with dashes are
  the safe habit: `covers/knowing-god.jpg`.
- **Shape**: anything. Every cover is displayed in the same fixed box and
  scaled to fit inside it, so nothing is cropped and nothing changes the
  layout — an unusually wide or tall jacket just sits on a thin mat.
- **Size**: ~370×560 px is plenty (the covers here are 560 px tall). Keep each
  file under ~100 KB so the page stays quick on phones.
- **Formats**: `.jpg`, `.png`, and `.webp` all work. To convert and shrink one
  on a Mac without extra tools:
  `sips -s format jpeg -s formatOptions 80 -Z 560 in.webp --out covers/out.jpg`
- **Missing a cover?** Leave `cover: ""` or just point at a file that isn't here
  yet — the page draws a typographic cover with the title and author instead,
  so nothing breaks and nothing looks empty.
