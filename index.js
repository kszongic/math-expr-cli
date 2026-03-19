#!/usr/bin/env node
'use strict';

const ALLOWED = /^[\d\s+\-*/%.(),eE^&|~<>!?:a-zA-Z_]+$/;

const MATH_NAMES = new Set(Object.getOwnPropertyNames(Math));

function safeEval(expr) {
  if (!ALLOWED.test(expr)) {
    throw new Error('Invalid characters in expression');
  }

  // Extract identifiers and verify they are Math properties
  const ids = expr.match(/[a-zA-Z_]\w*/g) || [];
  for (const id of ids) {
    if (id === 'Math' || id === 'e' || id === 'E') continue;
    if (!MATH_NAMES.has(id)) {
      throw new Error(`Unknown identifier: ${id}`);
    }
  }

  // Build a safe context with Math functions exposed
  const ctx = {};
  for (const name of MATH_NAMES) {
    ctx[name] = Math[name];
  }
  // Aliases
  ctx.e = Math.E;

  const keys = Object.keys(ctx);
  const vals = keys.map(k => ctx[k]);

  // Remove "Math." prefixes so both sqrt(4) and Math.sqrt(4) work
  let sanitized = expr.replace(/Math\./g, '');

  const fn = new Function(...keys, `"use strict"; return (${sanitized});`);
  return fn(...vals);
}

function usage() {
  console.log(`Usage: math-expr <expression> [expression...]

Evaluate math expressions from the command line.

Examples:
  math-expr '2 + 2'          # 4
  math-expr '3 * (4 + 5)'    # 27
  math-expr 'sqrt(144)'      # 12
  math-expr '2 ** 10'        # 1024
  math-expr 'PI * 2'         # 6.283185...
  math-expr 'sin(PI / 2)'   # 1
  math-expr 'log2(256)'     # 8

Supports: + - * / % ** parentheses, and all Math.* functions/constants.
Pipe: echo '1+1' | math-expr`);
}

function evaluate(expr) {
  expr = expr.trim();
  if (!expr) return;
  try {
    const result = safeEval(expr);
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
  }
}

const args = process.argv.slice(2);

if (args.includes('-h') || args.includes('--help')) {
  usage();
  process.exit(0);
}

if (args.length > 0) {
  for (const a of args) evaluate(a);
} else if (!process.stdin.isTTY) {
  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => data += chunk);
  process.stdin.on('end', () => {
    for (const line of data.split('\n')) evaluate(line);
  });
} else {
  usage();
}
