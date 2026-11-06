import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('counts repeated words independent of case', () => {
  assert.deepEqual(api.wordFrequencies('Map map MAP'), [{ word: 'map', count: 3 }]);
});
test('orders equal counts lexically', () => {
  assert.deepEqual(api.wordFrequencies('z a b'), [
    { word: 'a', count: 1 },
    { word: 'b', count: 1 },
    { word: 'z', count: 1 },
  ]);
});
test('supports Unicode letters', () => {
  assert.equal(api.wordFrequencies('café CAFÉ')[0].count, 2);
});
test('filters below minimum', () => {
  assert.deepEqual(api.wordFrequencies('a b b', 2), [{ word: 'b', count: 2 }]);
});
test('ignores punctuation-only text', () => {
  assert.deepEqual(api.wordFrequencies('... !'), []);
});
test('rejects zero minimum', () => {
  assert.throws(() => api.wordFrequencies('a', 0), RangeError);
});
