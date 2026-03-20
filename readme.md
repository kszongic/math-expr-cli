# math-expr-cli 🧮

> Evaluate math expressions from the command line. Zero dependencies.

[![npm version](https://img.shields.io/npm/v/@kszongic/math-expr-cli)](https://www.npmjs.com/package/@kszongic/math-expr-cli)
[![npm downloads](https://img.shields.io/npm/dm/@kszongic/math-expr-cli)](https://www.npmjs.com/package/@kszongic/math-expr-cli)
[![node](https://img.shields.io/node/v/@kszongic/math-expr-cli)](https://nodejs.org)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://www.npmjs.com/package/@kszongic/math-expr-cli)
[![cross-platform](https://img.shields.io/badge/platform-win%20%7C%20mac%20%7C%20linux-informational)](https://www.npmjs.com/package/@kszongic/math-expr-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```
$ math-expr '3 * (4 + 5) - sqrt(16)'
23
```

## Why?

- 🚀 **Instant calculator** — no Python REPL, no bc quirks, no Google
- 📦 **Zero dependencies** — just Node.js built-ins
- 🔧 **Pipe-friendly** — works with stdin, one expression per line
- 🧠 **Full Math library** — sqrt, sin, cos, log, PI, E, and every other Math.* function/constant
- 💻 **Cross-platform** — Windows, macOS, Linux — same syntax everywhere

## Install

```bash
npm install -g @kszongic/math-expr-cli
```

Or run directly without installing:

```bash
npx @kszongic/math-expr-cli '2 + 2'
```

## Usage

```bash
# Basic arithmetic
math-expr '2 + 2'               # 4
math-expr '3 * (4 + 5)'         # 27
math-expr '100 / 3'             # 33.333...
math-expr '17 % 5'              # 2
math-expr '2 ** 10'             # 1024

# Math functions
math-expr 'sqrt(144)'           # 12
math-expr 'sin(PI / 2)'         # 1
math-expr 'log2(256)'           # 8
math-expr 'abs(-42)'            # 42
math-expr 'round(3.7)'          # 4
math-expr 'max(10, 20, 5)'      # 20
math-expr 'hypot(3, 4)'         # 5
math-expr 'cbrt(27)'            # 3

# Constants
math-expr 'PI'                  # 3.141592653589793
math-expr 'E'                   # 2.718281828459045
math-expr 'PI * 2'              # 6.283185307179586
```

### Pipe Support

```bash
echo '1 + 1' | math-expr              # 2
seq 1 5 | math-expr                    # evaluates each line
cat formulas.txt | math-expr           # batch evaluate
```

### Multiple Expressions

```bash
math-expr '2+2' '3+3' '4+4'           # 4, 6, 8 (one per line)
```

## Supported Operations

| Category | Operations |
|----------|-----------|
| **Arithmetic** | + - * / % ** |
| **Grouping** | ( ) — unlimited nesting |
| **Functions** | sqrt sin cos tan asin acos atan atan2 log log2 log10 abs ceil floor round trunc sign max min pow hypot cbrt exp expm1 log1p clz32 fround random |
| **Constants** | PI E LN2 LN10 LOG2E LOG10E SQRT2 SQRT1_2 |

Every function and constant from JavaScript's Math object is available.

## Recipes

### Quick Unit Conversions

```bash
# Fahrenheit to Celsius
math-expr '(98.6 - 32) * 5 / 9'       # 37

# Miles to kilometers
math-expr '26.2 * 1.60934'            # 42.16...

# Radians to degrees
math-expr '(PI / 4) * (180 / PI)'     # 45
```

### Geometry Calculations

```bash
# Circle area (radius = 5)
math-expr 'PI * 5 ** 2'               # 78.539...

# Hypotenuse
math-expr 'hypot(3, 4)'               # 5

# Sphere volume (r = 10)
math-expr '(4/3) * PI * 10 ** 3'      # 4188.79...
```

### Shell Scripting

```bash
# Calculate disk usage percentage
USED=75; TOTAL=100
math-expr "$USED / $TOTAL * 100"       # 75

# Generate batch calculations
for i in $(seq 1 10); do
  echo "2 ** $i" | math-expr
done
```

### npm Scripts

```json
{
  "scripts": {
    "calc": "math-expr"
  }
}
```

### Financial Quick Math

```bash
# Compound interest: $1000 at 7% for 10 years
math-expr '1000 * (1 + 0.07) ** 10'   # 1967.15...

# Monthly mortgage payment (P=300000, r=0.06/12, n=360)
math-expr '300000 * (0.005 * (1.005 ** 360)) / ((1.005 ** 360) - 1)'
```

## How It Works

math-expr-cli uses a safe expression evaluator that:

1. Parses the input string and resolves Math.* function/constant references
2. Evaluates the expression using JavaScript's engine
3. Outputs the numeric result to stdout

No eval() on raw input — function names are whitelisted against Math.* to prevent code injection.

## Use Cases

- **DevOps** — quick calculations in shell scripts without installing extra tools
- **Data pipelines** — batch-evaluate formulas from files or streams
- **Education** — explore math functions interactively from the terminal
- **Financial** — compound interest, amortization, percentages on the fly
- **Science/Engineering** — trig, logarithms, and constants without a calculator app

## Comparison

| Feature | math-expr-cli | bc | Python -c | expr | calc |
|---------|:------------:|:--:|:---------:|:----:|:----:|
| Zero dependencies | ✅ | ✅ | ❌ | ✅ | ❌ |
| Trig functions | ✅ | ✅ (with -l) | ✅ | ❌ | ✅ |
| Constants (PI, E) | ✅ | ❌ | ✅ | ❌ | ✅ |
| Pipe support | ✅ | ✅ | ❌ | ❌ | ✅ |
| Cross-platform | ✅ | ❌ (Unix) | ✅ | ❌ (Unix) | ❌ |
| Familiar syntax | ✅ | ❌ | ✅ | ❌ | ✅ |

**Key advantage:** Same intuitive syntax on Windows, macOS, and Linux — no bc -l scale quirks, no Python import boilerplate.

## Related Tools

- [dep-size](https://www.npmjs.com/package/dep-size-cli) — Check npm package size before installing
- [bar-chart-cli](https://www.npmjs.com/package/bar-chart-cli) — Render bar charts in the terminal
- [prime-factors-cli](https://www.npmjs.com/package/prime-factors-cli) — Factorize numbers from CLI
- [pascal-triangle-cli](https://www.npmjs.com/package/pascal-triangle-cli) — Generate Pascal's triangle
- [roman-calc-cli](https://www.npmjs.com/package/roman-calc-cli) — Roman numeral calculator

## License

MIT © [kszongic](https://github.com/kszongic)
