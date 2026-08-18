/* Builds the two scrolling rows — books (books.js) and talks (videos.js) —
   and assembles the contact address at runtime so it is not sitting in the
   HTML for scrapers. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches;

  /* --- the shared marquee ------------------------------------------------ */

  /* Fills one row: renders every item, then a second identical copy so the
     CSS animation can shift by exactly one copy's width and loop seamlessly.
     `seconds` is per item, so a longer list scrolls at the same speed rather
     than the same duration. */
  function buildRow(shelfId, trackId, items, render, seconds) {
    var track = document.getElementById(trackId);
    var shelf = document.getElementById(shelfId);
    if (!track || !shelf || !items.length) return;

    var frag = document.createDocumentFragment();
    items.forEach(function (item) { frag.appendChild(render(item, false)); });

    if (!reduceMotion) {
      items.forEach(function (item) { frag.appendChild(render(item, true)); });
      track.style.setProperty("--duration", (items.length * seconds) + "s");
    }
    track.appendChild(frag);

    // Touch devices have no hover: tap the row to pause or resume. Skipped
    // where hover works, so it cannot fight the CSS hover rule.
    if (!reduceMotion && !canHover) {
      shelf.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;  // tapping a card opens it instead
        var paused = track.style.animationPlayState === "paused";
        track.style.animationPlayState = paused ? "running" : "paused";
      });
    }
  }

  // One list item per card, with the whole card as a single link.
  function card(className, link, label, duplicate) {
    var el = document.createElement("div");
    el.className = className;
    el.setAttribute("role", "listitem");
    if (duplicate) el.setAttribute("aria-hidden", "true");

    var frame;
    if (link) {
      frame = document.createElement("a");
      frame.href = link;
      frame.target = "_blank";
      frame.rel = "noopener noreferrer";
      frame.title = label;
      if (duplicate) frame.tabIndex = -1;  // don't tab through the copies
    } else {
      frame = document.createElement("div");
    }
    frame.className = className + "-frame";
    el.appendChild(frame);
    return { el: el, frame: frame };
  }

  function fill(parent, html, values) {
    parent.innerHTML = html;
    Object.keys(values).forEach(function (sel) {
      parent.querySelector(sel).textContent = values[sel] || "";
    });
  }

  /* --- books ------------------------------------------------------------- */

  // Stable per-title hue so a book keeps the same fallback color every visit.
  function hueFor(text) {
    var h = 0;
    for (var i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 360;
    // Skip the muddy yellow-green band; keep covers in blues/greens/reds.
    return (h % 300 + 190) % 360;
  }

  function renderBook(book, duplicate) {
    var c = card("book", book.link,
      book.title + (book.author ? " — " + book.author : ""), duplicate);

    var cover = document.createElement("div");
    cover.className = "book-cover";
    cover.style.setProperty("--hue", String(hueFor(book.title || "?")));

    var fallback = document.createElement("div");
    fallback.className = "book-fallback";
    fill(fallback,
      '<div class="fb-title"></div><div class="fb-rule"></div><div class="fb-author"></div>',
      { ".fb-title": book.title, ".fb-author": book.author });
    cover.appendChild(fallback);

    if (book.cover) {
      var img = document.createElement("img");
      img.src = book.cover;
      img.alt = "";           // decorative: the title is in the caption below
      img.loading = "lazy";
      img.decoding = "async";
      // No file there yet? Drop the image and let the typographic cover show.
      img.addEventListener("error", function () {
        img.remove();
        cover.classList.remove("has-image");
      });
      cover.classList.add("has-image");
      cover.appendChild(img);
    }

    var caption = document.createElement("div");
    caption.className = "book-meta";
    fill(caption,
      '<span class="bm-title"></span><span class="bm-author"></span><span class="bm-period"></span>',
      { ".bm-title": book.title, ".bm-author": book.author, ".bm-period": book.period });

    c.frame.appendChild(cover);
    c.frame.appendChild(caption);
    return c.el;
  }

  /* --- talks ------------------------------------------------------------- */

  function renderTalk(video, duplicate) {
    var link = video.id ? "https://www.youtube.com/watch?v=" + video.id : "";
    var c = card("talk", link,
      video.title + (video.speaker ? " — " + video.speaker : ""), duplicate);

    var thumb = document.createElement("div");
    thumb.className = "talk-thumb";

    if (video.thumb) {
      var img = document.createElement("img");
      img.src = video.thumb;
      img.alt = "";           // decorative: the title is in the card body
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", function () { img.remove(); });
      thumb.appendChild(img);
    }

    if (video.duration) {
      var dur = document.createElement("span");
      dur.className = "talk-duration";
      dur.textContent = video.duration;
      thumb.appendChild(dur);
    }

    var body = document.createElement("div");
    body.className = "talk-body";
    fill(body,
      '<span class="talk-title"></span><span class="talk-speaker"></span><span class="talk-date"></span>',
      { ".talk-title": video.title, ".talk-speaker": video.speaker, ".talk-date": video.date });

    c.frame.appendChild(thumb);
    c.frame.appendChild(body);
    return c.el;
  }

  /* --- go ---------------------------------------------------------------- */

  var books = (typeof BOOKS !== "undefined" && Array.isArray(BOOKS)) ? BOOKS : [];
  var videos = (typeof VIDEOS !== "undefined" && Array.isArray(VIDEOS)) ? VIDEOS : [];

  buildRow("shelf", "shelf-track", books, renderBook, 5.5);
  // Wider cards, so a little longer per item to keep both rows moving alike.
  buildRow("talks", "talks-track", videos, renderTalk, 9);

  /* --- contact ----------------------------------------------------------- */

  var contact = document.getElementById("contact-email");
  if (contact) {
    var user = "prisanfrancisco";
    var domain = "gmail.com";
    var link = document.createElement("a");
    link.href = "mailto:" + user + "@" + domain;
    link.textContent = user + "@" + domain;
    contact.textContent = "";
    contact.appendChild(link);
  }
})();
