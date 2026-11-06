import * as api from '@lp-labs/word-frequency-index';
import { wordFrequencies } from '@lp-labs/word-frequency-index';
const top = wordFrequencies('Map map route', 1);
if (top[0]?.word !== 'map' || top[0].count !== 2) throw new Error('Unexpected counts');
// @ts-expect-error invalid argument must be rejected by declarations
api.wordFrequencies(4);
