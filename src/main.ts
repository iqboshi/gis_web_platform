import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import baiduMap from 'vue3-baidu-map-gl'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(baiduMap, {
  ak: '3IIZyYyXN8KZ2lrKhs7sjP7YSzRG0t7Z',
  plugins: ['TrackAnimation'],
})

app.mount('#app')
