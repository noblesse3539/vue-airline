const state = {
    isLoggedIn: false,
    userId : '',
    userName: '',
    isGuide: false,
}

const getters = {
    getIsGuide : state => {
        return state.isGuide
    },
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
    setIsGuide(state, isGuideNow) {
        state.isGuide = isGuideNow
    },
    setIsLoggedIn(state) {
        state.isLoggedIn = true
    },
    setUserInfo(state, userInfo) {
        state.userId = userInfo.userId
        state.userName = userInfo.userName
        state.isGuide = userInfo.isGuideNow
    },
}

export default {
    state,
    getters,
    mutations
}