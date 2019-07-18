import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.use(Vuex)
Vue.use( CKEditor );
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

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
