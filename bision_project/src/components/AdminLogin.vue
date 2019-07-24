<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs4 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                        <v-form ref="adminLoginForm">
                            <v-card-text>
                                <v-text-field v-model="id" :rules="idRules" prepend-icon="person" name="login" label="Login" type="text" required></v-text-field>
                                <v-text-field v-model="password" :rules="pwRules" prepend-icon="lock" name="password" label="Password" id="password" type="password" required></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn v-on:click="validate" color="primary">Login</v-btn>
                            </v-card-actions>
                        </v-form>
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
            password: '',
            idRules: [
                v => !!v || 'id를 입력하세요.'
            ],
            pwRules: [
                v => !!v || 'password를 입력하세요.'
            ],
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
            .catch( err => {
                this.reset()
                alert('로그인 실패')
            })
        },
        validate () {
            if (this.$refs.adminLoginForm.validate()) {
                this.login()   
            }
        },
        reset () {
            this.$refs.adminLoginForm.reset()
        },
    },
    mounted() {
        const header = document.querySelector('#navbox')
        header.style.display = "none"
        
    },
    
}
</script>
