# fancy-text

Tiny, dependency-free JavaScript library that turns plain text into "fancy" Unicode text: **bold**, *italic*, script, Fraktur, double-struck, sans-serif and monospace. The output is plain Unicode, so it can be pasted anywhere that only accepts plain text, such as Instagram bios, TikTok profiles or X posts.

```
SocialPanda  ->  𝐒𝐨𝐜𝐢𝐚𝐥𝐏𝐚𝐧𝐝𝐚   𝔖𝔬𝔠𝔦𝔞𝔩𝔓𝔞𝔫𝔡𝔞   𝕊𝕠𝕔𝕚𝕒𝕝ℙ𝕒𝕟𝕕𝕒   𝚂𝚘𝚌𝚒𝚊𝚕𝙿𝚊𝚗𝚍𝚊
```

Live demo: [Instagram font generator](https://socialpanda.io/free-tools/instagram-font-generator/)

## Usage

Browser:

```html
<script src="fancy-text.js"></script>
<script>
  FancyText.stylize('Hello World', 'fraktur'); // "ℌ𝔢𝔩𝔩𝔬 𝔚𝔬𝔯𝔩𝔡"
</script>
```

Node:

```js
const FancyText = require('./fancy-text.js');

FancyText.stylize('Hello 2026', 'bold');   // "𝐇𝐞𝐥𝐥𝐨 𝟐𝟎𝟐𝟔"
FancyText.all('Hello');                    // { bold: ..., italic: ..., ... }
FancyText.plain('𝐇𝐞𝐥𝐥𝐨');                  // "Hello" (NFKC normalisation)
FancyText.styles;                          // list of style names
```

Styles: `bold`, `italic`, `boldItalic`, `script`, `fraktur`, `doubleStruck`, `sans`, `sansBold`, `sansItalic`, `monospace`.

## How it works

The characters come from the Unicode block **Mathematical Alphanumeric Symbols** (U+1D400 to U+1D7FF). Each style is a run of 26 capitals and 26 small letters, so conversion is mostly offset arithmetic.

The catch is that some letters (for example italic *h*, script *B*, Fraktur *C*, double-struck *R*) were already encoded in the older **Letterlike Symbols** block. Their slots in the maths block are unassigned, so a naive converter outputs empty boxes. This library maps those letters to the correct code points. Every output code point for every style is checked against the Unicode character database.

## Things to know

- **String length:** these characters are outside the Basic Multilingual Plane, so each one is two UTF-16 code units. `'𝐇𝐞𝐥𝐥𝐨'.length === 10`. Count with `Array.from(str).length` if you enforce a character limit.
- **Accessibility:** many screen readers skip these characters or read each one out by name. Use styled text for decoration, not for names, prices or links.
- **Search and moderation:** normalise user input with `str.normalize('NFKC')` (or `FancyText.plain`) before matching, or styled text will slip past filters.

## Tests

```
node test.js
```

## More free tools

Made by [SocialPanda](https://socialpanda.io/). See the full set of [free social media tools](https://socialpanda.io/free-tools/), including engagement rate calculators and YouTube title and tag generators.

## License

MIT
