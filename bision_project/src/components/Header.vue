<template>
    <div id="navbox" v-if="getIsHeaderOpen">
        <div class="nav-left"><form action="" method="get"></form>
                <a href="/" exact class="nav-left-title" style="display: flex; align-items: center;">
                <img onmouseover="document.getElementById('our-commitment').style.display = 'block';" 
                      onmouseout="document.getElementById('our-commitment').style.display = 'none';"
                class="easter-egg" style="width: 40%; height: auto; margin-right: 5px;" src="../../public/bisiontour.svg" alt="">
                BisionTour
                <iframe id="our-commitment" class="our-commitment" width="1280" height="800" src="https://www.youtube.com/embed/YkPoo2p0azI?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; allowfullscreen; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </a>
            <div class="nav-left-toggle">
                <router-link to="/" class="airline-reservation"><i class="fas fa-plane-departure"></i>
                    <span class="airline-reservation-text">항공권</span></router-link>
                <router-link to="/guidesearch" class="guide-reservation"><i class="fas fa-suitcase-rolling"></i>
                    <span class="airline-reservation-text">가이드</span></router-link>
            </div>
        </div>
        <div class="nav-right">
            <span v-if="getIsLoggedIn && getIsGuide == false">
                <span style=
                "color: black;
                margin-right: 20px; font-family:
                'Gothic A1', sans-serif;
                font-size: 1rem;
                font-weight: 600;"
                >
                </span>
                <router-link :to="{ path : `/room/` }" class="mypageBtn"><span class="mypageBtnInner">Chat</span></router-link>
                <router-link :to="{ path : `/user/${getuserId}` }" class="mypageBtn"><span class="mypageBtnInner">My Page</span></router-link>
                <div class="logoutBtn"><span @click="logout()">로그아웃</span></div>
            </span>
            <span v-if="getIsLoggedIn && getIsGuide == true">
                <span style=
                "color: black;
                margin-right: 20px;
                font-family: 'Gothic A1', sans-serif;"
                >

                </span>
                <router-link :to="{ path : `/room/` }" class="mypageBtn"><span class="mypageBtnInner">Chat</span></router-link>
                <router-link :to="{ path : `/guide/${getuserId}` }"
                                    class="mypageBtn"><span class="mypageBtnInner">My Guide Page</span></router-link>
                <div class="logoutBtn"><span @click="logout()">로그아웃</span></div>
            </span>

            <div v-if="getIsLoggedIn == false" class="hvr-underline-from-center">
                <span class="loginBtn" @click="open()">로그인 🌴</span>
            </div>

            <!-- <router-link v-if="getIsLoggedIn == false" :to="getCurrentUrl" class="hvr-underline-from-center">
                <span class="loginBtn" @click="open()">로그인 🌴</span>
            </router-link> -->
            <!-- 로그인 됐을 경우에만 보여줄 것 -->
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
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'Header',
    components:{
      LoginModal
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
            modal: false,
        }
    },
    props: {},
    created() {
        this.getIsLoggedIn
        console.log(this.getIsLoggedIn)
    },
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
        //   console.log(e.target.classList[0])
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
            const deleteCookie = (name) => {
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                }
            deleteCookie('BisionToken')

            const logoutBtn = document.querySelector('.logoutBtn')
            logoutBtn.style.display = "none"
            const mypageBtn = document.querySelector('.mypageBtn')
            mypageBtn.style.display = "none"
            this.$http.defaults.headers.common["x-access-token"] = null
            window.location.replace("/");
        },
        closeModal() {
            this.modal = false
        },
        getCurrentUrl() {
            return window.location.href
        }
    },
    computed: {
        ...mapState({
            getIsHeaderOpen : state => state.Header.isHeaderOpen,
            getIsLoggedIn : state => state.User.isLoggedIn,
            getuserId : state => state.User.userId,
            getUsername : state => state.User.userName,
            getIsGuide : state => state.User.isGuide,
        })
    },
}
</script>
