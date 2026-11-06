export interface Frequency {
  readonly word: string;
  readonly count: number;
}
export function wordFrequencies(text: string, minimum = 1): Frequency[] {
  if (typeof text !== 'string' || text.length > 1000000)
    throw new TypeError('Expected bounded text');
  if (!Number.isSafeInteger(minimum) || minimum < 1)
    throw new RangeError('Minimum count must be a positive safe integer');
  const counts = new Map<string, number>();
  for (const word of text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])
    counts.set(word, (counts.get(word) ?? 0) + 1);
  return [...counts]
    .filter(([, count]) => count >= minimum)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || (a.word < b.word ? -1 : a.word > b.word ? 1 : 0));
}
