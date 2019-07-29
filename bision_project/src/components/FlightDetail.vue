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
            <h3>가는날 출발시간<span style="color:grey"> !출발날짜</span></h3>
            <div class="ticket" @click="isInVisible = !isInVisible" @mouseover="inArrow = true" @mouseleave = "inArrow = false">
              <img height="40px" :src="flight.InCarrierImageUrl" alt="">
              <div class="departure">
                <h2>{{flight.InDepartureTime}}</h2>
                <p>{{flight.OriginAirportCode}}</p>
              </div>
              <div class="time">
                <p>{{flight.InDuration}}</p>
                <div class="fly"><hr><v-icon color="#35c235" small>fas fa-plane</v-icon></div>
                <p>{{flight.InNumofStop}}</p>
              </div>
              <div class="arrival">
                <h2>{{flight.InArrivalTime}}</h2>
                <p>{{flight.DestinationAirportCode}}</p>
              </div>
              <v-icon class="arrow" v-if="isInVisible" color="#35c235" large>fa-chevron-up</v-icon>
              <v-icon class="arrow" v-if="!isInVisible" :color="`${inArrow? '#35c235':'grey'}`" large>fa-chevron-down</v-icon>
            </div>
            <div v-if="isInVisible" class="moreDetail">
              <div>
                !작은그림 !항공편명
              </div>
              <div class="timeInfo">
                <div>{{flight.InDuration}}</div>
                <img src="" alt="">
                <div>
                  {{flight.InDepartureTime}}<br>
                  {{flight.InArrivalTime}}
                </div>
                <div>
                  {{flight.OriginAirportCode}} !출발공항명<br>
                  {{flight.DestinationAirportCode}} !도착공항명
                </div>
              </div>
              <div>도착: !도착날짜 | 여행 기간: {{flight.InDuration}}</div>
            </div>

            <h3 style="margin-top: 25px;">오는날 출발시간<span style="color:grey"> !출발날짜</span></h3>
            <div class="ticket" @click="isOutVisible = !isOutVisible"  @mouseover="outArrow = true" @mouseleave = "outArrow = false">
              <img height="40px" :src="flight.OutCarrierImageUrl" alt="">
              <div class="departure">
                <h2>{{flight.OutDepartureTime}}</h2>
                <p>{{flight.DestinationAirportCode}}</p>
              </div>
              <div class="time">
                <p>{{flight.OutDuration}}</p>
                <div class="fly"><hr><v-icon color="#35c235" small>fas fa-plane</v-icon></div>
                <p>{{flight.OutNumofStop}}</p>
              </div>
              <div class="arrival">
                <h2>{{flight.OutArrivalTime}}</h2>
                <p>{{flight.OriginAirportCode}}</p>
              </div>
              <v-icon class="arrow" v-if="isOutVisible" color="#35c235" large>fa-chevron-up</v-icon>
              <v-icon class="arrow" v-if="!isOutVisible" :color="`${outArrow? '#35c235':'grey'}`" large>fa-chevron-down</v-icon>
            </div>
            <div v-if="isOutVisible" class="moreDetail">
              <div>
                !작은그림 !항공편명
              </div>
              <div class="timeInfo">
                <div>{{flight.OutDuration}}</div>
                <img src="" alt="">
                <div>
                  {{flight.OutDepartureTime}}<br>
                  {{flight.OutArrivalTime}}
                </div>
                <div>
                  {{flight.DestinationAirportCode}} !출발공항명<br>
                  {{flight.OriginAirportCode}} !도착공항명
                </div>
              </div>
              <div>도착: !도착날짜 | 여행 기간: {{flight.OutDuration}}</div>
            </div>
          </div>

          <div class="ad">
           <div class="costInfo">
              <h2>최저가로 예약하기</h2>
              <div class="book">
                <div class="overlay"></div>
                <a class="bookLink" :href="flight.LowestDeeplinkUrl" target="_blank">
                  <img width="100px" :src="flight.LowestAgentsImageUrl" alt="">
                  <!-- <h2>{{flight.CurrencySymbol}}{{flight.LowestPrice}} <v-icon style="margin-left:1rem;"large color="green">fa-arrow-right</v-icon></h2> -->
                  <h2>{{flight.CurrencySymbol}}{{flight.LowestPrice}}</h2>
                </a>
              </div>
              <div class="readBeforeBooking" @click="isRBBVisible = !isRBBVisible">
                <h5>예약전에 확인해주세요.</h5>
                <v-icon v-if="isRBBVisible" color="#35c235" small>fa-chevron-up</v-icon>
                <v-icon v-if="!isRBBVisible" color="#35c235" small>fa-chevron-down</v-icon>
              </div>
              <div class="readBeforeBooking__Toggle" v-show="isRBBVisible">
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
          <div class="recommendProducts">
            가이드 상품 추천 영역
          </div>

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
    }
  },
  methods : {

  }
}
</script>
