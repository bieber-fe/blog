# Prettier 代码美化

## 官方文档

地址：https://prettier.io/

## 安装

```bash
$ npm install prettier -D
```

## 配置

新建 `.prettierrc` 文件，该配置适合一下场景：

- 多人协作的Javascript/TypeScript项目
- 需要兼容Windows/Mac/Linux多平台开发环境
- 使用React/Vue等现代前端框架的项目

```json
{
  // 每行代码最大100字符后换航
  "printWidth": 100,
  // 使用2个空格作为缩进
  "tabWidth": 2,
  // 禁用制表符，使用空格缩进
  "useTabs": false,
  // 语句末尾不加分号
  "semi": false,
  //使用换行符的风格
  "endOfLine": "auto",
  // 使用单引号代替双引号
  "singleQuote": true,
  // 对象/数组最后一项不加逗号
  "trailingComma": "all",
  // 对象字面量中大括号内添加空格
  "bracketSpacing": true,
  // 箭头符号参数始终带括号
  "arrowParens": "always"
}
```

> [!IMPORTANT] 注意 ：
> 当与 ESLint 配合使用时，建议通过 `eslint-config-prettier` 禁用规则冲突

新建 `.prettierignore`文件

```plaintext
# 忽略特定目录
dist/
node_modules/
coverage/

# 忽略特定文件
package-lock.json
yarn.lock

```

## 格式化命令

```json
{
  "scripts": {
    "format": "prettier --write src/"
  }
}
```
