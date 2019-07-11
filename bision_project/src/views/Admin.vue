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

        <CommitGraph></CommitGraph>
    </v-container>
</template>

<script>
import CommitGraph from "../components/CommitGraph"
import './Admin.css'

export default {
    name: "Admin",
    components: {
        CommitGraph,
    },
    data () {
      return {
        bottomNav: 3,
        pageList: ['Logs', 'GitGraph', 'Etc'],
      }
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