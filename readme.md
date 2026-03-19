# @kszongic/math-expr-cli

> Evaluate math expressions from the command line. Zero dependencies.

[![npm version](https://img.shields.io/npm/v/@kszongic/math-expr-cli)](https://www.npmjs.com/package/@kszongic/math-expr-cli)
[![license](https://img.shields.io/npm/l/@kszongic/math-expr-cli)](./LICENSE)

## Install

```bash
npm install -g @kszongic/math-expr-cli
```

## Usage

```bash
math-expr '2 + 2'            # 4
math-expr '3 * (4 + 5)'      # 27
math-expr 'sqrt(144)'        # 12
math-expr '2 ** 10'          # 1024
math-expr 'PI * 2'           # 6.283185307179586
math-expr 'sin(PI / 2)'      # 1
math-expr 'log2(256)'        # 8
math-expr 'abs(-42)'         # 42
math-expr 'round(3.7)'       # 4
```

### Pipe support

```bash
echo '1 + 1' | math-expr     # 2
seq 1 5 | math-expr           # evaluates each line
```

### Multiple expressions

```bash
math-expr '2+2' '3+3' '4+4'  # 4, 6, 8 (one per line)
```

## Supported

- Arithmetic: `+` `-` `*` `/` `%` `**`
- Parentheses: `(` `)`
- All `Math.*` functions: `sqrt`, `sin`, `cos`, `tan`, `log`, `log2`, `log10`, `abs`, `ceil`, `floor`, `round`, `max`, `min`, `pow`, `random`, `trunc`, `sign`, `hypot`, `cbrt`, `exp`, ...
- All `Math.*` constants: `PI`, `E`, `LN2`, `LN10`, `SQRT2`, ...

## License

MIT © 2026 kszongic
