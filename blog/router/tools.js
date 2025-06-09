// 工具链 - 路由

const toolsNav = {
  text: '工具链',
  items: [
    { text: '开发工具', link: '/tools/prettier' },
    { text: '效率工具', link: '/tools/bash' },
    { text: 'AI辅助', link: '/api-examples' }
  ]
}

const toolsSidebar = {
  '/tools': [
    {
      text: '开发工具',
      collapsed: false,
      items: [{ text: '「 Prettier 」代码美化', link: '/tools/prettier' }]
    },
    {
      text: '效率工具',
      collapsed: false,
      items: [
        { text: '「 Bash 」脚本编程', link: '/tools/bash' },
        { text: '「 Git 」命令与规范', link: '/tools/git' },
        { text: '「 Vim 」高效开发', link: '/tools/vscode-vim' }
      ]
    }
  ]
}

export { toolsNav, toolsSidebar }
