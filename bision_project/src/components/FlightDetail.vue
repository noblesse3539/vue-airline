<template>
    <div id="FlightDetail">
      <div class="FlightDetail__dialog">
        <header class="FlightDetail__header">
          <v-btn  @click="$emit('close')" icon flat><v-icon color="#35c235">arrow_back_ios</v-icon></v-btn>
          <span>세부 정보</span>
          <v-btn  @click="$emit('close')" icon flat><v-icon color="#35c235">close</v-icon></v-btn>
        </header>
        <div class="FlightDetail__body">
          <div class="flightinfo">

            <!-- 가는 비행기 -->
            <h3 style="font-size:1.3rem;">가는날 출발시간<span style="color:grey; font-size:0.95em;"> &nbsp; {{getDate(0, flight.OutSegments)}}</span></h3>
            <div class="ticket" @click="isOutVisible = !isOutVisible" @mouseover="outArrow = true" @mouseleave = "outArrow = false">
              <img height="40px" :src="flight.OutCarrierImageUrl" alt="">
              <div class="departure">
                <h2>{{flight.OutDepartureTime}}</h2>
                <p>{{flight.OriginAirportCode}}</p>
              </div>
              <div class="time">
                <p>{{flight.OutDuration}}</p>
                <div class="fly"><hr><v-icon color="#35c235" small>fas fa-plane</v-icon></div>
                <p v-if="flight.OutNumofStop == 0">직항</p>
                <p v-else>{{flight.OutNumofStop}}회 경유</p>
              </div>
              <div class="arrival">
                <h2>{{flight.OutArrivalTime}}</h2>
                <p>{{flight.DestinationAirportCode}}</p>
              </div>
              <v-icon class="arrow" v-if="isOutVisible" color="#35c235" large>fa-chevron-up</v-icon>
              <v-icon class="arrow" v-if="!isOutVisible" :color="`${outArrow? '#35c235':'grey'}`" large>fa-chevron-down</v-icon>
            </div>


            <!-- 더보기 -->
            <div v-if="isOutVisible" class="moreDetail">
                <div v-for="(plane, index) in flight.OutSegments">
                  <div v-if="index" class="waitTimeBox">
                    <img src="../assets/hourglass (1).png" height="20px"alt=""> &nbsp;
                    {{getWaiting(flight.OutSegments[index].DepartureDateTime, flight.OutSegments[index-1].ArrivalDateTime)}}
                  </div>
                  <div class="planeInfo">
                    <img :src="getFavicon(plane.OperatingCarrier[0].ImageUrl)" width="30px" alt="">
                    {{plane.OperatingCarrier[0].Name}} {{plane.OperatingCarrier[0].Code}}{{plane.FlightNumber}}
                    <span v-if="plane.OperatingCarrier[0].Name != plane.Carrier[0].Name" > &nbsp; | &nbsp; {{plane.Carrier[0].Name}}에서 운항</span>
                  </div>
                  <div class="detailTimeInfo">
                    <img src="../assets/line.png" height="100px;" alt="">
                    <div class="time">
                      <p>{{dateTimeToTime(plane.DepartureDateTime)}} </p>
                      <p class="duration">&nbsp;<img src="../assets/passage-of-time.png" height="20px;" alt=""> &nbsp; {{parseInt(plane.Duration/60)}}시간 <span v-if="plane.Duration%60">{{plane.Duration%60}}분</span></p>
                      <p>{{dateTimeToTime(plane.ArrivalDateTime)}}</p>
                    </div>
                    <div class="time">
                      <p>{{plane.OriginStation[0].AirportCode}} {{plane.OriginStation[0].AirportName}}</p>
                      <p>{{plane.DestinationStation[0].AirportCode}} {{plane.DestinationStation[0].AirportName}}</p>
                    </div>
                  </div>
                </div>
                <div><b>도착 : </b> {{getDate(flight.OutNumofStop, flight.OutSegments)}} <b> &nbsp; | &nbsp; 여행 기간 : </b>{{flight.OutDuration}}</div>
              </div>

            <!-- 오는 비행기 -->
            <h3 style="margin-top: 2rem; font-size: 1.3rem; ">오는날 출발시간<span style="color:grey; font-size:0.95em;"> &nbsp; {{getDate(0, flight.InSegments)}}</span></h3>
            <div class="ticket" @click="isInVisible = !isInVisible"  @mouseover="inArrow = true" @mouseleave = "inArrow = false">
              <img height="40px" :src="flight.InCarrierImageUrl" alt="">
              <div class="departure">
                <h2>{{flight.InDepartureTime}}</h2>
                <p>{{flight.DestinationAirportCode}}</p>
              </div>
              <div class="time">
                <p>{{flight.InDuration}}</p>
                <div class="fly"><hr><v-icon color="#35c235" small>fas fa-plane</v-icon></div>
                <p v-if="flight.InNumofStop == 0">직항</p>
                <p v-else>{{flight.InNumofStop}}회 경유</p>
              </div>
              <div class="arrival">
                <h2>{{flight.InArrivalTime}}</h2>
                <p>{{flight.OriginAirportCode}}</p>
              </div>
              <v-icon class="arrow" v-if="isInVisible" color="#35c235" large>fa-chevron-up</v-icon>
              <v-icon class="arrow" v-if="!isInVisible" :color="`${inArrow? '#35c235':'grey'}`" large>fa-chevron-down</v-icon>
            </div>

            <!-- 오는 상세정보 -->
            <div v-if="isInVisible" class="moreDetail">
                <div v-for="(plane, index) in flight.InSegments">
                  <div v-if="index" class="waitTimeBox">
                    <img src="../assets/hourglass (1).png" height="20px"alt=""> &nbsp;
                    {{getWaiting(flight.InSegments[index].DepartureDateTime, flight.InSegments[index-1].ArrivalDateTime)}}
                  </div>
                  <div class="planeInfo">
                    <img :src="getFavicon(plane.OperatingCarrier[0].ImageUrl)" width="30px" alt="">
                    {{plane.OperatingCarrier[0].Name}} {{plane.OperatingCarrier[0].Code}}{{plane.FlightNumber}}
                    <span v-if="plane.OperatingCarrier[0].Name != plane.Carrier[0].Name" > &nbsp; | &nbsp; {{plane.Carrier[0].Name}}에서 운항</span>
                  </div>
                  <div class="detailTimeInfo">
                    <img src="../assets/line.png" height="100px;" alt="">
                    <div class="time">
                      <p>{{dateTimeToTime(plane.DepartureDateTime)}} </p>
                      <p class="duration">&nbsp;<img src="../assets/passage-of-time.png" height="20px;" alt=""> &nbsp; {{parseInt(plane.Duration/60)}}시간 <span v-if="plane.Duration%60">{{plane.Duration%60}}분</span></p>
                      <p>{{dateTimeToTime(plane.ArrivalDateTime)}}</p>
                    </div>
                    <div class="time">
                      <p>{{plane.OriginStation[0].AirportCode}} {{plane.OriginStation[0].AirportName}}</p>
                      <p>{{plane.DestinationStation[0].AirportCode}} {{plane.DestinationStation[0].AirportName}}</p>
                    </div>
                  </div>
                </div>
                <div><b>도착 : </b> {{getDate(flight.InNumofStop, flight.InSegments)}} <b> &nbsp; | &nbsp; 여행 기간 : </b>{{flight.InDuration}}</div>
              </div>
            </div>


          <div class="secondSection">
             <div class="costInfo">
                  <h2>최저가로 예약하기</h2>
                  <div class="book" v-for="(plane, index) in flight.InSegments">
                    <a :href="flight.LowestDeeplinkUrl" target="_blank"><div class="overlay"></div></a>
                    <div class="bookLink">
                      <img width="100px" :src="flight.LowestAgentsImageUrl" alt="">
                      <!-- <h2>{{flight.CurrencySymbol}}{{flight.LowestPrice}} <v-icon style="margin-left:1rem;"large color="green">fa-arrow-right</v-icon></h2> -->
                      <h2>{{flight.CurrencySymbol}}{{flight.LowestPrice}}</h2>
                    </div>
                  </div>
                  <div class="readBeforeBooking">
                    <i class="material-icons">notification_important</i>&nbsp;<h4>예약전에 확인해주세요. </h4>
                    <!-- <v-icon v-if="isRBBVisible" color="#35c235" small>fa-chevron-up</v-icon>
                    <v-icon v-if="!isRBBVisible" color="#35c235" small>fa-chevron-down</v-icon> -->
                  </div>
                  <div class="readBeforeBooking__Toggle">
                    <p>표시된 요금에는 모든 세금 및 수수료가 포함되어 있으나, 예약 전에 웹사이트에서
                      <b>티켓의 세부정보, 최종 가격, 약관</b>을 반드시 확인하시기
                      바랍니다.
                    </p>
                    <ul>
                      <li>
                        <b>☞ 추가 요금 확인</b>
                        <p style="margin:.75em;">일부 항공사/여행사의 경우 <b>수하물, 보험</b> 또는 <b>신용카드</b>
                          사용에 대한 추가 요금을 부과합니다.</p>
                        </li>
                        <li>
                          <b>☞ 12~16세 승객에 대한 이용 약관을 확인하십시오.</b>
                          <p style="margin:.75em;">보호자를 동반하지 않고 혼자 여행하는 어린 승객에게는
                            제한 사항이 적용될 수 있습니다.</p>
                          </li>
                        </ul>
                      </div>
             </div>
                {{flight.Options}}
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import './FlightDetail.css'
export default {
  name:'FlightDetail',
  props: {
    flight: Object,
  },

  data () {
    return{
      rbbArrow : false,
      inArrow: false,
      outArrow: false,
      isRBBVisible: false,
      outArrow: false,
      isInVisible: false,
      isOutVisible: false,
      inDepartureDate: '',
      inArrivalDate: '',
      outDepartureDate: '',
      inDepartureDate: ''

    }
  },
  methods : {
    dateTimeToTime (v) {
      let h = parseInt(v.substr(11, 2))
      if(h > 12)  {
        h -= 12
        return '오후 ' + h + v.substr(13, 3)
      }
      if(!h) h = 12
      return '오전 ' + h + v.substr(13, 3)
    },
    getWaiting (departure, arrival, final, i) {
      let h = parseInt(departure.substr(11, 2) - arrival.substr(11, 2))
      let m = parseInt(departure.substr(14, 2) - arrival.substr(14, 2))
      if (m < 0) {
        h -= 1
        m += 60
      }
      if (h < 0)  h += 24

      if(!h) return  m + '분'
      else if (!m) return h + '시간'
      else return  h + '시간 ' + m + '분'
    },
    getDate(i, segments){
      let v
      i = parseInt(i)
      if(i) v = segments[i].ArrivalDateTime
      else v = segments[0].DepartureDateTime
      return v.substr(0, 4) + '년 ' + parseInt(v.substr(5, 2)) + '월 ' + parseInt(v.substr(8, 2)) + '일'
    },
    getFavicon(url) {
      return url.replace("nes/","nes/favicon/")
    },
  },
}
</script>
