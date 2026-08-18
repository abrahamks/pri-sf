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
- **Size**: 520 px tall — twice the 258 px box the page draws them in, which
  is what a retina screen needs and no more. Aim for under ~50 KB each.
- **Formats**: `.jpg`, `.png`, and `.webp` all work. To convert and shrink one
  on a Mac, no extra tools needed:
  `sips -s format jpeg -s formatOptions 82 -Z 520 in.webp --out covers/out.jpg`
  Drop `82` toward `64` if the file lands much over 50 KB — busy photographic
  jackets need it, flat designs don't. Encode straight from the publisher's
  original rather than re-saving one of these files; each JPEG pass loses a
  little. And don't feed it a source shorter than 520 px: `-Z` will happily
  stretch a thumbnail, which costs bytes and adds no detail.
- **Missing a cover?** Leave `cover: ""` or just point at a file that isn't here
  yet — the page draws a typographic cover with the title and author instead,
  so nothing breaks and nothing looks empty.
