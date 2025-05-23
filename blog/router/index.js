// 路由
import { feNav, feSidebar } from "./front-end"

const nav = [
    { text: "主页", link: "/" },
    feNav,
    { text: "Node", link: "/docs/node" },
    { text: "算法", link: "/docs/algorithm" },
    { text: "关于", link: "/docs/about" }
]
const sidebar = { ...feSidebar }

export { nav, sidebar }
