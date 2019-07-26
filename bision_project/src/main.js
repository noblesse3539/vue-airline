import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import Vue2Editor from "vue2-editor"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(Vue2Editor)
Vue.use(Vuex)
Vue.use(Vuetify, {
	iconfont: 'fa',
	icons: {
		'cancel': 'fas fa-ban',
	},
	theme: {
		primary: '#3f51b5',
		secondary: '#b0bec5',
		accent: '#8c9eff',
		error: '#b71c1c'
	}
})
Vue.use(VueAwesomeSwiper, /* { default global options } */)

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.prototype.$http = axios
Vue.prototype.$getToken = (cookieName) => {
	const cookie = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)')
	return cookie? cookie[2] : null;
}
Vue.prototype.$setCookie = (name, value, exp) => {
	let d = new Date()
	d.setTime(d.getTime() + (1000*60*60*exp)) // exp가 1일 때 1시간 유효
	let expires = ";expires=" + d.toUTCString()
	document.cookie = name+ "=" + value + expires
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
