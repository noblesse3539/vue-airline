<template>
<v-container>
  <v-layout>
      <div class="LoginModal-mask">
        <div class="LoginModal-wrapper">
          <div class="LoginModal-container">
            <div class="user-modal">
              <ul class="form-switcher">
                <li @click="flip('register', $event)">
                  <a href="" id="register-form">Register</a>
                </li>
                <li @click="flip('login', $event)">
                  <a href="" id="login-form">Login</a>
                </li>
              </ul>
              <div class="form-register" :class="{ 'active': active == 'register' }" id="form-register">
                <div class="error-message" v-text="registerError"></div>
                <input type="text" name="name" placeholder="Name" v-model="registerName" @keyup.enter="submit('register', $event)">
                <input type="email" name="email" placeholder="Email" v-model="registerEmail" @keyup.enter="submit('register', $event)">
                <input type="password" name="password" placeholder="Password" v-model="registerPassword" @keyup.enter="submit('register', $event)">
                <input type="submit" :class="{ 'disabled': submitted == 'register' }" @click="submit('register', $event)" v-model="registerSubmit" id="registerSubmit">
                <div class="links"> <a href="" @click="flip('login', $event)">Already have an account?</a></div>
              </div>
              <div class="form-login" :class="{ 'active': active == 'login' }" id="form-login">
                <div class="error-message" v-text="loginError"></div>
                <input type="text" name="user" placeholder="Email or Username" v-model="loginUser" @keyup.enter="submit('login', $event)">
                <input type="password" name="password" placeholder="Password" v-model="loginPassword" @keyup.enter="submit('login', $event)">
                <input type="submit" :class="{ 'disabled': submitted == 'login' }" @click="submit('login', $event)" v-model="loginSubmit" id="loginSubmit">
                <div class="links"> 
                  <a href="" @click="flip('password', $event)">Forgot your password?</a>
                  <div style="text-align:center">
                    <fb:login-button
                      scope="public_profile,email"
                      onlogin="checkLoginState();">
                    </fb:login-button>
                  </div>
                  <div style="text-align:center">
                    <v-btn @click="close()">취소</v-btn>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
  </v-layout>
</v-container>
</template>

<script>
import './LoginModal.css'

var modal_submit_register = 'Register';
var modal_submit_password = 'Reset Password';
var modal_submit_login = 'Login';

export default {
  name: 'LoginModal',
  props: { },
  methods: {
    goToPage: function(url) {
      this.$router.push(url)
    },
    flip: function(which, e) {
       e.preventDefault();
       if (which !== this.active) {
         this.active = which;
       }
    },
    submit: function(which, e) {
        let context = {}
        e.preventDefault();
          this.submitted = which
            var data = {
              form: which
            };

        switch (which) {
          case 'register':
          data.name = this.registerName;
          data.email = this.registerEmail;
          data.password = this.registerPassword;
          context = {
            'username': this.registerName,
            'password': this.registerPassword,
            'email': this.registerEmail
          }
          this.$http.post('/api/auth/register', context)
            .then( res => {
              console.log(res.status)
            })
          this.$set('registerSubmit', 'Registering...');
          break;
          case 'login':
          data.user = this.loginUser;
          data.password = this.loginPassword;
          context = {
            'username': this.loginUser,
            'password': this.loginPassword
          }
          this.$http.post('/api/auth/login', context)
          .then( res => {
            if(res.status == 200) {
              let d = new Date()
              d.setTime(d.getTime() + (1000*60*60)) // 1시간 유효
              let expires = "expires=" + d.toUTCString()
              document.cookie = "BisionToken=" + res.data.token
            }
            // 아래 요청도 가능
            // this.$http.get('/api/auth/check', {headers: {'x-access-token':res.data.token}})
            // this.$http.get(`api/user/list?token=${res.data.token}`)
          })
          .catch( error => {
            console.log(error)
          })
          this.$set('loginSubmit', 'Logging In...');
          break;
          case 'password':
          data.email = this.passwordEmail;
          this.$set('passwordSubmit', 'Resetting Password...')
          break;
        }
      },
      close(){
        this.$emit('child');
      },
      fablogin(){
          window.fbAsyncInit = function() {
            FB.init({
              appId      : '2908747355834093',
              cookie     : true,
              xfbml      : true,
              version    : 'v3.3'
            });

            FB.AppEvents.logPageView();

          };

          (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "https://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
           }(document, 'script', 'facebook-jssdk'));

           FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
          });

          function checkLoginState() {
            FB.getLoginStatus(function(response) {
              statusChangeCallback(response);
            });
          }
      }
  },
  data() {
    return {
      active: 'login',
      submitted: null,

      // Submit button text
      registerSubmit: modal_submit_register,
      passwordSubmit: modal_submit_password,
      loginSubmit: modal_submit_login,

      // Modal text fields
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      loginUser: '',
      loginPassword: '',
      passwordEmail: '',

      // Modal error messages
      registerError: '',
      loginError: '',
      passwordError: '',

    }
  },
  mounted(){
    this.fablogin()
  }
}
</script>
