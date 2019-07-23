const state = {
    message: '안녕하세용 얼러트입니다.'
}

const getters = {
    getMessage: state => {
        return state.message
    }
}

const mutations = {
    newMessage(state, userInput) {
        state.message = userInput
    },
}

const actions = {
    callNewMessage(context) {
        context.commit('newMessage')
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}