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
      img.addEventListener("error", function () { img.remove(); });
      cover.appendChild(img);
    }

    var caption = document.createElement("figcaption");
    caption.className = "book-meta";
    caption.innerHTML = '<span class="bm-title"></span><span class="bm-sub"></span>';
    caption.querySelector(".bm-title").textContent = book.title || "";
    caption.querySelector(".bm-sub").textContent =
      [book.author, book.year].filter(Boolean).join(" · ");

    el.appendChild(cover);
    el.appendChild(caption);
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
      shelf.addEventListener("click", function () {
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
