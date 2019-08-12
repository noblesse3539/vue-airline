<template>
  <div id="app">
    <Header></Header>
    <Voc></Voc>
    <v-content>
      <v-app>
        <router-view></router-view>
      </v-app>
    </v-content>
    <Footer style="z-index: 2000 !important;"></Footer>
  </div>
</template>

<script type="application/javascript" src="http://ipinfo.io/?format=jsonp&callback=getIP"></script>
<script>
import { mapGetters, mapState } from "vuex";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Voc from "./components/Voc";
import io from 'socket.io-client';

import "./App.css";

export default {
  name: "app",
  components: {
    Header,
    Footer,
    Voc
  },
  data:function(){
    return{
      socket : io('localhost:3000/chat'),
    }
  },
  created() {
    this.checkUserLoginStatus();
    window.addEventListener("load", this.checkUserLoginStatus)
  },
  udpated() {
    this.checkUserLoginStatus();
  },
  mounted() {
    this.checkUserLoginStatus();
    // window.addEventListener("load", this.checkUserLoginStatus)
    this.getNotificationPermission();
    this.socket.on('chat', (data) => {
        console.log(data);
        let alarm=data.chat.replace('<br />','\n')
        this.notify(alarm);
    });
    let params = new URL(document.location).searchParams;
    let token = params.get("token");
    if (token) {
      let d = new Date();
      d.setTime(d.getTime() + 1000 * 60 * 60 * 3); // 1시간 유효
      let expires = "expires=" + d.toUTCString();
      document.cookie = "BisionToken=" + token + ";expires=" + expires;
    }
    // console.log(this.getUserId)
  },
  computed: {
    ...mapState({
      getUserId: state => state.User.getUserId
    })
  },
  methods: {
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
              userName: res.data.info.username,
              isGuideNow: res.data.info.isGuide
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNotificationPermission:function () {
        // 브라우저 지원 여부 체크
        if (!("Notification" in window)) {
            alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
        }
        // 데스크탑 알림 권한 요청
        Notification.requestPermission(function (result) {
            // 권한 거절
            // if(result == 'denied') {
            //     alert('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
            //     return false;
            // }
        });
    },
    notify:function (msg) {
        var alarm = {
            body: msg
        }

        // 데스크탑 알림 요청
        var notification = new Notification("Title", alarm);

        // 3초뒤 알람 닫기
        setTimeout(function(){
            notification.close();
        }, 3000);
    }
  }
};
</script>
