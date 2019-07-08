<template>
    <v-container fluid px-0>
        <v-layout column>
            <v-card>
                <v-card-text>
                    <v-text-field
                        v-model="form.firstName"
                        label="FirstName"></v-text-field>
                    <v-text-field
                        v-model="form.lastName"
                        label="Last Name"></v-text-field>
                    <v-text-field
                        v-model="form.contactEmail"
                        label="Email Address"></v-text-field>
                </v-card-text>
                <v-card-actions fluid justify-end>
                    <v-btn color="primary" :loading="loading" @click.native="update">
                        <!-- <v-icon left dark>check</v-icon> -->
                        수정하기
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
      name: 'Profile',
      data () {
          return {
            loading: false,
            form: {
                firstName: '세민',
                lastName: '정',
                contactEmail: 'jho0078@gmail.com',
            }
          }
      }
    }
</script>
