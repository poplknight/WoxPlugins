const assert = require("assert")
const fs = require("fs")

function metadata(file) {
  const lines = []
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (!line.startsWith("//")) break
    lines.push(line.startsWith("// ") ? line.slice(3) : line.slice(2))
  }
  return JSON.parse(lines.join("\n"))
}

for (const file of [
  "Calculator/Wox.Plugin.Calculator.js",
  "Color/Wox.Plugin.Color.js",
  "Timer/Wox.Plugin.Timer.js",
  "Emoji/Wox.Plugin.Emoji.js",
  "Amount/Wox.Plugin.Amount.js",
  "Calendar/Wox.Plugin.Calendar.js"
]) {
  const meta = metadata(file)
  assert.ok(meta.Id && meta.TriggerKeywords.length, file)
  assert.strictEqual(meta.Runtime, "NODEJS")
}
const calculator = require("../Calculator/Wox.Plugin.Calculator.js")
const color = require("../Color/Wox.Plugin.Color.js")
const timer = require("../Timer/Wox.Plugin.Timer.js")
const emoji = require("../Emoji/Wox.Plugin.Emoji.js")
const amount = require("../Amount/Wox.Plugin.Amount.js")
const calendar = require("../Calendar/Wox.Plugin.Calendar.js")
const path = require("path")

function eq(actual, expected, label) {
  assert.strictEqual(actual, expected, label + " => " + actual)
}

eq(calculator.calculate("2/3*6", ",", "."), "4", "2/3*6")
eq(calculator.calculate("1/3*3", ",", "."), "1", "1/3*3")
eq(calculator.calculate("1/3", ",", "."), "0.3333333333333333", "1/3")
eq(calculator.calculate("1_000_000 * 2", ",", "."), "2000000", "underscore")
eq(calculator.formatWithSeparators("2000000", ",", "."), "2,000,000", "grouped")
eq(calculator.calculate("2^3^2", ",", "."), "512", "power")
eq(calculator.calculate("sqrt(9)", ",", "."), "3", "sqrt")
eq(calculator.calculate("(1+2)*3", ",", "."), "9", "(1+2)*3")
eq(calculator.calculate("pi", ",", ".").slice(0, 4), "3.14", "pi")
assert.strictEqual(calculator.hasOperator("123"), false)
assert.strictEqual(calculator.hasOperator("1+1"), true)
assert.throws(() => calculator.calculate("abc", ",", "."))

const red = color.parseHexColor("#ff0000")
eq(red.Hex, "#FF0000", "hex")
eq(color.rgbText(red), "rgb(255, 0, 0)", "rgb")
eq(color.hslText(red), "hsl(0, 100%, 50%)", "hsl")
eq(color.deriveHex(red, 180), "#00FFFF", "complement")
eq(color.deriveHex(red, -30), "#FF0080", "analogous left")
eq(color.deriveHex(red, 30), "#FF8000", "analogous right")
assert.strictEqual(color.parseHexColor("#fff"), null)
assert.strictEqual(color.parseHexColor("zz0000"), null)

const tea = timer.parseTimerQuery("1m这只是一个说明")
eq(tea.durationLabel, "1m", "tea label")
eq(tea.note, "这只是一个说明", "tea note")
eq(tea.durationMs, 60000, "tea ms")
const meeting = timer.parseTimerQuery("1h 15m cooking")
eq(meeting.durationLabel, "1h 15m", "meeting label")
eq(meeting.note, "cooking", "meeting note")
eq(meeting.durationMs, 75 * 60000, "meeting ms")
assert.strictEqual(timer.parseTimerQuery("hello"), null)
eq(timer.formatTimerRemaining(90000), "01:30", "90s")
eq(timer.formatTimerRemaining(3661000), "1h 01m 01s", "1h1m1s")

const catalog = emoji.loadCatalog(path.join(__dirname, "../Emoji/emoji-data.json"))
assert.ok(catalog.length > 1000, "catalog size " + catalog.length)
const grin = catalog.find((entry) => entry.emoji === "😀")
assert.ok(grin, "grin exists")
assert.ok(emoji.matchEntry(grin, "grin", []), "grin english")
assert.ok(grin.names.zh_CN, "chinese name")
assert.ok(emoji.matchEntry(grin, grin.names.zh_CN, []), "match chinese name")
const browse = emoji.selectBrowse(catalog, new Map(), new Set(), "en")
assert.ok(browse.length > 20, "browse sample")
assert.ok(!browse.some((item) => String(item.entry.categories.en).toLowerCase() === "component"))

eq(amount.toChineseAmount("10001"), "壹万零壹元", "10001")
eq(amount.toChineseAmount("1992828"), "壹佰玖拾玖万贰仟捌佰贰拾捌元", "1992828")
eq(amount.groupDigits("1992828"), "1,992,828", "group 1992828")
eq(amount.toChineseAmount("100212111"), "壹亿零贰拾壹万贰仟壹佰壹拾壹元", "100212111")
eq(amount.groupDigits("100212111"), "100,212,111", "group 100212111")
eq(amount.toChineseAmount("0"), "零元", "zero")
eq(amount.toChineseAmount("10"), "壹拾元", "ten")
eq(amount.toChineseAmount("101"), "壹佰零壹元", "101")
eq(amount.toChineseAmount("1001"), "壹仟零壹元", "1001")
eq(amount.toChineseAmount("10000"), "壹万元", "10000")
eq(amount.toChineseAmount("10010"), "壹万零壹拾元", "10010")
eq(amount.toChineseAmount("10100"), "壹万零壹佰元", "10100")
eq(amount.toChineseAmount("11000"), "壹万壹仟元", "11000")
eq(amount.toChineseAmount("100000"), "壹拾万元", "100000")
eq(amount.toChineseAmount("100000001"), "壹亿零壹元", "100000001")
eq(amount.formatAmount("100,212,111").chinese, "壹亿零贰拾壹万贰仟壹佰壹拾壹元", "comma input")
eq(amount.formatAmount("100,212,111").grouped, "100,212,111", "comma grouped")
assert.strictEqual(amount.parseAmountPath("12,34"), null)
assert.strictEqual(amount.parseAmountPath("abc"), null)
assert.strictEqual(amount.parseAmountPath("10001abc"), null)
eq(amount.parseAmountPath("1992828 大写").section.id, "upper", "entered upper")
eq(amount.parseAmountPath("1992828 壹").filter, "壹", "filter stays at root")

const thursday = new Date(2026, 10, 12)
eq(calendar.isoWeek(thursday).week, 46, "week of 2026-11-12")
eq(calendar.isoWeek(thursday).year, 2026, "week year")
eq(calendar.isoWeek(new Date(2021, 0, 1)).week, 53, "2021-01-01 week")
eq(calendar.isoWeek(new Date(2021, 0, 1)).year, 2020, "2021-01-01 week year")
const november = calendar.calendarModel({ year: 2026, month: 11 }, thursday)
eq(november.weeks[0].days[0].month, 10, "grid starts in october")
eq(november.weeks[0].days[0].day, 26, "grid starts on the 26th")
const currentWeek = november.weeks.find((week) => week.current)
eq(currentWeek.week, 46, "current week number")
assert.ok(currentWeek.days.some((day) => day.today && day.day === 12), "today cell")
eq(november.title, "2026年11月", "month title")
eq(november.focusWeek, 46, "focus week")
eq(calendar.parseCalendarQuery("2026年11月12日", thursday).month, 11, "chinese date")
eq(calendar.parseCalendarQuery("上月", thursday).month, 10, "previous month")
eq(calendar.parseCalendarQuery("下月", thursday).year, 2026, "next month year")
eq(calendar.parseCalendarQuery("下月", thursday).month, 12, "next month")
eq(calendar.parseCalendarQuery("11月", thursday).month, 11, "month only")
assert.strictEqual(calendar.parseCalendarQuery("abc", thursday), null)
const html = calendar.renderCalendar(november, {}, { todayLabel: "今天" })
assert.ok(html.includes("2026年"), "html year")
assert.ok(html.includes(">11月 <"), "html month")
assert.ok(html.includes("第46周"), "html week")
assert.ok(html.includes('class="day today"'), "html selected day")
assert.ok(html.includes('class="week now"'), "html selected week")
assert.ok(html.includes('class="chip on"'), "html selected month")

async function fakeHost() {
  const settings = {}
  const api = {
    async GetSetting(_ctx, key) { return settings[key] || "" },
    async SaveSetting(_ctx, key, value) { settings[key] = value },
    async GetTranslation(_ctx, key) { return key },
    async OnSettingChanged() {},
    async OnGetDynamicSetting() {},
    async OnMRURestore() {},
    async OnUnload() {},
    async RegisterPluginTool() {},
    async GetCacheFolder() { return "" },
    async Copy() {},
    async Notify() {},
    async ShowToastMsg() {},
    async IsVisible() { return false },
    async RefreshQuery() {},
    async UpdateResult() {},
    async ChangeQuery() {},
    async HideApp() {},
    async Log() {}
  }
  return { settings, api }
}

async function queryPlugins() {
  const calcHost = await fakeHost()
  const calc = new calculator.plugin.constructor()
  await calc.init({}, { API: calcHost.api })
  calc.separators = { thousandsSep: ",", decimalSep: "." }
  const calcResult = await calc.query({}, { TriggerKeyword: "", Search: "1+1", RawQuery: "1+1" })
  eq(calcResult.Results[0].Title, "2", "query 1+1")
  const keyword = await calc.query({}, { TriggerKeyword: "calculator", Search: "", RawQuery: "calculator" })
  eq(keyword.Results[0].Title, "i18n:plugin_calculator_input_expression", "empty calculator")

  const colorHost = await fakeHost()
  const colors = new color.plugin.constructor()
  await colors.init({}, { API: colorHost.api })
  const shown = await colors.query({}, { TriggerKeyword: "", Search: "#00ff00", RawQuery: "#00ff00" })
  eq(shown.Results[0].Title, "#00FF00", "global color")
  eq(shown.Results[0].SubTitle.includes("rgb(0, 255, 0)"), true, "green rgb")
  const named = await colors.query({}, { TriggerKeyword: "color", Search: "", RawQuery: "color" })
  assert.ok(named.Results.some((item) => item.IdentityKey === "#00FF00"), "history")

  const timerHost = await fakeHost()
  const timers = new timer.plugin.constructor()
  await timers.init({}, { API: timerHost.api })
  const empty = await timers.query({}, { Search: "" })
  eq(empty.Results[0].Title, "i18n:plugin_timer_no_timers", "no timers")
  const start = await timers.query({}, { Search: "5m tea" })
  eq(start.Results[0].Title, "Start timer 5m", "start row")
  eq(start.Results[0].SubTitle, "tea", "start note")
  if (timers.ticker) clearInterval(timers.ticker)

  const emojiHost = await fakeHost()
  const emojis = new emoji.plugin.constructor()
  await emojis.init({}, { API: emojiHost.api })
  const found = await emojis.query({}, { Search: "grin", Env: {} })
  assert.ok(found.Results.some((item) => item.Icon.ImageData === "😀"), "query grin")
  assert.strictEqual(found.Layout.GridLayout.Columns, 10)

  const amountHost = await fakeHost()
  const amounts = new amount.plugin.constructor()
  await amounts.init({}, { API: amountHost.api })
  const amountRows = await amounts.query({}, { RawQuery: "1992828", Search: "1992828" })
  eq(amountRows.Results[0].Title, "壹佰玖拾玖万贰仟捌佰贰拾捌元", "chinese row")
  eq(amountRows.Results[1].Title, "1,992,828", "grouped row")
  eq(amountRows.Results[1].SubTitle, "千分位", "grouped subtitle")
  assert.strictEqual(amountRows.Results[1].Actions[0].PreventHideAfterAction, true)
  let nextQuery = ""
  amounts.api.ChangeQuery = async (_ctx, option) => { nextQuery = option.QueryText }
  await amountRows.Results[1].Actions[0].Action({})
  eq(nextQuery, "1992828 千分位 ", "drill grouped")

  const comma = await amounts.query({}, { RawQuery: "100,212,111", Search: "100,212,111" })
  eq(comma.Results[0].Title, "壹亿零贰拾壹万贰仟壹佰壹拾壹元", "comma chinese")
  eq(comma.Results[1].Title, "100,212,111", "comma stays grouped")
  const small = await amounts.query({}, { RawQuery: "10001", Search: "10001" })
  eq(small.Results[0].Title, "壹万零壹元", "10001 row")
  eq(small.Results[1].Title, "10,001", "10001 grouped")
  const filtered = await amounts.query({}, { RawQuery: "1992828 1,9", Search: "1992828 1,9" })
  eq(filtered.Results.length, 1, "filter count")
  eq(filtered.Results[0].Title, "1,992,828", "filter grouped")
  const hidden = await amounts.query({}, { RawQuery: "hello", Search: "hello" })
  eq(hidden.Results.length, 0, "not a number")

  const leaf = await amounts.query({}, { RawQuery: "10001 大写 ", Search: "10001 大写 " })
  eq(leaf.Results.length, 1, "leaf count")
  eq(leaf.Results[0].Title, "壹万零壹元", "leaf title")
  assert.strictEqual(leaf.Results[0].Actions[0].PreventHideAfterAction, true)
  let copied = ""
  let notified = ""
  let refreshed = false
  amounts.api.Copy = async (_ctx, option) => { copied = option.text }
  amounts.api.Notify = async (_ctx, message) => { notified = message }
  amounts.api.RefreshQuery = async () => { refreshed = true }
  await leaf.Results[0].Actions[0].Action({})
  eq(copied, "壹万零壹元", "copied chinese")
  eq(notified, "已复制 壹万零壹元", "notified")
  assert.strictEqual(refreshed, true, "refreshed")
  const restored = amounts.restore({ ContextData: { kind: "leaf", section: "upper", digits: "10001" } })
  eq(restored.Title, "壹万零壹元", "mru")
  eq(restored.IdentityKey, leaf.Results[0].IdentityKey, "mru identity")

  const calendarHost = await fakeHost()
  const calendars = new calendar.CalendarPlugin()
  calendars.now = () => new Date(2026, 10, 12)
  await calendars.init({}, { API: calendarHost.api })
  const month = await calendars.query({}, { TriggerKeyword: "日历", Search: "", RawQuery: "日历" })
  eq(month.Results.length, 1, "one calendar")
  eq(month.Layout.ResultPreviewWidthRatio, 0, "calendar fills the area")
  eq(month.Results[0].Title, "2026年11月", "calendar title")
  eq(month.Results[0].SubTitle, "今天 2026年11月12日 周四 · 第46周", "calendar subtitle")
  const page = JSON.parse(month.Results[0].Preview.PreviewData)
  eq(page.html.includes('class="day today"'), true, "preview highlights today")
  eq(page.html.includes("第46周"), true, "preview shows the week")
  assert.strictEqual(month.Results[0].Actions[0].PreventHideAfterAction, true)
  let calendarQuery = ""
  calendars.api.ChangeQuery = async (_ctx, option) => { calendarQuery = option.QueryText }
  const nextMonth = month.Results[0].Actions.find((item) => item.ContextData.command === "next-month")
  await nextMonth.Action({})
  eq(calendarQuery, "日历 2026-12", "next month query")
  const january = await calendars.query({}, { TriggerKeyword: "日历", Search: "2026-01", RawQuery: "日历 2026-01" })
  eq(january.Results[0].Title, "2026年1月", "january")
  const januaryPage = JSON.parse(january.Results[0].Preview.PreviewData)
  eq(januaryPage.html.includes('class="day today"'), false, "today is not in january")
  eq(januaryPage.html.includes("第46周"), true, "today line keeps the week")
  let calendarCopied = ""
  calendars.api.Copy = async (_ctx, option) => { calendarCopied = option.text }
  await january.Results[0].Actions[0].Action({})
  eq(calendarCopied, "2026年11月12日", "copy today")
  const restoredCalendar = calendars.restore({ ContextData: { year: 2026, month: 11 } })
  eq(restoredCalendar.Title, "2026年11月", "calendar mru")
  eq(restoredCalendar.IdentityKey, month.Results[0].IdentityKey, "calendar identity")
}

queryPlugins().then(() => {
  console.log("ok")
}).catch((error) => {
  console.error(error)
  process.exit(1)
})
