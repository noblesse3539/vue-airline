<template>
    <div>
        <v-text-field v-model="name" label="Regular"></v-text-field>
        {{name}}
        <v-btn v-on:click="createUser">전송</v-btn>
        <v-btn v-on:click="getUser">가져와</v-btn>
        <br>
        {{samples}}
    
    </div>
</template>
<script>
// import axios from 'axios'
// import AirLineList from '../components/airlinedetail/AirLineList'
export default {
    name:'AirLineDetailPage',
    components: {
        // AirLineList,
    },
    created () {
        // axios.get('/api/samples')
        //     .then((response) => {
        //         this.samples = response.data
        //     })
    },
    data() {
        return {
            samples: [],
            name: '' ,
        }
    },
    methods: {
        createUser() {
            this.$http.get('/api/samples/'+ this.name)
            .then((response) => {
                this.samples.push(response.data)
            })
        },
        getUser() {
            this.$http.get('/api/samples/getUser/' + this.name)
                .then( res => {
                    console.log(res)
                })
        }
    }
}
</script>
