const assert = require('assert');
const F = require('./fancy-text.js');
const sample = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for (const st of F.styles) {
  const out = F.stylize(sample, st);
  assert.strictEqual(F.plain(out), F.plain(sample), st + ' round-trip');
}
assert.strictEqual(F.stylize('Hello World', 'fraktur'), 'ℌ𝔢𝔩𝔩𝔬 𝔚𝔬𝔯𝔩𝔡');
assert.strictEqual(F.plain(F.stylize('Hello 2026', 'bold')), 'Hello 2026');
console.log('all tests passed for', F.styles.length, 'styles');
