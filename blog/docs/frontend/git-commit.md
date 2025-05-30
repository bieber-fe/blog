# Git 提交规范/代码校验

## 校验代码

### 安装 & 初始化husky

```bash
$ npm install husky lint-staged --save-dev
$ npx husky init
```

> [!TIP] > **husky：** 可以让你更容易的添加和管理 Git 钩子  
> **lint-staged：** 用于检查 Git暂存区文件的代码并自动修复，与ESLint、Prettier等工具集成

### 配置lint-staged：

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,vue}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```

### 配置 Husky 钩子：

把`npx lint-staged`写进pre-commit文件中

```bash
$ echo 'npx lint-staged' > .husky/pre-commit
```

这样，`lint-staged`就会在每次`git commit`前被自动执行。

## 校验提交信息

### 乞丐版

1. 安装依赖

   ```bash
   $ npm install --save-dev @commitlint/config-conventional @commitlint/cli

   ```

2. 创建配置文件 `.commitlintrc.js`

   ```bash
   export default {
     extends: ['@commitlint/config-conventional']
   }

   ```

3. 配置 Husky 钩子

   ```bash
   $ echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg

   ```

### 命令行交互式版

1. 安装依赖

   ```bash
   $ npm install commitizen cz-vinyl --dev

   ```

2. 配置package.json

   ```json
   {
      "script": {
         ...
         "cz": "git-cz",
      },
      "config": {
         "commitizen": {
            "path": "cz-vinyl"
         }
      }
   }
   ```

3. 执行

   ```bash
   $ npm run cz

   ```

   这样就能直接触发命令行交互式提交了

4. 汉化命令行交互

   根目录添加文件`.czvinylrc`

   ```json
   {
      "headerFormat": "{type}({scope}): [{ticket_id}] {subject}",
      "commitTypes": [
         {
            "description": "一个新的功能",
            "value": "feat"
         },
         {
            "description": "一个BUG修复",
            "value": "fix"
         },
         {
            "description": "代码样式/风格调整",
            "value": "style"
         },
         {
            "description": "代码重构(既不增加新功能，也不是修复bug)",
            "value": "refactor"
         },
         {
            "description": "提高性能的代码更改",
            "value": "perf"
         },

         {
            "description": "文档更新/注释",
            "value": "docs"
         },
         {
            "description": "测试相关",
            "value": "test"
         },
         {
            "description": "构建/打包相关变更",
            "value": "build"
         },
         {
            "description": "代码回退",
            "value": "revert"
         },
         {
            "description": "辅助工具更改或者无法分类的提交",
            "value": "chore"
         },
      ],
      "skipScope": false,·
      "skipTicktId": true, // 跳过tickid
      "subjectMaxLength": 70,
      "subjectMinLength": 3,
      "typeQuestion": "请选择一个提交类型：",
      "scopeQuestion": "请输入一个改动范围（可跳过）：",
      "subjectQuestion": "请输入一个提交信息：",
      "bodyQuestion": "请输入一个提交详细内容（可跳过）："
   }

   ```
