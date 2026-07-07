# 獨行道 — Dokkodo

_Dokkodo_ ("The Path of Aloneness") is a short text of twenty-one personal
precepts — a private code of conduct rather than a treatise on swordsmanship.
It has no plot, no explanation, just twenty-one blunt lines someone wrote for
themselves, meant to be read one at a time and sat with, not skimmed.

It was written by Miyamoto Musashi, the 17th-century Japanese swordsman and
author of _The Book of Five Rings_, who by most accounts never lost a duel in
over sixty recorded fights. He wrote Dokkodo about a week before he died in
1645, handing it to a favored student — less a legacy of technique than a
final accounting of how he'd chosen to live.

This project turns those twenty-one lines into a one-precept-at-a-time page:
one line on screen, a plain-language explanation underneath, and a handful of
different visual moods to read it in.

## Variants

| File                  | Look & feel                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `index.html`          | Washi paper scroll, vermilion hanko seal, warm ink tones         |
| `v2-sumi-night.html`  | Dark sumi-ink theme, moonlit gold text, crimson accent           |
| `v3-zen-paper.html`   | Minimal monochrome, quiet book-page layout, no seal or watermark |
| `v4-ukiyoe-bold.html` | Bold woodblock-print poster frame with a stamped seal            |

Open any of them directly in a browser — they all read from the same
`dokkodo-core.js`, so keep the files in the same folder.

## Features

- **One precept at a time**, presented like a page in a book rather than a scrolling list
- **Autoplay** advances every 9 seconds, shown as a thin progress bar
- **Read aloud** (🔊) narrates the Japanese line, then the English line, then the
  plain-language explanation, in order — autoplay waits for the narration to finish
  before moving on, rather than racing it on a fixed timer
- **Manual navigation** — click either side of the screen, swipe on mobile, use the
  arrow keys, or tap a dot in the progress rail
- **Mobile responsive** — scales down for small screens, uses proper touch-target
  sizes, respects safe-area insets on notched phones, and adapts to mobile browser
  chrome (`dvh` units)
- **Reduced motion respected** — animations are disabled if the OS/browser requests it

## A note on the text

Musashi's original 1645 manuscript is in the public domain, but published English
_translations_ are not. To keep this project clean of any copyrighted translation,
every Japanese line and English rendering here is an original short composition of
mine that captures the meaning of each precept — not a copy of any specific
published translation. The plain-language explanations underneath are likewise
original commentary.

## License

Do whatever you like with the code. The precepts themselves are a 380-year-old
public domain text; the specific wording and design here are original work.
