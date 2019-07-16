<template>
  <v-container row wrap>
    <v-flex xs6>
      <v-card style="height: 90px;">
        <v-layout row wrap>
          <v-flex xs3>
            <v-img :src="AgentsImageUrl"></v-img>
          </v-flex>
          <v-flex xs3>
            <div class="">{{InDepartureTime}}</div>
            <div class="">ICN</div>
          </v-flex>
          <v-flex xs3>
            <div pt-2>
              <v-img src="https://user-images.githubusercontent.com/46305309/61193686-fdff2300-a6f7-11e9-8c27-49d255d135b2.PNG"></v-img>
            </div>
          </v-flex>
          <v-flex xs3>
            <div class="">{{InArrivalTime}}</div>
            <div class="">DAD</div>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-layout row wrap>
          <v-flex xs3>
            <v-img :src="AgentsImageUrl"></v-img>
          </v-flex>
          <v-flex xs3>
            <div class="">오후 9:55</div>
            <div class="">ICN</div>
          </v-flex>
          <v-flex xs3>
            <div pt-2>
              <v-img src="https://user-images.githubusercontent.com/46305309/61193686-fdff2300-a6f7-11e9-8c27-49d255d135b2.PNG"></v-img>
            </div>
          </v-flex>
          <v-flex xs3>
            <div class="">오전 12:30</div>
            <div class="">DAD</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs2 style="height: 90px;">
      <v-card>
        <div style="display: flex; justify-content: center; align-items: center;">
          <div><i class="fas fa-won-sign"></i>{{Price}}</div>
        </div>
        <v-btn flat icon color="blue lighten-2" small>
          <v-img :src="require('../assets/movePage.png')" ></v-img>
        </v-btn>
      </v-card>
    </v-flex>
  </v-container>
</template>


<script>
import qs from 'qs'

export default {
    name: 'Flight',
    props: {
      AgentsImageUrl: {type: String},
      InDepartureTime: {type: String},
      InArrivalTime: {type: String},
      OutDepartureTime: {type: String},
      OutArrivalTime: {type: String},
      Price: {type: String},
      DeeplinkUrl: {type: String}
    },
    data: function() {
        return {

        }
    }
  }
</script>
