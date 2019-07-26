<template>
    <div class="Api">
      <!-- 헤더 공백 -->
      <div style="height:110px; width:100%;"></div>
      <!-- <v-flex xs2 d-flex v-if="!error">
        <v-select
          :items="sortTypes"
          solo
          @change="changedValue"
          label="정렬기준"
        ></v-select>
      </v-flex> -->
      <v-layout wrap>
        <v-flex style="width: 200px;" mx-0>
          <!-- 경유별 검색 체크박스 -->
          <div class="container" style="width: 220px;">
            경유
            <v-checkbox v-model="selected" label="직항" value="0" @change="onCheckboxChange"></v-checkbox>
            <v-checkbox v-model="selected" label="1회 경유" value="1" @change="onCheckboxChange"></v-checkbox>
            <v-checkbox v-model="selected" label="2회 이상 경유" value="2" @change="onCheckboxChange"></v-checkbox>
          </div>
          <!-- 시간대별 검색 슬라이더 -->
          <div class="container" style="width: 220px; padding: 0px;">
            <span style="display: block; text-align: center;">가는 날 출발시간</span>
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

            <span style="display: block; text-align: center;">오는 날 출발시간</span>
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

            <span style="display: block; text-align: center;">총 소요시간</span>
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
        </v-flex>
        <!-- 항공권 리스트 -->


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

        <v-flex style="width: 700px" v-if="!loading">
          <div v-if="!error" style="display: inline-block">
            <!-- 정렬메뉴바 -->
            <div style="display: flex; justify-content: space-between">
              <div class="container" style="display: flex; align-items: center ">
                <div style="font-size: 18px;">총 {{ numofFlights }}개의 검색 결과가 있습니다.</div>
              </div>
              <div class="">
                <span>정렬 기준 : </span>
                <v-menu offset-y >
                  <template v-slot:activator="{ on }" >
                    <v-btn color="#45CE30" dark v-on="on">
                      {{ thisSortType }}
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

            <v-layout mt-3 wrap v-for="i in flights.length > limits ? limits : flights.length" :key="i" style="width: 700px;">
              <Flight class="ma-3"
                :CurrencySymbol="flights[i - 1].CurrencySymbol"
                :InDepartureTime="flights[i - 1].InDepartureTime"
                :InArrivalTime="flights[i - 1].InArrivalTime"
                :InCarrierImageUrl="flights[i - 1].InCarrierImageUrl"
                :InDuration="flights[i - 1].InDuration"
                :InDay="flights[i - 1].InDay"
                :InNumofStop="flights[i - 1].InNumofStop"
                :InStopCodes="flights[i - 1].InStopCodes"
                :OutDepartureTime="flights[i - 1].OutDepartureTime"
                :OutArrivalTime="flights[i - 1].OutArrivalTime"
                :OutCarrierImageUrl="flights[i - 1].OutCarrierImageUrl"
                :OutDuration="flights[i - 1].OutDuration"
                :OutDay="flights[i - 1].OutDay"
                :OutNumofStop="flights[i - 1].OutNumofStop"
                :OutStopCodes="flights[i - 1].OutStopCodes"
                :NumofOptions="flights[i - 1].NumofOptions"
                :LowestPrice="flights[i - 1].LowestPrice"
                :LowestDeeplinkUrl="flights[i - 1].LowestDeeplinkUrl"
                :LowestAgentsImageUrl="flights[i - 1].LowestAgentsImageUrl"
                :OriginAirportCode="flights[i - 1].OriginAirportCode"
                :DestinationAirportCode="flights[i - 1].DestinationAirportCode"
              ></Flight>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
      <div style="">

      </div>

      <div style="display: flex; justify-content: center;">
          <v-btn color="info" dark v-on:click="loadMoreFlightList"><v-icon size="25" class="mr-2">fa-plus</v-icon> 더 보기</v-btn>
      </div>

      <v-alert v-if="error" :value="true" type="warning">결과가 존재하지 않습니다.</v-alert>
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
          flights: [],
          flightsResult: [],
          numofFlights: 0,
          outrange: [0, 1440],
          inrange: [0, 1440],
          duration: 0,
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
      this.getFlights(1, 0, 0)
      this.duration = this.maxDuration
    },
    methods: {
        getFlights: function(moreflag, optionTypeIndex, s =  0){
            this.loading = true
            var minDuration = 10000
            var maxDuration = 0
            console.log("실행")
            // console.log(this.$route.params)
            // console.log(this.flights)
            // 처음엔 10개만 불러오고 두번 째에 900개 더 불러옴
            if (moreflag == 1) {
              this.pageIndex = 0
              this.pageSize = 1000
            } else if (moreflag == 0) {
              this.pageIndex = 0
              this.pageSize = 10
            }
            const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0'
            let data  = {
                            'country': 'KW',
                            'currency': 'USD',
                            'locale': 'ko-KR',
                            // 'originPlace': 'ICN-sky',
                            // 'destinationPlace': 'HNL-sky',
                            // 'originPlace': 'ICN-sky',
                            // 'destinationPlace': 'PEK-sky',
                            // 'outboundDate': '2019-07-27',
                            // 'adults': '1',
                            'originPlace': this.$route.params.departure + '-sky',
                            'destinationPlace': this.$route.params.destination + '-sky',
                            'outboundDate': this.$route.params.leavingDate,
                            'adults': this.$route.params.adults,
                        }
            let inboundDate = this.$route.params.comingDate
            // let inboundDate = '2019-07-30'
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
                    let timeOption = '&outboundDepartStartTime=' + this.timeOptions[0] + '&outboundDepartEndTime=' + this.timeOptions[1] + '&inboundDepartStartTime=' + this.timeOptions[2] + '&inboundDepartEndTime=' + this.timeOptions[3]
                    //console.log(sessionKey)
                    this.$http({
                        method: 'GET',
                        url   : optionUrl + sessionKey + option + timeOption,
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
                      let OriginAirportCode, DestinationAirportCode
                      for (let j=0; j<res.data.Places.length; j++) {
                        if (Originflag == false && res.data.Places[j].Id == res.data.Query.OriginPlace) {
                          OriginAirportCode = res.data.Places[j].Code
                          Originflag == true
                        }
                        if (Destinationflag == false && res.data.Places[j].Id == res.data.Query.DestinationPlace) {
                          DestinationAirportCode = res.data.Places[j].Code
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
                        if (moreflag && j< 10)
                          continue;

                        let Options = []
                        let option, AgentsCode, AgentsImageUrl
                        for (let k=0; k<res.data.Itineraries[j].PricingOptions.length; k++) {
                          AgentsCode = res.data.Itineraries[j].PricingOptions[k].Agents[0]
                          for (let l=0; l<res.data.Agents.length; l++) {
                            if (res.data.Agents[l].Id == AgentsCode) {
                              AgentsImageUrl = res.data.Agents[l].ImageUrl
                            }
                          }
                          option = {'Price': this.priceTransfer(res.data.Itineraries[j].PricingOptions[k].Price),
                                    'DeeplinkUrl': res.data.Itineraries[j].PricingOptions[k].DeeplinkUrl,
                                    'AgentsImageUrl': AgentsImageUrl,
                                    }
                          Options.push(option)
                        }
                        var sortingField = 'Price'
                        Options.sort(function(a, b) {
                          return a[sortingField] - b[sortingField];
                        })
                        let NumofOptions = Options.length
                        let LowestPrice = Options[0].Price
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
                        let OutDepartureTime, OutArrivalTime, OutCarrierId, OutDuration, OutDay, OutNumofStop, OutStopCodes
                        // let InDepartureTime, InArrivalTime, InCarrierId, InDuration, InDay
                        let InDepartureTime = ''
                        let InArrivalTime = ''
                        let InCarrierId = ''
                        let InDuration = ''
                        let InDay = ''
                        let InNumofStop = ''
                        let InStopCodes = []
                        for (let k=0; k<res.data.Legs.length; k++) {
                          if (Outflag == false && res.data.Legs[k].Id == OutboundLegId) {
                            OutDepartureTime = this.timeTransfer(res.data.Legs[k].Departure)
                            OutArrivalTime = this.timeTransfer(res.data.Legs[k].Arrival)
                            OutDay = this.dayCalculate(OutDepartureTime, OutArrivalTime)
                            OutCarrierId = res.data.Legs[k].Carriers
                            OutDuration = res.data.Legs[k].Duration
                            OutNumofStop = res.data.Legs[k].Stops.length
                            OutStopCodes = res.data.Legs[k].Stops
                            Outflag = false
                          }
                          if (inboundDate != "" && Inflag == false && res.data.Legs[k].Id == InboundLegId) {
                            InDepartureTime = this.timeTransfer(res.data.Legs[k].Departure)
                            InArrivalTime = this.timeTransfer(res.data.Legs[k].Arrival)
                            InDay = this.dayCalculate(InDepartureTime, InArrivalTime)
                            InCarrierId = res.data.Legs[k].Carriers
                            InDuration = res.data.Legs[k].Duration
                            InNumofStop = res.data.Legs[k].Stops.length
                            InStopCodes = res.data.Legs[k].Stops
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

                        // 경유지 정보
                        for (let k=0; k<InStopCodes.length; k++) {
                          for (let l=0; l<res.data.Places.length; l++) {
                            if (InStopCodes[k] == res.data.Places[l].Id) {
                              InStopCodes[k] = res.data.Places[l].Code
                              break;
                            }
                          }
                        }
                        for (let k=0; k<OutStopCodes.length; k++) {
                          for (let l=0; l<res.data.Places.length; l++) {
                            if (OutStopCodes[k] == res.data.Places[l].Id) {
                              OutStopCodes[k] = res.data.Places[l].Code
                              break;
                            }
                          }
                        }
                        // console.log(InStopCodes)

                        if ((this.selected.indexOf(InNumofStop) != -1) || (this.selected.indexOf(OutNumofStop) != -1) || (this.selected.indexOf('2') != -1 && Number(InNumofStop) > 1) || (this.selected.indexOf('2') != -1 && Number(OutNumofStop) > 1)) {
                          flight = {'OriginAirportCode': OriginAirportCode,
                                    'DestinationAirportCode': DestinationAirportCode,
                                    'CurrencySymbol': CurrencySymbol,
                                    'InDepartureTime': InDepartureTime,
                                    'InArrivalTime': InArrivalTime,
                                    'InCarrierImageUrl': InCarrierImageUrl,
                                    'InDay': InDay,
                                    'InDuration': InDuration,
                                    'InNumofStop': InNumofStop,
                                    'InStopCodes': InStopCodes,
                                    'OutDepartureTime': OutDepartureTime,
                                    'OutArrivalTime': OutArrivalTime,
                                    'OutCarrierImageUrl': OutCarrierImageUrl,
                                    'OutDay': OutDay,
                                    'OutDuration': OutDuration,
                                    'OutNumofStop': OutNumofStop,
                                    'OutStopCodes': OutStopCodes,
                                    'Options': Options,
                                    'NumofOptions': NumofOptions,
                                    'LowestPrice': LowestPrice,
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
                  if (this.flights.length == 0 && moreflag == 0) {
                    return this.getFlights(0, 0, s+1)
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
          if (parseInt(departureTime.slice(0,4)) < parseInt(arrivalTime.slice(0,4))) {
            return true
          } else if (parseInt(departureTime.slice(5,7)) < parseInt(arrivalTime.slice(5,7))) {
            return true
          } else if (parseInt(departureTime.slice(8,10)) < parseInt(arrivalTime.slice(8,10))) {
            return true
          } else {
            return false
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
          this.getFlights(1, sortTypeIndex);
        },
        // changedValue: function (value) {
        //   this.flights = []
        //   this.getFlights(1, this.sortTypes.indexOf(value), 0)
        // },
        onCheckboxChange : function () {
          console.log(this.selected)
          this.flights = []
          this.getFlights(1, 0, 0)
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
          this.getFlights(1, this.optionTypeIndex, 0)
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
          this.getFlights(1, this.optionTypeIndex, 0)
          this.flights = []
          for (let i=0; i<this.flightsResult.length; i++) {
            if (this.flightsResult[i].totalDuration <= this.duration) this.flights.push(this.flightsResult[i])
          }
        },
    },
}
</script>



<style>
  .wrapper252 {
    display: grid;
    grid-template-columns: 25% 50% 25%;
  }
</style>
