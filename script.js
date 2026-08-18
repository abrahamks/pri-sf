/* Builds the two scrolling rows — books (books.js) and talks (videos.js) —
   and assembles the contact address at runtime so it is not sitting in the
   HTML for scrapers. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches;

  /* --- the shared marquee ------------------------------------------------ */

  /* Each row is a real scroll container holding three identical copies of the
     list, parked on the middle one. A rAF loop nudges scrollLeft along; when
     it drifts a whole copy in either direction we jump it back by one copy,
     which is invisible because every copy is identical. Because the motion is
     scroll position rather than a transform, touch drag, momentum, trackpad
     swipe, and shift+wheel all work for free — the loop just gets out of the
     way while the reader is doing it themselves. */

  var COPIES = 3;
  var IDLE_MS = 1200;   // how long after a swipe before the drift resumes

  function buildRow(shelfId, trackId, items, render, pxPerSecond) {
    var track = document.getElementById(trackId);
    var shelf = document.getElementById(shelfId);
    if (!track || !shelf || !items.length) return;

    var copies = reduceMotion ? 1 : COPIES;
    var frag = document.createDocumentFragment();
    for (var c = 0; c < copies; c++) {
      items.forEach(function (item) { frag.appendChild(render(item, c > 0)); });
    }
    track.appendChild(frag);
    if (reduceMotion) return;   // still swipeable, just never moves on its own

    var cards = track.children;
    var copyW = 0;
    var pos = 0;          // our own float position; scrollLeft rounds
    var applied = 0;      // what we last wrote, to spot the reader moving it
    var userUntil = 0;    // drift stays off until this timestamp
    var visible = true;

    // Exact width of one copy, gap included, straight from the layout. Only
    // jumps back to the middle copy when the layout actually changed under us;
    // otherwise it would yank the row out from under someone mid-read.
    function measure(recentre) {
      var w = cards[items.length].offsetLeft - cards[0].offsetLeft;
      if (!w) return;
      copyW = w;
      if (recentre || pos < 0 || pos > copyW * 2) {
        pos = copyW;
        shelf.scrollLeft = pos;
        applied = shelf.scrollLeft;
      }
    }

    // Keep the reader near the middle copy so there is always runway to swipe
    // either way. Never do this mid-flick — it would kill the momentum.
    function wrap() {
      if (!copyW) return;
      if (pos >= copyW * 2) pos -= copyW;
      else if (pos <= 0) pos += copyW;
      else return;
      shelf.scrollLeft = pos;
      applied = shelf.scrollLeft;
    }

    var last = 0;
    function tick(now) {
      requestAnimationFrame(tick);
      var dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      if (!copyW) return;

      // The reader scrolled, so take their position as the truth.
      if (Math.abs(shelf.scrollLeft - applied) > 1) pos = shelf.scrollLeft;

      var idle = now > userUntil;
      if (idle && visible && !document.hidden && !hovered && !focused) {
        pos += pxPerSecond * dt;
        shelf.scrollLeft = pos;
        applied = shelf.scrollLeft;
      }
      if (idle) wrap();   // only once the flick has settled
    }

    var hovered = false;
    var focused = false;

    if (canHover) {
      shelf.addEventListener("pointerenter", function (e) {
        if (e.pointerType === "mouse") hovered = true;
      });
      shelf.addEventListener("pointerleave", function () { hovered = false; });
    }
    shelf.addEventListener("focusin", function () { focused = true; });
    shelf.addEventListener("focusout", function () { focused = false; });

    // Any hands-on scrolling — drag, flick, wheel — holds the drift off.
    function hold() { userUntil = performance.now() + IDLE_MS; }
    shelf.addEventListener("pointerdown", hold);
    shelf.addEventListener("touchstart", hold, { passive: true });
    shelf.addEventListener("wheel", hold, { passive: true });
    shelf.addEventListener("scroll", function () {
      if (Math.abs(shelf.scrollLeft - applied) > 1) hold();
    }, { passive: true });

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(shelf);
    }

    measure(true);
    // Card widths are fixed in CSS, so images loading can't shift the row —
    // but fonts and a breakpoint change can, so re-measure on both.
    window.addEventListener("load", function () { measure(false); });
    window.addEventListener("resize", function () { measure(true); });
    requestAnimationFrame(tick);
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

  // px per second; the talks row runs backwards so the two rows counter-drift
  buildRow("shelf", "shelf-track", books, renderBook, 34);
  buildRow("talks", "talks-track", videos, renderTalk, -34);

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
