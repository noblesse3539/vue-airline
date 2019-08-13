<template>
  <div class="container" style="border-radius: 20px; background-color: white;">
    <div class="wrapper">
      <div style="padding: 0px;">
        <div :style="`${InDepartureTime? 'height: 50%;': 'height: 100%; padding-top: 2.8rem'}`">
          <div class="wrapperfour">
            <!-- 항공사이미지 -->
            <div>
              <v-tooltip bottom color="rgba(0, 171, 132, 1)">
                <template v-slot:activator="{ on }">                
                  <v-img :src="OutSegments[0].Carrier[0].ImageUrl" v-on="on"></v-img>                
                </template>
                <div style="display: flex; align-content: center;">
                  {{OutSegments[0].Carrier[0].Name}}
                </div>
              </v-tooltip>              
            </div>
            <!-- 출발시간, 출발공항 -->
            <div style="font-weight: bold; font-size: 15px;">
              <div class="center">
                <div>
                  <span style="display: block; text-align: center;">{{OutDepartureTime}}</span>
                  <span style="display: block; text-align: right;">{{OriginAirportCode}}</span>
                </div>
              </div>
            </div>
            <!-- 소요시간, 경유여부, 비행기 슝 -->
            <div class="center">
              <div>
                <!-- 소요시간 -->
                <div style="display: flex; justify-content: center; width: 104px; font-size: 13px;">
                  <span>{{OutDuration}}</span>
                </div>
                <!-- 비행기 슝 -->
                <div class="center container" style="display: grid; grid-template-columns: 80% 20%; padding: 0px;">
                  <hr class="animated-width" style="max-width: 100px;"/>
                  <div style="padding-left: 5px;">
                    <i class="fas fa-plane"></i>
                  </div>
                </div>
                <div style="display: flex; justify-content: center">
                  <v-tooltip bottom color="rgba(0, 171, 132, 1)">
                    <template v-slot:activator="{ on }">
                      <div v-on="on">
                        <span v-if="OutNumofStop === '0'" style="color: #00d775; font-size: 13px;">직항</span>
                        <span v-else style="color: #ff5452; font-size: 13px;">{{OutNumofStop}}회 경유&nbsp</span>
                        <span v-for="(stop, index) in Outstops">{{ stops(stop.code, index) }}</span>
                      </div>
                    </template>
                    <div style="display: flex; align-content: center;">
                      <img src="../assets/airplane.png" height="15px;" alt="" style="padding-right: 5px; color: white;">
                      <span v-for="(stop, index) in Outstops">{{ stops(stop.name, index) }}</span>
                    </div>
                  </v-tooltip>
                </div>
              </div>
            </div>
            <!-- 도착시간, 도착공항 -->
            <div style="font-weight: bold; font-size: 15px;">
              <div class="center">
                <div>
                  <div>
                    <v-badge right>
                      <span>{{OutArrivalTime}}</span>
                      <template v-slot:badge v-if="OutDay">
                        <span>+{{OutDay}}</span>
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
            <div>
              <v-tooltip bottom color="rgba(0, 171, 132, 1)">
                <template v-slot:activator="{ on }">                
                  <v-img :src="InSegments[0].Carrier[0].ImageUrl" v-on="on"></v-img>                
                </template>
                <div style="display: flex; align-content: center;">
                  {{InSegments[0].Carrier[0].Name}}
                </div>
              </v-tooltip>
            </div>
            <!-- 출발시간, 출발공항 -->
            <div style="font-weight: bold; font-size: 15px;">
              <div class="center">
                <div>
                  <span style="display: block; text-align: center;">{{InDepartureTime}}</span>
                  <span style="display: block; text-align: right;">{{DestinationAirportCode}}</span>
                </div>
              </div>
            </div>
            <!-- 소요시간, 경유여부, 비행기 슝 -->
            <div class="center">
              <div>
                <!-- 소요시간 -->
                <div style="display: flex; justify-content: center; width: 104px; font-size: 13px;">
                  {{InDuration}}
                </div>
                <!-- 비행기 슝 -->
                <div class="center container" style=" display: grid; grid-template-columns: 80% 20%; padding: 0px;">
                  <hr class="animated-width" style="max-width: 100px;"/>
                  <div style="padding-left: 5px;">
                    <i class="fas fa-plane"></i>
                  </div>
                </div>
                <div style="display: flex; justify-content: center">                                    
                  <v-tooltip bottom color="rgba(0, 171, 132, 1)">
                    <template v-slot:activator="{ on }">
                      <div v-on="on">
                        <span v-if="InNumofStop === '0'" style="color: #00d775; font-size: 13px;">직항</span>
                        <span v-else style="color: #ff5452; font-size: 13px;">{{InNumofStop}}회 경유&nbsp</span>
                        <span v-for="(stop, index) in Instops">{{ stops(stop.code, index) }}</span>
                      </div>
                    </template>
                    <div style="display: flex; align-content: center;">
                      <img src="../assets/airplane.png" height="15px;" alt="" style="padding-right: 5px; color: white;">
                      <span v-for="(stop, index) in Instops">{{ stops(stop.name, index) }}</span>
                    </div>
                  </v-tooltip>
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
                        <span>+{{InDay}}</span>
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
          <!-- <div class="center">
            <v-img :src="LowestAgentsImageUrl" width="100px"></v-img>
          </div> -->
          <div class="center" v-if="NumofOptions == 1" style="font-size: 13px;">상품 1개</div>
          <div class="center" v-else style="font-size: 13px;">총 {{NumofOptions}}건 중 최저가</div>
          <!-- <div class="center" style="font-weight: bold; font-size: 20px; padding-top: 0px;"> -->
            <!-- {{CurrencySymbol}}&nbsp{{LowestPrice}}
          </div> -->
          <div style="font-weight: bold; font-size: 20px; padding-top: 5px; padding-bottom: 5px; display: flex; justify-content: center;">            
            <span>
              {{CurrencySymbol}}&nbsp{{LowestPrice}}
            </span>           
          </div>
          <div class="center">
            <v-btn @click="showFD" depressed color="primary" style="border-radius: 20px;"><span style="color: white;">선택&nbsp&nbsp<i class="fas fa-arrow-right"></i></span></v-btn>
            <FlightDetail v-if="isFDVisible" :flight="this._props" @close="closeFD"></FlightDetail>
          </div>
          <!-- 모달 -->
          <!-- <div>
            <button @click="handleClickButton">Toggle Modal</button>
            <app-my-modal
              title="This is modal"
              :visible.sync="visible">
              <div>
                This is modal body
              </div>
            </app-my-modal>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FlightDetail from '@/components/FlightDetail'
import qs from 'qs'
export default {
    name: 'Flight',
    props: {
      CurrencySymbol: {type: String},
      InDepartureTime: {type: String},
      InArrivalTime: {type: String},
      InCarrierImageUrl: {type: String},
      InDuration: {type: String},
      InDay: {type: String},
      InNumofStop: {type: String},
      Instops: {type: Array},
      InSegments: {type: Array},      
      OutDepartureTime: {type: String},
      OutArrivalTime: {type: String},
      OutCarrierImageUrl: {type: String},
      OutDuration: {type: String},
      OutDay: {type: String},
      OutNumofStop: {type: String},
      Outstops: {type: Array},
      OutSegments: {type: Array},      
      NumofOptions: {type: Number},
      LowestPrice: {type: String},
      LowestAgentsName: {type: String},
      LowestDeeplinkUrl: {type: String},
      LowestAgentsImageUrl: {type: String},
      OriginAirportCode: {type: String},
      DestinationAirportCode: {type: String},
      Options: {type: Array},
    },
    components: {
      FlightDetail
    },
    data() {
        return {
          visible: false,
          isFDVisible: false,
        }
    },
    methods: {
      showFD() {
        // var el = document.querySelector("body")
        // el.style.overflow="hidden !important"
        document.documentElement.style.overflow='hidden';
        document.body.scroll="no";
        this.isFDVisible = true
      },
      closeFD() {
        document.documentElement.style.overflow='scroll';
        document.body.scroll="yes";
        this.isFDVisible = false
      },
      stops : function (stop, index) {
        if (parseInt(index)%2 == 1) {
          return ", " + stop.toString()
        } else {
          return stop
        }
      },
    // handleClickButton(){
    //   this.visible = !this.visible
    // }
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
    grid-template-columns: 24% 24% 28% 24%;
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
/* hr {
  max-width: 100px !important;
} */
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