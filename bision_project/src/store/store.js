import Vue from 'vue'
import Vuex from 'vuex'
import Counter from './modules/counter'
import Alerter from './modules/alerter'
import Admin from './modules/admin'
import Header from './modules/header'
import User from './modules/user'
import Guideservice from './modules/guideservice'

// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Counter,
    Alerter,
    Admin,
    Header,
    User,
    Guideservice,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})

// --------------------------------------------------------------------
// 이 아래부터는 Vuex의 기본 구조 설명을 위한 예제 코드입니다.
// --------------------------------------------------------------------

// export default new Vuex.Store({

//   // 우리가 사용할 data는 이제 state라고 부를 겁니다.
//   state: {
//     counter : 1,

//   },

//   // state에 선언한 data를 다른 component에서 `가져올 때` 사용할 메서드입니다.
//   getters: {
//     getCount: state => {
//       return state.counter
//     }
//   },

//   // 다른 component에서 state내의 data의 값을 직접적으로 `변경`할 때 사용할 메서드입니다.
//   mutations: {
//     increment(state) {
//       state.counter += 1
//     },
//     decrement(state) {
//       state.counter -= 1
//     }
//   },

//   // 다른 component에서 mutations 메서드를 간접적으로 `발생`시키는 메서드입니다.
//   // (**주의**) actions안에 정의된 메서드는 비동기적으로 처리됩니다.
//   // 따라서, 비동기로 API를 호출하고 응답이 왔을 때만 mutation하고 싶은 경우 유용합니다.
//   actions: {
//     callDecrement(context) {
//       context.commit('decrement')
//     },
//   }
// })
