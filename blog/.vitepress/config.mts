import { defineConfig } from 'vitepress'
import { nav, sidebar } from '../router/index'

export default defineConfig({
  lang: 'zh-Hans',
  title: 'BieFlow知识库',
  description: 'A VitePress Site',
  base: '/blog/',
  srcDir: 'docs', // 源目录
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/blog/code.png',
      },
    ],
  ],
  themeConfig: {
    // logo: '/code.png',
    nav,
    sidebar,
    outline: {
      label: '目录',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '退出',
            },
          },
        },
      },
    },
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bieber-fe' },
      {
        icon: {
          svg: '<svg t="1747993515198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2594" width="200" height="200"><path d="M512 1024C229.2224 1024 0 794.7776 0 512S229.2224 0 512 0s512 229.2224 512 512-229.2224 512-512 512z m259.1488-568.8832H480.4096a25.2928 25.2928 0 0 0-25.2928 25.2928l-0.0256 63.2064c0 13.952 11.3152 25.2928 25.2672 25.2928h177.024c13.9776 0 25.2928 11.3152 25.2928 25.2672v12.6464a75.8528 75.8528 0 0 1-75.8528 75.8528H366.592a25.2928 25.2928 0 0 1-25.2672-25.2928v-240.1792a75.8528 75.8528 0 0 1 75.8272-75.8528h353.9456a25.2928 25.2928 0 0 0 25.2672-25.2928l0.0768-63.2064a25.2928 25.2928 0 0 0-25.2672-25.2928H417.152a189.6192 189.6192 0 0 0-189.6192 189.6448v353.9456c0 13.9776 11.3152 25.2928 25.2928 25.2928h372.9408a170.6496 170.6496 0 0 0 170.6496-170.6496v-145.408a25.2928 25.2928 0 0 0-25.2928-25.2672z" fill="#C71D23" p-id="2595"></path></svg>',
        },
        link: 'https://gitee.com/bieber-fe',
      },
      {
        icon: {
          svg: '<svg t="1747993865703" class="icon" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1675" width="200" height="200"><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="#1E80FF" p-id="1676"></path></svg>',
        },
        link: 'https://juejin.cn/user/254742426300760/posts',
      },
    ],
    notFound: {
      title: '未找到页面，迷路了～',
      quote: '请检查地址是否正确，或当前页面未开通，点击下方按钮返回首页',
      linkText: '返回首页',
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2023-2025 比伯',
    },
  },
})
