<template>
  <div class="container" style="border-radius: 20px; background-color: white;">
    <div class="wrapper">
      <div class="wrapperfour">
         <!-- 항공사 이미지 -->
        <div class="">
          <div class="container center" style="height: 50%; padding: 10px;">
            <v-img :src="OutCarrierImageUrl"></v-img>
          </div>
          <div class="container center" style="height: 50%; padding: 10px;">
            <v-img :src="InCarrierImageUrl"></v-img>
          </div>
        </div>
        <!-- 출발 시각, 출발 공항 -->
        <div class="" style="font-weight: bold; font-size: 20px;">
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
        <!-- 소요시간, 경유여부, 화살표 -->
        <div class="">
          <div class="center" style="height: 50%">
            <i class="fas fa-long-arrow-alt-right"></i>
          </div>
          <div class="center" style="height: 50%">
            <i class="fas fa-long-arrow-alt-right"></i>
          </div>
        </div>
        <!-- 도착 시각, 도착 공항 -->
        <div class="" style="font-weight: bold; font-size: 20px;">
          <div class="center" style="height: 50%;">
            <div class="">
              <div class="">
                {{OutArrivalTime}}
              </div>
              <div class="">
                {{DestinationAirportCode}}
              </div>
            </div>
          </div>
          <div class="center" style="height: 50%">
            <div class="">
              <div class="">
                {{InArrivalTime}}
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
            <i class="fas fa-won-sign"></i>{{Price}}
          </div>
          <div class="center">
            <!-- <a :href="DeeplinkUrl">
              <v-btn depressed color="primary" style="border-radius: 20px;">선택</v-btn>
            </a> -->
            <v-btn :href="DeeplinkUrl" depressed color="primary" style="border-radius: 20px;"><span style="color: white;">선택&nbsp&nbsp<i class="fas fa-arrow-right"></i></span></v-btn>
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
      InDepartureTime: {type: String},
      InArrivalTime: {type: String},
      InCarrierImageUrl: {type: String},
      OutDepartureTime: {type: String},
      OutArrivalTime: {type: String},
      OutCarrierImageUrl: {type: String},
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
  /* a:hover { color: blue; text-decoration: underline;} */

</style>
