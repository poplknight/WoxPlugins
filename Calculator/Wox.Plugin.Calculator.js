// {
//   "Id": "8b21e4c6-0a73-4f19-b5d2-3c9a7e1f6d40",
//   "Name": "i18n:plugin_calculator_plugin_name",
//   "Author": "tal",
//   "Version": "1.0.0",
//   "MinWoxVersion": "2.4.5",
//   "Runtime": "NODEJS",
//   "Description": "i18n:plugin_calculator_plugin_description",
//   "Icon": "svg:<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='#0f766e'/><rect x='10' y='8' width='28' height='10' rx='2' fill='#ecfeff'/><path d='M16 26h4M28 26h4M16 34h4M24 34h4M32 30v8M28 34h8' stroke='#ecfeff' stroke-width='2' stroke-linecap='round'/></svg>",
//   "TriggerKeywords": [
//     "*",
//     "calculator"
//   ],
//   "SupportedOS": [
//     "Windows",
//     "Linux",
//     "Macos"
//   ],
//   "Features": [
//     {
//       "Name": "mru",
//       "Params": {
//         "HashBy": "identityKey"
//       }
//     }
//   ],
//   "SettingDefinitions": [
//     {
//       "Type": "select",
//       "Value": {
//         "Key": "ThousandsSeparator",
//         "Label": "i18n:plugin_calculator_thousands_separator",
//         "DefaultValue": "System Locale",
//         "Tooltip": "i18n:plugin_calculator_thousands_separator_description",
//         "Options": [
//           {
//             "Label": "i18n:plugin_calculator_thousands_separator_system_locale",
//             "Value": "System Locale"
//           },
//           {
//             "Label": "i18n:plugin_calculator_thousands_separator_comma",
//             "Value": "Comma"
//           },
//           {
//             "Label": "i18n:plugin_calculator_thousands_separator_dot",
//             "Value": "Dot"
//           },
//           {
//             "Label": "i18n:plugin_calculator_thousands_separator_space",
//             "Value": "Space"
//           },
//           {
//             "Label": "i18n:plugin_calculator_thousands_separator_apostrophe",
//             "Value": "Apostrophe"
//           },
//           {
//             "Label": "i18n:plugin_calculator_thousands_separator_none",
//             "Value": "None"
//           }
//         ]
//       }
//     },
//     {
//       "Type": "select",
//       "Value": {
//         "Key": "DecimalSeparator",
//         "Label": "i18n:plugin_calculator_decimal_separator",
//         "DefaultValue": "System Locale",
//         "Tooltip": "i18n:plugin_calculator_decimal_separator_description",
//         "Options": [
//           {
//             "Label": "i18n:plugin_calculator_decimal_separator_system_locale",
//             "Value": "System Locale"
//           },
//           {
//             "Label": "i18n:plugin_calculator_decimal_separator_dot",
//             "Value": "Dot"
//           },
//           {
//             "Label": "i18n:plugin_calculator_decimal_separator_comma",
//             "Value": "Comma"
//           }
//         ]
//       }
//     },
//     {
//       "Type": "dynamic",
//       "Value": {
//         "Key": "SeparatorPreview"
//       }
//     }
//   ],
//   "I18n": {
//     "en_US": {
//       "plugin_calculator_plugin_name": "Calculator",
//       "plugin_calculator_plugin_description": "Calculator for Wox",
//       "plugin_calculator_copy_result": "Copy (without thousands separator)",
//       "plugin_calculator_copy_result_with_thousands_separator": "Copy",
//       "plugin_calculator_recalculate": "Recalculate",
//       "plugin_calculator_input_expression": "Input expression to calculate",
//       "plugin_calculator_decimal_separator": "Decimal Separator",
//       "plugin_calculator_decimal_separator_description": "Select the decimal separator for calculation and display",
//       "plugin_calculator_decimal_separator_system_locale": "System Locale",
//       "plugin_calculator_decimal_separator_dot": "Dot",
//       "plugin_calculator_decimal_separator_comma": "Comma",
//       "plugin_calculator_thousands_separator": "Thousands Separator",
//       "plugin_calculator_thousands_separator_description": "Select the thousands separator for calculation and display",
//       "plugin_calculator_thousands_separator_system_locale": "System Locale",
//       "plugin_calculator_thousands_separator_comma": "Comma",
//       "plugin_calculator_thousands_separator_dot": "Dot",
//       "plugin_calculator_thousands_separator_space": "Space",
//       "plugin_calculator_thousands_separator_apostrophe": "Apostrophe",
//       "plugin_calculator_thousands_separator_none": "None",
//       "plugin_calculator_separator_preview_example": "Preview example",
//       "tool_calculate": "Evaluate a calculator expression and return the raw and formatted results."
//     },
//     "zh_CN": {
//       "plugin_calculator_plugin_name": "计算器",
//       "plugin_calculator_plugin_description": "Wox 计算器",
//       "plugin_calculator_copy_result": "复制(不带千分位)",
//       "plugin_calculator_copy_result_with_thousands_separator": "复制",
//       "plugin_calculator_recalculate": "重新计算",
//       "plugin_calculator_input_expression": "输入表达式进行计算",
//       "plugin_calculator_decimal_separator": "小数分隔符",
//       "plugin_calculator_decimal_separator_description": "选择计算和显示的小数分隔符",
//       "plugin_calculator_decimal_separator_system_locale": "系统区域设置",
//       "plugin_calculator_decimal_separator_dot": "点",
//       "plugin_calculator_decimal_separator_comma": "逗号",
//       "plugin_calculator_thousands_separator": "千分位分隔符",
//       "plugin_calculator_thousands_separator_description": "选择计算和显示的千分位分隔符",
//       "plugin_calculator_thousands_separator_system_locale": "系统区域设置",
//       "plugin_calculator_thousands_separator_comma": "逗号",
//       "plugin_calculator_thousands_separator_dot": "点",
//       "plugin_calculator_thousands_separator_space": "空格",
//       "plugin_calculator_thousands_separator_apostrophe": "撇号",
//       "plugin_calculator_thousands_separator_none": "无",
//       "plugin_calculator_separator_preview_example": "预览示例",
//       "tool_calculate": "计算一条表达式，返回原始结果和带分隔符的结果。"
//     }
//   }
// }
const MAX_HISTORIES = 300
const HISTORY_KEY = "calculatorHistories"
const COPY_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`)
const RUN_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4.5 13.5h5.5L9 22l10-13h-6z"/></svg>`)
const PLUGIN_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#0f766e"/><rect x="10" y="8" width="28" height="10" rx="2" fill="#ecfeff"/><path d="M16 26h4M28 26h4M16 34h4M24 34h4M32 30v8M28 34h8" stroke="#ecfeff" stroke-width="2" stroke-linecap="round"/></svg>`)

const CONSTANTS = {
  e: Math.E,
  pi: Math.PI,
  phi: (1 + Math.sqrt(5)) / 2,
  sqrt2: Math.SQRT2,
  sqrte: Math.sqrt(Math.E),
  sqrtpi: Math.sqrt(Math.PI),
  sqrtphi: Math.sqrt((1 + Math.sqrt(5)) / 2),
  ln2: Math.LN2,
  log2e: Math.LOG2E,
  ln10: Math.LN10,
  log10e: Math.LOG10E
}

const FUNCTIONS = {
  abs: [1, Math.abs],
  acos: [1, Math.acos],
  acosh: [1, Math.acosh],
  asin: [1, Math.asin],
  asinh: [1, Math.asinh],
  atan: [1, Math.atan],
  atan2: [2, Math.atan2],
  atanh: [1, Math.atanh],
  cbrt: [1, Math.cbrt],
  ceil: [1, Math.ceil],
  copysign: [2, (x, y) => (y < 0 || Object.is(y, -0) ? -Math.abs(x) : Math.abs(x))],
  cos: [1, Math.cos],
  cosh: [1, Math.cosh],
  dim: [2, (x, y) => Math.max(x - y, 0)],
  exp: [1, Math.exp],
  exp2: [1, (x) => 2 ** x],
  expm1: [1, Math.expm1],
  floor: [1, Math.floor],
  hypot: [2, Math.hypot],
  log: [1, Math.log],
  log10: [1, Math.log10],
  log1p: [1, Math.log1p],
  log2: [1, Math.log2],
  logb: [1, (x) => Math.floor(Math.log2(Math.abs(x)))],
  max: [2, Math.max],
  min: [2, Math.min],
  mod: [2, (x, y) => x - y * Math.floor(x / y)],
  pow: [2, Math.pow],
  remainder: [2, (x, y) => x - y * Math.round(x / y)],
  round: [1, Math.round],
  sin: [1, Math.sin],
  sinh: [1, Math.sinh],
  sqrt: [1, Math.sqrt],
  tan: [1, tanAdjusted],
  tanh: [1, Math.tanh],
  trunc: [1, Math.trunc]
}

const COMMA_REGIONS = new Set("al ar at be bg bo br by cm cl co cr cu cy cz de dk ec ee es fi fr gr hr hu id is it kz lt lu lv mk mn mz nl no pe pl pt py ro rs ru se si sk tr ua uy uz ve vn za".split(" "))
const APOSTROPHE_REGIONS = new Set(["ch", "li"])
const SPACE_REGIONS = new Set("fr ru se no fi dk pl cz sk hu ua ro bg rs si hr".split(" "))

function icon(svg) {
  return { ImageType: "svg", ImageData: svg }
}

function region() {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale || ""
  const parts = locale.split("-")
  return (parts[1] || "").toLowerCase()
}

function decimalSeparator(mode) {
  if (mode === "Dot") return "."
  if (mode === "Comma") return ","
  return COMMA_REGIONS.has(region()) ? "," : "."
}

function thousandsSeparator(mode, decimalSep) {
  if (mode === "Comma") return ","
  if (mode === "Dot") return "."
  if (mode === "Space") return " "
  if (mode === "Apostrophe") return "'"
  if (mode === "None") return ""
  const loc = region()
  if (APOSTROPHE_REGIONS.has(loc)) return "'"
  if (SPACE_REGIONS.has(loc)) return " "
  return decimalSep === "," ? "." : ","
}

function resolveSeparators(thousandsMode, decimalMode) {
  const decimalSep = decimalSeparator(decimalMode || "System Locale")
  let thousandsSep = thousandsSeparator(thousandsMode || "System Locale", decimalSep)
  if (decimalSep && decimalSep === thousandsSep) thousandsSep = ""
  return { thousandsSep, decimalSep }
}

function hasOperator(query) {
  if (/[+\-*/(^]/.test(query)) return true
  if (!query.includes("(") || !query.includes(")")) return false
  return /[A-Za-z]/.test(query)
}

function normalizeSeparators(input) {
  return input.replace(/[\u00A0\u202F\u2009\u2007]/g, " ")
}

function isOperatorChar(char) {
  return "+-*/^(),;".includes(char)
}

function numberPrefix(chars, start, thousandsSep, decimalSep) {
  let current = start
  let seenDecimal = false
  let raw = ""
  while (current < chars.length) {
    const char = chars[current]
    const rest = chars.slice(current).join("")
    if (char >= "0" && char <= "9") {
      raw += char
      current++
      continue
    }
    if (!seenDecimal && decimalSep && rest.startsWith(decimalSep)) {
      let shouldConsume = true
      if (isOperatorChar(decimalSep[0])) {
        const next = chars[current + Array.from(decimalSep).length]
        if (next !== undefined && (next < "0" || next > "9")) shouldConsume = false
      }
      if (shouldConsume) {
        current += Array.from(decimalSep).length
        raw += "."
        seenDecimal = true
        continue
      }
    }
    if (!seenDecimal && thousandsSep && rest.startsWith(thousandsSep)) {
      const sepLen = Array.from(thousandsSep).length
      if (current + sepLen + 3 <= chars.length) {
        let valid = true
        for (let k = 0; k < 3; k++) {
          const digit = chars[current + sepLen + k]
          if (digit < "0" || digit > "9") valid = false
        }
        if (valid) {
          current += sepLen
          continue
        }
      }
    }
    if (char === "_" && current + 1 < chars.length && current > start) {
      const prev = chars[current - 1]
      const next = chars[current + 1]
      if (prev >= "0" && prev <= "9" && next >= "0" && next <= "9") {
        current++
        continue
      }
    }
    break
  }
  if (!raw || raw === ".") return null
  return { raw, next: current }
}

function tokenize(input, thousandsSep, decimalSep) {
  const chars = Array.from(normalizeSeparators(input))
  const tokens = []
  let i = 0
  while (i < chars.length) {
    const char = chars[i]
    if (/\s/u.test(char)) {
      i++
      continue
    }
    if (/[A-Za-z]/.test(char)) {
      const start = i
      i++
      while (i < chars.length && /[A-Za-z0-9]/.test(chars[i])) i++
      tokens.push({ kind: "ident", str: chars.slice(start, i).join("") })
      continue
    }
    const number = numberPrefix(chars, i, thousandsSep, decimalSep)
    if (number) {
      tokens.push({ kind: "number", value: number.raw })
      i = number.next
      continue
    }
    if (isOperatorChar(char)) {
      tokens.push({ kind: "reserved", str: char })
      i++
      continue
    }
    throw new Error("invalid token")
  }
  tokens.push({ kind: "eos" })
  return tokens
}

function ratFromDecimal(text) {
  const negative = text.startsWith("-")
  const body = negative ? text.slice(1) : text
  const [whole, frac = ""] = body.split(".")
  const digits = (whole + frac).replace(/^0+(?=\d)/, "") || "0"
  const den = 10n ** BigInt(frac.length)
  let num = BigInt(digits)
  if (negative) num = -num
  return reduce(num, den)
}

function reduce(num, den) {
  if (den < 0n) {
    num = -num
    den = -den
  }
  const g = gcd(num < 0n ? -num : num, den)
  return { num: num / g, den: den / g }
}

function gcd(a, b) {
  while (b !== 0n) {
    const next = a % b
    a = b
    b = next
  }
  return a || 1n
}

function ratAdd(a, b) { return reduce(a.num * b.den + b.num * a.den, a.den * b.den) }
function ratSub(a, b) { return reduce(a.num * b.den - b.num * a.den, a.den * b.den) }
function ratMul(a, b) { return reduce(a.num * b.num, a.den * b.den) }
function ratDiv(a, b) {
  if (b.num === 0n) throw new Error("division by zero")
  return reduce(a.num * b.den, a.den * b.num)
}

function ratToFloat(rat) {
  return Number(rat.num) / Number(rat.den)
}

function ratFromFloat(value) {
  if (!Number.isFinite(value)) throw new Error("invalid numeric result")
  return ratFromDecimal(formatFloat(value))
}

function formatFloat(value) {
  if (Object.is(value, -0)) return "0"
  const text = value.toString()
  if (!/[eE]/.test(text)) return text
  return value.toFixed(16).replace(/\.?0+$/, "")
}

function formatRat(rat) {
  let { num, den } = rat
  if (den < 0n) {
    num = -num
    den = -den
  }
  const negative = num < 0n
  if (negative) num = -num
  let whole = num / den
  let rem = num % den
  if (rem === 0n) return (negative ? "-" : "") + whole.toString()
  let digits = ""
  for (let i = 0; i < 16; i++) {
    rem *= 10n
    digits += (rem / den).toString()
    rem %= den
  }
  if (rem * 10n / den >= 5n) {
    const bumped = BigInt(digits) + 1n
    const width = digits.length
    digits = bumped.toString().padStart(width, "0")
    if (digits.length > width) {
      whole += 1n
      digits = ""
    }
  }
  digits = digits.replace(/0+$/, "")
  if (!digits) return (negative ? "-" : "") + whole.toString()
  return (negative ? "-" : "") + whole.toString() + "." + digits
}

function tanAdjusted(value) {
  let result = Math.tan(value)
  if (result === 1 || result === -1) result = Math.tan(Math.nextAfter ? Math.nextAfter(value, 0) : value * (1 - Number.EPSILON))
  if (Math.abs(result - 1) < 1e-12) return 1
  if (Math.abs(result + 1) < 1e-12) return -1
  return result
}

function evaluate(node) {
  switch (node.kind) {
    case "+": return ratAdd(evaluate(node.left), evaluate(node.right))
    case "-": return ratSub(evaluate(node.left), evaluate(node.right))
    case "*": return ratMul(evaluate(node.left), evaluate(node.right))
    case "/": return ratDiv(evaluate(node.left), evaluate(node.right))
    case "^": return ratFromFloat(Math.pow(ratToFloat(evaluate(node.left)), ratToFloat(evaluate(node.right))))
    case "num": return node.value
    case "func": {
      const spec = FUNCTIONS[node.name]
      const args = node.args.map((arg) => ratToFloat(evaluate(arg)))
      let result = spec[0] === 1 ? spec[1](args[0]) : spec[1](args[0], args[1])
      return ratFromFloat(result)
    }
    default: throw new Error("unknown node")
  }
}

function parse(tokens) {
  let index = 0
  const peek = () => tokens[index]
  const consume = (text) => {
    const token = peek()
    if (!token || token.kind !== "reserved" || token.str !== text) return false
    index++
    return true
  }
  function primary() {
    if (consume("(")) {
      const node = add()
      consume(")")
      return node
    }
    const token = peek()
    if (token.kind === "ident") {
      const name = token.str
      index++
      if (consume("(")) return functionNode(name.toLowerCase())
      index--
      const value = CONSTANTS[name.toLowerCase()]
      if (value === undefined) throw new Error("unknown constant: " + name)
      index++
      return { kind: "num", value: ratFromFloat(value) }
    }
    if (token.kind !== "number") throw new Error("expected a number")
    index++
    return { kind: "num", value: ratFromDecimal(token.value) }
  }
  function functionNode(name) {
    const spec = FUNCTIONS[name]
    if (!spec) throw new Error("unknown function: " + name)
    if (consume(")")) {
      if (spec[0] !== 0) throw new Error(name + " should have argument(s)")
      return { kind: "func", name, args: [] }
    }
    const args = [add()]
    while (consume(",") || consume(";")) args.push(add())
    if (args.length !== spec[0]) throw new Error(name + " should have " + spec[0] + " argument(s)")
    consume(")")
    return { kind: "func", name, args }
  }
  function unary() {
    if (consume("+")) return primary()
    if (consume("-")) return { kind: "-", left: { kind: "num", value: ratFromDecimal("0") }, right: primary() }
    return primary()
  }
  function pow() {
    const left = unary()
    if (!consume("^")) return left
    return { kind: "^", left, right: pow() }
  }
  function mul() {
    let node = pow()
    for (;;) {
      if (consume("*")) node = { kind: "*", left: node, right: pow() }
      else if (consume("/")) node = { kind: "/", left: node, right: pow() }
      else return node
    }
  }
  function add() {
    let node = mul()
    for (;;) {
      if (consume("+")) node = { kind: "+", left: node, right: mul() }
      else if (consume("-")) node = { kind: "-", left: node, right: mul() }
      else return node
    }
  }
  const node = add()
  if (peek().kind !== "eos") throw new Error("unexpected token")
  return node
}

function calculate(expression, thousandsSep, decimalSep) {
  const tokens = tokenize(expression, thousandsSep, decimalSep)
  for (const token of tokens) {
    if (token.kind !== "ident") continue
    const name = token.str.toLowerCase()
    if (!FUNCTIONS[name] && CONSTANTS[name] === undefined) throw new Error("unknown identifier: " + token.str)
  }
  return formatRat(evaluate(parse(tokens)))
}

function addThousands(text, sep) {
  if (!sep || text.length <= 3) return text
  let out = ""
  for (let i = 0; i < text.length; i++) {
    if (i > 0 && (text.length - i) % 3 === 0) out += sep
    out += text[i]
  }
  return out
}

function formatWithSeparators(value, thousandsSep, decimalSep) {
  const negative = value.startsWith("-")
  const body = negative ? value.slice(1) : value
  const [whole, frac] = body.split(".")
  let formatted = addThousands(whole, thousandsSep)
  if (negative) formatted = "-" + formatted
  if (frac !== undefined) formatted += (decimalSep || ".") + frac
  return formatted
}

function identityKey(expression) {
  return "calculator:" + expression.trim()
}

class CalculatorPlugin {
  constructor() {
    this.api = null
    this.histories = []
    this.separators = resolveSeparators("System Locale", "System Locale")
    this.previewLabel = "Preview example"
    this.timer = null
    this.lastQueryText = ""
  }

  async init(ctx, params) {
    this.api = params.API
    await this.refreshSettings(ctx)
    this.histories = await this.loadHistories(ctx)
    await this.api.OnSettingChanged(ctx, async (settingCtx) => {
      await this.refreshSettings(settingCtx)
    })
    await this.api.OnGetDynamicSetting(ctx, async () => this.previewSetting())
    await this.api.OnMRURestore(ctx, async (_ctx, mruData) => this.restore(mruData))
    await this.api.OnUnload(ctx, async () => {
      if (this.timer) clearTimeout(this.timer)
    })
    await this.api.RegisterPluginTool(ctx, {
      Tool: {
        Name: "calculate",
        Description: "i18n:tool_calculate",
        InputSchema: {
          type: "object",
          properties: { expression: { type: "string" } },
          required: ["expression"],
          additionalProperties: false
        },
        OutputSchema: {
          type: "object",
          properties: { result: { type: "string" }, formatted: { type: "string" } },
          required: ["result", "formatted"]
        },
        Annotations: { ReadOnly: true, Destructive: false, Idempotent: true, RequiresUI: false }
      },
      Handler: async (_ctx, option) => {
        try {
          const value = this.evaluateText(option.Arguments.expression || "")
          return { Output: value }
        } catch (error) {
          return { Error: { Code: "EXECUTION_FAILED", Message: error.message } }
        }
      }
    })
  }

  async refreshSettings(ctx) {
    const thousandsMode = await this.setting(ctx, "ThousandsSeparator", "System Locale")
    const decimalMode = await this.setting(ctx, "DecimalSeparator", "System Locale")
    this.separators = resolveSeparators(thousandsMode, decimalMode)
    const label = await this.translation(ctx, "plugin_calculator_separator_preview_example")
    if (label) this.previewLabel = label
  }

  previewSetting() {
    const sample = formatWithSeparators("1234567.89", this.separators.thousandsSep, this.separators.decimalSep)
    return {
      Type: "label",
      Value: { Content: this.previewLabel + ": " + sample, ReserveLabelSpace: true }
    }
  }

  async setting(ctx, key, fallback) {
    try {
      const value = await this.api.GetSetting(ctx, key)
      return value || fallback
    } catch (error) {
      return fallback
    }
  }

  async translation(ctx, key) {
    try {
      const value = await this.api.GetTranslation(ctx, key)
      return value && value !== key ? value : ""
    } catch (error) {
      return ""
    }
  }

  evaluateText(expression) {
    const result = calculate(expression, this.separators.thousandsSep, this.separators.decimalSep)
    return {
      result,
      formatted: formatWithSeparators(result, this.separators.thousandsSep, this.separators.decimalSep)
    }
  }

  async query(ctx, query) {
    await this.refreshSettings(ctx)
    const search = String(query.Search || "")
    const keyword = query.TriggerKeyword || ""
    const global = keyword === "" || keyword === "*"
    const results = []
    if (global) {
      if (!hasOperator(search)) return { Results: [] }
      try {
        const value = this.evaluateText(search)
        this.rememberLater(ctx, search, value.result)
        results.push(this.expressionResult(search, value, true))
      } catch (error) {
        return { Results: [] }
      }
      return { Results: results }
    }

    try {
      const value = this.evaluateText(search)
      this.rememberLater(ctx, search, value.result)
      results.push(this.expressionResult(search, value, false))
    } catch (error) {
      // A keyword query still shows matching history when the current text is incomplete.
    }

    let count = 0
    for (let i = this.histories.length - 1; i >= 0 && count < 100; i--) {
      const item = this.histories[i]
      if (!item.Expression.includes(search) && !item.Result.includes(search)) continue
      count++
      results.push(this.historyResult(ctx, item))
    }
    if (results.length === 0) {
      results.push({
        Title: "i18n:plugin_calculator_input_expression",
        Icon: PLUGIN_ICON,
        Actions: []
      })
    }
    return { Results: results }
  }

  expressionResult(expression, value, recordOnCopy) {
    return {
      Title: value.formatted,
      Icon: PLUGIN_ICON,
      Score: 50,
      IdentityKey: identityKey(expression),
      Actions: [
        this.copyAction("i18n:plugin_calculator_copy_result", expression, value.result, false, recordOnCopy ? value.result : ""),
        this.copyAction("i18n:plugin_calculator_copy_result_with_thousands_separator", expression, value.formatted, true, recordOnCopy ? value.result : "")
      ]
    }
  }

  historyResult(ctx, item) {
    let formatted = item.Result
    try {
      formatted = formatWithSeparators(calculate(item.Result, "", "."), this.separators.thousandsSep, this.separators.decimalSep)
    } catch (error) {
      formatted = formatWithSeparators(item.Result, this.separators.thousandsSep, this.separators.decimalSep)
    }
    return {
      Title: item.Expression,
      SubTitle: formatted,
      Icon: PLUGIN_ICON,
      IdentityKey: identityKey(item.Expression),
      Actions: [
        this.copyAction("i18n:plugin_calculator_copy_result", item.Expression, item.Result, false, ""),
        this.copyAction("i18n:plugin_calculator_copy_result_with_thousands_separator", item.Expression, formatted, true, ""),
        {
          Name: "i18n:plugin_calculator_recalculate",
          Icon: RUN_ICON,
          PreventHideAfterAction: true,
          ContextData: { query: item.Expression.trim() },
          Action: async (actionCtx) => {
            await this.api.ChangeQuery(actionCtx, { QueryType: "input", QueryText: item.Expression })
          }
        }
      ]
    }
  }

  copyAction(name, expression, text, isDefault, recordResult) {
    return {
      Name: name,
      Icon: COPY_ICON,
      IsDefault: isDefault,
      ContextData: { query: expression.trim() },
      Action: async (ctx) => {
        if (recordResult) this.rememberNow(ctx, expression, recordResult)
        await this.api.Copy(ctx, { type: "text", text })
      }
    }
  }

  restore(mruData) {
    const expression = String((mruData && mruData.ContextData && mruData.ContextData.query) || "").trim()
    if (!expression) return null
    try {
      const value = this.evaluateText(expression)
      const result = this.expressionResult(expression, value, false)
      result.SubTitle = expression
      return result
    } catch (error) {
      return null
    }
  }

  rememberLater(ctx, expression, result) {
    if (!hasOperator(expression)) return
    if (this.timer) clearTimeout(this.timer)
    this.lastQueryText = expression
    this.timer = setTimeout(() => {
      if (this.lastQueryText !== expression) return
      this.rememberNow(ctx, expression, result)
    }, 800)
  }

  rememberNow(ctx, expression, result) {
    const last = this.histories[this.histories.length - 1]
    if (last && last.Expression === expression) return
    this.histories.push({
      Expression: expression,
      Result: result,
      AddDate: new Date().toISOString()
    })
    if (this.histories.length > MAX_HISTORIES) {
      this.histories = this.histories.slice(this.histories.length - MAX_HISTORIES)
    }
    this.persistHistories(ctx)
  }

  async loadHistories(ctx) {
    const raw = await this.setting(ctx, HISTORY_KEY, "")
    if (!raw) return []
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed.slice(-MAX_HISTORIES) : []
    } catch (error) {
      return []
    }
  }

  persistHistories(ctx) {
    this.api.SaveSetting(ctx, HISTORY_KEY, JSON.stringify(this.histories), false).catch(() => {})
  }
}

const plugin = new CalculatorPlugin()
module.exports.plugin = plugin
module.exports.calculate = calculate
module.exports.formatWithSeparators = formatWithSeparators
module.exports.hasOperator = hasOperator
module.exports.resolveSeparators = resolveSeparators