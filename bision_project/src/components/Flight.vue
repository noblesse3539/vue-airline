<template>
  <div class="container" style="border-radius: 20px; background-color: white;">
    <div class="wrapper">
      <div>
        <div style="height: 50%">
          <div class="wrapperfour">
            <!-- 항공사이미지 -->
            <div class="container center" style="padding: 10px;">
              <v-img :src="OutCarrierImageUrl"></v-img>
            </div>
            <!-- 출발시간, 출발공항 -->
            <div style="font-weight: bold; font-size: 15px;">
              <div class="center">
                <div>
                  <div>{{OutDepartureTime}}</div>
                  <div sytle="display: flex; justify-content: center; padding: 10px;">
                    <div>{{OriginAirportCode}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 소요시간, 경유여부, 비행기 슝 -->
            <div class="center">
              <div>
                <!-- 소요시간 -->
                <div class="container text-xs-center" style="width: 120px; padding-top: 0px; font-size: 13px;">
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
            <div style="font-weight: bold; font-size: 15px;">
              <div class="center">
                <div>
                  <div>
                    <v-badge right>
                      <span>{{OutArrivalTime}}</span>
                      <template v-slot:badge v-if="OutDay">
                        <span>+1</span>
                      </template>
                    </v-badge>
                    <!-- {{OutArrivalTime}} -->
                  </div>
                  <div>{{DestinationAirportCode}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 편도일때 출력 X -->
        <div style="height: 50%" v-if="InDepartureTime">
          <div class="wrapperfour">
            <!-- 항공사이미지 -->
            <div class="container center" style="padding: 10px;">
              <v-img :src="InCarrierImageUrl"></v-img>
            </div>
            <!-- 출발시간, 출발공항 -->
            <div style="font-weight: bold; font-size: 15px;">
              <div class="center">
                <div>
                  <div>{{InDepartureTime}}</div>
                  <div sytle="display: flex; justify-content: center; padding: 10px;">
                    <div>{{DestinationAirportCode}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 소요시간, 경유여부, 비행기 슝 -->
            <div class="center">
              <div>
                <!-- 소요시간 -->
                <div class="container text-xs-center" style="width: 120px; padding-top: 0px; font-size: 13px;">
                  {{InDuration}}
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
            <div style="font-weight: bold; font-size: 15px;">
              <div class="center">
                <div>
                  <div>
                    <v-badge right>
                      <span>{{InArrivalTime}}</span>
                      <template v-slot:badge v-if="InDay">
                        <span>+1</span>
                      </template>
                    </v-badge>
                    <!-- {{OutArrivalTime}} -->
                  </div>
                  <div>{{OriginAirportCode}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="center">
        <div class="">
          <div class="center">
            <v-img :src="LowestAgentsImageUrl" width="100px"></v-img>
          </div>
          <div class="center" v-if="NumofOptions == 1">상품 1개</div>
          <div class="center" v-else>총 {{NumofOptions}}건 중 최저가</div>
          <div class="center container" style="font-weight: bold; font-size: 20px; padding: 10px;">
            {{CurrencySymbol}}&nbsp{{LowestPrice}}
          </div>
          <div class="center">
            <v-btn :href="LowestDeeplinkUrl" target="_blank" depressed color="primary" style="border-radius: 20px;"><span style="color: white;">선택&nbsp&nbsp<i class="fas fa-arrow-right"></i></span></v-btn>
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
      NumofOptions: {type: String},
      LowestPrice: {type: String},
      LowestDeeplinkUrl: {type: String},
      LowestAgentsImageUrl: {type: String},
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
