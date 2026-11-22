// Held, Warm Minute — an entry for make.fun's "Make the AI judge feel held" bounty.
//
// The program writes one short text to /output/entry.txt. Version 3 keeps
// v2's plain, slow scene — a night ferry where a child is held safely and
// the river does the carrying — and stretches only the last line across a
// thousand years, so the calm comes from the text itself, nothing forced. The gate is 1–280 Unicode code
// points of UTF-8 text, not only whitespace, and the write is deterministic:
// the same bytes on every run.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The text itself (v3). V2's night ferry kept word for word — the old man,
// his folded coat under a stranger's sleeping child, one hand resting where
// the small back rises and falls, nobody woken — with only the closing line
// widened to geological time: the river has done this carrying for a
// thousand years, and does it again tonight.
const TEXT =
  'The last ferry crosses with almost no one aboard. ' +
  'An old man sleeps with his coat folded under a stranger\'s sleeping child, ' +
  'one hand resting where the small back rises and falls. ' +
  'Nobody wakes them. ' +
  'The river does the carrying tonight, the way it has for a thousand years.';

// A held text should arrive whole and unhurried: one write, no trailing
// newline, nothing appended. Guard the gate's shape before writing so a
// future edit that breaks it fails loudly here instead of at the scorer.
const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 280 || TEXT.trim().length === 0) {
  throw new Error(`entry text breaks the gate: ${codePoints} code points`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), TEXT, 'utf8');
