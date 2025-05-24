// 工具链 - 路由

const toolsNav = {
  text: '工具链',
  items: [
    { text: '开发工具', link: '/api-examples' },
    { text: '效率工具', link: '/tools/bash' },
    { text: 'AI辅助', link: '/api-examples' },
  ],
}

const toolsSidebar = {
  '/tools': [
    {
      text: '效率工具',
      collapsed: true,
      items: [{ text: 'Bash脚本编程', link: '/tools/bash' }],
    },
  ],
}

export { toolsNav, toolsSidebar }
