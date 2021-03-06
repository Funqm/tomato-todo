import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import installElementPlus from './plugins/element'
import router from './router'

const app = createApp(App).use(router).use(router)
installElementPlus(app)
app.use(store).mount('#app')