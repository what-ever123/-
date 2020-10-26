import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/font/iconfont.css'
import rem from './assets/js/rem'

Vue.prototype.axios = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    if (to.matched.some(item => item.meta == true) && (localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')) {
        router.push({ path: '/login?return=' + to.path })
    } else if ((window.localStorage.getItem('admin') != '' && window.localStorage.getItem('admin') != null) && to.path == '/login') {
        router.push({ path: '/' })
    } else {
        // console.log(to.path)
        next()
    }
    // console.log(to, from);
})

new Vue({
    router,
    rem,
    render: h => h(App)
}).$mount('#app')