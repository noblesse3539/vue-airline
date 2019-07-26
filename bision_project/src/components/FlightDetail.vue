<template>
    <div id="FlightDetail">
      <div class="FlightDetail__dialog">
        <header class="FlightDetail__header">
          <v-btn  @click="$emit('close')" icon flat><v-icon color="green">arrow_back_ios</v-icon></v-btn>
          <span>세부 정보</span>
          <v-btn  @click="$emit('close')" icon flat><v-icon color="green">close</v-icon></v-btn>
        </header>
        <div class="FlightDetail__body">
          <div class="flightinfo">
            <h3>가는날 출발시간<span style="color:grey"> !출발날짜</span></h3>
            <div class="ticket" @click="isInVisible = !isInVisible">
              <img height="40px" :src="flight.InCarrierImageUrl" alt="">
              <div class="departure">
                <h2>{{flight.InDepartureTime}}</h2>
                <p>{{flight.OriginAirportCode}}</p>
              </div>
              <div class="time">
                <p>{{flight.InDuration}}</p>
                <div class="fly"><hr><v-icon color="green" small>fas fa-plane</v-icon></div>
                <p>{{flight.InNumofStop}}</p>
              </div>
              <div class="arrival">
                <h2>{{flight.InArrivalTime}}</h2>
                <p>{{flight.DestinationAirportCode}}</p>
              </div>
              <v-icon color="grey" large>fa-chevron-down</v-icon>
            </div>
            <div v-if="isInVisible" class="moreDetail">
              <div>
                !작은그림과 !항공편명
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
            <div class="ticket" @click="isOutVisible = !isOutVisible">
              <img height="40px" :src="flight.OutCarrierImageUrl" alt="">
              <div class="departure">
                <h2>{{flight.OutDepartureTime}}</h2>
                <p>{{flight.DestinationAirportCode}}</p>
              </div>
              <div class="time">
                <p>{{flight.OutDuration}}</p>
                <div class="fly"><hr><v-icon color="green" small>fas fa-plane</v-icon></div>
                <p>{{flight.OutNumofStop}}</p>
              </div>
              <div class="arrival">
                <h2>{{flight.OutArrivalTime}}</h2>
                <p>{{flight.OriginAirportCode}}</p>
              </div>
              <v-icon color="grey" large>fa-chevron-down</v-icon>
            </div>
            <div v-if="isOutVisible" class="moreDetail">
              <div>
                !작은그림과 !항공편명
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
            광고영역
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
      isInVisible: false,
      isOutVisible: false,
    }
  }
}
</script>
