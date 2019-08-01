<template>
    <div>
        <!-- <p style="color:black;">유저 로그인</p> -->
          <div class="login-boxbox">
            <!-- <label class="toggle takeoff-land">
                <input type="checkbox" class="toggle-checkbox">
                <div class="toggle-btn">
                </div>
            </label> -->
              <v-switch v-model="isGuide" inset flat :label="welcomeMessage"
                @click="changeWelcomeMsg"
                style="color: grey;"
              >
              </v-switch>
          </div>
        <a class="google-login-btn" @click="doLogin" href="#">
          <div class="google-login-btn-box">
            <img class="google-login-btn-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png" alt="">
            <p>Sign in with Google</p>
          </div>
            <!-- <img  src="../../assets/google_signin.png" alt='구글 로그인 아이콘'/> -->
        </a>
        <!-- <p style="color:black;">가이드 로그인</p>
        <a href="http://localhost:3000/api/auth/google/guide/">
            <img  src="../../assets/google_signin.png" alt='구글 로그인 아이콘'/>
        </a>       -->
    </div>
</template>
<script>

import './SignInBtn.css'

export default {
    name: 'SignInBtn',

    data() {
        return {
          isGuide: false,
          welcomeMessage: '가이드이신가요?',

          apiLoginUrl: 'http://localhost:3000/api/auth/google/user/',
          apiGuideLoginUrl : "http://localhost:3000/api/auth/google/guide/",
        }
    },
    updated() {
    },
    destroyed() {
        this.checkUserLoginStatus()
    },
    methods: {
      changeWelcomeMsg() {

          const googleLoginBtn = document.querySelector(".google-login-btn-box")
          if (this.isGuide) {
            this.welcomeMessage = "가이드 모드 ON"

            googleLoginBtn.style.borderColor = "#8c9eff"

          } else {
            this.welcomeMessage = '가이드이신가요?'
            googleLoginBtn.style.borderColor = "#9f9f9f"
          }
      },
        doLogin() {
            if (this.isGuide) {
                window.location.href = this.apiGuideLoginUrl
              } else {
                window.location.href ="http://localhost:3000/api/auth/google/user/"
              }
        },
        checkUserLoginStatus: function() {
      const token = this.$getToken("BisionToken");
      const config = {
        headers: { "x-access-token": token }
      };

      this.$http
        .get("/api/auth/check", config)
        .then(res => {

         console.log(res.data)
            
          if (res.status == 200) {
            this.$store.commit("setIsLoggedIn");
            this.$store.commit("setUserInfo", {
              userId: res.data.info._id,
              userName: res.data.info.username
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    },
}
</script>

<style>
  
  .google-login-btn {
    width: 100% !important;
    height: auto !important;
  }

  .google-login-btn-box {
    /* width: ; */
    height: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
    padding: 0 20px;
    color: rgba(0,0,0,.54);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,.5) !important;
    border: 4px solid #fff;
  }

  .google-login-btn-box:hover {
    border: 4px solid #45CE30;
    color: rgba(0,0,0,.54) !important;
  }

  .google-login-btn-box > p {
    margin: 0;
    margin-left: 10px;
    font-size: 2rem;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .google-login-btn-image {
    width: 50px;
    height: 50px;
  }

</style>