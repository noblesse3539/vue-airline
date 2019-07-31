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
import { mapGetters, mapState } from 'vuex'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  created() {

  },
  mounted() {
    this.checkUserLoginStatus()
    // console.log(this.getUserId)
  },
  computed: {
    ...mapGetters({
      getUserId : state => state.User.getUserId,
    })
  },
  methods: {
    checkUserLoginStatus: function() {

      const token= this.$getToken('BisionToken')
      const config = {
            'headers': {'x-access-token': token}
      }

      this.$http.get('/api/auth/check', config)
        .then( res => {
          if (res.status == 200) {
            this.$store.commit("setIsLoggedIn")
            this.$store.commit('setUserInfo', {
                                  userId: res.data.info._id, 
                                  userName: res.data.info.username,
                                  })
          }
        })
        .catch( err => {
          console.log(err)
        })
    },
  },
}
</script>
