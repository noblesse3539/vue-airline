const state = {
    isFooterOpen: true
}

const getters = {
    getIsFooterOpen: state => {
        return state.isFooterOpen
    }
}

const mutations = {
    closeFooter(state) {
        state.isFooterOpen = false
    },
    openFooter(state) {
        state.isFooterOpen = true
    },
}

export default {
    state,
    getters,
    mutations
}