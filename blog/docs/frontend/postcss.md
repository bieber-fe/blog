---
outline: [2, 4]
---

# PostCSS 插件使用

## PostCSS 是什么

> [!NOTE] 是一个用 JavaScript 工具和插件转换 CSS 代码的工具

- PostCSS 是处理 CSS 的一个插件体系；
- 可以对 CSS 进行各种不同的转换和处理；
- 把繁琐复杂的工作交由程序去处理；
- 把开发⼈人员解放出来。

## PostCSS 插件

### 轻量且专注某一功能的插件（模块化）

#### 1. [Autoprefixer](https://www.npmjs.com/package/autoprefixer)

> [!TIP] 通常放在插件链的末尾（确保其他插件处理后的代码最终被添加前缀）

**作用**：自动补全浏览器私有前缀

**示例**：

```css
/* 输入 */
.box {
  display: flex;
}

/* 输出 */
.box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```

**配置与使用**：

- 基本配置（postcss.config.js）

  ```javascript
  module.exports = {
    plugins: [
      require('autoprefixer')({
        // 覆盖默认浏览器范围（可选）
        overrideBrowserslist: ['last 2 versions', '> 1%']
      })
    ]
  }
  ```

- 浏览器规则范围（package.json）

  ```json
  {
    "browserslist": ["last 2 Chrome versions", "Firefox ESR"]
  }
  ```

#### 2. [postcss-import](https://www.npmjs.com/package/postcss-import)

**核心功能**：

::: tip 注意

vite 打包中已经预配置了 `postcss-import` 的支持，不需要单独引入。 see:
[Vite 文档](https://cn.vitejs.dev/guide/features.html#import-inlining-and-rebasing)

:::

- 文件合并

  允许通过 @import 引入其他 CSS 文件，最终将所有文件合并为一个输出文件。

  ```css
  /* main.css */
  @import 'reset.css';
  @import 'components/button.css';
  ```

- 依赖管理

  自动解析文件依赖关系，确保引入顺序正确（避免样式覆盖问题）。

- 路径别名

  支持自定义路径别名，简化引入路径：

  ```css
  /* 类似 Webpack 的 `~` 别名 */
  @import '~library/styles.css';
  ```

- 过滤重复

  自动去重相同文件的多次引入

**与原生 `@import` 的区别**

| 特性        | postcss-import           | 原生 css @import               |
| ----------- | ------------------------ | ------------------------------ |
| ‌处理时机   | 编译阶段合并文件         | 浏览器运行时发起 HTTP 请求加载 |
| ‌性能影响   | 无额外请求，提升加载速度 | 增加 HTTP 请求，影响性能       |
| ‌作用域     | 合并后共享变量和混合宏   | 文件作用域隔离                 |
| ‌预处理支持 | 支持嵌套、变量等插件处理 | 仅支持原生 CSS                 |

#### 3. [postcss-nested](https://www.npmjs.com/package/postcss-nested)

**作用**：支持 CSS 嵌套语法 ‌（类似 Sass/Less 的嵌套规则），将嵌套的 CSS 代码转换为浏览器能理解的扁
平化代码。

**安装与配置**：

```bash
# 安装 postcss-nested
$ npm install postcss-nested --save-dev
```

```javascript
// postcss.config.js中配置
module.exports = {
  plugins: [require('postcss-nested')]
}
```

#### 4. [postcss-each](https://www.npmjs.com/package/postcss-each)

**作用**：实现类似 Sass 的 @each 循环，遍历列表或对象生成重复样式。

**示例**：

```css
/* 输入 */
@each $icon in (home, user, settings) {
  .icon-$ (icon) {
    background: url('$(icon).png');
  }
}

/* 输出 */
.icon-home {
  background: url('home.png');
}

.icon-user {
  background: url('user.png');
}

.icon-settings {
  background: url('settings.png');
}
```

**安装与配置**：

```bash
# 安装 postcss-nested
$ npm install postcss-each --save-dev
```

```javascript
// postcss.config.js
module.exports = {
  plugins: [require('postcss-each')]
}
```

#### 5. [postcss-for](https://www.npmjs.com/package/postcss-for)

**作用**：支持 @for 循环，生成数值区间内的样。

**示例**：

```css
/* 输入 */
@for $i from 1 to 3 {
  .col-$ (i) {
    width: calc(100% / $(i));
  }
}

/* 输出 */
.col-1 {
  width: calc(100% / 1);
}

.col-2 {
  width: calc(100% / 2);
}

.col-3 {
  width: calc(100% / 3);
}
```

**安装与配置**：

```bash
# 安装 postcss-nested
$ npm install postcss-for --save-dev
```

```javascript
// postcss.config.js中配置
module.exports = {
  plugins: [require("postcss-for'")]
}
```

#### 6. [postcss-atroot](https://www.npmjs.com/package/postcss-atroot)

**作用**：允许规则直接跳出嵌套，输出到根层级。

**示例**：

```css
.parent {
  @at-root {
    .child {
      color: red;
    }

    /* 输出为 .child，而非 .parent .child */
  }
}
```

#### 7. [postcss-mixins](https://www.npmjs.com/package/postcss-mixins)

**作用**：用于在 CSS 中实现类似 Sass/Less 的 ‌ 混合宏（Mixins）‌ 功能，允许定义可复用的样式块，并在
多处调用。

**核心功能**：

- 定义混合宏

  通过 @define-mixin 创建可复用的样式块，支持参数传递：

  ```css
  @define-mixin button $color, $size {
    background: $ color;
    padding: $ size;
    border-radius: 4px;
  }
  ```

- 调用混合宏

  使用 @mixin 引入已定义的宏：

  ```css
  .primary-btn {
    @mixin button #3498db, 10px 20px;
  }
  ```

- 默认参数

  支持为参数设置默认值：

  ```css
  @define-mixin button $color: #eee, $size: 8px 16px {
    /* ... */
  }
  ```

- 嵌套与作用域

  混合宏内可以嵌套其他规则，且变量作用域限于宏内部。

#### 8. [postcss-extend-rule](https://www.npmjs.com/package/postcss-extend-rule)

**作用**：实现类似 Sass 的 @extend 功能，复用样式规则。

**示例**：

```css
/* 输入 */
.error {
  color: red;
}

.warning {
  @extend .error;
}

/* 输出 */
.error,
.warning {
  color: red;
}
```

#### 9. [postcss-property-lookup](https://www.npmjs.com/package/postcss-property-lookup)

**作用**：用于在 CSS 中实现‌属性值的引用查找‌功能。它的核心作用是允许你通过 @ 符号直接引用同一规则集内或其他规则集中已定义的属性值，从而减少代码重复，提升可维护性。

**示例**：

```css
.element {
  width: 100px;
  height: @width; /* 自动替换为 100px */
  margin-top: calc(@height / 2); /* 支持计算 */
}
```

### 复合功能插件（全能）

#### 1. [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env)

> [!TIP] 提示
> 相当于已内置 [Autoprefixer](#autoprefixer) 和 [postcss-nested](#postcss-nested) 的功能，不需要重复安装，避免冲突

**核心功能**：

- 转换现代 CSS 语法：

  支持将草案阶段的 CSS 特性（如嵌套规则、自定义属性、逻辑属性等）转换为兼容性更强的代码。

  ```css
  /* 输入（未来语法） */
  :root {
    --color: #ff0000;
  }

  .box {
    color: var(--color);
  }

  /* 输出（兼容语法） */
  .box {
    color: #ff0000;
  }
  ```

- 自动添加浏览器前缀

  根据 `browserslist` 配置（如 > 0.5%, last 2 versions），自动生成 -webkit-、-moz- 等前缀。

- 启用 CSS 新特性

  支持以下特性（需通过 `features` 选项启用）：

  - 嵌套规则（类似 Sass）
  - `color-mod()` 函数
  - `gap` 属性（替代 `grid-gap`）
  - `:focus-visible` 伪类等。

**配置**：

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3, // 启用稳定阶段的 CSS 特性（0-4，默认为 2）
      features: {
        'nesting-rules': true // 启用嵌套规则
      }
    })
  ]
}
```

#### 2. [postcss-advanced-variables](https://www.npmjs.com/package/postcss-advanced-variables)

**作用**：支持类似 Sass 的高级变量功能，包括：

- `@if` / `@else` 条件判断
- `@for` / `@each` 循环
- 变量插值（如 `$var` 或 `@var`）

**功能区别**

| 插件                         | 核心功能                                                        | 是否支持变量 | 是否支持 @if 条件 | 是否支持 @each | 是否支持 @for |
| ---------------------------- | --------------------------------------------------------------- | ------------ | ----------------- | -------------- | ------------- |
| `postcss-advanced-variables` | 全能型 ‌：支持变量、@if/@else、@each、@for、插值等（类似 Sass） | ✅           | ✅                | ✅             | ✅            |
| `postcss-each`               | 专注 @each‌：仅支持遍历列表或对象（类似 Sass 的 @each）         | ❌           | ❌                | ✅             | ❌            |
| `postcss-for`                | ‌ 专注 @for‌：仅支持数值循环（类似 Sass 的 @for）               | ❌           | ❌                | ❌             | ✅            |

**总结**

- `postcss-advanced-variables`‌：功能强大但稍重，适合复杂场景。
- `postcss-each`/`postcss-for`：轻量级，编译更快，适合单一需求，更适合模块化。

#### 3. [precss](https://www.npmjs.com/package/precss)

> 此包已被弃用
