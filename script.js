/* Builds the scrolling bookshelf from BOOKS (see books.js) and assembles the
   contact address at runtime so it is not sitting in the HTML for scrapers. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- bookshelf --------------------------------------------------------- */

  var track = document.getElementById("shelf-track");
  var books = (typeof BOOKS !== "undefined" && Array.isArray(BOOKS)) ? BOOKS : [];

  // Stable per-title hue so a book keeps the same fallback color every visit.
  function hueFor(text) {
    var h = 0;
    for (var i = 0; i < text.length; i++) {
      h = (h * 31 + text.charCodeAt(i)) % 360;
    }
    // Skip the muddy yellow-green band; keep covers in blues/greens/reds.
    return (h % 300 + 190) % 360;
  }

  function makeBook(book, duplicate) {
    var el = document.createElement("figure");
    el.className = "book";
    el.setAttribute("role", "listitem");
    if (duplicate) el.setAttribute("aria-hidden", "true");

    // A book with a link becomes one clickable card; without one it is a plain
    // div, so nothing focusable is added for a link that does not exist.
    var frame;
    if (book.link) {
      frame = document.createElement("a");
      frame.className = "book-frame";
      frame.href = book.link;
      frame.target = "_blank";
      frame.rel = "noopener noreferrer";
      frame.title = book.title + (book.author ? " — " + book.author : "");
      if (duplicate) frame.tabIndex = -1;  // don't tab through the copies
    } else {
      frame = document.createElement("div");
      frame.className = "book-frame";
    }

    var cover = document.createElement("div");
    cover.className = "book-cover";
    cover.style.setProperty("--hue", hueFor(book.title || "?"));

    var fallback = document.createElement("div");
    fallback.className = "book-fallback";
    fallback.innerHTML =
      '<div class="fb-title"></div><div class="fb-rule"></div><div class="fb-author"></div>';
    fallback.querySelector(".fb-title").textContent = book.title || "";
    fallback.querySelector(".fb-author").textContent = book.author || "";
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

    var caption = document.createElement("figcaption");
    caption.className = "book-meta";
    caption.innerHTML =
      '<span class="bm-title"></span><span class="bm-author"></span><span class="bm-period"></span>';
    caption.querySelector(".bm-title").textContent = book.title || "";
    caption.querySelector(".bm-author").textContent = book.author || "";
    caption.querySelector(".bm-period").textContent = book.period || "";

    frame.appendChild(cover);
    frame.appendChild(caption);
    el.appendChild(frame);
    return el;
  }

  if (track && books.length) {
    var frag = document.createDocumentFragment();
    books.forEach(function (b) { frag.appendChild(makeBook(b, false)); });

    if (!reduceMotion) {
      // Second copy makes the loop seamless: the animation shifts by exactly
      // one copy's width, so the duplicate lands where the original started.
      books.forEach(function (b) { frag.appendChild(makeBook(b, true)); });
      track.style.setProperty("--duration", (books.length * 5.5) + "s");
    }

    track.appendChild(frag);

    // Touch devices have no hover: tap the shelf to pause or resume.
    // Skipped where hover works, so it cannot fight the CSS hover rule.
    var shelf = document.getElementById("shelf");
    if (shelf && !reduceMotion && !window.matchMedia("(hover: hover)").matches) {
      shelf.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;  // tapping a cover opens the book
        var paused = track.style.animationPlayState === "paused";
        track.style.animationPlayState = paused ? "running" : "paused";
      });
    }
  }

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
