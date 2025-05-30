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

### 前置

### 命令行交互式版
