const state = {
    counter: 0
}

const getters = {
    getCountWithFriend: state => {
        return parseInt(state.counter) + '와 친구 5명은 ' + parseInt(state.counter + 5) + '명이지!'
    }
}

const mutations = {
    increment(state) {
        state.counter += 1
    },
    decrement(state) {
        state.counter -= 1
    }
}

const actions = {
    callDecrement(context) {
        context.commit('decrement')
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}