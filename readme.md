# Double Negative Replacer

I kept catching myself reading sentences twice. "Not uncommon" means... common? My brain would stall, parse the double negative, then move on. Every single time.

So I built this [Tampermonkey](https://www.tampermonkey.net/) userscript. It runs on any webpage, finds double negatives, and swaps them for the straightforward version. Takes about 1 second after page load.

## Contents

* [What It Does](#what-it-does)
* [Installation](#installation)
* [How to Use It](#how-to-use-it)
* [Patterns It Catches](#patterns-it-catches)
* [Colors](#colors)
* [Quirks](#quirks)
* [Debug Logging](#debug-logging)
* [Why This Matters](#why-this-matters)
* [Contributing](#contributing)
* [Technical Bits](#technical-bits)
* [License](#license)

## What It Does

The script transforms hedged language into direct statements:

- "not uncommon" → **common**
- "don't disagree" → **agree**
- "not impossible" → **possible**

You'll see replaced text highlighted in soft cream. Hover over any replacement to see what it originally said. A small notification appears for five seconds showing how many swaps happened.

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
2. [Click here to install the script](https://github.com/bryanvillarin/double-negative-replacer/raw/main/double-negative-replacer.user.js).
3. *(Optional)* For local HTML files in Chrome:
   - Go to `chrome://extensions/`
   - Find Tampermonkey → **Details**
   - Toggle **"Allow access to file URLs"** to ON

That's it. Takes _maybe_ two minutes.

## How to Use It

### It runs automatically

Load any page. Wait one second. Done.

If double negatives exist, you'll see:

- Cream-colored highlights where replacements happened.
- Orange wavy underlines in code blocks. *(Skipped on purpose.)*
- A notification with the counts.

### Manual trigger

Press **Ctrl+Shift+D** to re-run anytime.

### See original text

Disable the script in Tampermonkey, then refresh. Changes are visual only—the underlying HTML stays untouched.

## Patterns It Catches

| Double Negative | Becomes |
| --- | --- |
| not uncommon | common |
| not insignificant | significant |
| not unimportant | important |
| not infrequent | frequent |
| not unlikely | likely |
| not unreasonable | reasonable |
| not impossible | possible |
| not unusual | usual |
| not unnecessary | necessary |
| not inconsiderable | considerable |
| don't disagree | agree |
| don't not | do |
| not wrong | right |
| not unsalvagable | salvageable |
| won't not | will |
| not infrequently | frequently |
| wouldn't disagree | agree |
| did not go unnoticed | people noticed |
| not unattractive | attractive |
| not unfamiliar | familiar |
| not unaware | aware |
| not without merit | has merit |
| not unconvincing | convincing |
| not unkind | kind |
| not unhappy | happy |
| not unpleasant | pleasant |
| not unlike | like |
| not unrelated | related |
| don't dislike | like |
| not displeased | pleased |
| not unwilling | willing |
| not unfair | fair |
| not untrue | true |
| not unintelligent | intelligent |
| not unpopular | popular |
| not unsurprising | expected |
| not unheard of | common |
| not uncomplicated | complicated |
| not uninformed | informed |
| not unsuccessful | successful |
| not unworthy | worthy |
| not indifferent | interested |
| not unimpressed | impressed |
| not inexperienced | experienced |
| not unsatisfied | satisfied |
| not unnoticed | noticed |
| not insensitive | sensitive |
| not incapable | capable |
| not unremarkable | remarkable |
| no reason not to | worth doing |
| should never not be | should always be |
| don't forget | remember |
| never not | always |
| wouldn't be unreasonable | would be reasonable |
| not unrealistic | realistic |

## Colors

Muted, accessible tones:

- **Replaced text:** Soft cream (`#F5F1E1`)
- **Skipped instances:** Orange wavy underline (`#FAA754`)
- **Notification:** Soft green (`#E6F2E8`)

## Quirks

Here's the thing—the script skips code blocks intentionally. You don't want it rewriting your `<pre>` or `<code>` elements. It also excludes `github.com` and `raw.githubusercontent.com` entirely *(otherwise it would mess with the script's own source code)*.

Also: changes are visual only. The underlying HTML stays untouched. Disable the script and refresh to see original text.

## Debug Logging

Open DevTools (F12) → Console tab. You'll see:

```
[DNR] Replacement #1: not uncommon → common
```

Plus parent element info and surrounding text context. Helpful for troubleshooting.

## Why This Matters

Double negatives add cognitive load. They force your brain to parse what's *not not* true instead of simply stating what *is* true.

It helps when reading articles in my desktop browser. Catches the hedged language that slows me down before I even notice I've re-read a sentence. 😎

## Contributing

Found a double negative pattern that should be included? Open an [issue](https://github.com/bryanvillarin/double-negative-replacer/issues) or submit a pull request.

## Technical Bits

- **Version:** 1.4.0
- **Patterns:** 55
- **Works on:** All websites and local HTML files *(except GitHub)*
- **No tracking:** Runs entirely locally, sends no data anywhere
- **Auto-updates:** Tampermonkey checks for updates based on your settings *(default: every 24 hours)*

## License

[MIT License](LICENSE) — use it, modify it, share it.

---

- **Developed by:** [Bryan Villarin](https://bryanvillarin.link)
- **Blog:** [All Narfed Up](https://allnarfedup.blog)
