const state = {
    isAdmin: false
}

const getters = {
    getIsAdmin: state => {
        return state.isAdmin
    }
}

const mutations = {
    setIsAdmin(state, isAdmin) {
        state.isAdmin = isAdmin
    }
}

export default {
    state,
    getters,
    mutations
}