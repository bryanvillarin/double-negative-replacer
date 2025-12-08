# Double Negative Replacer

A Tampermonkey userscript that automatically replaces double negatives with clearer alternatives on the webpage you're viewing.

## What It Does

Transforms needlessly complex phrases into simpler ones—making reading more direct and easier to understand.

## Features

- **Automatic replacement** - Runs 1 second after page load
- **Visual highlighting** - Replaced text appears in soft cream so you can see what changed
- **Hover tooltips** - Mouse over any replacement to see the original double negative
- **Skip tracking** - Shows how many double negatives were found in excluded areas (code blocks)
- **Notification display** - Brief 5-second notification shows replacement and skip counts
- **Code-aware** - Automatically skips code blocks with wavy orange underlines on skipped instances
- **Works everywhere** - Runs on any website
- **Manual trigger** - Press **Ctrl+Shift+D** to re-run on demand

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser
2. Click [here to install the script](https://github.com/bryanvillarin/double-negative-replacer/raw/main/double-negative-replacer.user.js)
3. Enable "Allow access to file URLs" in Chrome (optional, for local HTML files):
   - Go to `chrome://extensions/`
   - Find Tampermonkey → **Details**
   - Toggle **"Allow access to file URLs"** to ON

## Usage

### Automatic Mode

The script runs automatically 1 second after any page loads. If double negatives are found, you'll see:
- A centered notification showing replacement and skip counts
- Highlighted text where replacements occurred
- Orange wavy underlines in code blocks for skipped instances

### Manual Trigger

Press **Ctrl+Shift+D** anywhere on the page to re-run the replacement.

### View Details

- **Replaced words** appear highlighted in soft cream (#F5F1E1)
- **Hover over** any highlighted word to see the original text
- **Skipped instances** in code blocks have orange wavy underlines (#FAA754)

### Reset

Simply refresh the page—all changes are temporary and visual only.

## Color Palette

The script uses muted, accessible colors:

- **Replaced highlights:** Soft cream (#F5F1E1)
- **Replaced badge:** Soft cream (#F5F1E1) with dark brown text
- **Skipped badge:** Peachy tone (#F7DCC6) with dark brown text
- **Skipped underlines:** Bright orange wavy (#FAA754)
- **Notification background:** Soft green (#E6F2E8)

## Supported Patterns

The script currently replaces these 19 double negatives:

| Double Negative | Simple Alternative |
|----------------|-------------------|
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
| unclear | clear |
| don't disagree | agree |
| don't not | do |
| not wrong | right |
| not unsalvagable | salvageable |
| won't not | will |
| not infrequently | frequently |
| wouldn't disagree | agree |
| did not go unnoticed | people noticed |

## Technical Details

- **Version:** 1.0
- **Works on:** All websites and local HTML files
- **Excludes:** Code blocks (`<pre>`, `<code>`, code-related classes, WordPress.com intralink content)
- **Non-destructive:** Changes are visual only—refresh to restore original text
- **No tracking:** Script runs entirely locally, sends no data anywhere
- **Auto-updates:** Tampermonkey checks for updates from GitHub every 24 hours

## Debug Logging

The script logs replacement activity to the browser console. Open DevTools (F12) and check the Console tab to see:
- `[DNR] Replacement #X: original → replacement`
- Parent element information
- Text context around each replacement

This is helpful for troubleshooting or verifying what the script is doing.

## Why This Matters

Double negatives add cognitive load. They force readers to parse what's *not not* true instead of simply stating what *is* true. This script reveals the straightforward meaning hiding beneath hedged language—making communication clearer and more direct.

## Contributing

Found a double negative pattern that should be included? Have a suggestion? Open an issue or submit a pull request on [GitHub](https://github.com/bryanvillarin/double-negative-replacer).

## License

MIT License - feel free to use, modify, and share.

---

**Note:** This script modifies visible text only. It doesn't change the underlying HTML or send data anywhere. Refresh the page to restore original content.

**Developed by:** [Bryan Villarin](https://bryanvillarin.link)  
**Blog:** [All Narfed Up](https://allnarfedup.blog)