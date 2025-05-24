import DefaultTheme from 'vitepress/theme'
import layout from '../../component/layout.vue'
import './theme.css'
import { h } from 'vue'

export default {
  Layout: () => {
    return h(layout, null, {})
  },
  extends: DefaultTheme,
  enhanceApp({ app }) {},
}
