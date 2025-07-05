// 前端路由

const feNav = {
  text: '前端技术',
  items: [
    { text: 'JavaScript', link: '/frontend/code' },
    { text: 'CSS/预处理器', link: '/frontend/reset' },
    { text: '框架', link: '/frontend/vue3' },
    { text: '工程化', link: '/frontend/git-commit' },
    { text: '性能优化', link: '/api-examples' }
  ]
}
const feSidebar = {
  '/frontend/': [
    {
      text: 'JavaScript',
      collapsed: false,
      items: [
        { text: '手写代码', link: '/frontend/code' },
        { text: 'Promise 相关方法实现', link: '/frontend/promise-code' }
      ]
    },
    {
      text: 'CSS/预处理器',
      collapsed: false,
      items: [{ text: '样式重置reset.css', link: '/frontend/reset' }]
    },
    {
      text: '框架',
      collapsed: false,
      items: [
        { text: '「 Vue3 」使用手册', link: '/frontend/vue3' },
        { text: '「 TypeScript 」使用手册', link: '/frontend/typescript' },
        { text: '「 VitePress 」搭建个人博客', link: '/frontend/vitepress' }
      ]
    },
    {
      text: '工程化',
      collapsed: false,
      items: [{ text: '「 Git 」提交规范/代码校验', link: '/frontend/git-commit' }]
    },
    {
      text: '性能优化',
      collapsed: false,
      items: [{ text: 'demo1', link: '/api-examples' }]
    }
  ]
}

export { feNav, feSidebar }
