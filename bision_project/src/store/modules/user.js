const state = {
    isLoggedIn: false,
    userId : '',
}

const getters = {
    getIsLoggedIn: state => {
        return state.isLoggedIn
    },
    getUserId : state => {
        return state.userId
    }
}

const mutations = {
    setIsLoggedIn(state) {
        state.isLoggedIn = true
    },
    setUserId(state, userId) {
        state.userId = userId
    },
}

export default {
    state,
    getters,
    mutations
}