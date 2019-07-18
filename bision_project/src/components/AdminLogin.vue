<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs4 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                        <v-text-field v-model="id" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                        <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-on:click="login" color="primary">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'AdminLogin',
    data () {
        return {
            id: '',
            password: ''
        }
    },
    methods: {
        login () {
            const context = {
                'username': this.id,
                'password': this.password
            }
            this.$http.post('/api/superauth/login', context)
            .then( res => {
                if(res.status == 200) {
                    const token = res.data.token
                    const hour = 1
                    this.$setCookie('BisionAdminToken', token, hour)
                    this.$store.commit('setIsAdmin', true)
                }
            })
        },
    },
    mounted() {
        const header = document.querySelector('#navbox')
        header.style.display = "none"
        
    },
    
}
</script>
