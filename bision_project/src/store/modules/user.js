const state = {
    isLoggedIn: false,
    userId : '',
    userName: '',
}

const getters = {
    getIsLoggedIn: state => {
        return state.isLoggedIn
    },
    getUserId : state => {
        return state.userId
    },
    getUserInfo: state => {
        return {
            userId : state.userId,
            userName : state.userName
        }
    }
}

const mutations = {
    setIsLoggedIn(state) {
        state.isLoggedIn = true
    },
    setUserInfo(state, userInfo) {
        state.userId = userInfo.userId
        state.userName = userInfo.userName
    },
}

export default {
    state,
    getters,
    mutations
}