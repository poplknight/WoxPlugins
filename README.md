# WoxPlugins

这里的插件都是 [Wox](https://github.com/Wox-launcher/Wox) 的单文件 Node.js 插件，不能单独运行。

每个插件都依赖 Wox **2.4.5** 或更高版本，以及 Wox 自带的 Node.js 插件宿主。插件通过文件开头的 `// { ... }` 元数据交给 Wox 加载，查询、复制、改写输入框和主题色都走 Wox 的插件接口。

把对应的 `Wox.Plugin.*.js` 复制到 Wox 的单文件插件目录后，Wox 会在保存时重新加载：

- macOS / Linux：`~/.wox/wox-user/plugins/single-file/`
- Windows：`%USERPROFILE%\.wox\wox-user\plugins\single-file\`

## 插件

| 插件 | 触发词 | 说明 |
| --- | --- | --- |
| [日历](Calendar/Wox.Plugin.Calendar.js) | `日历` | 打开月历，高亮今天，并标出周、月、年。例如 `日历`、`日历 2026-12`、`日历 下月`、`日历 11月`。 |
| [大写金额](Amount/Wox.Plugin.Amount.js) | `*` | 把整数转成中文大写金额，并给出千分位。输入 `1992828` 后回车进入 `1992828 大写 ` 或 `1992828 千分位 `。 |
| [计算器](Calculator/Wox.Plugin.Calculator.js) | `*`、`calculator` | 计算表达式。带运算符的全局输入会直接出结果，也可以用 `calculator` 进入插件。 |
| [颜色](Color/Wox.Plugin.Color.js) | `*`、`color` | 预览、复制并保存 HEX 颜色。 |
| [计时器](Timer/Wox.Plugin.Timer.js) | `timer` | 创建和管理倒计时。例如 `timer 5m`、`timer 1m 泡茶`、`timer 1h 15m`。 |
| [表情符号](Emoji/Wox.Plugin.Emoji.js) | `emoji` | 按名字搜索表情符号，回车复制或粘贴到当前应用。 |
| [Run](Run/Wox.Plugin.Run.js) | `run` | 用命令或名称运行一条命令，或打开一个链接。 |
| [Brew](Brew/Wox.Plugin.Brew.js) | `brew` | 在终端里执行 Homebrew 命令，例如安装、升级、搜索和查看已安装的包。仅 macOS 和 Linux。 |
| [Clash Verge](ClashVerge/Wox.Plugin.ClashVerge.js) | `clash`、`cv` | 切换 Clash Verge 的模式、节点、订阅和系统代理。需要本机的 Clash Verge 已经在运行。 |

Brew 只声明了 macOS 和 Linux。其余插件声明了 Windows、Linux 和 macOS。
