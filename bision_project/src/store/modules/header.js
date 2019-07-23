const state = {
    isHeaderOpen: true
}

const getters = {
    getIsHeaderOpen: state => {
        return state.IsHeaderOpen
    }
}

const mutations = {
    closeHeader(state) {
        state.isHeaderOpen = false
    },
    openHeader(state) {
        state.isHeaderOpen = true
    },
}

export default {
    state,
    getters,
    mutations
}