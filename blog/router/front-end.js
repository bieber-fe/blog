// 前端路由

const feNav = {
  text: '前端技术',
  items: [
    { text: 'JavaScript', link: '/api-examples' },
    { text: 'CSS/预处理器', link: '/docs/front-end/html-css/reset' },
    { text: '框架', link: '/api-examples' },
    { text: '工程化', link: '/api-examples' },
    { text: '性能优化', link: '/api-examples' },
  ],
}
const feSidebar = {
  '/docs/front-end/': [
    {
      text: 'JavaScript',
      collapsed: false,
      items: [{ text: 'demo1', link: '/api-examples' }],
    },
    {
      text: 'CSS/预处理器',
      collapsed: true,
      items: [{ text: '样式重置reset.css', link: '/docs/front-end/html-css/reset' }],
    },
    {
      text: '框架',
      collapsed: true,
      items: [{ text: 'demo1', link: '/api-examples' }],
    },
    {
      text: '工程化',
      collapsed: true,
      items: [{ text: 'demo1', link: '/api-examples' }, ,],
    },
    {
      text: '性能优化',
      collapsed: true,
      items: [{ text: 'demo1', link: '/api-examples' }],
    },
  ],
}

export { feNav, feSidebar }
