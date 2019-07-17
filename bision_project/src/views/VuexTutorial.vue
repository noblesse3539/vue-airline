<template>
    <div class="VuexTutorial" style="margin-top: 200px;">
        <h1>Welcome to Vuex</h1>
        <p class="counter-from-store">Store에서 가져온 state값: {{getCounter}}</p>
        <button class="mutation-from-store" @click="getMutationFunc">+</button>
        <button class="action-from-store" @click="getActionFunc">-</button>
    </div>
</template>

<script>
export default {
    name: 'VuexTutorial',

    // store에 선언한 state값을 가져올 때는 computed안에 함수를 만들어서 가져옵니다!
    computed: {
        getCounter() {
            return this.$store.state.counter
        },
    },
    methods: {
        // mutations 함수는 commit 명령어로 호출합니다.
        getMutationFunc() {
            this.$store.commit("increment")
        },

        // actions 함수는 dispatch 명령어로 호출합니다.
        getActionFunc() {
            this.$store.dispatch('callDecrement')
        }
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