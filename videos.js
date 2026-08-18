/* ---------------------------------------------------------------------------
   SELECTED TEACHINGS — the video row. Edit this file to change what shows.
   ---------------------------------------------------------------------------
   Every entry looks like this:

     {
       id:       "qbWpVCCGKxs",       // the YouTube video id, required
       title:    "...",
       speaker:  "...",
       date:     "...",
       duration: "1:00:27",
       thumb:    "thumbs/filename.jpg",
     }

   The id is the part after "watch?v=" in the YouTube URL. It builds the link,
   so that is the only field the row truly needs.

   Thumbnails live in thumbs/ and are saved here rather than hotlinked from
   YouTube. To add one for a new video:

     curl -sL -o /tmp/t.jpg https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg
     sips -s format jpeg -s formatOptions 80 -Z 632 /tmp/t.jpg --out thumbs/my-talk.jpg

   Leave thumb as "" and the card falls back to a plain title card, same as the
   bookshelf does when a cover is missing.

   In series order, oldest first.
--------------------------------------------------------------------------- */

const VIDEOS = [
  {
    id:       "iG5ns1krG7E",
    title:    "The Call to be Human in an Inhuman World",
    speaker:  "Pdt. Heru Lin",
    date:     "April 25, 2026",
    duration: "1:21:14",
    thumb:    "thumbs/01-the-call-to-be-human-in-an-inhuman-world.jpg",
  },
  {
    id:       "MlSbrtq25_U",
    title:    "The Call to be Christ-like",
    speaker:  "Pdt. Heru Lin",
    date:     "May 2, 2026",
    duration: "1:19:41",
    thumb:    "thumbs/02-the-call-to-be-christ-like.jpg",
  },
  {
    id:       "CIWaXmmucwc",
    title:    "The Call to be Together",
    speaker:  "Pdt. Heru Lin",
    date:     "May 9, 2026",
    duration: "1:39:00",
    thumb:    "thumbs/03-the-call-to-be-together.jpg",
  },
  {
    id:       "J_aoiWk9sWM",
    title:    "The Call to be Church",
    speaker:  "Pdt. Heru Lin",
    date:     "May 16, 2026",
    duration: "1:33:29",
    thumb:    "thumbs/04-the-call-to-be-church.jpg",
  },
  {
    id:       "V_i8bv9gEdo",
    title:    "The Call to be Parents",
    speaker:  "Pdt. Heru Lin",
    date:     "May 23, 2026",
    duration: "1:30:44",
    thumb:    "thumbs/05-the-call-to-be-parents.jpg",
  },
  {
    id:       "qbWpVCCGKxs",
    title:    "The Call to be in but not of the World",
    speaker:  "Pdt. Heru Lin",
    date:     "May 30, 2026",
    duration: "1:00:27",
    thumb:    "thumbs/06-the-call-to-be-in-but-not-of-the-world.jpg",
  },
];
