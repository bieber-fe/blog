# 重置默认样式

## 方案一：使用全局选择器

```css
*{
  margin: 0;
  padding: 0;
  ...
}
```

> [!TIP] 提示
> 此种方法，在简单案例中可以用一下，但实际开发中不会使用，因为 `*` 选择的是所有元素，而并不是所有的元素都有默认样式；
>
> 而且重置时，有时候是需要做特定处理的，比如： 想让 `a` 元素的文字是灰色，其他元素文字是蓝色

## 方案二：reset.css

选择到具有默认样式的元素，清空其默认的样式。

> [!TIP] 提示
> 经过 `reset` 后的网页，好似“一张白纸”，开发人员可根据设计稿，精细的去添加具体的样式

## 方案三：Normalize.css

`Normalize.css` 是一种最新方案，它在清除默认样式的基础上，保留了一些有价值的默认样式。

- 官网地址：http://necolas.github.io/normalize.css

相较于 `reset.css`，`Normalize.css` 有如下优点：

1. 保护了有价值的默认样式，而不是完全去掉它们；
2. 为大部分 HTML 元素提供一般化的样式；
3. 新增对 `HTML5` 元素的设置
4. 对并集选择器的使用比较谨慎，有效避免调试工具杂乱。

> [!TIP] 备注
> `Normalize.css` 的重置，和 `reset.css` 相比，更加的温和，开发时可根据实际情况进行选择。

## 当代环境-重置浏览器默认样式

::: tip 信息
reset.css 是一种用于重置浏览器默认样式的 CSS 文件，主要目的是消除不同浏览器之间的样式差异，为开发者提供一致的样式起点
:::

```css
:root {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#app {
  isolation: isolate;
}

/* 移除列表默认样式 */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* 移除链接默认样式 */
a {
  text-decoration: none;
  color: inherit;
}

/* 表单元素重置 */
button {
  background: none;
  border: none;
  cursor: pointer;
}
```
