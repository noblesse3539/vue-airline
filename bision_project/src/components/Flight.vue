<template>
  <div class="container" style="border-radius: 20px; background-color: white;">
    <div class="wrapper">
      <div class="wrapperfour">
         <!-- 항공사 이미지 -->
        <div>
          <div class="container center" style="height: 50%; padding: 10px;">
            <v-img :src="OutCarrierImageUrl"></v-img>
          </div>
          <div class="container center" style="height: 50%; padding: 10px;">
            <v-img :src="InCarrierImageUrl"></v-img>
          </div>
        </div>
        <!-- 출발 시각, 출발 공항 -->
        <div style="font-weight: bold; font-size: 20px;">
          <div class="center" style="height: 50%;">
            <div class="">
              <div class="">
                {{OutDepartureTime}}
              </div>
              <div class="" sytle="display: flex; justify-content: center; padding: 10px;">
                <div class="">
                  {{OriginAirportCode}}
                </div>
              </div>
            </div>
          </div>
          <div class="center" style="height: 50%">
            <div class="">
              <div class="">
                {{InDepartureTime}}
              </div>
              <div class="">
                {{DestinationAirportCode}}
              </div>
            </div>
          </div>
        </div>
        <!-- 소요시간, 경유여부, 비행기 슝 -->
        <div>
          <div class="center" style="height: 50%">
            <div>
              <!-- 소요시간 -->
              <div class="container text-xs-center" style="width: 120px; padding-top: 0px;">
                {{OutDuration}}
              </div>
              <!-- 비행기 슝 -->
              <div class="center container" style=" display: grid; grid-template-columns: 80% 20%; padding: 0px;">
                <hr class="animated-width"/>
                <div style="padding-left: 5px;">
                  <i class="fas fa-plane"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="center" style="height: 50%">
            <div>
              <div class="container text-xs-center" style="width: 120px; padding-top: 0px;">
                {{InDuration}}
              </div>
              <div class="center container" style=" display: grid; grid-template-columns: 80% 20%; padding: 0px;">
                <hr class="animated-width"/>
                <div style="padding-left: 5px;">
                  <i class="fas fa-plane"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 도착 시각, 도착 공항 -->
        <div class="" style="font-weight: bold; font-size: 20px;">
          <div class="center" style="height: 50%;">
            <div class="">
              <div class="">
                <v-badge right>
                  <span>{{OutArrivalTime}}</span>
                  <template v-slot:badge v-if="OutDay">
                    <span>+1</span>
                  </template>
                </v-badge>
                <!-- {{OutArrivalTime}} -->
              </div>
              <div class="">
                {{DestinationAirportCode}}
              </div>
            </div>
          </div>
          <div class="center" style="height: 50%">
            <div class="">
              <div class="">
                <v-badge right>
                  <span>{{InArrivalTime}}</span>
                  <template v-slot:badge v-if="InDay">
                    <span>+1</span>
                  </template>
                </v-badge>
                <!-- {{InArrivalTime}} -->
              </div>
              <div class="">
                {{OriginAirportCode}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="">
          <div class="center">
            <v-img :src="AgentsImageUrl" width="100px"></v-img>
          </div>
          <div class="center container" style="font-weight: bold; font-size: 20px; padding: 10px;">
            {{CurrencySymbol}}&nbsp{{Price}}
          </div>
          <div class="center">
            <v-btn :href="DeeplinkUrl" target="_blank" depressed color="primary" style="border-radius: 20px;"><span style="color: white;">선택&nbsp&nbsp<i class="fas fa-arrow-right"></i></span></v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
    name: 'Flight',
    props: {
      AgentsImageUrl: {type: String},
      CurrencySymbol: {type: String},
      InDepartureTime: {type: String},
      InArrivalTime: {type: String},
      InCarrierImageUrl: {type: String},
      InDuration: {type: String},
      InDay: {type: Boolean},
      OutDepartureTime: {type: String},
      OutArrivalTime: {type: String},
      OutCarrierImageUrl: {type: String},
      OutDuration: {type: String},
      OutDay: {type: Boolean},
      Price: {type: String},
      DeeplinkUrl: {type: String},
      OriginAirportCode: {type: String},
      DestinationAirportCode: {type: String},
    },
    data: function() {
        return {
        }
    }
  }
</script>
<style>
  .wrapper {
    display: grid;
    grid-template-columns: 70% 30%;
  }
  .wrapper > div {
    backgroud: #eee;
    padding: 1em;
  }
  .wrapperfour {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* a:link { color: red; text-decoration: none;} */
  a:visited { color: black; text-decoration: none;}
@-webkit-keyframes animated-width {
   from {
      width: 0%;
   }
   to {
      width: 100%;
   }
}
hr {
  max-width: 100px !important;
}
hr.animated-width {
   height: 3px;
   weight: 100px !important;
   border: 0;
   text-align: center;
   background-color: grey;
   -webkit-animation-name: animated-width;
   /* -webkit-animation-iteration-count: infinite; */
   -webkit-animation-direction: alternate;
   -webkit-animation-duration: 2.0s;
   -webkit-animation-timing-function: ease-out;
}
</style>
