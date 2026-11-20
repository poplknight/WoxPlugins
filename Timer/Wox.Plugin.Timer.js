// {
//   "Id": "2d9a6b18-7c45-4e03-a8f1-5b0c3e7d2a96",
//   "Name": "i18n:plugin_timer_plugin_name",
//   "Author": "tal",
//   "Version": "1.0.0",
//   "MinWoxVersion": "2.4.5",
//   "Runtime": "NODEJS",
//   "Description": "i18n:plugin_timer_plugin_description",
//   "Icon": "svg:<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='#1d4ed8'/><circle cx='24' cy='26' r='12' fill='#dbeafe'/><path d='M24 26V18M24 26l6 4M20 10h8' stroke='#1e3a8a' stroke-width='2' stroke-linecap='round'/></svg>",
//   "TriggerKeywords": [
//     "timer"
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
//   "I18n": {
//     "en_US": {
//       "plugin_timer_plugin_name": "Timer",
//       "plugin_timer_plugin_description": "Create and manage countdown timers",
//       "plugin_timer_no_timers": "No active timers",
//       "plugin_timer_no_timers_subtitle": "Try timer 5m, timer 1m tea, or timer 1h 15m",
//       "plugin_timer_start_title": "Start timer",
//       "plugin_timer_start_subtitle": "Add a note after the duration, e.g. timer 1h meeting",
//       "plugin_timer_action_start_pinned": "Start and show on desktop",
//       "plugin_timer_action_start_background": "Start in background",
//       "plugin_timer_action_pin_on_desktop": "Show on desktop",
//       "plugin_timer_action_unpin_from_desktop": "Hide from desktop",
//       "plugin_timer_action_pause": "Pause",
//       "plugin_timer_action_resume": "Resume",
//       "plugin_timer_action_edit_note": "Edit note",
//       "plugin_timer_edit_note_label": "Note",
//       "plugin_timer_edit_note_hint": "Optional description shown with the countdown",
//       "plugin_timer_action_delete": "Delete",
//       "plugin_timer_status_paused": "Paused",
//       "plugin_timer_status_pinned": "On desktop",
//       "plugin_timer_started": "Timer started:",
//       "plugin_timer_finished": "Timer finished:",
//       "tool_start_timer": "Start a countdown. duration uses h, m, and s, such as 1h 15m. note is optional.",
//       "tool_list_timers": "List active countdown timers and their remaining time."
//     },
//     "zh_CN": {
//       "plugin_timer_plugin_name": "计时器",
//       "plugin_timer_plugin_description": "创建和管理倒计时",
//       "plugin_timer_no_timers": "没有进行中的计时器",
//       "plugin_timer_no_timers_subtitle": "试试 timer 5m、timer 1m 泡茶 或 timer 1h 15m",
//       "plugin_timer_start_title": "开始计时",
//       "plugin_timer_start_subtitle": "时长后面可加说明，例如 timer 1h 开会",
//       "plugin_timer_action_start_pinned": "开始并显示在桌面",
//       "plugin_timer_action_start_background": "后台开始",
//       "plugin_timer_action_pin_on_desktop": "显示在桌面",
//       "plugin_timer_action_unpin_from_desktop": "取消桌面显示",
//       "plugin_timer_action_pause": "暂停",
//       "plugin_timer_action_resume": "继续",
//       "plugin_timer_action_edit_note": "修改说明",
//       "plugin_timer_edit_note_label": "说明",
//       "plugin_timer_edit_note_hint": "可选，显示在倒计时旁边",
//       "plugin_timer_action_delete": "删除",
//       "plugin_timer_status_paused": "已暂停",
//       "plugin_timer_status_pinned": "显示在桌面",
//       "plugin_timer_started": "计时器已开始：",
//       "plugin_timer_finished": "计时器结束：",
//       "tool_start_timer": "开始一个倒计时。duration 用 h、m、s，例如 1h 15m。note 可选。",
//       "tool_list_timers": "列出正在进行的倒计时和剩余时间。"
//     }
//   }
// }
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const DURATION_RE = /(\d+)\s*([hms])/i
const PLUGIN_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#1d4ed8"/><circle cx="24" cy="26" r="12" fill="#dbeafe"/><path d="M24 26V18M24 26l6 4M20 10h8" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round"/></svg>`)
const PAUSE_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round"><path d="M8 5v14M16 5v14"/></svg>`)
const RUN_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4.5 13.5h5.5L9 22l10-13h-6z"/></svg>`)
const PIN_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l-1 6 4 3v2H6v-2l4-3zM12 15v6"/></svg>`)
const EDIT_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 6.5l4 4M4 20h4l10.5-10.5a2.83 2.83 0 1 0-4-4L4 16v4z"/></svg>`)
const DELETE_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>`)

function icon(svg) {
  return { ImageType: "svg", ImageData: svg }
}

function primaryHotkey(key) {
  return (process.platform === "darwin" ? "cmd" : "ctrl") + "+" + key
}

function parseTimerQuery(input) {
  const text = String(input || "").trim()
  if (!text) return null
  let loc = 0
  let totalMs = 0
  const parts = []
  while (loc < text.length) {
    const rest = text.slice(loc).replace(/^[ \t]+/, "")
    const skipped = text.slice(loc).length - rest.length
    const match = DURATION_RE.exec(rest)
    if (!match || match.index !== 0) break
    const value = Number(match[1])
    const unit = match[2].toLowerCase()
    if (!Number.isFinite(value) || value < 0) return null
    if (unit === "h") totalMs += value * 3600000
    else if (unit === "m") totalMs += value * 60000
    else if (unit === "s") totalMs += value * 1000
    else return null
    parts.push(String(value) + unit)
    loc += skipped + match[0].length
  }
  if (totalMs <= 0 || parts.length === 0) return null
  return {
    durationMs: totalMs,
    durationLabel: parts.join(" "),
    note: text.slice(loc).trim()
  }
}

function formatTimerRemaining(ms) {
  const safe = Math.max(0, ms)
  const totalSec = Math.round(safe / 1000)
  const hours = Math.floor(totalSec / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60
  if (hours > 0) return hours + "h " + String(minutes).padStart(2, "0") + "m " + String(seconds).padStart(2, "0") + "s"
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
}

class TimerPlugin {
  constructor() {
    this.api = null
    this.timers = new Map()
    this.tracked = new Map()
    this.cacheFile = ""
    this.ticker = null
    this.labels = {
      paused: "Paused",
      pinned: "On desktop",
      started: "Timer started:",
      finished: "Timer finished:",
      startTitle: "Start timer"
    }
    this.ctx = null
  }

  async init(ctx, params) {
    this.api = params.API
    this.ctx = ctx
    await this.loadLabels(ctx)
    await this.prepareCache(ctx)
    await this.loadTimers(ctx)
    await this.api.OnMRURestore(ctx, async (_ctx, mruData) => this.restore(mruData))
    await this.api.OnUnload(ctx, async () => {
      if (this.ticker) clearInterval(this.ticker)
      this.saveTimers()
    })
    this.ticker = setInterval(() => {
      this.tick().catch(() => {})
    }, 1000)
    if (this.ticker.unref) this.ticker.unref()
    await this.registerTools(ctx)
  }

  async registerTools(ctx) {
    await this.api.RegisterPluginTool(ctx, {
      Tool: {
        Name: "start_timer",
        Description: "i18n:tool_start_timer",
        InputSchema: {
          type: "object",
          properties: { duration: { type: "string" }, note: { type: "string" } },
          required: ["duration"],
          additionalProperties: false
        },
        OutputSchema: {
          type: "object",
          properties: { id: { type: "string" }, label: { type: "string" }, remaining: { type: "string" } },
          required: ["id", "label", "remaining"]
        },
        Annotations: { ReadOnly: false, Destructive: false, Idempotent: false, RequiresUI: false }
      },
      Handler: async (toolCtx, option) => {
        const parsed = parseTimerQuery([option.Arguments.duration, option.Arguments.note].filter(Boolean).join(" "))
        if (!parsed) return { Error: { Code: "EXECUTION_FAILED", Message: "duration must look like 5m or 1h 15m" } }
        const entry = this.addTimer(parsed.durationMs, parsed.durationLabel, parsed.note)
        this.saveTimers()
        return { Output: { id: entry.ID, label: entry.DurationLabel, remaining: formatTimerRemaining(this.remaining(entry)) } }
      }
    })
    await this.api.RegisterPluginTool(ctx, {
      Tool: {
        Name: "list_timers",
        Description: "i18n:tool_list_timers",
        InputSchema: { type: "object", properties: {}, additionalProperties: false },
        OutputSchema: {
          type: "object",
          properties: {
            timers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  label: { type: "string" },
                  note: { type: "string" },
                  remaining: { type: "string" },
                  paused: { type: "boolean" }
                },
                required: ["id", "label", "note", "remaining", "paused"]
              }
            }
          },
          required: ["timers"]
        },
        Annotations: { ReadOnly: true, Destructive: false, Idempotent: true, RequiresUI: false }
      },
      Handler: async () => ({
        Output: {
          timers: this.list().map((entry) => ({
            id: entry.ID,
            label: entry.DurationLabel,
            note: entry.Note,
            remaining: formatTimerRemaining(this.remaining(entry)),
            paused: entry.Paused
          }))
        }
      })
    })
  }

  async loadLabels(ctx) {
    const pairs = [
      ["paused", "plugin_timer_status_paused"],
      ["pinned", "plugin_timer_status_pinned"],
      ["started", "plugin_timer_started"],
      ["finished", "plugin_timer_finished"],
      ["startTitle", "plugin_timer_start_title"]
    ]
    for (const [field, key] of pairs) {
      const value = await this.translation(ctx, key)
      if (value) this.labels[field] = value
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

  async prepareCache(ctx) {
    try {
      const folder = await this.api.GetCacheFolder(ctx)
      if (folder) this.cacheFile = path.join(folder, "active-timers.json")
    } catch (error) {
      this.cacheFile = ""
    }
  }

  async loadTimers(ctx) {
    if (!this.cacheFile || !fs.existsSync(this.cacheFile)) return
    let saved = []
    try {
      saved = JSON.parse(fs.readFileSync(this.cacheFile, "utf8"))
    } catch (error) {
      return
    }
    if (!Array.isArray(saved)) return
    const now = Date.now()
    const kept = []
    for (const item of saved) {
      if (!item || !item.ID) continue
      const entry = {
        ID: item.ID,
        DurationLabel: item.DurationLabel || "",
        Note: item.Note || "",
        Duration: item.DurationMs || 0,
        Deadline: item.DeadlineUnixMs || now,
        Remaining: item.RemainingMs || 0,
        Paused: Boolean(item.Paused),
        OverlayVisible: false
      }
      if (!entry.Paused && entry.Deadline <= now) {
        await this.notifyFinished(ctx, entry)
        continue
      }
      this.timers.set(entry.ID, entry)
      kept.push(entry)
    }
    if (kept.length !== saved.length) this.saveTimers()
  }

  saveTimers() {
    if (!this.cacheFile) return
    const payload = Array.from(this.timers.values()).map((entry) => ({
      ID: entry.ID,
      DurationLabel: entry.DurationLabel,
      Note: entry.Note,
      DurationMs: entry.Duration,
      DeadlineUnixMs: entry.Deadline,
      RemainingMs: entry.Paused ? entry.Remaining : Math.max(0, entry.Deadline - Date.now()),
      Paused: entry.Paused
    }))
    try {
      fs.mkdirSync(path.dirname(this.cacheFile), { recursive: true })
      fs.writeFileSync(this.cacheFile, JSON.stringify(payload))
    } catch (error) {
      // The countdown still runs in memory when the cache folder is unavailable.
    }
  }

  async query(ctx, query) {
    const parsed = parseTimerQuery(query.Search || "")
    const results = []
    this.tracked = new Map()
    if (parsed) results.push(this.startResult(parsed))
    for (const entry of this.list()) {
      const result = this.timerResult(entry)
      results.push(result)
      this.tracked.set(result.Id, entry.ID)
    }
    if (results.length === 0) {
      results.push({
        Title: "i18n:plugin_timer_no_timers",
        SubTitle: "i18n:plugin_timer_no_timers_subtitle",
        Icon: PLUGIN_ICON,
        Score: 1,
        Actions: []
      })
    }
    return { Results: results }
  }

  startResult(parsed) {
    const data = {
      durationNs: String(parsed.durationMs * 1000000),
      durationLabel: parsed.durationLabel,
      note: parsed.note
    }
    return {
      Id: "start:" + parsed.durationMs + ":" + parsed.note,
      Title: this.labels.startTitle + " " + parsed.durationLabel,
      SubTitle: parsed.note || "i18n:plugin_timer_start_subtitle",
      Icon: PLUGIN_ICON,
      Score: 2000000,
      IdentityKey: "timer:start:" + parsed.durationMs + ":" + parsed.note.trim(),
      Actions: [
        this.bound({
          Name: "i18n:plugin_timer_action_start_pinned",
          Icon: PIN_ICON,
          IsDefault: true,
          ContextData: data,
          Action: async (ctx) => this.start(ctx, parsed, true)
        }, data),
        this.bound({
          Name: "i18n:plugin_timer_action_start_background",
          Icon: RUN_ICON,
          Hotkey: primaryHotkey("enter"),
          ContextData: data,
          Action: async (ctx) => this.start(ctx, parsed, false)
        }, data)
      ]
    }
  }

  async start(ctx, parsed, pinned) {
    const entry = this.addTimer(parsed.durationMs, parsed.durationLabel, parsed.note)
    if (pinned) entry.OverlayVisible = true
    this.saveTimers()
    const display = parsed.note || parsed.durationLabel
    await this.toast(ctx, this.labels.started + " " + display)
  }

  addTimer(durationMs, durationLabel, note) {
    const entry = {
      ID: crypto.randomUUID(),
      DurationLabel: durationLabel,
      Note: note || "",
      Duration: durationMs,
      Deadline: Date.now() + durationMs,
      Remaining: durationMs,
      Paused: false,
      OverlayVisible: false
    }
    this.timers.set(entry.ID, entry)
    return entry
  }

  timerResult(entry) {
    const remaining = this.remaining(entry)
    const data = this.entryContext(entry)
    return {
      Id: entry.ID,
      Title: formatTimerRemaining(remaining),
      SubTitle: this.subtitle(entry),
      Icon: entry.Paused ? PAUSE_ICON : PLUGIN_ICON,
      Score: 1000000 - Math.floor(remaining / 1000),
      IdentityKey: "timer:" + entry.ID,
      Tails: this.tails(entry),
      Actions: this.timerActions(entry).map((action) => this.bound(action, data))
    }
  }

  subtitle(entry) {
    const parts = [entry.Note || entry.DurationLabel]
    if (entry.Paused) parts.push(this.labels.paused)
    return parts.join(" · ")
  }

  tails(entry) {
    const tails = [{ Type: "text", Text: entry.DurationLabel }]
    if (entry.OverlayVisible) tails.push({ Type: "text", Text: this.labels.pinned })
    return tails
  }

  timerActions(entry) {
    const actions = []
    if (entry.Paused) {
      actions.push({
        Id: entry.ID + ":resume",
        Name: "i18n:plugin_timer_action_resume",
        Icon: RUN_ICON,
        IsDefault: true,
        PreventHideAfterAction: true,
        Action: async (ctx, actionContext) => {
          this.resume(entry.ID)
          await this.push(ctx, actionContext && actionContext.ResultId, entry.ID)
        }
      })
    } else {
      actions.push({
        Id: entry.ID + ":pause",
        Name: "i18n:plugin_timer_action_pause",
        Icon: PAUSE_ICON,
        IsDefault: true,
        PreventHideAfterAction: true,
        Action: async (ctx, actionContext) => {
          this.pause(entry.ID)
          await this.push(ctx, actionContext && actionContext.ResultId, entry.ID)
        }
      })
    }
    actions.push({
      Id: entry.ID + ":pin",
      Name: entry.OverlayVisible ? "i18n:plugin_timer_action_unpin_from_desktop" : "i18n:plugin_timer_action_pin_on_desktop",
      Icon: PIN_ICON,
      Hotkey: primaryHotkey("enter"),
      PreventHideAfterAction: true,
      Action: async (ctx, actionContext) => {
        const current = this.timers.get(entry.ID)
        if (current) current.OverlayVisible = !current.OverlayVisible
        this.saveTimers()
        await this.push(ctx, actionContext && actionContext.ResultId, entry.ID)
      }
    })
    actions.push({
      Id: entry.ID + ":edit_note",
      Name: "i18n:plugin_timer_action_edit_note",
      Icon: EDIT_ICON,
      Type: "form",
      PreventHideAfterAction: true,
      Form: [{
        Type: "textbox",
        Value: {
          Key: "note",
          Label: "i18n:plugin_timer_edit_note_label",
          DefaultValue: entry.Note,
          Tooltip: "i18n:plugin_timer_edit_note_hint"
        }
      }],
      OnSubmit: async (ctx, form) => {
        const current = this.timers.get(entry.ID)
        if (current) current.Note = String((form && form.Values && form.Values.note) || "").trim()
        this.saveTimers()
        await this.api.RefreshQuery(ctx, { PreserveSelectedIndex: true })
      }
    })
    actions.push({
      Id: entry.ID + ":delete",
      Name: "i18n:plugin_timer_action_delete",
      Icon: DELETE_ICON,
      PreventHideAfterAction: true,
      Action: async (ctx) => {
        this.timers.delete(entry.ID)
        this.saveTimers()
        await this.api.RefreshQuery(ctx, { PreserveSelectedIndex: true })
      }
    })
    return actions
  }

  bound(action, data) {
    action.ContextData = Object.assign({}, data, action.ContextData || {})
    return action
  }

  entryContext(entry) {
    return {
      durationNs: String(entry.Duration * 1000000),
      durationLabel: entry.DurationLabel,
      note: entry.Note,
      timerId: entry.ID
    }
  }

  pause(id) {
    const entry = this.timers.get(id)
    if (!entry || entry.Paused) return
    entry.Remaining = Math.max(0, entry.Deadline - Date.now())
    entry.Paused = true
    this.saveTimers()
  }

  resume(id) {
    const entry = this.timers.get(id)
    if (!entry || !entry.Paused) return
    entry.Deadline = Date.now() + entry.Remaining
    entry.Paused = false
    this.saveTimers()
  }

  remaining(entry) {
    if (!entry) return 0
    if (entry.Paused) return Math.max(0, entry.Remaining)
    return Math.max(0, entry.Deadline - Date.now())
  }

  list() {
    return Array.from(this.timers.values()).sort((a, b) => this.remaining(a) - this.remaining(b))
  }

  async push(ctx, resultId, timerId) {
    const entry = this.timers.get(timerId)
    if (!entry || !resultId) return
    const result = this.timerResult(entry)
    await this.api.UpdateResult(ctx, {
      Id: resultId,
      Title: result.Title,
      SubTitle: result.SubTitle,
      Icon: result.Icon,
      Tails: result.Tails,
      Actions: result.Actions
    })
  }

  async tick() {
    const finished = []
    const now = Date.now()
    for (const entry of this.timers.values()) {
      if (!entry.Paused && entry.Deadline <= now) finished.push(entry)
    }
    for (const entry of finished) {
      this.timers.delete(entry.ID)
      this.saveTimers()
      await this.notifyFinished(null, entry)
    }
    const ctx = this.ctx || {}
    if (finished.length && this.api) {
      try {
        if (await this.api.IsVisible(ctx)) {
          await this.api.RefreshQuery(ctx, { PreserveSelectedIndex: true })
        }
      } catch (error) {
        // A tick can run without a launcher context. The next query shows the shorter list.
      }
    }
    if (!this.api) return
    let visible = false
    try {
      visible = await this.api.IsVisible(ctx)
    } catch (error) {
      visible = false
    }
    if (!visible) return
    for (const [resultId, timerId] of this.tracked) {
      if (!this.timers.has(timerId)) {
        this.tracked.delete(resultId)
        continue
      }
      try {
        await this.push(ctx, resultId, timerId)
      } catch (error) {
        // The row may already have left the screen.
      }
    }
  }

  async notifyFinished(ctx, entry) {
    const display = entry.Note || entry.DurationLabel
    const message = this.labels.finished + " " + display
    await this.toast(ctx, message)
  }

  async toast(ctx, message) {
    if (!this.api) return
    const context = ctx || {}
    try {
      await this.api.ShowToastMsg(context, { Message: message })
    } catch (error) {
      try {
        await this.api.Notify(context, message)
      } catch (notifyError) {
        // Notifications are optional when the host has no visible session.
      }
    }
  }

  restore(mruData) {
    const data = (mruData && mruData.ContextData) || {}
    const timerId = String(data.timerId || "").trim()
    if (timerId && this.timers.has(timerId)) return this.timerResult(this.timers.get(timerId))
    const durationNs = Number(data.durationNs || 0)
    if (!Number.isFinite(durationNs) || durationNs <= 0) return null
    const durationMs = Math.round(durationNs / 1000000)
    return this.startResult({
      durationMs,
      durationLabel: String(data.durationLabel || formatTimerRemaining(durationMs)),
      note: String(data.note || "")
    })
  }
}

const plugin = new TimerPlugin()
module.exports.plugin = plugin
module.exports.parseTimerQuery = parseTimerQuery
module.exports.formatTimerRemaining = formatTimerRemaining