const state = {
    isLoggedIn: false
}

const getters = {
    getIsLoggedIn: state => {
        return state.isLoggedIn
    }
}

const mutations = {
    setIsLoggedIn(state) {
        state.isLoggedIn = true
    }
}

export default {
    state,
    getters,
    mutations
}