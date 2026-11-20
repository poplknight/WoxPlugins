// {
//   "Id": "c4e8a1b2-6d30-4f57-9a18-2b7c5e0d4f61",
//   "Name": "i18n:plugin_amount_plugin_name",
//   "Author": "tal",
//   "Version": "1.0.0",
//   "MinWoxVersion": "2.4.5",
//   "Runtime": "NODEJS",
//   "Description": "i18n:plugin_amount_plugin_description",
//   "Website": "https://github.com/poplknight/WoxPlugins",
//   "Icon": "svg:<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='#9f1239'/><path d='M16 14h16M15 22h18M24 14v18' stroke='#fff' stroke-width='3' stroke-linecap='round'/><path d='M18 34h12' stroke='#fde68a' stroke-width='3' stroke-linecap='round'/></svg>",
//   "TriggerKeywords": [
//     "*"
//   ],
//   "SupportedOS": [
//     "Windows",
//     "Linux",
//     "Macos"
//   ],
//   "Features": [
//     {
//       "Name": "ignoreAutoScore"
//     },
//     {
//       "Name": "mru",
//       "Params": {
//         "HashBy": "identityKey"
//       }
//     }
//   ],
//   "I18n": {
//     "en_US": {
//       "plugin_amount_plugin_name": "Chinese Amount",
//       "plugin_amount_plugin_description": "Turn a whole number into Chinese financial numerals and thousands separators",
//       "plugin_amount_upper": "Chinese numerals",
//       "plugin_amount_group": "Thousands",
//       "plugin_amount_copy": "Copy",
//       "plugin_amount_copied": "Copied",
//       "plugin_amount_empty": "No match",
//       "plugin_amount_too_long": "Number is too long",
//       "tool_format_amount": "Convert a whole number to Chinese financial numerals and thousands separators."
//     },
//     "zh_CN": {
//       "plugin_amount_plugin_name": "大写金额",
//       "plugin_amount_plugin_description": "把整数转成中文大写金额，并显示千分位",
//       "plugin_amount_upper": "中文大写",
//       "plugin_amount_group": "千分位",
//       "plugin_amount_copy": "复制",
//       "plugin_amount_copied": "已复制",
//       "plugin_amount_empty": "没有匹配",
//       "plugin_amount_too_long": "数字太长",
//       "tool_format_amount": "把整数转成中文大写金额和千分位。"
//     }
//   }
// }
const MAX_DIGITS = 20
const CN_DIGITS = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]
const CN_UNITS = ["", "拾", "佰", "仟"]
const CN_GROUPS = ["", "万", "亿", "万亿", "亿亿"]
const SECTIONS = [
  { id: "upper", token: "大写", aliases: ["中文大写", "大写", "中文"] },
  { id: "group", token: "千分位", aliases: ["千分位", "逗号"] }
]
const FALLBACK = {
  upper: "中文大写",
  group: "千分位",
  copy: "复制",
  copied: "已复制",
  empty: "没有匹配",
  tooLong: "数字太长"
}
const COPY_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`)
const OPEN_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>`)
const RESULT_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#9f1239"/><path d="M16 14h16M15 22h18M24 14v18" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M18 34h12" stroke="#fde68a" stroke-width="3" stroke-linecap="round"/></svg>`)

function icon(svg) {
  return { ImageType: "svg", ImageData: svg }
}

function normalizeDigits(digits) {
  return String(digits || "").replace(/^0+(?=\d)/, "") || "0"
}

function sectionText(value) {
  const padded = String(value).padStart(4, "0")
  let text = ""
  let pendingZero = false
  for (let index = 0; index < 4; index++) {
    const digit = padded.charCodeAt(index) - 48
    if (digit === 0) {
      if (text) pendingZero = true
      continue
    }
    if (pendingZero) {
      text += "零"
      pendingZero = false
    }
    text += CN_DIGITS[digit] + CN_UNITS[3 - index]
  }
  return text
}

function toChineseAmount(digits) {
  const normalized = normalizeDigits(digits)
  if (!/^\d+$/.test(normalized)) return ""
  if (normalized === "0") return "零元"
  const groups = []
  for (let end = normalized.length; end > 0; end -= 4) {
    groups.push(normalized.slice(Math.max(0, end - 4), end))
  }
  let result = ""
  let needZero = false
  for (let index = groups.length - 1; index >= 0; index--) {
    const value = Number(groups[index])
    if (value === 0) {
      if (result) needZero = true
      continue
    }
    if (result && (needZero || value < 1000)) result += "零"
    needZero = false
    result += sectionText(value) + (CN_GROUPS[index] || "")
  }
  return result + "元"
}

function groupDigits(digits) {
  const normalized = normalizeDigits(digits)
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function queryText(query) {
  const keyword = String(query && query.TriggerKeyword || "").trim()
  if (!keyword || keyword === "*") return String((query && (query.RawQuery || query.Search)) || "")
  return [keyword, query.Command, query.Search].filter((part) => part).join(" ")
}

function parseAmountPath(raw) {
  const text = String(raw || "").replace(/，/g, ",").replace(/^\s+/, "")
  const match = text.match(/^(\d{1,3}(?:,\d{3})+|\d+)([\s\S]*)$/)
  if (!match) return null
  if (match[2] && !/^\s/.test(match[2])) return null
  const token = match[1]
  const digits = normalizeDigits(token.replace(/,/g, ""))
  if (digits.length > MAX_DIGITS) return { token, digits, tooLong: true }
  const rest = match[2].trim()
  if (!rest) return { token, digits, section: null, filter: "" }
  const aliases = []
  SECTIONS.forEach((section) => {
    section.aliases.forEach((alias) => aliases.push({ section, alias }))
  })
  aliases.sort((left, right) => right.alias.length - left.alias.length)
  for (const item of aliases) {
    if (rest === item.alias) return { token, digits, section: item.section, filter: "" }
    if (rest.startsWith(item.alias + " ")) {
      return { token, digits, section: item.section, filter: rest.slice(item.alias.length).trim() }
    }
  }
  return { token, digits, section: null, filter: rest }
}

function hit(filter, fields) {
  const text = String(filter || "").trim().toLowerCase()
  if (!text) return true
  return fields.some((field) => String(field || "").toLowerCase().includes(text))
}

function formatAmount(text) {
  const parsed = parseAmountPath(text)
  if (!parsed || parsed.tooLong) return null
  return {
    digits: parsed.digits,
    chinese: toChineseAmount(parsed.digits),
    grouped: groupDigits(parsed.digits)
  }
}

class AmountPlugin {
  constructor() {
    this.api = null
    this.labels = Object.assign({}, FALLBACK)
  }

  async init(ctx, params) {
    this.api = params.API
    await this.api.OnMRURestore(ctx, async (_ctx, mruData) => this.restore(mruData))
    await this.api.RegisterPluginTool(ctx, {
      Tool: {
        Name: "format_amount",
        Description: "i18n:tool_format_amount",
        InputSchema: {
          type: "object",
          properties: { text: { type: "string" } },
          required: ["text"],
          additionalProperties: false
        },
        OutputSchema: {
          type: "object",
          properties: {
            digits: { type: "string" },
            chinese: { type: "string" },
            grouped: { type: "string" }
          },
          required: ["digits", "chinese", "grouped"]
        },
        Annotations: { ReadOnly: true, Destructive: false, Idempotent: true, RequiresUI: false }
      },
      Handler: async (_ctx, option) => {
        const value = formatAmount(option.Arguments && option.Arguments.text)
        if (!value) return { Error: { Code: "INVALID_ARGUMENTS", Message: "需要整数，或 100,212,111 这种千分位写法" } }
        return { Output: value }
      }
    })
  }

  async loadLabels(ctx) {
    if (!this.api || !this.api.GetTranslation) return
    const keys = {
      upper: "plugin_amount_upper",
      group: "plugin_amount_group",
      copy: "plugin_amount_copy",
      copied: "plugin_amount_copied",
      empty: "plugin_amount_empty",
      tooLong: "plugin_amount_too_long"
    }
    for (const name of Object.keys(keys)) {
      try {
        const value = await this.api.GetTranslation(ctx, keys[name])
        if (value && value !== keys[name]) this.labels[name] = value
      } catch (error) {
        continue
      }
    }
  }

  restore(mruData) {
    const data = mruData && mruData.ContextData
    if (!data || (data.section !== "upper" && data.section !== "group")) return null
    const digits = normalizeDigits(data.digits)
    if (!/^\d+$/.test(digits) || digits.length > MAX_DIGITS) return null
    const value = data.section === "group" ? groupDigits(digits) : toChineseAmount(digits)
    if (data.kind === "leaf") return this.leaf(digits, data.section, value)
    return this.folder(String(data.token || digits), digits, data.section, value)
  }

  async query(ctx, query) {
    await this.loadLabels(ctx)
    const parsed = parseAmountPath(queryText(query))
    if (!parsed) return { Results: [] }
    if (parsed.tooLong) return { Results: [this.note(this.labels.tooLong, parsed.token)] }
    const chinese = toChineseAmount(parsed.digits)
    const grouped = groupDigits(parsed.digits)
    if (parsed.section) {
      const value = parsed.section.id === "group" ? grouped : chinese
      const label = this.sectionLabel(parsed.section.id)
      if (!hit(parsed.filter, [value, label, this.labels.copy])) {
        return { Results: [this.note(this.labels.empty, parsed.filter)] }
      }
      return { Results: [this.leaf(parsed.digits, parsed.section.id, value)] }
    }
    const results = []
    if (hit(parsed.filter, [chinese, this.labels.upper, "中文大写", "大写", "中文"])) {
      results.push(this.folder(parsed.token, parsed.digits, "upper", chinese))
    }
    if (hit(parsed.filter, [grouped, this.labels.group, "千分位", "逗号"])) {
      results.push(this.folder(parsed.token, parsed.digits, "group", grouped))
    }
    if (!results.length) return { Results: [this.note(this.labels.empty, parsed.filter)] }
    return { Results: results }
  }

  sectionLabel(sectionId) {
    return sectionId === "group" ? this.labels.group : this.labels.upper
  }

  sectionToken(sectionId) {
    return sectionId === "group" ? "千分位" : "大写"
  }

  note(title, subtitle) {
    return { Title: title, SubTitle: subtitle || "", Icon: RESULT_ICON, Score: 1 }
  }

  folder(token, digits, sectionId, value) {
    const label = this.sectionLabel(sectionId)
    const next = `${token} ${this.sectionToken(sectionId)} `
    return {
      Title: value,
      SubTitle: label,
      Icon: RESULT_ICON,
      Score: sectionId === "upper" ? 100 : 90,
      IdentityKey: `amount:${sectionId}:${digits}`,
      Actions: [{
        Name: label,
        Icon: OPEN_ICON,
        IsDefault: true,
        PreventHideAfterAction: true,
        ContextData: { kind: "nav", section: sectionId, digits, token },
        Action: async (ctx) => {
          if (this.api && this.api.ChangeQuery) {
            await this.api.ChangeQuery(ctx, { QueryType: "input", QueryText: next })
          }
        }
      }]
    }
  }

  leaf(digits, sectionId, value) {
    const label = this.sectionLabel(sectionId)
    return {
      Title: value,
      SubTitle: label,
      Icon: RESULT_ICON,
      Score: 100,
      IdentityKey: `amount:leaf:${sectionId}:${digits}`,
      Actions: [{
        Name: this.labels.copy,
        Icon: COPY_ICON,
        IsDefault: true,
        PreventHideAfterAction: true,
        ContextData: { kind: "leaf", section: sectionId, digits },
        Action: async (ctx) => {
          if (this.api && this.api.Copy) await this.api.Copy(ctx, { type: "text", text: value })
          if (this.api && this.api.Notify) await this.api.Notify(ctx, `${this.labels.copied} ${value}`)
          if (this.api && this.api.RefreshQuery) await this.api.RefreshQuery(ctx, { PreserveSelectedIndex: true })
        }
      }]
    }
  }
}

const plugin = new AmountPlugin()
module.exports.plugin = plugin
module.exports.toChineseAmount = toChineseAmount
module.exports.groupDigits = groupDigits
module.exports.parseAmountPath = parseAmountPath
module.exports.formatAmount = formatAmount
