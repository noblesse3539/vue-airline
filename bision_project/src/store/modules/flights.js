const state = {
    flightList : [],
    flightIdx : 0
}

const getters = {
    // getFlightList: state => {
    //     return state.flightList
    // },
    // getFlight: state => {
    //   return state.flightList[state.flightIdx]
    // }
}

const mutations = {
  emptyFlightList(state) {
    state.flightList = []
  },
  addFlight(state,v) {
    state.flightList.push(v)
  },
  pickFlight(state, v){
    state.flightIdx = v
  }
}

const actions = {
    callEmptyFlightList(context) {
      context.commit('emptyFlightList')
    },
    callAddFlight(context) {
      context.commit('addFlight')
    },
    callPickFlight(context) {
      context.commit('pickFlight')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
