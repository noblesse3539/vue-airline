<template>
  <v-card>
    <v-card-title>
      SuperUsers
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="superusers"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.username }}</td>
        <td class="text-xs-right">{{ props.item.admin }}</td>
        <td class="text-xs-right">{{ props.item.password }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item._id }}</td>
        <v-btn v-if="props.item.admin" @click="assignAdmin(props.item.username)" round color="pink" outline>권한취소</v-btn>
        <v-btn v-else @click="assignAdmin(props.item.username)" round color="success" outline>권한부여</v-btn>
        <v-btn round color="info" outline>수정</v-btn>
        <v-btn round color="red" outline>삭제</v-btn>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    name: 'UserTable',
    data () {
      return {
        search: '',
        headers: [
          { text: 'username', align: 'left', sortable: false, value: 'username' },
          { text: 'admin', value: 'admin' },
          { text: 'password', value: 'password' },
          { text: 'email', value: 'email' },
          { text: '_id', value: '_id' }
        ],
        superusers: [
          {
            username: 'admin',
            admin: true,
            password: 'im',
            email: 'a@a.com',
            ObjectId: 1,
          },
          {
            username: 'admin2',
            admin: false,
            password: '123123',
            email: 'b@a.com',
            ObjectId: 2,
          },
        ]
      }
    },
    mounted () {
      this.getUsers()
    },
    methods: {
      getUsers () {
        const token = this.$getToken('BisionAdminToken')
        const config = {
            'headers': {'x-access-token': token}
        }
        this.$http.get('api/superuser/list', config)
        .then( res => {
          this.superusers = res.data.users
        })
      },
      assignAdmin (username) {
        const token = this.$getToken('BisionAdminToken')
        const config = {
            'headers': {'x-access-token': token}
        }
        this.$http.post(`api/superuser/assign-admin/${username}`,{}, config)
        .then( res => {
          return res.data.success 
        })
        .then( success => {
          const target = this.superusers.filter( user => {
            return user.username === username
          })[0]
          target.admin = !target.admin
        })
        .catch( err => {
          console.log(err)
        })
      }
    }
  }
</script>
