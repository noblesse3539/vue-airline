<template>
    <v-container>
        <div id="leaves">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
        <h1>Admim Page</h1>
        <h2>Our Commit History</h2>
        <v-container class="adminNavbar">
            <v-card>
                <v-bottom-nav
                :active.sync="bottomNav"
                :color="color"
                :value="true"
                absolute
                dark
                shift
                >
                <v-btn dark v-for="page in pageList" style="padding-top: 0 !important; padding-bottom: 0 !important;">
                    <v-icon>{{page}}</v-icon>
                </v-btn>
                </v-bottom-nav>
            </v-card>
        </v-container>
        <UserTable></UserTable>
        <CommitGraph></CommitGraph>
    </v-container>
</template>

<script>
import CommitGraph from "../components/CommitGraph"
import UserTable from "../components/userTable/UserTable"
import './Admin.css'

export default {
    name: "Admin",
    components: {
        CommitGraph,
        UserTable
    },
    data () {
      return {
        bottomNav: 3,
        pageList: ['Logs', 'GitGraph', 'Etc'],
      }
    },
    beforeCreate () {
      console.log('비포어크리에잇!!!')
      const getCookie = function(name) {
        const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
        return cookie? cookie[2] : null;
      }
      const token = getCookie('BisionToken')
      const context = {
        headers: {'x-access-token': token}
      }
      this.$http.get('/api/user/list', context)
      .then( res => {
        console.log(res)
      })
      .catch( err => {
        this.$router.go(-1)

        
      })
    },
    computed: {
      color () {
        switch (this.bottomNav) {
          case 0: return 'indigo'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
        }
      }
    }
}
</script>