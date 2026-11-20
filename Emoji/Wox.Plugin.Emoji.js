// {
//   "Id": "4e7c9a31-6b20-4d85-8f14-1a3c5e9b7d02",
//   "Name": "i18n:plugin_emoji_plugin_name",
//   "Author": "tal",
//   "Version": "1.0.0",
//   "MinWoxVersion": "2.4.5",
//   "Runtime": "NODEJS",
//   "Description": "i18n:plugin_emoji_plugin_description",
//   "Icon": "svg:<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='#f59e0b'/><circle cx='18' cy='20' r='2.5' fill='#78350f'/><circle cx='30' cy='20' r='2.5' fill='#78350f'/><path d='M16 28c2 4 14 4 16 0' stroke='#78350f' stroke-width='2.5' fill='none' stroke-linecap='round'/></svg>",
//   "TriggerKeywords": [
//     "emoji"
//   ],
//   "SupportedOS": [
//     "Windows",
//     "Linux",
//     "Macos"
//   ],
//   "Features": [
//     {
//       "Name": "ai"
//     },
//     {
//       "Name": "queryEnv",
//       "Params": {
//         "requireActiveWindowName": true,
//         "requireActiveWindowPid": true,
//         "requireActiveWindowIcon": true
//       }
//     },
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
//         "Key": "primary_action",
//         "Label": "i18n:plugin_emoji_primary_action",
//         "Tooltip": "i18n:plugin_emoji_primary_action_tooltip",
//         "DefaultValue": "paste",
//         "Options": [
//           {
//             "Label": "i18n:plugin_emoji_primary_action_copy_to_clipboard",
//             "Value": "copy"
//           },
//           {
//             "Label": "i18n:plugin_emoji_primary_action_paste_to_active_app",
//             "Value": "paste"
//           }
//         ]
//       }
//     },
//     {
//       "Type": "checkbox",
//       "Value": {
//         "Key": "aiMatchEnabled",
//         "Label": "i18n:plugin_emoji_setting_ai_enable_label",
//         "Tooltip": "i18n:plugin_emoji_setting_ai_enable_tooltip",
//         "DefaultValue": "false"
//       }
//     },
//     {
//       "Type": "selectAIModel",
//       "Value": {
//         "Key": "aiModel",
//         "Label": "i18n:plugin_emoji_setting_ai_model_label",
//         "Tooltip": "i18n:plugin_emoji_setting_ai_model_tooltip"
//       }
//     }
//   ],
//   "I18n": {
//     "en_US": {
//       "plugin_emoji_plugin_name": "Emoji",
//       "plugin_emoji_plugin_description": "Search and copy emojis",
//       "plugin_emoji_primary_action": "Primary action",
//       "plugin_emoji_primary_action_tooltip": "Choose the default action to perform on an emoji when pressing Enter.",
//       "plugin_emoji_primary_action_copy_to_clipboard": "Copy to clipboard",
//       "plugin_emoji_primary_action_paste_to_active_app": "Paste to active app",
//       "plugin_emoji_copy": "Copy emoji",
//       "plugin_emoji_copy_large": "Copy large icon",
//       "plugin_emoji_remove_frequently_used": "Remove from frequently used",
//       "plugin_emoji_frequently_used": "Frequently Used",
//       "plugin_emoji_add_keyword": "Add keyword",
//       "plugin_emoji_add_keyword_label": "Keyword",
//       "plugin_emoji_add_keyword_hint": "Add custom keywords to help you find this emoji faster, separate multiple with commas.",
//       "plugin_emoji_ai_group": "AI Matches",
//       "plugin_emoji_ai_matching": "AI matching...",
//       "plugin_emoji_ai_matching_subtitle": "Generating emoji suggestions",
//       "plugin_emoji_ai_no_result": "AI found no results",
//       "plugin_emoji_ai_failed": "AI match failed",
//       "plugin_emoji_setting_ai_enable_label": "Enable AI matching",
//       "plugin_emoji_setting_ai_enable_tooltip": "Use AI to match emojis when typing.",
//       "plugin_emoji_setting_ai_model_label": "AI model",
//       "plugin_emoji_setting_ai_model_tooltip": "Model used for AI emoji matching.",
//       "plugin_paste_to_window": "Paste to %s",
//       "plugin_emoji_catalog_missing": "Emoji catalog is missing",
//       "tool_search_emojis": "Search emojis by name, keyword, or character."
//     },
//     "zh_CN": {
//       "plugin_emoji_plugin_name": "表情符号",
//       "plugin_emoji_plugin_description": "搜索并复制表情符号",
//       "plugin_emoji_primary_action": "主要操作",
//       "plugin_emoji_primary_action_tooltip": "选择按回车时对表情执行的默认操作。",
//       "plugin_emoji_primary_action_copy_to_clipboard": "复制到剪贴板",
//       "plugin_emoji_primary_action_paste_to_active_app": "粘贴到活动应用程序",
//       "plugin_emoji_copy": "复制表情",
//       "plugin_emoji_copy_large": "复制大图标",
//       "plugin_emoji_remove_frequently_used": "从常用中移除",
//       "plugin_emoji_frequently_used": "常用",
//       "plugin_emoji_add_keyword": "添加关键字",
//       "plugin_emoji_add_keyword_label": "关键字",
//       "plugin_emoji_add_keyword_hint": "添加自定义关键字，帮助您更快搜索到该表情，多个关键字用逗号分隔。",
//       "plugin_emoji_ai_group": "AI 匹配",
//       "plugin_emoji_ai_matching": "AI 匹配中...",
//       "plugin_emoji_ai_matching_subtitle": "正在生成表情建议",
//       "plugin_emoji_ai_no_result": "AI 未找到结果",
//       "plugin_emoji_ai_failed": "AI 匹配失败",
//       "plugin_emoji_setting_ai_enable_label": "启用 AI 匹配",
//       "plugin_emoji_setting_ai_enable_tooltip": "使用 AI 在输入时匹配表情。",
//       "plugin_emoji_setting_ai_model_label": "AI 模型",
//       "plugin_emoji_setting_ai_model_tooltip": "用于表情匹配的 AI 模型。",
//       "plugin_paste_to_window": "粘贴到%s",
//       "plugin_emoji_catalog_missing": "找不到表情目录",
//       "tool_search_emojis": "按名称、关键词或字符搜索表情。"
//     }
//   }
// }
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const { spawn } = require("child_process")

const BROWSE_PER_CATEGORY = 20
const FREQUENT_LIMIT = 16
const FREQUENT_STORE_CAP = 50
const COPY_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`)
const PASTE_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="7" width="12" height="14" rx="2"/><path d="M9 7V5h6v2M9 13h6M9 17h4"/></svg>`)
const EDIT_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 6.5l4 4M4 20h4l10.5-10.5a2.83 2.83 0 1 0-4-4L4 16v4z"/></svg>`)
const DELETE_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>`)
const PLUGIN_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#f59e0b"/><circle cx="18" cy="20" r="2.5" fill="#78350f"/><circle cx="30" cy="20" r="2.5" fill="#78350f"/><path d="M16 28c2 4 14 4 16 0" stroke="#78350f" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`)

function icon(svg) {
  return { ImageType: "svg", ImageData: svg }
}

function primaryHotkey(key) {
  return (process.platform === "darwin" ? "cmd" : "ctrl") + "+" + key
}

function normalizeTerms(values) {
  const seen = new Set()
  const terms = []
  for (const value of values) {
    const term = String(value || "").trim().toLowerCase()
    if (!term || seen.has(term)) continue
    seen.add(term)
    terms.push(term)
  }
  return terms
}

function loadCatalog(file) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"))
  const entries = []
  const seen = new Set()
  for (const category of data) {
    const categories = Object.assign({}, category.name_i18n || {})
    for (const sub of category.list || []) {
      for (const emoji of sub.list || []) {
        const char = emoji.char || ""
        if (!char || seen.has(char)) continue
        seen.add(char)
        const names = Object.assign({}, emoji.name_i18n || {})
        entries.push({
          emoji: char,
          names,
          categories,
          terms: normalizeTerms(Object.values(names).concat(Object.values(categories)))
        })
      }
    }
  }
  return entries
}

function preferredLangs(lang) {
  const keys = []
  if (lang) {
    keys.push(lang)
    const base = lang.split("_")[0]
    if (base && base !== lang) keys.push(base)
  }
  keys.push("en")
  return keys
}

function pickName(map, lang) {
  for (const key of preferredLangs(lang)) {
    const value = String((map && map[key]) || "").trim()
    if (value) return value
  }
  for (const value of Object.values(map || {})) {
    const trimmed = String(value || "").trim()
    if (trimmed) return trimmed
  }
  return ""
}

function matchEntry(entry, search, extras) {
  const query = String(search || "").trim().toLowerCase()
  if (!query) return true
  if (entry.emoji.includes(query)) return true
  if (entry.terms.some((term) => term.includes(query))) return true
  return (extras || []).some((item) => String(item).toLowerCase().includes(query))
}

function selectBrowse(entries, usage, excluded, lang) {
  const order = []
  const grouped = new Map()
  entries.forEach((entry, index) => {
    if (excluded.has(entry.emoji)) return
    if (String(entry.categories.en || "").trim().toLowerCase() === "component") return
    const category = pickName(entry.categories, lang)
    if (!category) return
    if (!grouped.has(category)) {
      grouped.set(category, [])
      order.push(category)
    }
    grouped.get(category).push({ entry, index, useCount: usage.get(entry.emoji) || 0, category })
  })
  const results = []
  for (const category of order) {
    const items = grouped.get(category).sort((a, b) => b.useCount - a.useCount || a.index - b.index).slice(0, BROWSE_PER_CATEGORY)
    results.push(...items)
  }
  return results
}

function compactTitle(title) {
  const chars = Array.from(String(title || ""))
  if (chars.length <= 28) return chars.join("")
  return chars.slice(0, 27).join("") + "…"
}

class EmojiPlugin {
  constructor() {
    this.api = null
    this.entries = []
    this.byChar = new Map()
    this.usages = []
    this.custom = {}
    this.lang = "en"
    this.primary = "paste"
    this.aiEnabled = false
    this.aiModel = null
    this.pasteTemplate = "Paste to %s"
    this.ready = false
  }

  async init(ctx, params) {
    this.api = params.API
    this.loadEntries()
    await this.refresh(ctx)
    await this.api.OnSettingChanged(ctx, async (settingCtx) => {
      await this.refresh(settingCtx)
    })
    await this.api.OnMRURestore(ctx, async (_ctx, mruData) => this.restore(mruData))
    await this.api.RegisterPluginTool(ctx, {
      Tool: {
        Name: "search_emojis",
        Description: "i18n:tool_search_emojis",
        InputSchema: {
          type: "object",
          properties: { query: { type: "string" }, limit: { type: "integer" } },
          required: ["query"],
          additionalProperties: false
        },
        OutputSchema: {
          type: "object",
          properties: {
            emojis: {
              type: "array",
              items: {
                type: "object",
                properties: { emoji: { type: "string" }, name: { type: "string" } },
                required: ["emoji", "name"]
              }
            }
          },
          required: ["emojis"]
        },
        Annotations: { ReadOnly: true, Destructive: false, Idempotent: true, RequiresUI: false }
      },
      Handler: async (_ctx, option) => {
        const limit = Math.max(1, Math.min(50, Number(option.Arguments.limit || 20)))
        const found = []
        for (const entry of this.entries) {
          if (!matchEntry(entry, option.Arguments.query || "", this.custom[entry.emoji])) continue
          found.push({ emoji: entry.emoji, name: pickName(entry.names, this.lang) || entry.emoji })
          if (found.length >= limit) break
        }
        return { Output: { emojis: found } }
      }
    })
  }

  loadEntries() {
    const file = path.join(__dirname, "emoji-data.json")
    if (!fs.existsSync(file)) return
    this.entries = loadCatalog(file)
    this.byChar = new Map(this.entries.map((entry) => [entry.emoji, entry]))
    this.ready = true
  }

  async refresh(ctx) {
    const name = await this.translation(ctx, "plugin_emoji_plugin_name")
    if (name === "表情符号") this.lang = "zh_CN"
    else if (name) this.lang = "en"
    const paste = await this.translation(ctx, "plugin_paste_to_window")
    if (paste) this.pasteTemplate = paste
    this.primary = (await this.setting(ctx, "primary_action", "paste")) === "copy" ? "copy" : "paste"
    this.aiEnabled = String(await this.setting(ctx, "aiMatchEnabled", "false")).toLowerCase() === "true"
    this.aiModel = this.parseModel(await this.setting(ctx, "aiModel", ""))
    this.usages = this.parseJson(await this.setting(ctx, "frequentlyUsed", ""), [])
    const custom = this.parseJson(await this.setting(ctx, "customDescriptions", ""), {})
    this.custom = custom && typeof custom === "object" ? custom : {}
  }

  parseModel(raw) {
    if (!raw) return null
    try {
      const model = JSON.parse(raw)
      if (model && model.Name && model.Provider) return model
    } catch (error) {
      return null
    }
    return null
  }

  parseJson(raw, fallback) {
    if (!raw) return fallback
    try {
      return JSON.parse(raw)
    } catch (error) {
      return fallback
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

  async query(ctx, query) {
    await this.refresh(ctx)
    if (!this.ready) {
      return { Results: [{ Title: "i18n:plugin_emoji_catalog_missing", Icon: PLUGIN_ICON, Actions: [] }] }
    }
    const search = String(query.Search || "").trim().toLowerCase()
    const frequent = this.frequent()
    const frequentSet = new Set(frequent.map((item) => item.Emoji))
    const results = []
    const seen = new Set()
    for (const usage of frequent) {
      const entry = this.byChar.get(usage.Emoji)
      if (!entry || !matchEntry(entry, search, this.custom[entry.emoji])) continue
      const result = this.resultFor(query, entry, true)
      result.Group = "i18n:plugin_emoji_frequently_used"
      result.GroupScore = 100
      results.push(result)
      seen.add(entry.emoji)
    }
    if (!search) {
      const usage = new Map(this.usages.map((item) => [item.Emoji, item.UseCount]))
      const browse = selectBrowse(this.entries, usage, frequentSet, this.lang)
      browse.forEach((item, index) => {
        const result = this.resultFor(query, item.entry, false)
        result.Group = item.category
        result.GroupScore = 50
        result.Score = browse.length - index
        results.push(result)
        seen.add(item.entry.emoji)
      })
    } else {
      let count = 0
      for (const entry of this.entries) {
        if (frequentSet.has(entry.emoji)) continue
        if (!matchEntry(entry, search, this.custom[entry.emoji])) continue
        const result = this.resultFor(query, entry, false)
        result.Group = pickName(entry.categories, this.lang)
        result.GroupScore = 50
        results.push(result)
        seen.add(entry.emoji)
        count++
        if (count >= 100) break
      }
    }
    this.maybeAI(ctx, query, search, seen, results)
    return {
      Results: results,
      Layout: { GridLayout: { Columns: 10, ItemPadding: 12, ItemMargin: 6, ShowTitle: false } }
    }
  }

  maybeAI(ctx, query, search, seen, results) {
    if (!query.Id || !this.aiEnabled || search.length < 2 || !this.aiModel) return
    const placeholderId = crypto.randomUUID()
    results.push({
      Id: placeholderId,
      Title: "i18n:plugin_emoji_ai_matching",
      SubTitle: "i18n:plugin_emoji_ai_matching_subtitle",
      Icon: PLUGIN_ICON,
      Group: "i18n:plugin_emoji_ai_group",
      GroupScore: 90,
      Score: 90,
      Actions: []
    })
    const conversations = [
      { Role: "system", Text: "You are an emoji matcher. Return JSON only." },
      { Role: "user", Text: `Query: ${search}\nReturn JSON: {"emojis": ["😀", "😄"]}. Return up to 12 emojis.` }
    ]
    this.api.AIChatStream(ctx, this.aiModel, conversations, { ThinkingMode: "non_thinking" }, (stream) => {
      this.onAIStream(ctx, query, stream, seen, placeholderId)
    }).catch(() => {
      this.failAI(ctx, placeholderId)
    })
  }

  onAIStream(ctx, query, stream, seen, placeholderId) {
    const status = stream && stream.Status
    if (status === "error") {
      this.failAI(ctx, placeholderId)
      return
    }
    if (status !== "finished") return
    const matches = this.parseAI(stream.Data || "").filter((entry) => !seen.has(entry.emoji)).slice(0, 12)
    if (matches.length === 0) {
      this.api.UpdateResult(ctx, {
        Id: placeholderId,
        SubTitle: "i18n:plugin_emoji_ai_no_result",
        Icon: { ImageType: "emoji", ImageData: "😕" }
      }).catch(() => {})
      return
    }
    const built = matches.map((entry) => {
      const result = this.resultFor(query, entry, false)
      result.Group = "i18n:plugin_emoji_ai_group"
      result.GroupScore = 90
      result.Score = 90
      return result
    })
    const first = built[0]
    this.api.UpdateResult(ctx, {
      Id: placeholderId,
      Title: first.Title,
      SubTitle: first.SubTitle,
      Icon: first.Icon,
      Actions: first.Actions
    }).catch(() => {})
    if (built.length > 1) this.api.PushResults(ctx, query, built.slice(1)).catch(() => {})
  }

  failAI(ctx, placeholderId) {
    this.api.UpdateResult(ctx, {
      Id: placeholderId,
      SubTitle: "i18n:plugin_emoji_ai_failed",
      Icon: { ImageType: "emoji", ImageData: "⚠️" }
    }).catch(() => {})
  }

  parseAI(data) {
    const found = []
    const seen = new Set()
    const add = (char) => {
      const entry = this.byChar.get(String(char || "").trim())
      if (!entry || seen.has(entry.emoji)) return
      seen.add(entry.emoji)
      found.push(entry)
    }
    try {
      const parsed = JSON.parse(data)
      const list = parsed && parsed.emojis
      if (Array.isArray(list)) list.forEach(add)
    } catch (error) {
      for (const entry of this.entries) {
        if (data.includes(entry.emoji)) add(entry.emoji)
      }
    }
    return found
  }

  resultFor(query, entry, frequent) {
    const title = pickName(entry.names, this.lang) || entry.emoji
    const english = String(entry.names.en || "").trim()
    const subtitle = english && english.toLowerCase() !== title.toLowerCase() ? english : ""
    return {
      Title: title,
      SubTitle: subtitle,
      Icon: { ImageType: "emoji", ImageData: entry.emoji },
      IdentityKey: entry.emoji,
      Actions: this.actions(query, entry, frequent)
    }
  }

  actions(query, entry, frequent) {
    const copyDefault = this.primary === "copy"
    const data = { emoji: entry.emoji }
    const copyAction = {
      Name: "i18n:plugin_emoji_copy",
      Icon: COPY_ICON,
      IsDefault: copyDefault,
      ContextData: data,
      Action: async (ctx) => {
        await this.api.Copy(ctx, { type: "text", text: entry.emoji })
        this.record(ctx, entry.emoji)
      }
    }
    if (!copyDefault) copyAction.Hotkey = primaryHotkey("enter")
    const actions = [copyAction]
    const env = query.Env || {}
    if (env.ActiveWindowTitle || env.ActiveWindowPid) {
      const windowName = compactTitle(env.ActiveWindowTitle || "")
      const paste = {
        Name: windowName ? this.pasteTemplate.replace("%s", windowName) : "i18n:plugin_emoji_primary_action_paste_to_active_app",
        Icon: PASTE_ICON,
        IsDefault: !copyDefault,
        ContextData: data,
        Action: async (ctx) => {
          await this.api.Copy(ctx, { type: "text", text: entry.emoji })
          this.record(ctx, entry.emoji)
          try { await this.api.HideApp(ctx) } catch (error) {}
          setTimeout(() => this.pasteKeys(), 150)
        }
      }
      if (copyDefault) paste.Hotkey = primaryHotkey("enter")
      if (env.ActiveWindowIcon && env.ActiveWindowIcon.ImageData) paste.TailIcon = env.ActiveWindowIcon
      actions.push(paste)
    }
    actions.push({
      Name: "i18n:plugin_emoji_copy_large",
      Icon: COPY_ICON,
      ContextData: data,
      Action: async (ctx) => {
        await this.api.Copy(ctx, { type: "image", text: "", woxImage: { ImageType: "emoji", ImageData: entry.emoji } })
        this.record(ctx, entry.emoji)
      }
    })
    actions.push({
      Name: "i18n:plugin_emoji_add_keyword",
      Icon: EDIT_ICON,
      Type: "form",
      PreventHideAfterAction: true,
      ContextData: data,
      Form: [{
        Type: "textbox",
        Value: {
          Key: "keyword",
          Label: "i18n:plugin_emoji_add_keyword_label",
          DefaultValue: (this.custom[entry.emoji] || []).join(", "),
          Tooltip: "i18n:plugin_emoji_add_keyword_hint"
        }
      }],
      OnSubmit: async (ctx, form) => {
        const raw = String((form && form.Values && form.Values.keyword) || "").trim()
        if (!raw) return
        const parts = raw.split(",").map((part) => part.trim()).filter(Boolean)
        this.addKeywords(entry.emoji, parts)
        await this.api.SaveSetting(ctx, "customDescriptions", JSON.stringify(this.custom), false)
        await this.api.RefreshQuery(ctx, { PreserveSelectedIndex: true })
      }
    })
    if (frequent) {
      actions.push({
        Name: "i18n:plugin_emoji_remove_frequently_used",
        Icon: DELETE_ICON,
        PreventHideAfterAction: true,
        ContextData: data,
        Action: async (ctx) => {
          this.usages = this.usages.filter((item) => item.Emoji !== entry.emoji)
          await this.api.SaveSetting(ctx, "frequentlyUsed", JSON.stringify(this.usages), false)
          await this.api.RefreshQuery(ctx, { PreserveSelectedIndex: true })
        }
      })
    }
    return actions
  }

  pasteKeys() {
    if (process.platform === "darwin") {
      spawn("osascript", ["-e", 'tell application "System Events" to keystroke "v" using command down'], { detached: true, stdio: "ignore" }).unref()
    } else if (process.platform === "win32") {
      spawn("powershell", ["-NoProfile", "-Command", "(New-Object -ComObject WScript.Shell).SendKeys('^v')"], { detached: true, stdio: "ignore", windowsHide: true }).unref()
    } else {
      spawn("xdotool", ["key", "ctrl+v"], { detached: true, stdio: "ignore" }).unref()
    }
  }

  addKeywords(emoji, parts) {
    const values = this.custom[emoji] ? this.custom[emoji].slice() : []
    for (const part of parts) {
      if (!values.some((item) => item.toLowerCase() === part.toLowerCase())) values.push(part)
    }
    this.custom[emoji] = values
  }

  record(ctx, emoji) {
    const existing = this.usages.find((item) => item.Emoji === emoji)
    if (existing) existing.UseCount += 1
    else this.usages.push({ Emoji: emoji, UseCount: 1 })
    this.usages.sort((a, b) => b.UseCount - a.UseCount)
    this.usages = this.usages.slice(0, FREQUENT_STORE_CAP)
    this.api.SaveSetting(ctx, "frequentlyUsed", JSON.stringify(this.usages), false).catch(() => {})
  }

  frequent() {
    return this.usages.slice().sort((a, b) => b.UseCount - a.UseCount).slice(0, FREQUENT_LIMIT)
  }

  restore(mruData) {
    const emoji = String((mruData && mruData.ContextData && mruData.ContextData.emoji) || "")
    const entry = this.byChar.get(emoji)
    if (!entry) return null
    return this.resultFor({}, entry, false)
  }
}

const plugin = new EmojiPlugin()
module.exports.plugin = plugin
module.exports.loadCatalog = loadCatalog
module.exports.matchEntry = matchEntry
module.exports.selectBrowse = selectBrowse