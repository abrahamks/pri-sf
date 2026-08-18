/* ---------------------------------------------------------------------------
   THE BOOK LIST — this is the only file you need to edit to update the shelf.
   ---------------------------------------------------------------------------
   Every entry looks like this:

     {
       title:  "...",                    // required
       author: "...",                    // optional
       period: "...",                    // optional, e.g. "July - Aug 2026"
       link:   "https://...",            // optional; makes the cover clickable
       cover:  "covers/filename.jpg",    // optional; see covers/README.md
     }

   Newest first — the shelf scrolls in this order.

   If a cover file is missing or the field is left as "", the page draws a
   typographic cover from the title and author instead, so nothing breaks.
   Add or remove entries freely; the scroll speed adjusts to the list length.
--------------------------------------------------------------------------- */

const BOOKS = [
  {
    title:  "Praying with Paul: A Call to Spiritual Reformation",
    author: "D.A. Carson",
    period: "July - Aug 2026",
    link:   "https://www.amazon.com/Praying-Paul-Call-Spiritual-Reformation/dp/080109710X",
    cover:  "covers/01-praying-with-paul-a-call-to-spiritual-re.jpg",
  },
  {
    title:  "The Prodigal God",
    author: "Timothy Keller",
    period: "March - April 2026",
    link:   "https://timothykeller.com/books/the-prodigal-god",
    cover:  "covers/02-the-prodigal-god.jpg",
  },
  {
    title:  "Do You Believe? 12 Historic Doctrines to Change Your Everyday Life",
    author: "Paul Tripp",
    period: "Nov 2025 - March 2026",
    link:   "https://store.paultripp.com/products/do-you-believe-hardcover",
    cover:  "covers/03-do-you-believe-12-historic-doctrines-to-.jpg",
  },
  {
    title:  "Union with Christ: The Way to Know and Enjoy God",
    author: "Rankin Wilbourne",
    period: "July 2025 - August 2025",
    link:   "https://www.amazon.com/dp/1434709388?lv=shuf&channelId=500&plpRedirect=mhFallback",
    cover:  "covers/04-union-with-christ-the-way-to-know-and-en.jpg",
  },
  {
    title:  "Delighting in the Trinity: An Introduction to the Christian Faith",
    author: "Michael Reeves",
    period: "Jan 2025 - March 2025",
    link:   "https://www.amazon.com/dp/B009G00GYU?lv=shuf&channelId=500&plpRedirect=mhFallback",
    cover:  "covers/05-delighting-in-the-trinity-an-introductio.jpg",
  },
  {
    title:  "The Incarnation in the Gospels",
    author: "Richard D. Phillips, Philip Graham Ryken, Daniel M. Doriani",
    period: "December 2024",
    link:   "https://www.prpbooks.com/book/the-incarnation-in-the-gospels",
    cover:  "covers/06-the-incarnation-in-the-gospels.jpg",
  },
  {
    title:  "Transformative Friendships: 7 Questions to Deepen Any Relationship",
    author: "Brad Hambrick",
    period: "November 2024",
    link:   "https://www.amazon.com/dp/1645073335?lv=shuf&channelId=500&plpRedirect=mhFallback",
    cover:  "covers/07-transformative-friendships-7-questions-t.jpg",
  },
  {
    title:  "Confessing the Faith: A Reader's Guide to the Westminster Confession of Faith",
    author: "Chad Van Dixhoorn",
    period: "July - August 2024",
    link:   "https://www.wtsbooks.com/products/confessing-the-faith-a-readers-guide-to-the-westminster-confession-of-faith-chad-van-dixhoorn-9781848714045?srsltid=AfmBOorNLEk_aXAH-m6dU6_PzJ3a641YBxxm7q4TigvKL0XrKaEEvvqQ",
    cover:  "covers/08-confessing-the-faith-a-reader-s-guide-to.jpg",
  },
  {
    title:  "Ecclesiastes",
    author: "Douglas Sean O'Donnell",
    period: "June - October 2023",
    link:   "https://www.prpbooks.com/book/ecclesiastes",
    cover:  "covers/09-ecclesiastes.jpg",
  },
  {
    title:  "Making Faith Magnetic: Five Hidden Themes Our Culture Can't Stop Talking About... and How to Connect Them to Christ",
    author: "Daniel Strange",
    period: "May 2023",
    link:   "https://www.amazon.com/Making-Faith-Magnetic-Culture-Talking/dp/178498650X",
    cover:  "covers/10-making-faith-magnetic-five-hidden-themes.jpg",
  },
  {
    title:  "James",
    author: "Daniel M. Doriani",
    period: "September - December 2022",
    link:   "https://www.prpbooks.com/book/james",
    cover:  "covers/11-james.jpg",
  },
  {
    title:  "Precious Remedies Against Satan's Devices",
    author: "Thomas Brooks",
    period: "November 2021",
    link:   "https://puritanpaperbacks.com/puritan-paperbacks-set/precious-remedies-against-satans-devices",
    cover:  "covers/12-precious-remedies-against-satan-s-device.jpg",
  },
];
