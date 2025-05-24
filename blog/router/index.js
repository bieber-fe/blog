// 路由
import { feNav, feSidebar } from './frontend'
import { serviceNav } from './service'
import { toolsNav, toolsSidebar } from './tools'

const nav = [
  { text: '主页', link: '/' },
  feNav,
  serviceNav,
  toolsNav,
  { text: '关于', link: '/about' },
]
const sidebar = { ...feSidebar, ...toolsSidebar }

export { nav, sidebar }
