# 当代环境-重置浏览器默认样式

## 信息

::: tip 信息
reset.css 是一种用于重置浏览器默认样式的 CSS 文件，主要目的是消除不同浏览器之间的样式差异，为开发者提供一致的样式起点
:::

## reset.css

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
