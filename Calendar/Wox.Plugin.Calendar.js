// {
//   "Id": "b7d2e4a1-8c53-4f60-9a27-3c1e6d8b0f45",
//   "Name": "i18n:plugin_calendar_plugin_name",
//   "Author": "tal",
//   "Version": "1.0.0",
//   "MinWoxVersion": "2.4.5",
//   "Runtime": "NODEJS",
//   "Description": "i18n:plugin_calendar_plugin_description",
//   "Website": "https://github.com/poplknight/WoxPlugins",
//   "Icon": "svg:<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='#9f1239'/><rect x='10' y='14' width='28' height='24' rx='4' fill='#fff'/><path d='M10 21h28' stroke='#fecdd3' stroke-width='3'/><path d='M18 11v6M30 11v6' stroke='#fff' stroke-width='3' stroke-linecap='round'/><circle cx='24' cy='30' r='4' fill='#9f1239'/></svg>",
//   "TriggerKeywords": [
//     "日历"
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
//       "plugin_calendar_plugin_name": "Calendar",
//       "plugin_calendar_plugin_description": "Show a month calendar with today selected, plus the week, month, and year",
//       "plugin_calendar_copy": "Copy date",
//       "plugin_calendar_copied": "Copied",
//       "plugin_calendar_prev_month": "Previous month",
//       "plugin_calendar_next_month": "Next month",
//       "plugin_calendar_prev_year": "Previous year",
//       "plugin_calendar_next_year": "Next year",
//       "plugin_calendar_today": "Back to today",
//       "plugin_calendar_today_label": "Today",
//       "tool_calendar_info": "Return the year, month, week, and weekday for a date."
//     },
//     "zh_CN": {
//       "plugin_calendar_plugin_name": "日历",
//       "plugin_calendar_plugin_description": "打开月历，高亮今天，并标出周、月、年",
//       "plugin_calendar_copy": "复制日期",
//       "plugin_calendar_copied": "已复制",
//       "plugin_calendar_prev_month": "上个月",
//       "plugin_calendar_next_month": "下个月",
//       "plugin_calendar_prev_year": "上一年",
//       "plugin_calendar_next_year": "下一年",
//       "plugin_calendar_today": "回到今天",
//       "plugin_calendar_today_label": "今天",
//       "tool_calendar_info": "返回某个日期的年、月、周和星期。"
//     }
//   }
// }
const WEEK_HEADS = ["一", "二", "三", "四", "五", "六", "日"]
const WEEKDAY_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
const FALLBACK_LABELS = {
  copy: "复制日期",
  copied: "已复制",
  prevMonth: "上个月",
  nextMonth: "下个月",
  prevYear: "上一年",
  nextYear: "下一年",
  today: "回到今天",
  todayLabel: "今天"
}
const FALLBACK_COLORS = {
  Background: "#1c1917",
  Text: "#fafaf9",
  SecondaryText: "#a8a29e",
  Border: "#44403c",
  Accent: "#9f1239",
  AccentText: "#ffffff",
  Selection: "#44403c"
}
const COPY_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`)
const PREV_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>`)
const NEXT_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wox-theme-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>`)
const RESULT_ICON = icon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#9f1239"/><rect x="10" y="14" width="28" height="24" rx="4" fill="#fff"/><path d="M10 21h28" stroke="#fecdd3" stroke-width="3"/><path d="M18 11v6M30 11v6" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="30" r="4" fill="#9f1239"/></svg>`)

function icon(svg) {
  return { ImageType: "svg", ImageData: svg }
}

function isoWeek(date) {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = utc.getUTCDay() || 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((utc - yearStart) / 86400000) + 1) / 7)
  return { year: utc.getUTCFullYear(), week }
}

function shiftMonth(anchor, delta) {
  const date = new Date(anchor.year, anchor.month - 1 + delta, 1)
  return { year: date.getFullYear(), month: date.getMonth() + 1 }
}

function monthWeeks(year, month) {
  const first = new Date(year, month - 1, 1)
  const offset = (first.getDay() + 6) % 7
  const start = new Date(year, month - 1, 1 - offset)
  const weeks = []
  for (let index = 0; index < 6; index++) {
    const days = []
    for (let column = 0; column < 7; column++) {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index * 7 + column)
      days.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        inMonth: date.getMonth() === month - 1
      })
    }
    const monday = new Date(days[0].year, days[0].month - 1, days[0].day)
    weeks.push({ week: isoWeek(monday).week, days })
  }
  if (weeks.length && weeks[weeks.length - 1].days.every((day) => !day.inMonth)) weeks.pop()
  return weeks
}

function parseCalendarQuery(search, today) {
  const text = String(search || "").trim()
  const current = { year: today.getFullYear(), month: today.getMonth() + 1 }
  if (!text || /^(今天|本月|这个月)$/.test(text)) return current
  if (/^(上月|上个月)$/.test(text)) return shiftMonth(current, -1)
  if (/^(下月|下个月)$/.test(text)) return shiftMonth(current, 1)
  if (text === "去年") return { year: current.year - 1, month: current.month }
  if (text === "明年") return { year: current.year + 1, month: current.month }
  const dated = text.match(/^(\d{4})\s*[-/.年]\s*(\d{1,2})\s*(?:月)?(?:\s*[-/.]?\s*(\d{1,2})\s*日?)?$/)
  if (dated) {
    const month = Number(dated[2])
    const day = dated[3] ? Number(dated[3]) : 0
    const maxDay = new Date(Number(dated[1]), month, 0).getDate()
    if (month >= 1 && month <= 12 && (!day || (day >= 1 && day <= maxDay))) {
      return { year: Number(dated[1]), month, day: day || 0 }
    }
  }
  const yearOnly = text.match(/^(\d{4})\s*年?$/)
  if (yearOnly) {
    const year = Number(yearOnly[1])
    return { year, month: year === current.year ? current.month : 1 }
  }
  const monthOnly = text.match(/^(\d{1,2})\s*月$/)
  if (monthOnly) {
    const month = Number(monthOnly[1])
    if (month >= 1 && month <= 12) return { year: current.year, month }
  }
  return null
}

function dayInfo(date) {
  const week = isoWeek(date)
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: WEEKDAY_NAMES[date.getDay()],
    week: week.week,
    weekYear: week.year
  }
}

function sameDay(day, info) {
  return day.year === info.year && day.month === info.month && day.day === info.day
}

function calendarModel(anchor, today) {
  const todayInfo = dayInfo(today)
  const weeks = monthWeeks(anchor.year, anchor.month).map((week) => ({
    week: week.week,
    current: week.days.some((day) => sameDay(day, todayInfo)),
    days: week.days.map((day) => Object.assign({}, day, { today: sameDay(day, todayInfo) }))
  }))
  const focusWeek = weeks.some((week) => week.current)
    ? todayInfo.week
    : weeks.find((week) => week.days.some((day) => day.inMonth)).week
  return {
    year: anchor.year,
    month: anchor.month,
    weeks,
    today: todayInfo,
    focusWeek,
    title: `${anchor.year}年${anchor.month}月`
  }
}

function paint(colors) {
  const pick = (value, fallback) => /^#[0-9a-fA-F]{6}$/.test(String(value || "")) ? String(value) : fallback
  return {
    background: pick(colors && colors.Background, FALLBACK_COLORS.Background),
    text: pick(colors && colors.Text, FALLBACK_COLORS.Text),
    secondary: pick(colors && colors.SecondaryText, FALLBACK_COLORS.SecondaryText),
    border: pick(colors && colors.Border, FALLBACK_COLORS.Border),
    accent: pick(colors && colors.Accent, FALLBACK_COLORS.Accent),
    accentText: pick(colors && colors.AccentText, FALLBACK_COLORS.AccentText),
    selection: pick(colors && colors.Selection, FALLBACK_COLORS.Selection)
  }
}

function renderCalendar(model, colors, labels) {
  const tone = paint(colors)
  const todayLabel = (labels && labels.todayLabel) || FALLBACK_LABELS.todayLabel
  const heads = ["周"].concat(WEEK_HEADS).map((label) => `<th>${label}</th>`).join("")
  const rows = model.weeks.map((week) => {
    const cells = week.days.map((day) => {
      const classes = ["day"]
      if (!day.inMonth) classes.push("out")
      if (day.today) classes.push("today")
      return `<td><span class="${classes.join(" ")}">${day.day}</span></td>`
    }).join("")
    return `<tr class="${week.current ? "this-week" : ""}"><td class="week${week.current ? " now" : ""}">${week.week}</td>${cells}</tr>`
  }).join("")
  const chips = []
  for (let month = 1; month <= 12; month++) {
    const classes = ["chip"]
    if (month === model.month) classes.push("on")
    else if (month === model.today.month && model.year === model.today.year) classes.push("now")
    chips.push(`<span class="${classes.join(" ")}">${month}月</span>`)
  }
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;background:${tone.background};color:${tone.text};font:13px/1.3 -apple-system,"PingFang SC","Segoe UI",sans-serif}
    body{padding:16px 18px 14px;box-sizing:border-box}
    .kicker{color:${tone.secondary};font-size:13px;letter-spacing:.08em}
    .title{display:flex;align-items:center;gap:10px;margin-top:2px;font-size:28px;font-weight:700}
    .badge{background:${tone.accent};color:${tone.accentText};border-radius:999px;padding:4px 10px;font-size:13px;font-weight:700}
    .today{margin-top:8px;color:${tone.secondary}}
    .today b{color:${tone.text}}
    table{width:100%;border-collapse:separate;border-spacing:0 4px;margin-top:14px}
    th{color:${tone.secondary};font-size:12px;font-weight:600;padding-bottom:4px}
    td{text-align:center;height:34px}
    .week{color:${tone.secondary};font-size:12px;width:34px}
    .week.now{color:${tone.accent};font-weight:700}
    tr.this-week td{background:${tone.selection}}
    tr.this-week td:first-child{border-radius:8px 0 0 8px}
    tr.this-week td:last-child{border-radius:0 8px 8px 0}
    .day{display:inline-flex;width:28px;height:28px;align-items:center;justify-content:center;border-radius:999px}
    .day.out{color:${tone.border}}
    .day.today{background:${tone.accent};color:${tone.accentText};font-weight:700}
    .months{display:flex;gap:4px;margin-top:12px}
    .chip{flex:1;text-align:center;color:${tone.secondary};font-size:11px;padding:5px 0;border-radius:7px}
    .chip.on{background:${tone.accent};color:${tone.accentText};font-weight:700}
    .chip.now{box-shadow:inset 0 0 0 1px ${tone.accent};color:${tone.text}}
  </style></head><body>
    <div class="kicker">${model.year}年</div>
    <div class="title">${model.month}月 <span class="badge">第${model.focusWeek}周</span></div>
    <div class="today">${todayLabel} <b>${model.today.year}年${model.today.month}月${model.today.day}日 ${model.today.weekday}</b> · 第${model.today.week}周</div>
    <table><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
    <div class="months">${chips.join("")}</div>
  </body></html>`
}

function monthQuery(anchor, today) {
  if (anchor.year === today.getFullYear() && anchor.month === today.getMonth() + 1) return "日历"
  return `日历 ${anchor.year}-${String(anchor.month).padStart(2, "0")}`
}

function pad(value) {
  return String(value).padStart(2, "0")
}

class CalendarPlugin {
  constructor() {
    this.api = null
    this.labels = Object.assign({}, FALLBACK_LABELS)
    this.colors = Object.assign({}, FALLBACK_COLORS)
    this.now = () => new Date()
  }

  async init(ctx, params) {
    this.api = params.API
    await this.api.OnMRURestore(ctx, async (_ctx, mruData) => this.restore(mruData))
    await this.api.RegisterPluginTool(ctx, {
      Tool: {
        Name: "calendar_info",
        Description: "i18n:tool_calendar_info",
        InputSchema: {
          type: "object",
          properties: { text: { type: "string" } },
          additionalProperties: false
        },
        OutputSchema: {
          type: "object",
          properties: {
            date: { type: "string" },
            text: { type: "string" },
            weekday: { type: "string" },
            week: { type: "integer" },
            year: { type: "integer" },
            month: { type: "integer" }
          },
          required: ["date", "text", "weekday", "week", "year", "month"]
        },
        Annotations: { ReadOnly: true, Destructive: false, Idempotent: true, RequiresUI: false }
      },
      Handler: async (_ctx, option) => {
        const today = this.now()
        const text = String(option.Arguments && option.Arguments.text || "")
        const anchor = text.trim() ? parseCalendarQuery(text, today) : { year: today.getFullYear(), month: today.getMonth() + 1 }
        if (!anchor) return { Error: { Code: "INVALID_ARGUMENTS", Message: "需要今天、2026-11 或 2026年11月 这样的日期" } }
        const focus = anchor.day
          ? new Date(anchor.year, anchor.month - 1, anchor.day)
          : (today.getFullYear() === anchor.year && today.getMonth() + 1 === anchor.month
            ? today
            : new Date(anchor.year, anchor.month - 1, 1))
        const info = dayInfo(focus)
        return {
          Output: {
            date: `${info.year}-${pad(info.month)}-${pad(info.day)}`,
            text: `${info.year}年${info.month}月${info.day}日`,
            weekday: info.weekday,
            week: info.week,
            year: info.year,
            month: info.month
          }
        }
      }
    })
  }

  async loadLabels(ctx) {
    if (!this.api || !this.api.GetTranslation) return
    const keys = {
      copy: "plugin_calendar_copy",
      copied: "plugin_calendar_copied",
      prevMonth: "plugin_calendar_prev_month",
      nextMonth: "plugin_calendar_next_month",
      prevYear: "plugin_calendar_prev_year",
      nextYear: "plugin_calendar_next_year",
      today: "plugin_calendar_today",
      todayLabel: "plugin_calendar_today_label"
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

  async loadColors(ctx) {
    if (!this.api || !this.api.GetThemeColors) return this.colors
    try {
      const colors = await this.api.GetThemeColors(ctx, {})
      if (colors && colors.Background && colors.Text) this.colors = colors
    } catch (error) {
      return this.colors
    }
    return this.colors
  }

  restore(mruData) {
    const data = mruData && mruData.ContextData
    const year = Number(data && data.year)
    const month = Number(data && data.month)
    if (!year || month < 1 || month > 12) return null
    return this.result({ year, month }, this.now())
  }

  async query(ctx, query) {
    await this.loadLabels(ctx)
    await this.loadColors(ctx)
    const today = this.now()
    const anchor = parseCalendarQuery(query && query.Search, today) || {
      year: today.getFullYear(),
      month: today.getMonth() + 1
    }
    return {
      Results: [this.result(anchor, today)],
      Layout: { ResultPreviewWidthRatio: 0 }
    }
  }

  result(anchor, today) {
    const model = calendarModel(anchor, today)
    const html = renderCalendar(model, this.colors, this.labels)
    const current = today.getFullYear() === anchor.year && today.getMonth() + 1 === anchor.month
    const data = { year: anchor.year, month: anchor.month }
    const actions = [
      this.action(this.labels.copy, COPY_ICON, true, Object.assign({ command: "copy" }, data), async (ctx) => {
        const text = `${model.today.year}年${model.today.month}月${model.today.day}日`
        if (this.api && this.api.Copy) await this.api.Copy(ctx, { type: "text", text })
        if (this.api && this.api.Notify) await this.api.Notify(ctx, `${this.labels.copied} ${text}`)
      }),
      this.action(this.labels.prevMonth, PREV_ICON, false, Object.assign({ command: "prev-month" }, data), async (ctx) => {
        await this.go(ctx, shiftMonth(anchor, -1), today)
      }),
      this.action(this.labels.nextMonth, NEXT_ICON, false, Object.assign({ command: "next-month" }, data), async (ctx) => {
        await this.go(ctx, shiftMonth(anchor, 1), today)
      }),
      this.action(this.labels.prevYear, PREV_ICON, false, Object.assign({ command: "prev-year" }, data), async (ctx) => {
        await this.go(ctx, { year: anchor.year - 1, month: anchor.month }, today)
      }),
      this.action(this.labels.nextYear, NEXT_ICON, false, Object.assign({ command: "next-year" }, data), async (ctx) => {
        await this.go(ctx, { year: anchor.year + 1, month: anchor.month }, today)
      })
    ]
    if (!current) {
      actions.push(this.action(this.labels.today, NEXT_ICON, false, Object.assign({ command: "today" }, data), async (ctx) => {
        await this.go(ctx, { year: today.getFullYear(), month: today.getMonth() + 1 }, today)
      }))
    }
    return {
      Id: `calendar-${anchor.year}-${anchor.month}`,
      Title: model.title,
      SubTitle: `${this.labels.todayLabel} ${model.today.year}年${model.today.month}月${model.today.day}日 ${model.today.weekday} · 第${model.today.week}周`,
      Icon: RESULT_ICON,
      Score: 100,
      IdentityKey: `calendar:${anchor.year}-${pad(anchor.month)}`,
      Preview: {
        PreviewType: "webview",
        PreviewData: JSON.stringify({
          html,
          cacheKey: `calendar:${anchor.year}-${anchor.month}:${model.today.year}-${model.today.month}-${model.today.day}:${paint(this.colors).background}`
        })
      },
      Actions: actions
    }
  }

  action(name, iconImage, isDefault, context, run) {
    return {
      Name: name,
      Icon: iconImage,
      IsDefault: isDefault,
      PreventHideAfterAction: true,
      ContextData: context,
      Action: run
    }
  }

  async go(ctx, anchor, today) {
    if (this.api && this.api.ChangeQuery) {
      await this.api.ChangeQuery(ctx, { QueryType: "input", QueryText: monthQuery(anchor, today) })
    }
  }
}

const plugin = new CalendarPlugin()
module.exports.plugin = {
  init: (ctx, params) => plugin.init(ctx, params),
  query: (ctx, query) => plugin.query(ctx, query)
}
module.exports.CalendarPlugin = CalendarPlugin
module.exports.isoWeek = isoWeek
module.exports.monthWeeks = monthWeeks
module.exports.parseCalendarQuery = parseCalendarQuery
module.exports.calendarModel = calendarModel
module.exports.renderCalendar = renderCalendar
