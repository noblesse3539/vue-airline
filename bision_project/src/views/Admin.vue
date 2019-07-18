<template>
  <div>
    <v-container v-if="getIsAdmin">
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
    <v-container v-else>
      <AdminLogin></AdminLogin>
    </v-container>
  </div>
</template>

<script>
import CommitGraph from "../components/CommitGraph"
import UserTable from "../components/userTable/UserTable"
import AdminLogin from "../components/AdminLogin"
import './Admin.css'
import { mapGetters, mapState } from 'vuex'

export default {
    name: "Admin",
    components: {
        CommitGraph,
        UserTable,
        AdminLogin,
    },
    data () {
      return {
        bottomNav: 3,
        pageList: ['Logs', 'GitGraph', 'Etc'],
        admin: false,
        res: null,
      }
    },
    created () {
      

    },
    mounted () {
      this.check ()
    },
    computed: {
      color () {
        switch (this.bottomNav) {
          case 0: return 'indigo'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
        }
      },
      ...mapGetters({
        getIsAdmin: 'getIsAdmin',
      })
    },
    methods: {
      check () {
        const token = this.$getToken('BisionAdminToken')
        const config = {
            'headers': {'x-access-token': token}
        }
        this.$http.get('/api/superauth/check', config)
          .then( res => {
            this.$store.commit('setIsAdmin', true)
            this.res = res
            console.log(res)
          })
          .catch( err => {
            console.log(err)
            this.$store.commit('setIsAdmin', false)
          })
      },
      
    }
}
</script>