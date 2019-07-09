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
import axios from 'axios'
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
            axios.get('/api/samples/'+ this.name)
            .then((response) => {
                this.samples.push(response.data)
            })
        },
        getUser() {
            axios.get('/api/samples/')
                .then( res => {
                    console.log(res)
                })
        }
    }
}
</script>
