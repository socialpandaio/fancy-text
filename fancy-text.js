/**
 * fancy-text: convert plain text to Unicode "Mathematical Alphanumeric Symbols"
 * (bold, italic, script, fraktur, double-struck, sans-serif bold, monospace).
 * Handles the code points that live in the Letterlike Symbols block.
 * MIT License - https://github.com/socialpandaio/fancy-text
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FancyText = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STYLES = {
    bold:         { upper: 0x1D400, lower: 0x1D41A, digit: 0x1D7CE },
    italic:       { upper: 0x1D434, lower: 0x1D44E },
    boldItalic:   { upper: 0x1D468, lower: 0x1D482 },
    script:       { upper: 0x1D49C, lower: 0x1D4B6 },
    fraktur:      { upper: 0x1D504, lower: 0x1D51E },
    doubleStruck: { upper: 0x1D538, lower: 0x1D552, digit: 0x1D7D8 },
    sans:         { upper: 0x1D5A0, lower: 0x1D5BA, digit: 0x1D7E2 },
    sansBold:     { upper: 0x1D5D4, lower: 0x1D5EE, digit: 0x1D7EC },
    sansItalic:   { upper: 0x1D608, lower: 0x1D622 },
    monospace:    { upper: 0x1D670, lower: 0x1D68A, digit: 0x1D7F6 },
  };

  // Letters already encoded in the Letterlike Symbols block (U+2100-214F).
  // Their slots in the math block are unassigned, so we map them here.
  const HOLES = {
    italic:       { h: 0x210E },
    script:       { B: 0x212C, E: 0x2130, F: 0x2131, H: 0x210B, I: 0x2110,
                    L: 0x2112, M: 0x2133, R: 0x211B, e: 0x212F, g: 0x210A, o: 0x2134 },
    fraktur:      { C: 0x212D, H: 0x210C, I: 0x2111, R: 0x211C, Z: 0x2128 },
    doubleStruck: { C: 0x2102, H: 0x210D, N: 0x2115, P: 0x2119, Q: 0x211A,
                    R: 0x211D, Z: 0x2124 },
  };

  function stylize(text, style) {
    const s = STYLES[style];
    if (!s) throw new Error('Unknown style: ' + style);
    const holes = HOLES[style] || {};
    return Array.from(String(text), function (ch) {
      if (holes[ch]) return String.fromCodePoint(holes[ch]);
      const c = ch.codePointAt(0);
      if (c >= 65 && c <= 90) return String.fromCodePoint(s.upper + c - 65);
      if (c >= 97 && c <= 122) return String.fromCodePoint(s.lower + c - 97);
      if (c >= 48 && c <= 57 && s.digit) return String.fromCodePoint(s.digit + c - 48);
      return ch;
    }).join('');
  }

  function all(text) {
    const out = {};
    Object.keys(STYLES).forEach(function (k) { out[k] = stylize(text, k); });
    return out;
  }

  // Styled text -> plain text (NFKC folds the math letters back).
  function plain(text) { return String(text).normalize('NFKC'); }

  return { stylize: stylize, all: all, plain: plain, styles: Object.keys(STYLES) };
});
