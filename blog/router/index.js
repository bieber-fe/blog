// 路由
import { feNav, feSidebar } from "./front-end"
import { serviceNav } from './service'
import { toolsNav } from './tools'

const nav = [
  { text: '主页', link: '/' },
  feNav,
  serviceNav,
  toolsNav,
  { text: '关于', link: '/docs/about' },
  //   { text: '算法', link: '/docs/algorithm' },
]
const sidebar = { ...feSidebar }

export { nav, sidebar }
