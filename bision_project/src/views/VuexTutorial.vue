<template>
    <div class="VuexTutorial" style="margin-top: 200px;">
        <h1>Welcome to Vuex</h1>
        test: {{getIsHeaderOpen}}
        <p class="counter-from-store">Store에서 가져온 state값: {{getCounter}}</p>
        <p class="counter-from-store">getters로 가져온 state값: {{getCountWithFriend}}</p>
        <button class="mutation-from-store" @click="getMutationFunc">+</button>
        <button class="action-from-store" @click="getActionFunc">-</button>
        <br>
        <p class="counter-from-store">store에서 가져온 alert값: {{getMessage}}</p>
        <input class="action-from-store" @click="newMessage('우히히')" value="변경"></input>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'VuexTutorial',

    // store에 선언한 state값을 가져올 때는 computed안에 함수를 만들어서 가져옵니다!
    computed: {

        // state값을 그대로 갖고올 경우
        ...mapState({
            getCounter: state => state.Counter.counter,
            getMessage: state => state.Alerter.message,
            getIsHeaderOpen : state => state.Header.isHeaderOpen
            }),

        // state값에 어떠한 연산을 해서 가져오고 싶을 경우
        ...mapGetters({
            getCountWithFriend : 'getCountWithFriend',
            
        }),
    },
    methods: {
        // 혹시라도 param을 넘기고 싶을 땐 두번째 인자로 넘겨주면 됩니다.
        getMutationFunc() {
            this.$store.commit('increment')
        },
        getActionFunc() {
            this.$store.dispatch('callDecrement')
        },
        newMessage(userInput) {
            this.$store.commit('newMessage', userInput)
        },
        // // mutations 함수는 commit 명령어로 호출합니다.
        // getMutationFunc() {
        //     this.$store.commit("increment")
        // },

        // // actions 함수는 dispatch 명령어로 호출합니다.
        // getActionFunc() {
        //     this.$store.dispatch('callDecrement')
        // }
    },
    
}
</script>

<style>
    .VuexTutorial {
        margin-left: 12.5%;
        margin-right: 12.5%;
    }

    .counter-from-store {
        font-size: 3rem;
    }

    .mutation-from-store {
        width: 100px;
        height: 30px;
        background: black;
        color: white;
        font-size: 1rem;
    }
    .action-from-store {
        width: 100px;
        height: 30px;
        background: black;
        color: white;
        font-size: 1rem;
    }

</style>