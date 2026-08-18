/* ---------------------------------------------------------------------------
   THE BOOK LIST — this is the only file you need to edit to update the shelf.
   ---------------------------------------------------------------------------
   Every entry looks like this:

     { title: "...", author: "...", year: "...", cover: "covers/filename.jpg" }

   - title  : required. Shown on the fallback cover and under the book.
   - author : optional.
   - year   : optional. The year (or range) your group studied it.
   - cover  : optional. Path to a cover image inside the covers/ folder.
              If the file is missing or the field is left as "", the page
              draws a typographic cover automatically — nothing breaks.

   Add or remove entries freely; the animation adjusts to the list length.

   The entries below are PLACEHOLDERS. Replace them with the real books.
--------------------------------------------------------------------------- */

const BOOKS = [
  { title: "Book #1",  author: "Author", year: "2016", cover: "covers/book-01.jpg" },
  { title: "Book #2",  author: "Author", year: "2017", cover: "covers/book-02.jpg" },
  { title: "Book #3",  author: "Author", year: "2017", cover: "covers/book-03.jpg" },
  { title: "Book #4",  author: "Author", year: "2018", cover: "covers/book-04.jpg" },
  { title: "Book #5",  author: "Author", year: "2019", cover: "covers/book-05.jpg" },
  { title: "Book #6",  author: "Author", year: "2020", cover: "covers/book-06.jpg" },
  { title: "Book #7",  author: "Author", year: "2021", cover: "covers/book-07.jpg" },
  { title: "Book #8",  author: "Author", year: "2022", cover: "covers/book-08.jpg" },
  { title: "Book #9",  author: "Author", year: "2023", cover: "covers/book-09.jpg" },
  { title: "Book #10", author: "Author", year: "2024", cover: "covers/book-10.jpg" },
  { title: "Book #11", author: "Author", year: "2025", cover: "covers/book-11.jpg" },
  { title: "Book #12", author: "Author", year: "2026", cover: "covers/book-12.jpg" },
];
