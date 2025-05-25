import Theme from 'vitepress/theme'
import './theme.css'
// 评论
import layout from '../../component/layout.vue'
import { h } from 'vue'
// 图片放大
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

export default {
  Layout: () => {
    return h(layout, null, {})
  },
  extends: Theme,
  enhanceApp({ app }) {},

  setup() {
    const route = useRoute()
    const initZoom = () => {
      // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    )
  },
}
