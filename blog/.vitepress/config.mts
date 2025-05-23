import { defineConfig } from "vitepress";
import { nav, sidebar } from "../router/index"

export default defineConfig({
    title: "BieFlow",
    description: "A VitePress Site",
    base: "/blog/",
    // outDir: "/blog",
    head: [
        [
            "link",
            {
                rel: "icon",
                href: "https://cn.vitejs.dev/viteconf.svg"
            }
        ]
    ],
    lastUpdated: true,
    themeConfig: {
        logo: "/logo.svg",
        nav: nav,
        sidebar,
        algolia: {
            appId: "",
            apiKey: "",
            indexName: ""
        },
        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档"
                    },
                    modal: {
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换"
                        }
                    }
                }
            }
        },
        lastUpdatedText: "最后更新",
        docFooter: {
            prev: "上一页",
            next: "下一页"
        },
        socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
        footer: {
            message: "基于 MIT 许可发布",
            copyright: "版权所有 © 2023-2025 比伯"
        }
    }
})
