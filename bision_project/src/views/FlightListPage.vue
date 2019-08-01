<template>
    <div class="Api">
      <!-- 헤더 공백 -->
      <div style="height: 110px; width: 100%;"></div>
      <div style="height: 100px; width: 70%; background-color: #45CE30; color: white; border-radius: 0px 0px 10px 10px; margin-left: 12.5%; display:grid; grid-template-columns: 43% 43% 16%">
        <div class="">
          <div class="container" style="font-size: 20px; height: 50%; padding-top: 10px; padding-bottom: 0;">
            인천({{this.$route.params.departure}}) - 다낭({{this.$route.params.destination}})

          </div>
          <div class="container" style="height: 50%; padding-top: 4px;">
            {{this.$route.params.adults}} 성인 <span v-if="this.$route.params.children">{{this.$route.params.children}} 아동</span> <span v-if="this.$route.params.infants">{{this.$route.params.infants}} 유아</span>  | 좌석 구분 : <span v-if="this.$route.params.cabinClass"></span><span v-else>없음</span>
          </div>
        </div>

        <div style="font-size: 15px; padding-top: 4%;">
          <div style="width: 50%; display: inline-block;">
            <div>가는 날</div>
            <div>{{this.$route.params.leavingDate}}</div>
          </div>
          <div style="width: 50%; display: inline-block;">
            <div>오는 날</div>
            <div>{{this.$route.params.comingDate}}</div>
          </div>
        </div>
        <div style="padding-top: 10px;">
          <v-btn class="mx-2" fab small color="grey lighten-3">
            <i class="fas fa-search fa-2x"></i>
          </v-btn>
          <div style="font-size: 10px;">
            다른 조건으로
          </div>
          <div style="font-size: 10px;">
            검색해보세요.
          </div>
        </div>
      </div>
      <div class="maingrid-a maingrid-b maingrid-c" style="">
        <div style="margin: 0;" m-0 class="container sidegrid-a">
          <!-- 경유별 검색 체크박스 -->
          <div class="container" style="width: 220px; margin-left: 7%; padding-left: 8px;">
            <div style="font-size: 25px !important; color: #45CE30;">
              <i class="fas fa-plane-arrival"></i> 경유
            </div>
            <!-- <hr style="width: 220px"> -->
            <v-checkbox v-model="selected" label="직항" value="0" @change="onCheckboxChange"></v-checkbox>
            <v-checkbox v-model="selected" label="1회 경유" value="1" @change="onCheckboxChange"></v-checkbox>
            <v-checkbox v-model="selected" label="2회 이상 경유" value="2" @change="onCheckboxChange"></v-checkbox>
          </div>
          <!-- 시간대별 검색 슬라이더 -->
          <div class="container" style="width: 220px; padding: 0px; margin-left: 10%;">
            <div style="font-size: 25px; color: #45CE30; padding-bottom: 10px;">
              <i class="far fa-clock"></i> 시간대별 검색
            </div>
            <!-- <hr style="width: 220px; margin-bottom: 20px;"> -->
            <span style="display: block; font-size: 17px;">가는 날 출발시간</span>
            <span>{{outboundDepartStartTime}} - </span>
            <span>{{outboundDepartEndTime}}</span>
            <v-range-slider :min="0" :max="1440" step="30" thumb-label thumb-size="50" v-model="outrange" @change="onChange($event)">
              <template>
                <v-text-field v-model="outrange[0]"  class="mt-0 pt-0" single-line type="number" style="width: 60px"></v-text-field>
              </template>
              <template>
                <v-text-field v-model="outrange[1]" class="mt-0 pt-0" single-line type="number" style="width: 60px"></v-text-field>
              </template>
              <template v-slot:thumb-label="props">
                &nbsp&nbsp&nbsp{{ thumbLabelHour(props.value) }}
                &nbsp&nbsp&nbsp{{ thumbLabelMinute(props.value) }}
                <!-- <span>&nbsp&nbsp&nbsp{{ season(props.value) }}</span>
                <span>{{ season2(props.value) }}&nbsp&nbsp</span> -->
              </template>
            </v-range-slider>

            <span style="display: block; font-size: 17px;">오는 날 출발시간</span>
            <span>{{inboundDepartStartTime}} - </span>
            <span>{{inboundDepartEndTime}}</span>
            <v-range-slider :min="0" :max="1440" step="30" thumb-label thumb-size="50" v-model="inrange" @change="onChange($event)">
              <template>
                <v-text-field v-model="inrange[0]" class="mt-0 pt-0" single-line type="number" style="width: 60px"></v-text-field>
              </template>
              <template>
                <v-text-field v-model="inrange[1]" class="mt-0 pt-0" single-line type="number" style="width: 60px"></v-text-field>
              </template>
              <template v-slot:thumb-label="props">
                &nbsp&nbsp&nbsp{{ thumbLabelHour(props.value) }}
                &nbsp&nbsp&nbsp{{ thumbLabelMinute(props.value) }}
              </template>
            </v-range-slider>

            <div style="font-size: 25px; color: #45CE30; padding-bottom: 10px; padding-top: 20px;">
              <i class="fas fa-history"></i> 총 소요시간
            </div>
            <!-- <hr style="width: 220px; margin-bottom: 20px;"> -->
            <!-- <span style="display: block; font-size: 17px;">총 소요시간</span> -->
            <span>{{transferedMinDuration}} - </span>
            <span>{{transferedDuration}}</span>
            <v-slider v-model="duration" class="align-center" :max="maxDuration" :min="minDuration" hide-details thumb-size="50" @change="onChangeDuration($event)">
              <template>
                <v-text-field v-model="duration" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
              </template>
              <template v-slot:thumb-label="props">
                &nbsp&nbsp{{ durationLabelHour(props.value) }}
                &nbsp&nbsp&nbsp{{ durationLabelMinute(props.value) }}
              </template>
            </v-slider>
          </div>
          <!-- 항공사별 체크 박스 -->
          <div class="container" style="width: 220px; margin-left: 7%; padding-left: 8px;">
            <div style="font-size: 25px !important; color: #45CE30; padding-bottom: 10px; padding-top: 15px;">
              <i class="far fa-paper-plane"></i> 항공사
            </div>
            <!-- <hr style="width: 220px"> -->
            <div v-for="i in flightselectedfixed.length" :key="i">
              <v-checkbox v-model="flightselectedName" :label="flightselectedfixed[i-1]" :value="flightselectedfixed[i-1]" @change="flightCheckboxChange(value)"></v-checkbox>
            </div>
          </div>
        </div>
        <!-- 항공권 리스트 -->

        <div class="container" style="margin-top: 20px; padding-left: 0px; padding-right: 3px; max-width: 700px;">
          <div class="container" v-if="error">
            <v-alert :value="true" type="warning">결과가 존재하지 않습니다.</v-alert>
          </div>

          <v-flex v-if="loading" style="width=100px; display: flex; align-items: center; ">
            <div class="" >
              <!-- <img src="http://cfile221.uf.daum.net/image/256A5E4C579AD7AB18555D" alt=""> -->
              <!-- <img src="https://t1.daumcdn.net/liveboard/emoticon/kakaofriends/v3/mujiandconspecial/emot_019_x3.gif" alt=  ""> -->
              <img src="https://4.bp.blogspot.com/-pnYVXlTcmG0/WFN6xh3pGQI/AAAAAAAACKY/lRtxZ-YDD-MbQ0Mox3xz60KwMRiwZnNLgCLcB/s200/0002.gif" alt="">
            </div>
            <!-- <img src="https://thumbs.gfycat.com/HotGrizzledAsianporcupine-size_restricted.gif" alt=""> -->
            <span style="font-size: 20px;"><b>검색 결과를 불러오는중&nbsp&nbsp</b></span>
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
              <!-- here put a spinner or whatever you want to do when request is on proccess -->
          </v-flex>

          <div class="container" style="width: 100%;  padding: 0px;" v-if="!loading">
            <div v-if="!error">
              <!-- 정렬메뉴바 -->
              <div style="display:grid; grid-template-columns: 68% 12% 20%">
                <div style="font-size: 18px;"><div style="margin-left: 25px; margin-top: 10px;">총 {{ numofFlights }}개의 검색 결과가 있습니다.</div></div>
                <div><div style="margin-top: 13px;">정렬 기준 : </div></div>
                <div>
                  <v-menu offset-y style="display: inline-block">
                    <template v-slot:activator="{ on }" >
                      <v-btn color="#45CE30" dark v-on="on" @click="menuicon=!menuicon">
                        {{ thisSortType }}
                        <div v-if="menuicon"><i class="fas fa-sort-down" style="margin-left: 10px; margin-bottom: 8px;"></i></div>
                        <div v-else><i class="fas fa-sort-up" style="margin-left: 10px; margin-top: 10px;"></i></div>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-tile v-for="(sortType, index) in sortTypes" :key="index" @click="getFlightsbyOptional(sortType, index)">
                        <v-list-tile-title>{{ sortType }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </div>
              </div>
              <v-layout mt-3 wrap v-for="i in flights.length > limits ? limits : flights.length" :key="i" style="width: 100%;">
                <Flight class="ma-3"
                  :CurrencySymbol="flights[i - 1].CurrencySymbol"
                  :InDepartureTime="flights[i - 1].InDepartureTime"
                  :InArrivalTime="flights[i - 1].InArrivalTime"
                  :InCarrierImageUrl="flights[i - 1].InCarrierImageUrl"
                  :InDuration="flights[i - 1].InDuration"
                  :InDay="flights[i - 1].InDay"
                  :Instops="flights[i - 1].Instops"
                  :InNumofStop="flights[i - 1].InNumofStop"
                  :InSegments="flights[i - 1].InSegments"
                  :OutDepartureTime="flights[i - 1].OutDepartureTime"
                  :OutArrivalTime="flights[i - 1].OutArrivalTime"
                  :OutCarrierImageUrl="flights[i - 1].OutCarrierImageUrl"
                  :OutDuration="flights[i - 1].OutDuration"
                  :OutDay="flights[i - 1].OutDay"
                  :Outstops="flights[i - 1].Outstops"
                  :OutNumofStop="flights[i - 1].OutNumofStop"
                  :OutSegments="flights[i - 1].OutSegments"
                  :NumofOptions="flights[i - 1].NumofOptions"
                  :LowestPrice="flights[i - 1].LowestPrice"
                  :LowestAgentsName="flights[i - 1].LowestAgentsName"                  
                  :LowestDeeplinkUrl="flights[i - 1].LowestDeeplinkUrl"
                  :LowestAgentsImageUrl="flights[i - 1].LowestAgentsImageUrl"
                  :OriginAirportCode="flights[i - 1].OriginAirportCode"
                  :DestinationAirportCode="flights[i - 1].DestinationAirportCode"
                  :Options="flights[i - 1].Options"
                ></Flight>
              </v-layout>
            </div>
          </div>
          <div style="display: flex; justify-content: center;">
              <v-btn color="info" dark v-on:click="loadMoreFlightList"><v-icon size="25" class="mr-2">fa-plus</v-icon> 더 보기</v-btn>
          </div>
        </div>
        <div class="sidegrid-a sidegrid-b" style="height: 100px; width: 100%; margin-top: 50px;">
          <img src="https://user-images.githubusercontent.com/46305309/62179669-42d9b980-b388-11e9-9837-ec79eb289c04.png" alt="" style="width: 90%">
        </div>
      </div>

      <!-- 푸터 공백 -->
      <div style="height:100px; width:100px;"></div>
    </div>
</template>
<script>
import qs from 'qs'
import Flight from '../components/Flight'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'

export default {
    name: 'FlightList',
    props: {
      limits: {type: Number, default: 10},
      pageIndex: {type: Number, default: 0},
      pageSize: {type: Number, default: 10},
      error: {type: Boolean, default: false},
      outboundDepartStartTime: {type: String, default: '오전 12:00'},
      outboundDepartEndTime: {type: String, default: '오후 11:59'},
      inboundDepartStartTime: {type: String, default: '오전 12:00'},
      inboundDepartEndTime: {type: String, default: '오후 11:59'},
      optionTypeIndex: {type: Number, default: 0},
      thisSortType: {type: String, default: '최저가순'},
    },
    components: {
      Flight,
      PulseLoader,
      // PacmanLoader
    },
    data: function() {
        return {
          loading: false,
          inboundDate: '',
          selected: ['0', '1', '2'],
          flightselectedfixed: [],
          flightselectedName: [],
          flightselectedCodes: '',
          flightselected: [],
          flights: [],
          flightsResult: [],
          numofFlights: 0,
          outrange: [0, 1440],
          inrange: [0, 1440],
          duration: 0,
          menuicon: true,
          transferedMinDuration: 0,
          transferedDuration: 0,
          minDuration: 0,
          maxDuration: 1800 ,
          timeOptions: [
            '00%3A00',
            '23%3A59',
            '00%3A00',
            '23%3A59',
          ],
          sortTypes: [
            '최저가순',
            '최단여행시간순',
            '출국: 출발시간',
            '귀국: 출발시간',
            '경유',
          ],
          optionType: [
            {text: '&sortType=price&sortOrder=asc'},
            {text: '&sortType=duration&sortOrder=asc'},
            {text: '&sortType=outbounddeparttime&sortOrder=asc'},
            {text: '&sortType=inbounddeparttime&sortOrder=asc'},
          ]
        }
    },
    mounted() {
        // window.addEventListener('load', this.getFlights)
      //   this.getFlights(0, 0, 0)
      //   this.$nextTick(() => {
      //     this.getFlights(1, 0, 0);
      // });
      this.getFlights(0, 0, true)
      this.duration = this.maxDuration
    },
    methods: {
        getFlights: function(optionTypeIndex, s =  0, ismount=false){
            this.loading = true
            var minDuration = 10000
            var maxDuration = 0
            console.log("실행")

            this.pageIndex = 0
            this.pageSize = 1000
            const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0'
            let data  = {
                            'country': 'US',
                            'currency': 'USD',
                            'locale': 'ko-KR',
                            // 'originPlace': 'ICN-sky',
                            // 'destinationPlace': 'HNL-sky',
                            'originPlace': 'SFO-sky',
                            'destinationPlace': 'LHR-sky',
                            'outboundDate': '2019-09-01',
                            'adults': '1',
                            // 'originPlace': this.$route.params.departure + '-sky',
                            // 'destinationPlace': this.$route.params.destination + '-sky',
                            // 'outboundDate': this.$route.params.leavingDate,
                            // 'adults': this.$route.params.adults,
                        }
            // let inboundDate = this.$route.params.comingDate
            let inboundDate = '2019-09-10'
            if (inboundDate != '') {
              data['inboundDate'] = inboundDate
            }

            this.$http({
                method: 'POST',
                url   : baseUrl,
                data  : qs.stringify(data),
                headers: {
                        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
                        'X-RapidAPI-Key' : '25703e8168mshcbae189ae6af368p1fcb8djsnead03bdc43f6',
                        "Content-Type": "application/x-www-form-urlencoded"
                }})
                .then( res => {
                  console.log(res)
                    const location = res.headers.location
                    let sessionKey = ''
                    let sessionKeyReversed = ''
                    for (let i = location.length-1; i >= 0; i--) {
                        if (location.charAt(i) == '/') { break }
                        sessionKeyReversed += location.charAt(i)
                    }
                    for (let i = sessionKeyReversed.length-1; i >= 0; i--) {
                        sessionKey += sessionKeyReversed.charAt(i)
                    }
                    return sessionKey
                })
                .then( sessionKey => {
                    const optionUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/'
                    // let option = '?pageIndex='+ this.pageIndex + '&pageSize=' + this.pageSize + this.optionType[optionTypeIndex].text
                    if (optionTypeIndex < 4) {
                      var option = '?pageIndex='+ this.pageIndex + '&pageSize=' + this.pageSize + this.optionType[optionTypeIndex].text
                    } else {
                      var option = '?pageIndex='+ this.pageIndex + '&pageSize=' + this.pageSize + this.optionType[0].text
                    }
                    // 항공기 체크박스 분기
                    if (this.flightselectedCodes) {
                      var optionplus = '&includeCarriers=' + this.flightselectedCodes
                    } else {
                      var optionplus = ''
                    }
                    let timeOption = '&outboundDepartStartTime=' + this.timeOptions[0] + '&outboundDepartEndTime=' + this.timeOptions[1] + '&inboundDepartStartTime=' + this.timeOptions[2] + '&inboundDepartEndTime=' + this.timeOptions[3]
                    //console.log(sessionKey)
                    this.$http({
                        method: 'GET',
                        url   : optionUrl + sessionKey + option + timeOption + optionplus,
                        headers: {
                        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
                        'X-RapidAPI-Key' : '25703e8168mshcbae189ae6af368p1fcb8djsnead03bdc43f6',
                        "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                    .then( res => {
                      console.log(res)

                      // 출발, 도착 공항이름
                      let Originflag = false
                      let Destinationflag = false
                      let OriginAirportCode, DestinationAirportCode, OriginAirportName, DestinationAirportName
                      for (let j=0; j<res.data.Places.length; j++) {
                        if (Originflag == false && res.data.Places[j].Id == res.data.Query.OriginPlace) {
                          OriginAirportCode = res.data.Places[j].Code
                          OriginAirportName = res.data.Places[j].Name
                          Originflag == true
                        }
                        if (Destinationflag == false && res.data.Places[j].Id == res.data.Query.DestinationPlace) {
                          DestinationAirportCode = res.data.Places[j].Code
                          DestinationAirportName = res.data.Places[j].Name
                          Destinationflag == true
                        }
                        if (Originflag == true && Destinationflag == true) {
                          break;
                        }
                      }
                      // 통화 심벌
                      let CurrencySymbol
                      CurrencySymbol = res.data.Currencies[0].Symbol
                      //console.log(CurrencySymbol)
                      // 가격, 에이전트연결 url
                      let OutboundLegId, InboundLegId
                      for (let j=0; j<res.data.Itineraries.length; j++) {
                        // if (moreflag && j< 10)
                        //   continue;

                        let Options = []
                        let option, AgentsCode, AgentsImageUrl, AgentsName
                        for (let k=0; k<res.data.Itineraries[j].PricingOptions.length; k++) {
                          AgentsCode = res.data.Itineraries[j].PricingOptions[k].Agents[0]
                          for (let l=0; l<res.data.Agents.length; l++) {
                            if (res.data.Agents[l].Id == AgentsCode) {
                              AgentsImageUrl = res.data.Agents[l].ImageUrl
                              AgentsName = res.data.Agents[l].Name
                            }
                          }
                          option = {'Price': this.priceTransfer(res.data.Itineraries[j].PricingOptions[k].Price),
                                    'DeeplinkUrl': res.data.Itineraries[j].PricingOptions[k].DeeplinkUrl,
                                    'AgentsImageUrl': AgentsImageUrl,
                                    'AgentsName': AgentsName
                                    }
                          Options.push(option)
                        }
                        var sortingField = 'Price'
                        Options.sort(function(a, b) {
                          return a[sortingField] - b[sortingField];
                        })
                        let NumofOptions = Options.length
                        let LowestPrice = Options[0].Price
                        let LowestAgentsName = Options[0].AgentsName
                        let LowestDeeplinkUrl = Options[0].DeeplinkUrl
                        let LowestAgentsImageUrl = Options[0].AgentsImageUrl

                        // Price = this.priceTransfer(res.data.Itineraries[j].PricingOptions[0].Price)
                        // DeeplinkUrl = res.data.Itineraries[j].PricingOptions[0].DeeplinkUrl
                        // AgentsCode = res.data.Itineraries[j].PricingOptions[0].Agents[0]

                        OutboundLegId = res.data.Itineraries[j].OutboundLegId
                        InboundLegId = res.data.Itineraries[j].InboundLegId

                        // 출발 시간, 도착시간 (왕복), 날짜 변화, 걸리는 시간
                        let Inflag = false
                        let Outflag = false
                        let OutDepartureTime, OutArrivalTime, OutCarrierId, OutDuration, OutDay, OutNumofStop, OutStopCodes, OutSegmentsId
                        // let InDepartureTime, InArrivalTime, InCarrierId, InDuration, InDay
                        let InDepartureTime = ''
                        let InArrivalTime = ''
                        let InCarrierId = ''
                        let InDuration = ''
                        let InDay = ''
                        let InNumofStop = ''
                        let InStopCodes = []
                        let InSegmentsId
                        for (let k=0; k<res.data.Legs.length; k++) {
                          if (Outflag == false && res.data.Legs[k].Id == OutboundLegId) {
                            OutDepartureTime = this.timeTransfer(res.data.Legs[k].Departure)
                            OutArrivalTime = this.timeTransfer(res.data.Legs[k].Arrival)
                            OutDay = this.dayCalculate(res.data.Legs[k].Departure, res.data.Legs[k].Arrival)
                            OutCarrierId = res.data.Legs[k].Carriers
                            OutDuration = res.data.Legs[k].Duration
                            OutNumofStop = res.data.Legs[k].Stops.length
                            OutStopCodes = res.data.Legs[k].Stops
                            OutSegmentsId = res.data.Legs[k].SegmentIds
                            Outflag = false
                          }
                          if (inboundDate != "" && Inflag == false && res.data.Legs[k].Id == InboundLegId) {
                            InDepartureTime = this.timeTransfer(res.data.Legs[k].Departure)
                            InArrivalTime = this.timeTransfer(res.data.Legs[k].Arrival)
                            InDay = this.dayCalculate(res.data.Legs[k].Departure, res.data.Legs[k].Arrival)
                            InCarrierId = res.data.Legs[k].Carriers
                            InDuration = res.data.Legs[k].Duration
                            InNumofStop = res.data.Legs[k].Stops.length
                            InStopCodes = res.data.Legs[k].Stops
                            InSegmentsId = res.data.Legs[k].SegmentIds
                            Inflag = true
                          }
                          if (Inflag == true && Outflag == true) {
                            break;
                          }
                        }
                        // 에이전트이미지 url, 항공사이미지 url
                        let flight, OutCarrierImageUrl
                        let InCarrierImageUrl = ''

                        for (let k=0; k<res.data.Carriers.length; k++) {
                          if (inboundDate && res.data.Carriers[k].Id == InCarrierId) {
                            InCarrierImageUrl = res.data.Carriers[k].ImageUrl
                          }
                          if (res.data.Carriers[k].Id == OutCarrierId) {
                            OutCarrierImageUrl = res.data.Carriers[k].ImageUrl
                          }
                        }
                        let NumofStops = InNumofStop + OutNumofStop
                        InNumofStop = InNumofStop.toString()
                        OutNumofStop = OutNumofStop.toString()

                        let totalDuration = OutDuration + InDuration
                        if (totalDuration > maxDuration) maxDuration = totalDuration
                        if (totalDuration < minDuration) minDuration = totalDuration
                        OutDuration = this.durationTransfer(OutDuration)
                        InDuration = this.durationTransfer(InDuration)

                        // 경유지 정보(추가)
                        let stop
                        let Instops = []
                        for (let k=0; k<InStopCodes.length; k++) {
                          for (let l=0; l<res.data.Places.length; l++) {
                            if (InStopCodes[k] == res.data.Places[l].Id) {
                              stop = {
                                'code': res.data.Places[l].Code,
                                'name': res.data.Places[l].Name,
                              }
                              break;
                            }
                          }
                          Instops.push(stop)
                        }
                        let Outstops = []
                        for (let k=0; k<OutStopCodes.length; k++) {
                          for (let l=0; l<res.data.Places.length; l++) {
                            if (OutStopCodes[k] == res.data.Places[l].Id) {
                              stop = {
                                'code': res.data.Places[l].Code,
                                'name': res.data.Places[l].Name,
                              }
                              break;
                            }
                          }
                          Outstops.push(stop)
                        }

                        // 경유시 항공 정보(추가)
                        let segment
                        let OutSegments = []
                        let OriginStation, DestinationStation
                        let DepartureDateTime, ArrivalDateTime, Carrier, OperatingCarrier, Duration, FlightNumber, Carrierflag, Opcarrierflag
                        // Originflag, Destinationflag = false
                        for (let k=0; k<OutSegmentsId.length; k++) {
                          // 공항 코드, 공항 이름
                          OriginStation = []
                          DestinationStation = []
                          Originflag, Destinationflag = false
                          for (let j=0; j<res.data.Places.length; j++) {
                            if (Originflag == false && res.data.Places[j].Id == res.data.Segments[OutSegmentsId[k]].OriginStation) {
                              OriginStation.push({'AirportCode': res.data.Places[j].Code, 'AirportName': res.data.Places[j].Name,})
                              Originflag == true
                            }
                            if (Destinationflag == false && res.data.Places[j].Id == res.data.Segments[OutSegmentsId[k]].DestinationStation) {
                              DestinationStation.push({'AirportCode': res.data.Places[j].Code, 'AirportName': res.data.Places[j].Name,})
                              Destinationflag == true
                            }
                            if (Originflag == true && Destinationflag == true) {
                              break;
                            }
                          }
                          // 항공기
                          Carrier = []
                          OperatingCarrier = []
                          Carrierflag = false
                          Opcarrierflag = false
                          for (let j=0; j<res.data.Carriers.length; j++) {
                            if (Carrierflag == false && res.data.Carriers[j].Id == res.data.Segments[OutSegmentsId[k]].Carrier) {
                              Carrier.push({'Code': res.data.Carriers[j].Code,
                                            'Name': res.data.Carriers[j].Name,
                                            'ImageUrl': res.data.Carriers[j].ImageUrl,})
                              Carrierflag = true
                              if (ismount) {
                                if (this.flightselectedName.indexOf(res.data.Carriers[j].Name) == -1) {
                                  this.flightselectedfixed.push(res.data.Carriers[j].Name)
                                  this.flightselectedName.push(res.data.Carriers[j].Name)
                                  this.flightselected.push({'Name': res.data.Carriers[j].Name,
                                                            'Code': res.data.Carriers[j].Code})
                                }
                              }
                            }
                            if (Opcarrierflag == false && res.data.Carriers[j].Id == res.data.Segments[OutSegmentsId[k]].OperatingCarrier) {
                              OperatingCarrier.push({
                                            'Code': res.data.Carriers[j].Code,
                                            'Name': res.data.Carriers[j].Name,
                                            'ImageUrl': res.data.Carriers[j].ImageUrl,})
                              Opcarrierflag = true
                            }
                            if (Carrierflag == true && Opcarrierflag == true) {
                              break;
                            }
                          }
                          segment = {
                            'OriginStation': OriginStation,
                            'DestinationStation': DestinationStation,
                            'DepartureDateTime': res.data.Segments[OutSegmentsId[k]].DepartureDateTime,
                            'ArrivalDateTime': res.data.Segments[OutSegmentsId[k]].ArrivalDateTime,
                            'Carrier': Carrier,
                            'OperatingCarrier': OperatingCarrier,
                            'Duration': res.data.Segments[OutSegmentsId[k]].Duration,
                            'FlightNumber': res.data.Segments[OutSegmentsId[k]].FlightNumber,
                          }
                          OutSegments.push(segment)
                        }

                        let InSegments = []
                        // Originflag, Destinationflag = false
                        for (let k=0; k<InSegmentsId.length; k++) {
                          OriginStation = []
                          DestinationStation = []
                          Originflag = false
                          Destinationflag = false
                          for (let j=0; j<res.data.Places.length; j++) {
                            if (Originflag == false && res.data.Places[j].Id == res.data.Segments[InSegmentsId[k]].OriginStation) {
                              OriginStation.push({'AirportCode': res.data.Places[j].Code, 'AirportName': res.data.Places[j].Name,})
                              Originflag == true
                            }
                            if (Destinationflag == false && res.data.Places[j].Id == res.data.Segments[InSegmentsId[k]].DestinationStation) {
                              DestinationStation.push({'AirportCode': res.data.Places[j].Code, 'AirportName': res.data.Places[j].Name,})
                              Destinationflag == true
                            }
                            if (Originflag == true && Destinationflag == true) {
                              break;
                            }
                          }
                          // 항공기
                          Carrier = []
                          OperatingCarrier = []
                          Carrierflag = false
                          Opcarrierflag = false
                          for (let j=0; j<res.data.Carriers.length; j++) {
                            if (Carrierflag == false && res.data.Carriers[j].Id == res.data.Segments[InSegmentsId[k]].Carrier) {
                              Carrier.push({'Code': res.data.Carriers[j].Code,
                                            'Name': res.data.Carriers[j].Name,
                                            'ImageUrl': res.data.Carriers[j].ImageUrl,})
                              Carrierflag = true
                              if (ismount) {
                                if (this.flightselectedName.indexOf(res.data.Carriers[j].Name) == -1) {
                                  this.flightselectedfixed.push(res.data.Carriers[j].Name)
                                  this.flightselectedName.push(res.data.Carriers[j].Name)
                                  this.flightselected.push({'Name': res.data.Carriers[j].Name,
                                                            'Code': res.data.Carriers[j].Code})
                                }
                              }
                            }
                            if (Opcarrierflag == false && res.data.Carriers[j].Id == res.data.Segments[InSegmentsId[k]].OperatingCarrier) {
                              OperatingCarrier.push({
                                            'Code': res.data.Carriers[j].Code,
                                            'Name': res.data.Carriers[j].Name,
                                            'ImageUrl': res.data.Carriers[j].ImageUrl,})
                              Opcarrierflag = true
                            }
                            if (Carrierflag == true && Opcarrierflag == true) {
                              break;
                            }
                          }
                          segment = {
                            'OriginStation': OriginStation,
                            'DestinationStation': DestinationStation,
                            'DepartureDateTime': res.data.Segments[InSegmentsId[k]].DepartureDateTime,
                            'ArrivalDateTime': res.data.Segments[InSegmentsId[k]].ArrivalDateTime,
                            'Carrier': Carrier,
                            'OperatingCarrier': OperatingCarrier,
                            'Duration': res.data.Segments[InSegmentsId[k]].Duration,
                            'FlightNumber': res.data.Segments[InSegmentsId[k]].FlightNumber,
                          }
                          InSegments.push(segment)
                        }


                        if ((this.selected.indexOf(InNumofStop) != -1) || (this.selected.indexOf(OutNumofStop) != -1) || (this.selected.indexOf('2') != -1 && Number(InNumofStop) > 1) || (this.selected.indexOf('2') != -1 && Number(OutNumofStop) > 1)) {
                          flight = {'OriginAirportCode': OriginAirportCode,
                                    'OriginAirportName' : OriginAirportName,
                                    'DestinationAirportCode': DestinationAirportCode,
                                    'DestinationAirportName': DestinationAirportName,
                                    'CurrencySymbol': CurrencySymbol,
                                    'InDepartureTime': InDepartureTime,
                                    'InArrivalTime': InArrivalTime,
                                    'InCarrierImageUrl': InCarrierImageUrl,
                                    'InDay': InDay,
                                    'InDuration': InDuration,
                                    'Instops': Instops,
                                    'InNumofStop': InNumofStop,
                                    'InSegments': InSegments,
                                    'OutDepartureTime': OutDepartureTime,
                                    'OutArrivalTime': OutArrivalTime,
                                    'OutCarrierImageUrl': OutCarrierImageUrl,
                                    'OutDay': OutDay,
                                    'OutDuration': OutDuration,
                                    'Outstops': Outstops,
                                    'OutNumofStop': OutNumofStop,
                                    'OutSegments': OutSegments,
                                    'Options': Options,
                                    'NumofOptions': NumofOptions,
                                    'LowestPrice': LowestPrice,
                                    'LowestAgentsName': LowestAgentsName,
                                    'LowestDeeplinkUrl': LowestDeeplinkUrl,
                                    'LowestAgentsImageUrl': LowestAgentsImageUrl,
                                    'NumofStops': NumofStops,
                                    'totalDuration': totalDuration,
                                   }
                          this.flights.push(flight)
                        }
                      }
                      console.log(this.flights)
                })
                .then( () => {
                  // console.log(this.flights.length)
                  if (s == 2) {
                    this.error = true
                    this.loading = false
                    return
                  }
                  if (this.flights.length == 0) {
                    return this.getFlights(0, s+1)
                  } else {
                    if (optionTypeIndex == 4) {
                      this.flights.sort(function(a, b) {
                        return a['NumofStops'] - b['NumofStops'];
                      });
                    }
                    this.minDuration = minDuration
                    this.transferedMinDuration = this.durationTransfer(minDuration)
                    this.maxDuration = maxDuration
                    this.transferedDuration = this.durationTransfer(maxDuration)
                    this.flightsResult = this.flights
                    this.numofFlights = this.flights.length
                    this.loading = false
                    return
                  }
                })
            })
        },
        // 시간 변환 함수
        timeTransfer: function (time) {
          let hour = parseInt(time.slice(11, 13))
          if (hour > 12) {
            hour -= 12
            return "오후 " + hour + ":" + time.slice(14, 16)
          } else {
            return "오전 " + hour + ":" + time.slice(14, 16)
          }
        },
        dayCalculate: function (departureTime, arrivalTime) {
          let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
          if (parseInt(departureTime.slice(0,4)) == parseInt(arrivalTime.slice(0,4))) {
            if (parseInt(departureTime.slice(5,7)) == parseInt(arrivalTime.slice(5,7))) {
              if (parseInt(departureTime.slice(8,10)) == parseInt(arrivalTime.slice(8,10))) {
                return 0
              } else {
                return parseInt(arrivalTime.slice(8,10)) - parseInt(departureTime.slice(8,10))
              }
            } else {
              return parseInt(arrivalTime.slice(8,10)) + days[parseInt(departureTime.slice(5,7))] - parseInt(departureTime.slice(8,10))
            }
          } else {
            return parseInt(arrivalTime.slice(8,10)) + 31 - parseInt(departureTime.slice(8,10))
          }
        },
        priceTransfer: function (price) {
          price = price.toString()
          for (let i=0; i<price.length; i++) {
            if (price[i] == ".")
              price = price.slice(0,i)
          }
          let result = ''
          for (let i=0; i<price.length; i++) {
            if (i>0 && i%3 == 0)
              result += ","
            result += price[price.length-i-1]
          }
          let reverse = ''
          for (let i=result.length-1; i>=0; i--) {
            reverse += result[i]
          }
          return reverse
        },
        durationTransfer: function (duration) {
          if (parseInt(duration)%60 == 0) {
            return parseInt(parseInt(duration)/60) + "시간 "
          }
          return parseInt(parseInt(duration)/60) + "시간 " + parseInt(duration)%60 + "분"
        },
        loadMoreFlightList: function () {
          this.limits += 10
        },
        getFlightsbyOptional: function (sortType, sortTypeIndex) {
          this.flights = []
          this.limits = 10
          this.thisSortType = sortType
          this.optionTypeIndex = sortTypeIndex
          this.getFlights(sortTypeIndex, 0);
        },
        // changedValue: function (value) {
        //   this.flights = []
        //   this.getFlights(1, this.sortTypes.indexOf(value), 0)
        // },
        onCheckboxChange : function () {
          console.log(this.selected)
          this.flights = []
          this.getFlights(0, 0)
        },
        onChange(value) {
          // this.$store.dispatch('handler', value)
          this.timeOptions[0] = this.timeTransferforApi(this.outrange[0])
          this.timeOptions[1] = this.timeTransferforApi(this.outrange[1])
          this.timeOptions[2] = this.timeTransferforApi(this.inrange[0])
          this.timeOptions[3] = this.timeTransferforApi(this.inrange[1])
          this.outboundDepartStartTime = this.timeTransferforSlider(this.outrange[0])
          this.outboundDepartEndTime = this.timeTransferforSlider(this.outrange[1])
          this.inboundDepartStartTime = this.timeTransferforSlider(this.inrange[0])
          this.inboundDepartEndTime = this.timeTransferforSlider(this.inrange[1])
          this.flights = []
          this.getFlights(this.optionTypeIndex, 0)
        },
        timeTransferforSlider : function (time) {
          let hour, minute, result
          hour = parseInt(parseInt(time)/60)
          minute = parseInt(time)%60

          if (hour < 13) {
            if (minute == 0) {
              return "오전 " + hour + ":00"
            } else {
              return "오전 " + hour + ":30"
            }
          } else {
            hour = hour - 12
            if (minute == 0) {
              return "오후 " + hour + ":00"
            } else {
              return "오후 " + hour + ":30"
            }
          }
        },
        timeTransferforApi : function (time) {
          let hour = parseInt(parseInt(time)/60)
          let minute = parseInt(time)%60
          if (hour < 10) hour = "0" + hour
          if (minute == 0) minute = "00"
          return hour + "%3A" + minute
        },
        thumbLabelHour (val) {
          return this.timeTransferforSlider(val).split(' ')[0]
        },
        thumbLabelMinute (val) {
          return this.timeTransferforSlider(val).split(' ')[1]
        },
        durationLabelHour : function (val) {
          return parseInt(parseInt(val)/60) + "시간"
        },
        durationLabelMinute : function (val) {
          return parseInt(val)%60 + "분"
        },
        onChangeDuration : function (value) {
          this.transferedDuration = this.durationTransfer(this.duration)
          console.log(this.transferedDuration)
          this.flights = []
          this.flightsResult = []
          this.getFlights(this.optionTypeIndex, 0)
          this.flights = []
          for (let i=0; i<this.flightsResult.length; i++) {
            if (this.flightsResult[i].totalDuration <= this.duration) this.flights.push(this.flightsResult[i])
          }
        },
        flightCheckboxChange : function (value) {
          console.log(this.flightselectedName)
          console.log(this.flightselected)
          this.flightselectedCodes = ''
          for (let i=0; i<this.flightselectedName.length; i++) {
            for (let j=0; j<this.flightselected.length; j++) {
              if (this.flightselectedName[i] == this.flightselected[j].Name) {
                if (this.flightselectedCodes == '') {
                  this.flightselectedCodes = this.flightselected[j].Code
                } else {
                  this.flightselectedCodes += ";"
                  this.flightselectedCodes += this.flightselected[j].Code
                }
                break;
              }
            }
          }
          this.flights = []
          this.getFlights(this.optionTypeIndex, 0)
          console.log(this.flightselectedCodes)
        },

    },
}
</script>



<style>
  @media (max-width: 980px) {
  .maingrid-a {
    display: grid;
    grid-template-columns: 100%;
  }
  .sidegrid-a {
    display: none;
  }
  }
  @media (min-width: 981px) and (max-width: 1200px) {
  .maingrid-b {
    display: grid;
    grid-template-columns: 25% 75%;
  }
  .sidegrid-b {
    display: none;
  }
  }
  @media only screen and (min-width: 1200px) {
  .maingrid-c {
    display: grid;
    grid-template-columns: 25% 55% 20%;
  }
  }
</style>
