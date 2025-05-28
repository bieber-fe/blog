# VSCode + Vim 高效开发

## 安装&配置

在VSCode 扩展商店搜索Vim插件安装

```bash
$ defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```

拷贝配置到VSCode setting.json 文件中

```json
{
  "vim.easymotion": true,
  "vim.incsearch": true,
  "vim.useSystemClipboard": true,
  "vim.useCtrlKeys": true,
  "vim.hlsearch": true,
  "vim.insertModeKeyBindings": [
    {
      "before": ["j", "j"],
      "after": ["<Esc>"]
    }
  ],
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["<leader>", "d"],
      "after": ["d", "d"]
    },
    {
      "before": ["<C-n>"],
      "commands": [":nohl"]
    },
    {
      "before": ["K"],
      "commands": ["lineBreakInsert"],
      "silent": true
    },
    // 有 editor 跳转到 terminal （空格+t，跳转到终端）
    {
      "before": ["<leader>", "t"],
      "commands": ["workbench.action.terminal.focus"]
    },
    // tab 切换
    {
      "before": ["t", "h"],
      "commands": [":tabp"]
    },
    {
      "before": ["t", "l"],
      "commands": [":tabn"]
    }
  ],
  "vim.leader": "<space>",
  "vim.handleKeys": {
    "<C-a>": false,
    "<C-f>": false
  },
  // To improve performance
  "extensions.experimental.affinity": {
    "vscodevim.vim": 1
  }
}
```

## Vim 模式

- 普通模式（NORMAL）
- 插入模式（INSERT）
- 可视模式（VISUAL）
- 命令模式（：）

## 高级特性

### 1. 光标移动

- 字母级移动：上（`k`）下（`j`）左（`h`）右（`l`）
- 单词级移动：下一个单词首部（`w`）下一个单词尾部（`e`）上一个单词头部（`b`）上一个单词尾部（`ge`）
- 行级别移动：行首（`0`或者`^`）行尾（`$`）
- 段落级移动：段落首部（`{`）段落尾部（`}`）
- 文档级移动：文档头部（`gg`）文档尾部（`G`）

### 2. 操作符

- 删除：(`d`)
- 修改：(`c`)
- 复制：(`y`)
- 粘贴：(`p`)
- 撤销：(`u`)
- 选中并进入 VISUAL 模式：(`v`)

### 3. 动作

::: tip
理解操作符`i`（inner）和`a`（around）的区别

如：`iw` / `aw`、`i"` /` a"`
:::

| 动作                       |             |
| -------------------------- | ----------- |
| `iw` / `aw`                | `i<` / `a<` |
| `i(` / `a(` 或 `ib` / `ab` | `i[` / `a[` |
| `i{` / `a{` 或 `iB` / `aB` | `it` / `at` |
| `i"` / `a"`                | `is` / `as` |
| `i'` / `a'`                | `ip` / `ap` |

## 个性设置

### tab标签切换

```json
{
  ...,
  "vim.normalModeKeyBindingsNonRecursive": [
    // tab 切换
    {
      "before": ["t", "h"],
      "commands": [":tabp"]
    },
    {
      "before": ["t", "l"],
      "commands": [":tabn"]
    }
  ]
}
```

### 光标切换至终端

> `cmd + 0` 切换到侧边栏
> `cmd + 1` 切换到主编辑区域

```json
{
  ...,
  "vim.normalModeKeyBindingsNonRecursive": [
    // 有 editor 跳转到 terminal （空格+t，跳转到终端）
    {
      "before": ["<leader>", "t"],
      "commands": ["workbench.action.terminal.focus"]
    },
  ],
  "vim.leader": "<space>",
}
```

## 感谢

参考：[指尖飞舞：vscode + vim 高效开发（系列视频）](https://www.bilibili.com/video/BV1z541177Jy?p=13&vd_source=6baf45aae79f8397a78b4364d503621f)
