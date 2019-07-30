<template>
<v-container>
  <v-layout>
      <div class="LoginModal-mask">
        <div class="LoginModal-wrapper">
          <div class="LoginModal-container">
            <div class="modal-upper">
              <span class="modal-upper-title">BisionTour
              </span>
              <biutton class="closeBtn" @click="close()">&#x2716;</biutton>
            </div>
            <div class="user-modal">
            
              <!--
              <ul class="form-switcher">
                <li @click="flip('register', $event)">
                  <a href="" id="register-form">Register</a>
                </li>
                <li @click="flip('login', $event)">
                  <a href="" id="login-form">Login</a>
                </li>
                -->
              <div class="form-register" :class="{ 'active': active == 'register' }" id="form-register">
                <div class="error-message" v-text="registerError"></div>
                <div class="welcomeImg"></div>
                <input type="email" name="name" placeholder="이메일 입력" v-model="registerName" @keyup.enter="submit('register', $event)">
                <!-- <input type="email" name="email" placeholder="Email" v-model="registerEmail" @keyup.enter="submit('register', $event)"> -->
                <input type="password" name="password" placeholder="비밀번호 입력" v-model="registerPassword" @keyup.enter="submit('register', $event)">
                <input type="submit" :class="{ 'disabled': submitted == 'register' }" @click="submit('register', $event)" v-model="registerSubmit" id="registerSubmit">
                <div class="links-what"> <a href="" @click="flip('login', $event)">이미 계정이 있으신가요?</a></div>
              </div>
              <div class="form-login" :class="{ 'active': active == 'login' }" id="form-login">
                <div class="error-message" v-text="loginError"></div>
                <input type="email" name="user" placeholder="이메일 입력" v-model="loginUser" @keyup.enter="submit('login', $event)">
                <input type="password" name="password" placeholder="비밀번호 입력" v-model="loginPassword" @keyup.enter="submit('login', $event)">
                
                <!-- 로그인 제출 버튼 -->
                <input type="submit" :class="{ 'disabled': submitted == 'login' }" @click="submit('login', $event)" v-model="loginSubmit" id="loginSubmit">
                
                <!-- <input type="email" name="email" placeholder="Email" v-model="registerEmail" @keyup.enter="submit('register', $event)">
                <input type="password" name="password" placeholder="Password" v-model="registerPassword" @keyup.enter="submit('register', $event)">
                 -->
                <div class="links">
                  <div class="links-div forgot-password"><a href="" @click="flip('password', $event)">비밀번호를 잊어버리셨나요?</a></div>
                  <div class="links-div"><span style="color: black; margin-right: 10px;">처음이신가요?</span> <a href="" id="register-form" @click="flip('register', $event)">가입하기</a></div>
                  <div style="text-align:center" class="facebook-container">
                    <facebook-login class="button"
                      appId="2908747355834093"
                      @login="getUserData"
                      @logout="onLogout"
                      @sdk-loaded="sdkLoaded">
                    </facebook-login>
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
import facebookLogin from 'facebook-login-vuejs';
import { mapGetters, mapState } from 'vuex'

var modal_submit_register = '회원가입';
var modal_submit_password = 'Reset Password';
var modal_submit_login = '로그인';

export default {
  name: 'LoginModal',
  components:{
    facebookLogin
  },
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
            // 'email': this.registerEmail
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
              document.cookie = "BisionToken=" + res.data.token + ';expires=' + expires

              const loginBtn = document.querySelector('.loginBtn')
              loginBtn.style.display = "none"
              // const logoutBtn = document.querySelector('.logoutBtn')
              // logoutBtn.style.display = "inline"
              // const mypageBtn = document.querySelector('.mypageBtn')
              // mypageBtn.style.display = "inline"
              
              this.$emit('closeModal')
              this.$store.commit('setIsLoggedIn')

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
      getUserData() {
        this.FB.api('/me', 'GET', { fields: 'id,name,email' },
          userInformation => {
            this.personalID = userInformation.id;
            this.email = userInformation.email;
            this.name = userInformation.name;
          }
        )
      },
      sdkLoaded(payload) {
        this.isConnected = payload.isConnected
        this.FB = payload.FB
        if (this.isConnected) this.getUserData()
      },
      onLogin() {
        this.isConnected = true
        this.getUserData()
      },
      onLogout() {
        this.isConnected = false;
      },
      signup() {
        
      },
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
  }
}
</script>
