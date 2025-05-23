// 前端路由

const feNav = {
    text: "前端",
    items: [
        { text: "前端基础", link: "/docs/front-end" },
        { text: "框架与工具", link: "/docs/frame-tools" },
        { text: "浏览器", link: "/docs/browser" },
        { text: "工程化实践", link: "/docs/frontend-engineering" },
        { text: "性能优化", link: "/docs/optimize" }
    ]
}
const feSidebar = {
    "/docs/front-end/": [
        {
            text: "html/css",
            // collapsed: false,
            items: [
                { text: "文章1", link: "/docs/front-end/base" },
                { text: "文章2", link: "/api-examples" },
                { text: "文章3", link: "/api-examples" }
            ]
        },
        {
            text: "Javascript",
            items: [
                { text: "文章1", link: "/docs/front-end/base" },
                { text: "文章1", link: "/api-examples" },
                { text: "文章1", link: "/api-examples" }
            ]
        }
    ]
}

export { feNav, feSidebar }
