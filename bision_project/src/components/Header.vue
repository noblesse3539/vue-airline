<template>
    <div id="navbox">
        <div class="nav-left">
                <router-link to="/" class="nav-left-title">
                    BisionTour
                </router-link>
            <div class="nav-left-toggle">
                <router-link to="/" class="airline-reservation"><i class="fas fa-plane-departure"></i>
                    <span class="airline-reservation-text">항공권</span></router-link>
                <router-link to="/" class="guide-reservation"><i class="fas fa-suitcase-rolling"></i>
                    <span class="airline-reservation-text">가이드</span></router-link>
            </div>
        </div>
        <div class="nav-right">
            <router-link to="/" class="hvr-underline-from-center">
                <span class="loginBtn" @click="open()">로그인 🌴</span>

                <!-- 로그인 됐을 경우에만 보여줄 것 -->
                <span class="logoutBtn" @click="logout()">로그아웃</span>
            </router-link>
        </div>
        <v-layout wrap style="height: 100vh; width: 70%; right: 0;"  id="nav-right-collapsed">
                <v-container style="padding:0;">
                    <v-layout justify-end>
                        <v-btn id="nav-right-collapsed-btn" dark @click.stop="drawer = !drawer">
                            &#9776;
                        </v-btn>
                    </v-layout>
                </v-container>
                <v-navigation-drawer style="width: 85%;" v-model="drawer" absolute light right hide-overlay>
                    <v-list class="pt-0" dense >
                        <v-divider dark></v-divider>
                        <div style="height: 47px;"></div>
                        <v-list-tile v-for="item in items" :key="item.title" @click="goToPage(item.url)">
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content style="color: skyblue;" @click="goToPage(item.url)">
                                <v-list-tile-title >{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-navigation-drawer>
            </v-layout>
            <div v-if="modal">
              <LoginModal
              @closeModal="closeModal"
              @child="close"/>
            </div>
    </div>
</template>

<script>
import './Header.css'
import './LoginModal.css'
import LoginModal from './LoginModal'

export default {
    name: 'Header',
    components:{
      LoginModal
    },
    props: {},
    mounted() {
        document.body.addEventListener('click', this.close)
    },
    methods: {
        goToPage : function (url) {
            this.$router.push(url)
        },
        // open: function(){
        //   document.getElementById('modal').style.display = 'block';
        // },
        open: function(){
          this.modal=true
          const footerZIndex = document.body.querySelector(".v-footer")
          footerZIndex.style.zIndex = 0
        },
        close(e){
          // this.modal=false
          console.log(e.target.classList[0])
          // const loginWrapper = document.querySelector('.LoginModal-wrapper')
          // const loginBtn     = document.querySelector('.loginBtn')
          if (this.modal == true && (e.target.classList[0] === 'LoginModal-wrapper' || e.target.classList[0] === 'closeBtn' )) {
              this.modal = false
          }
          if (this.modal == true && (e.target.classList[0] === 'v-btn' || e.target.classList[0] === 'v-btn__content')) {
              this.modal = false
          }
        },
        logout() {

        },
        closeModal() {
            this.modal = false
        },
    },
    data () {
        return {
            drawer: null,
            items : [
                { title: '#' ,
                    url: '/#'},
                { title: '#' ,
                    url: '/#'},
                { title: '# in' ,
                    url: '/#'},
            ],
            modal:false
        }
    }
}
</script>
