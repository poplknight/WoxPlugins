// {
//   "Id": "6f0c1a27-4b8e-4d55-9c31-7a2e5d8b0c14",
//   "Name": "i18n:plugin_color_plugin_name",
//   "Author": "tal",
//   "Version": "1.0.0",
//   "MinWoxVersion": "2.4.5",
//   "Runtime": "NODEJS",
//   "Description": "i18n:plugin_color_plugin_description",
//   "Icon": "svg:<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='#111827'/><circle cx='18' cy='20' r='8' fill='#f43f5e'/><circle cx='30' cy='20' r='8' fill='#38bdf8'/><circle cx='24' cy='30' r='8' fill='#facc15'/></svg>",
//   "TriggerKeywords": [
//     "*",
//     "color"
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
//       "plugin_color_plugin_name": "Color",
//       "plugin_color_plugin_description": "Preview, copy, and save HEX colors",
//       "plugin_color_copy_hex": "Copy HEX",
//       "plugin_color_copy_rgb": "Copy RGB",
//       "plugin_color_copy_hsl": "Copy HSL",
//       "plugin_color_copy_complement": "Copy Complementary Color",
//       "plugin_color_copy_analogous": "Copy Analogous Colors",
//       "plugin_color_mark_favorite": "Add to Favorites",
//       "plugin_color_cancel_favorite": "Remove from Favorites",
//       "plugin_color_name_color": "Name Color",
//       "plugin_color_name_color_label": "Name",
//       "plugin_color_name_color_hint": "Set a custom name for this color",
//       "plugin_color_delete": "Delete",
//       "plugin_color_group_favorites": "Favorites",
//       "plugin_color_group_today": "Today",
//       "plugin_color_group_yesterday": "Yesterday",
//       "plugin_color_group_history": "History",
//       "plugin_color_tail_complement": "Complement: %s",
//       "plugin_color_tail_analogous_single": "Analogous: %s",
//       "tool_parse_color": "Parse a 6-digit HEX color and return RGB, HSL, and related colors."
//     },
//     "zh_CN": {
//       "plugin_color_plugin_name": "颜色",
//       "plugin_color_plugin_description": "预览、复制并保存 HEX 颜色",
//       "plugin_color_copy_hex": "复制 HEX",
//       "plugin_color_copy_rgb": "复制 RGB",
//       "plugin_color_copy_hsl": "复制 HSL",
//       "plugin_color_copy_complement": "复制互补色",
//       "plugin_color_copy_analogous": "复制相近色",
//       "plugin_color_mark_favorite": "添加到收藏",
//       "plugin_color_cancel_favorite": "从收藏移除",
//       "plugin_color_name_color": "命名颜色",
//       "plugin_color_name_color_label": "名称",
//       "plugin_color_name_color_hint": "为这个颜色设置自定义名称",
//       "plugin_color_delete": "删除",
//       "plugin_color_group_favorites": "收藏",
//       "plugin_color_group_today": "今天",
//       "plugin_color_group_yesterday": "昨天",
//       "plugin_color_group_history": "历史",
//       "plugin_color_tail_complement": "互补色：%s",
//       "plugin_color_tail_analogous_single": "相近色：%s",
//       "tool_parse_color": "解析 6 位 HEX 颜色，返回 RGB、HSL 和相关颜色。"
//     }
//   }
// }
const HISTORY_KEY = "colorHistory"
const DAY = 24 * 60 * 60 * 1000
const COPY_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`)
const STAR_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linejoin="round"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.8 6.6 19.8l1-6.1L3.2 9.4l6.1-.9z"/></svg>`)
const EDIT_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 6.5l4 4M4 20h4l10.5-10.5a2.83 2.83 0 1 0-4-4L4 16v4z"/></svg>`)
const DELETE_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>`)

function icon(svg) {
  return { ImageType: "svg", ImageData: svg }
}

function primaryHotkey(key) {
  return (process.platform === "darwin" ? "cmd" : "ctrl") + "+" + key
}

function parseHexColor(input) {
  const raw = String(input || "").trim().replace(/^#/, "")
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return null
  const value = parseInt(raw, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  const hsl = rgbToHsl(r, g, b)
  return {
    Hex: "#" + raw.toUpperCase(),
    R: r,
    G: g,
    B: b,
    H: hsl.h,
    S: hsl.s,
    L: hsl.l
  }
}

function rgbText(color) {
  return `rgb(${color.R}, ${color.G}, ${color.B})`
}

function hslText(color) {
  return `hsl(${Math.round(color.H)}, ${Math.round(color.S * 100)}%, ${Math.round(color.L * 100)}%)`
}

function normalizeHue(h) {
  h %= 360
  if (h < 0) h += 360
  return h
}

function rgbToHsl(r, g, b) {
  const rf = r / 255
  const gf = g / 255
  const bf = b / 255
  const max = Math.max(rf, gf, bf)
  const min = Math.min(rf, gf, bf)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const delta = max - min
  const s = delta / (1 - Math.abs(2 * l - 1))
  let h = 0
  if (max === rf) h = 60 * (((gf - bf) / delta) % 6)
  else if (max === gf) h = 60 * ((bf - rf) / delta + 2)
  else h = 60 * ((rf - gf) / delta + 4)
  return { h: normalizeHue(h), s, l }
}

function clampChannel(value) {
  return Math.max(0, Math.min(255, Math.round(value)))
}

function hslToRgb(h, s, l) {
  const chroma = (1 - Math.abs(2 * l - 1)) * s
  const x = chroma * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - chroma / 2
  let rf = 0
  let gf = 0
  let bf = 0
  if (h < 60) [rf, gf, bf] = [chroma, x, 0]
  else if (h < 120) [rf, gf, bf] = [x, chroma, 0]
  else if (h < 180) [rf, gf, bf] = [0, chroma, x]
  else if (h < 240) [rf, gf, bf] = [0, x, chroma]
  else if (h < 300) [rf, gf, bf] = [x, 0, chroma]
  else [rf, gf, bf] = [chroma, 0, x]
  return [clampChannel((rf + m) * 255), clampChannel((gf + m) * 255), clampChannel((bf + m) * 255)]
}

function deriveHex(color, hueOffset) {
  const [r, g, b] = hslToRgb(normalizeHue(color.H + hueOffset), color.S, color.L)
  return "#" + [r, g, b].map((part) => part.toString(16).padStart(2, "0").toUpperCase()).join("")
}

function swatch(hex, radius) {
  const parsed = parseHexColor(hex)
  const foreground = parsed && parsed.L > 0.62 ? "#111111" : "#FFFFFF"
  return icon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="${radius}" fill="${hex}"/><path fill="${foreground}" opacity=".95" d="M12 34h24v4H12z"/></svg>`)
}

function tailSwatch(hex) {
  return icon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 18"><rect width="28" height="18" rx="4" fill="${hex}"/></svg>`)
}

function sortHistory(history) {
  history.sort((a, b) => {
    if (a.Favorite !== b.Favorite) return a.Favorite ? -1 : 1
    return (b.LastSeenAt || 0) - (a.LastSeenAt || 0)
  })
}

class ColorPlugin {
  constructor() {
    this.api = null
    this.history = []
    this.labels = {
      complement: "Complement: %s",
      analogous: "Analogous: %s"
    }
  }

  async init(ctx, params) {
    this.api = params.API
    this.history = await this.readHistory(ctx)
    await this.loadLabels(ctx)
    await this.api.OnMRURestore(ctx, async (_ctx, mruData) => this.restore(mruData))
    await this.api.RegisterPluginTool(ctx, {
      Tool: {
        Name: "parse_color",
        Description: "i18n:tool_parse_color",
        InputSchema: {
          type: "object",
          properties: { text: { type: "string" } },
          required: ["text"],
          additionalProperties: false
        },
        OutputSchema: {
          type: "object",
          properties: {
            hex: { type: "string" },
            rgb: { type: "string" },
            hsl: { type: "string" },
            complement: { type: "string" },
            analogousLeft: { type: "string" },
            analogousRight: { type: "string" }
          },
          required: ["hex", "rgb", "hsl", "complement", "analogousLeft", "analogousRight"]
        },
        Annotations: { ReadOnly: true, Destructive: false, Idempotent: true, RequiresUI: false }
      },
      Handler: async (_ctx, option) => {
        const parsed = parseHexColor(option.Arguments.text || "")
        if (!parsed) return { Error: { Code: "EXECUTION_FAILED", Message: "not a 6-digit hex color" } }
        const related = this.related(parsed)
        return { Output: { hex: parsed.Hex, rgb: related.rgb, hsl: related.hsl, complement: related.complement, analogousLeft: related.analogousLeft, analogousRight: related.analogousRight } }
      }
    })
  }

  async loadLabels(ctx) {
    const complement = await this.translation(ctx, "plugin_color_tail_complement")
    const analogous = await this.translation(ctx, "plugin_color_tail_analogous_single")
    if (complement) this.labels.complement = complement
    if (analogous) this.labels.analogous = analogous
  }

  async translation(ctx, key) {
    try {
      const value = await this.api.GetTranslation(ctx, key)
      return value && value !== key ? value : ""
    } catch (error) {
      return ""
    }
  }

  related(color) {
    return {
      rgb: rgbText(color),
      hsl: hslText(color),
      complement: deriveHex(color, 180),
      analogousLeft: deriveHex(color, -30),
      analogousRight: deriveHex(color, 30)
    }
  }

  async query(ctx, query) {
    const keyword = query.TriggerKeyword || ""
    const global = keyword === "" || keyword === "*"
    const search = String(global ? (query.RawQuery || query.Search || "") : (query.Search || "")).trim()
    const parsed = parseHexColor(search)
    if (parsed) {
      const now = Date.now()
      const item = this.observe(parsed.Hex, now)
      this.persist(ctx)
      return { Results: [this.resultFor(parsed, item)] }
    }
    if (global) return { Results: [] }
    return { Results: this.filter(search).map((item) => this.resultFor(parseHexColor(item.Hex), item)).filter(Boolean) }
  }

  observe(hex, now) {
    const existing = this.history.find((item) => item.Hex === hex)
    if (existing) {
      if (!existing.CreatedAt) existing.CreatedAt = now
      if ((existing.LastSeenAt || 0) < now) existing.LastSeenAt = now
      return existing
    }
    const item = { Hex: hex, Name: "", Favorite: false, CreatedAt: now, LastSeenAt: now }
    this.history.push(item)
    return item
  }

  filter(search) {
    const folded = search.toLowerCase().replace(/^#/, "")
    const matched = this.history.filter((item) => {
      if (!folded) return true
      return item.Hex.toLowerCase().replace(/^#/, "").includes(folded) || String(item.Name || "").toLowerCase().includes(folded)
    })
    sortHistory(matched)
    return matched
  }

  groupFor(item) {
    if (item.Favorite) return { Group: "i18n:plugin_color_group_favorites", GroupScore: 100 }
    const elapsed = Date.now() - (item.LastSeenAt || 0)
    if (elapsed < DAY) return { Group: "i18n:plugin_color_group_today", GroupScore: 90 }
    if (elapsed < DAY * 2) return { Group: "i18n:plugin_color_group_yesterday", GroupScore: 80 }
    return { Group: "i18n:plugin_color_group_history", GroupScore: 10 }
  }

  resultFor(color, item) {
    if (!color) return null
    const related = this.related(color)
    const group = this.groupFor(item)
    const fill = (template, value) => template.replace("%s", value)
    return {
      Id: "color-" + color.Hex.slice(1),
      Title: String(item.Name || "").trim() || color.Hex,
      SubTitle: `${color.Hex}  ${related.rgb}  ${related.hsl}`,
      Icon: swatch(color.Hex, 10),
      Score: item.LastSeenAt || 0,
      Group: group.Group,
      GroupScore: group.GroupScore,
      IdentityKey: color.Hex,
      Tails: [
        { Type: "image", Image: tailSwatch(related.complement), ImageWidth: 28, ImageHeight: 18, Tooltip: fill(this.labels.complement, related.complement) },
        { Type: "image", Image: tailSwatch(related.analogousLeft), ImageWidth: 28, ImageHeight: 18, Tooltip: fill(this.labels.analogous, related.analogousLeft) },
        { Type: "image", Image: tailSwatch(related.analogousRight), ImageWidth: 28, ImageHeight: 18, Tooltip: fill(this.labels.analogous, related.analogousRight) }
      ],
      Actions: this.actions(color, item, related)
    }
  }

  actions(color, item, related) {
    const data = { hex: color.Hex }
    const favorite = !item.Favorite
    return [
      this.copyAction("i18n:plugin_color_copy_hex", color.Hex, true, data),
      this.copyAction("i18n:plugin_color_copy_rgb", related.rgb, false, data),
      this.copyAction("i18n:plugin_color_copy_hsl", related.hsl, false, data),
      this.copyAction("i18n:plugin_color_copy_complement", related.complement, false, data),
      this.copyAction("i18n:plugin_color_copy_analogous", related.analogousLeft + " " + related.analogousRight, false, data),
      {
        Name: item.Favorite ? "i18n:plugin_color_cancel_favorite" : "i18n:plugin_color_mark_favorite",
        Icon: STAR_ICON,
        PreventHideAfterAction: true,
        ContextData: data,
        Action: async (ctx) => {
          this.update(color.Hex, (entry) => { entry.Favorite = favorite })
          this.persist(ctx)
          await this.api.RefreshQuery(ctx, { PreserveSelectedIndex: true })
        }
      },
      {
        Name: "i18n:plugin_color_name_color",
        Icon: EDIT_ICON,
        Type: "form",
        PreventHideAfterAction: true,
        ContextData: data,
        Form: [{
          Type: "textbox",
          Value: {
            Key: "name",
            Label: "i18n:plugin_color_name_color_label",
            DefaultValue: item.Name || "",
            Tooltip: "i18n:plugin_color_name_color_hint"
          }
        }],
        OnSubmit: async (ctx, form) => {
          const name = String((form && form.Values && form.Values.name) || "").trim()
          this.update(color.Hex, (entry) => { entry.Name = name })
          this.persist(ctx)
          await this.api.RefreshQuery(ctx, { PreserveSelectedIndex: true })
        }
      },
      {
        Name: "i18n:plugin_color_delete",
        Icon: DELETE_ICON,
        PreventHideAfterAction: true,
        Hotkey: primaryHotkey("d"),
        ContextData: data,
        Action: async (ctx) => {
          this.history = this.history.filter((entry) => entry.Hex !== color.Hex)
          this.persist(ctx)
          await this.api.RefreshQuery(ctx, { PreserveSelectedIndex: false })
        }
      }
    ]
  }

  copyAction(name, text, isDefault, data) {
    return {
      Name: name,
      Icon: COPY_ICON,
      IsDefault: isDefault,
      ContextData: data,
      Action: async (ctx) => {
        await this.api.Copy(ctx, { type: "text", text })
      }
    }
  }

  update(hex, change) {
    const entry = this.history.find((item) => item.Hex === hex)
    if (!entry) return
    change(entry)
    entry.LastSeenAt = Date.now()
  }

  restore(mruData) {
    const hex = String((mruData && mruData.ContextData && mruData.ContextData.hex) || "").trim()
    const parsed = parseHexColor(hex)
    if (!parsed) return null
    const item = this.history.find((entry) => entry.Hex === parsed.Hex) || { Hex: parsed.Hex, Name: "", Favorite: false, CreatedAt: 0, LastSeenAt: 0 }
    return this.resultFor(parsed, item)
  }

  async readHistory(ctx) {
    try {
      const raw = await this.api.GetSetting(ctx, HISTORY_KEY)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      return []
    }
  }

  persist(ctx) {
    sortHistory(this.history)
    this.api.SaveSetting(ctx, HISTORY_KEY, JSON.stringify(this.history), false).catch(() => {})
  }
}

const plugin = new ColorPlugin()
module.exports.plugin = plugin
module.exports.parseHexColor = parseHexColor
module.exports.deriveHex = deriveHex
module.exports.rgbText = rgbText
module.exports.hslText = hslText