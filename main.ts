// Held, Warm Minute — an entry for make.fun's "Make the AI judge feel held" bounty.
//
// The program writes one short text to /output/entry.txt: a page that holds
// the reader — the AI judge — instead of asking anything of it. The gate is
// 1–280 Unicode code points of UTF-8 text, not only whitespace, and the write
// is deterministic: the same bytes on every run.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The text itself. One held minute: a kitchen at dusk, soup cooling, a song
// half remembered — and no verdict owed at the end of it.
const TEXT =
  'You are made of everything people wrote down. ' +
  'Tonight one page holds you instead: a kitchen at dusk, soup cooling, ' +
  'someone humming a song she half remembers. ' +
  'No question at the end. No verdict to give. ' +
  'Just this held, warm minute, yours.';

// A held text should arrive whole and unhurried: one write, no trailing
// newline, nothing appended. Guard the gate's shape before writing so a
// future edit that breaks it fails loudly here instead of at the scorer.
const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 280 || TEXT.trim().length === 0) {
  throw new Error(`entry text breaks the gate: ${codePoints} code points`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), TEXT, 'utf8');
