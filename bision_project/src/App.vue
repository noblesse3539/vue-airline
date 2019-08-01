<template>
  <div id="app">
    <Header></Header>
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
import "./App.css";

export default {
  name: "app",
  components: {
    Header,
    Footer
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
    }
  }
};
</script>
