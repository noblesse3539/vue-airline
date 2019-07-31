const state = {
    serviceInfo: {}
}

const getters = {
    getServiceInfo: state => {
        return state.serviceInfo
    }
}

const mutations = {
    setServiceInfo(state, newServiceInfo) {
        state.serviceInfo = newServiceInfo
    },
}

export default {
    state,
    getters,
    mutations
}