<template>
    <div class="Api">
      <!-- 헤더 공백 -->
      <div style="height: 110px; width: 100%;"></div>
      <div style="width: 100%; background-color: rgba(0, 171, 132, 1); color: white; height: 170px; padding: 2.5rem 15rem; margin-bottom: 3rem;">
        <div style="display:grid; grid-template-columns: 50% 34% 16%;">
          <div>
            <div class="container" style="font-size: 1.8rem; height: 50%; padding-top: 10px; padding-bottom: .5rem;">
              {{getAirportName(this.$route.query.departureInput)}}({{this.$route.query.departure}}) - {{getAirportName(this.$route.query.destinationInput)}}({{this.$route.query.destination}})
            </div>
            <div class="container" style="font-size: 1.2rem; height: 50%; padding-top: 4px;">
              {{this.$route.query.adults}} 성인 <span v-if="this.$route.query.children">{{this.$route.query.children}} 아동</span> <span v-if="this.$route.query.infants">{{this.$route.query.infants}} 유아</span>  | 좌석 구분 : <span v-if="this.$route.query.flightClass">{{this.$route.query.flightClass}}</span><span v-else>없음</span>
            </div>
          </div>
          <div style="font-size: 1.4rem; padding-top: 1.7rem; padding-left: 3rem;">
            <div style="width: 50%; display: inline-block;">
              <div>가는 날</div>
              <div>{{this.$route.query.leavingDate}}</div>
            </div>
            <div v-if="this.$route.query.comingDate" style="width: 50%; display: inline-block;">
              <div>오는 날</div>
              <div>{{this.$route.query.comingDate}}</div>
            </div>
          </div>

          <!-- 다른 조건 검색 -->
          <!-- <div style="padding-top: 10px;">
            <v-btn class="mx-2" fab small color="grey lighten-3" v-on:click="searchPannel=!searchPannel">
              <i class="fas fa-search fa-2x"></i>
            </v-btn>
            <div style="font-size: 10px;">
              다른 조건으로
            </div>
            <div style="font-size: 10px; margin-bottom: 10px;">
              검색해보세요.
            </div>
          </div> -->
        </div>
        <div v-if="searchPannel">
          <FlightSearchPannel></FlightSearchPannel>
        </div>
      </div>
      <div class="maingrid-a maingrid-b maingrid-c" style="">
        <div style="margin: 0;" m-0 class="container sidegrid-a">
          <!-- 경유별 검색 체크박스 -->
          <div class="container" style="width: 220px; margin-left: 7%; padding-left: 8px;">
            <div style="font-size: 25px !important; color: rgb(0, 171, 132);">
              <i class="fas fa-plane-arrival"></i> 경유
            </div>
            <!-- <hr style="width: 220px"> -->
            <v-checkbox v-model="selected" label="직항" value="0" @change="updateResult"></v-checkbox>
            <v-checkbox v-model="selected" label="1회 경유" value="1" @change="updateResult"></v-checkbox>
            <v-checkbox v-model="selected" label="2회 이상 경유" value="2" @change="updateResult"></v-checkbox>
          </div>
          <!-- 시간대별 검색 슬라이더 -->
          <div class="container" style="width: 220px; padding: 0px; margin-left: 10%;">
            <div style="font-size: 25px; color: rgb(0, 171, 132); padding-bottom: 10px;">
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

            <div style="font-size: 25px; color: rgb(0, 171, 132); padding-bottom: 10px; padding-top: 20px;">
              <i class="fas fa-history"></i> 총 소요시간
            </div>
            <!-- <hr style="width: 220px; margin-bottom: 20px;"> -->
            <!-- <span style="display: block; font-size: 17px;">총 소요시간</span> -->
            <span>{{transferedMinDuration}} - </span>
            <span>{{transferedDuration}}</span>
            <v-slider v-model="duration" class="align-center" :max="maxDuration" :min="minDuration" hide-details thumb-size="50" @change="updateResult($event)">
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
            <div style="font-size: 25px !important; color: rgb(0, 171, 132); padding-bottom: 10px; padding-top: 15px;">
              <i class="far fa-paper-plane"></i> 항공사
            </div>
            <!-- <hr style="width: 220px"> -->
            <div v-for="i in flightselectedfixed.length" :key="i">
              <v-checkbox v-model="flightselectedName" :label="flightselectedfixed[i-1]" :value="flightselectedfixed[i-1]" @change="updateResult()"></v-checkbox>
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
                <div style="font-size: 18px;"><div style="margin-left: 25px; margin-top: 10px;">총{{ numofFlights }}개의 검색 결과가 있습니다.</div></div>
                <div><div style="margin-top: 13px;">정렬 기준 : </div></div>
                <div>
                  <v-menu offset-y style="display: inline-block">
                    <template v-slot:activator="{ on }" >
                      <v-btn color="rgb(0, 171, 132)" dark v-on="on" @click="menuicon=!menuicon">
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
          <div class="adSection__Title"><span class="decoBision">Bision</span>을 통해 <br>현지 가이드를 만나보세요</div>
          <div v-if="GSload">
            <div  class="adGuideServices"  @click="goToDetail(guideService.id)" v-for="(guideService, i) in guideServices"
            :style="`background-image: url(${guideService.mainImg});`" >
              <div class="adGuideServices__textBox">
                <div class="adGuideServices__Title"> &nbsp; {{guideService.title}}</div>
                <div class="adGuideServices__detail">
                  <div class="adGuideServices__Desc">{{guideService.desc}}</div>
                  <div class="adGuideServices__Price">{{guideService.price}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 푸터 공백 -->
      <div style="height:100px; width:100px;"></div>
    </div>
</template>
<script>
import './FlightListPage.css'
import qs from 'qs'
import Flight from '../components/Flight'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import FlightSearchPannel from '../components/FlightSearchPannel'

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
      FlightSearchPannel,
      // PacmanLoader
    },
    data: function() {
        return {
          GSload : false,
          guideServices: [],
          destinationCity:'',
          loading: false,
          inboundDate: '',
          selected: ['0', '1', '2'],
          flightselectedfixed: [],
          flightselectedName: [],
          flightselectedCodes: '',
          flightselected: [],
          len: 0,

          // 정렬에 따른 결과 저장
          flights: [],
          flightsSorted : [
            [], // SortbyPrice
            [], // SortbyDuration
            [], // SortbyOutDeparture
            [], // SortbyInDeparture
            [], // SortbyStops
          ],


          numofFlights: 0,
          outrange: [0, 1440],
          inrange: [0, 1440],
          duration: 0,
          menuicon: true,
          transferedMinDuration: 0,
          transferedDuration: 0,
          minDuration: 0,
          maxDuration: 1800 ,
          searchPannel: false,
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
      this.getFlights(0, 0)
      this.getFlights(1, 0)
      this.getFlights(2, 0)
      this.getFlights(3, 0)
      this.getFlights(4, 0)
      this.getad()
    },
    methods: {
      goToDetail(id) {
        console.log(id)
        const query = {serviceId: id}
        this.$router.push({name: 'GuideServiceDetailPage', query: query})
      },
      getad(){
        // console.log(1)
        console.log(this.$route.query.destinationCity)
        this.destinationCity = this.$route.query.destinationCity
        this.$http.get(`/api/guideservice/search/${this.destinationCity}`)
        .then( res => {
          console.log("비엔나나오니", res.data)
          for(var i = 0; i < 2; i++){
            if(i <= res.data.guideservices.length-1){
              this.guideServices.push({
                'mainImg': res.data.guideservices[i].mainImg,
                'id' : res.data.guideservices[i]._id,
                'title' : res.data.guideservices[i].title,
                'desc' : res.data.guideservices[i].desc,
                'price' : res.data.guideservices[i].options[0].costType + ' ' + res.data.guideservices[i].options[0].adult.cost

              })
            }
          }
              //이미지 등록



          console.log("가이드서비스", this.guideServices)
          this.GSload = true
          console.log("여기", this.GSload)
        }).catch(err => {
          console.log(err)
        })
      },
        getFlights: function(optionTypeIndex, s =  0){
            if (optionTypeIndex == 0) {
              this.loading = true
            }
            var minDuration = 10000
            var maxDuration = 0
            console.log("실행")
            this.pageIndex = 0
            this.pageSize = 1000
            const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0'
            let data  = {
                            'country': 'KW',
                            'currency': 'USD',
                            'locale': 'ko-KR',
                            // 'originPlace': 'ICN-sky',
                            // 'destinationPlace': 'HNL-sky',
                            // 'originPlace': 'SFO-sky',
                            // 'destinationPlace': 'LHR-sky',
                            // 'outboundDate': '2019-09-01',
                            // 'adults': '1',
                            'originPlace': this.$route.query.departure + '-sky',
                            'destinationPlace': this.$route.query.destination + '-sky',
                            'outboundDate': this.$route.query.leavingDate,
                            'adults': this.$route.query.adults,
                        }
            // 옵션 데이터
            let inboundDate = this.$route.query.comingDate
            // let inboundDate = '2019-09-10'
            if (inboundDate != '') data['inboundDate'] = inboundDate

            let infants = this.$route.query.infants
            // let inboundDate = '2019-09-10'
            if (infants != '') data['infants'] = infants

            data['cabinClass'] = this.$route.query.flightClass


            this.$http({
                method: 'POST',
                url   : baseUrl,
                data  : qs.stringify(data),
                timeout: 5000,
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

                  let fuck = new Promise( (resolve, reject) => setTimeout(resolve(sessionKey)), 5000)

                  fuck.then( sessionKey => {
                              const optionUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/'
                              // let option = '?pageIndex='+ this.pageIndex + '&pageSize=' + this.pageSize + this.optionType[optionTypeIndex].text
                              if (optionTypeIndex < 4) {
                                var option = '?pageIndex='+ this.pageIndex + '&pageSize=' + this.pageSize + this.optionType[optionTypeIndex].text
                              } else {
                                var option = '?pageIndex='+ this.pageIndex + '&pageSize=' + this.pageSize + this.optionType[0].text
                              }
                              this.$http({
                                  method: 'GET',
                                  url   : optionUrl + sessionKey + option,
                                  headers: {
                                  'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
                                  'X-RapidAPI-Key' : '25703e8168mshcbae189ae6af368p1fcb8djsnead03bdc43f6',
                                  "Content-Type": "application/x-www-form-urlencoded"
                                  }
                              }
                            )
                              .then( res => {
                                console.log(res)

                                if (s > 1) {
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

                                    OutboundLegId = res.data.Itineraries[j].OutboundLegId
                                    InboundLegId = res.data.Itineraries[j].InboundLegId

                                    // 출발 시간, 도착시간 (왕복), 날짜 변화, 걸리는 시간
                                    let Inflag = false
                                    let Outflag = false
                                    let OutDepartureTime, OutArrivalTime, OutCarrierId, OutDuration, OutDay, OutNumofStop, OutStopCodes, OutSegmentsId
                                    let InDepartureTime = ''
                                    let InArrivalTime = ''
                                    let InCarrierId = ''
                                    let InDuration = ''
                                    let InDay = ''
                                    let InNumofStop = ''
                                    let InStopCodes = []
                                    let InSegmentsId
                                    let check = {}
                                    for (let k=0; k<res.data.Legs.length; k++) {
                                      if (Outflag == false && res.data.Legs[k].Id == OutboundLegId) {
                                        check.OutDepartureTime = this.transferforCheck(res.data.Legs[k].Departure)
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
                                        check.InDepartureTime = this.transferforCheck(res.data.Legs[k].Departure)
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
                                    if (optionTypeIndex == 0) {
                                      if (totalDuration > maxDuration) maxDuration = totalDuration
                                      if (totalDuration < minDuration) minDuration = totalDuration
                                    }
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
                                          if (optionTypeIndex == 0) {
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
                                          if (optionTypeIndex == 0) {
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
                                              'check': check,
                                             }
                                      if (optionTypeIndex == 0) {
                                        this.flights.push(flight)
                                        this.flightsSorted[0].push(flight)
                                      } else if (optionTypeIndex == 1){
                                        this.flightsSorted[1].push(flight)
                                      } else if (optionTypeIndex == 2) {
                                        this.flightsSorted[2].push(flight)
                                      } else if (optionTypeIndex == 3) {
                                        this.flightsSorted[3].push(flight)
                                      } else {
                                        this.flightsSorted[4].push(flight)
                                      }

                                  }
                                  console.log(this.flights)
                                  console.log(this.flightsSorted)
                                }

                          })
                          .then( () => {

                            // if (s < 2) {
                            //   this.flights = [0]
                            //   this.flightsSorted = [
                            //     [], // SortbyPrice
                            //     [], // SortbyDuration
                            //     [], // SortbyOutDeparture
                            //     [], // SortbyInDeparture
                            //     [], // SortbyStops
                            //   ]
                            //   return this.getFlights(0, s+1)
                            // } else if (s == 2 && this.flights.length == 0) {
                            //   this.loading = false
                            //   return
                            // } else if (s >= 2) {
                            //   console.log(s)
                            //   if (this.len < this.flights.length) {
                            //     this.len = this.flights.length
                            //     this.flights = [0]
                            //     this.flightsSorted = [
                            //       [], // SortbyPrice
                            //       [], // SortbyDuration
                            //       [], // SortbyOutDeparture
                            //       [], // SortbyInDeparture
                            //       [], // SortbyStops
                            //     ]
                            //     return this.getFlights(0, s+1)
                            //   } else {
                            //       console.log("들어옴")
                            //       if (optionTypeIndex == 4) {
                            //         this.flightsSorted[4].sort(function(a, b) {
                            //           return a['NumofStops'] - b['NumofStops'];
                            //         });
                            //       }
                            //       if (optionTypeIndex == 0) {
                            //         this.minDuration = minDuration
                            //         this.transferedMinDuration = this.durationTransfer(minDuration)
                            //         this.maxDuration = maxDuration
                            //         this.transferedDuration = this.durationTransfer(maxDuration)
                            //         this.duration = this.maxDuration
                            //         this.numofFlights = this.flights.length
                            //         // console.log(this.flights)
                            //       }
                            //       this.loading = false
                            //       return
                            //     }
                            //   }

                            // console.log(this.flights)
                            // console.log(this.flightsSorted)
                            if (s == 2) {
                              if (this.flights.length == 0) {
                                // this.error = true
                                this.loading = false
                                return
                              } else {
                                if (optionTypeIndex == 4) {
                                  this.flightsSorted[4].sort(function(a, b) {
                                    return a['NumofStops'] - b['NumofStops'];
                                  });
                                }
                                if (optionTypeIndex == 0) {
                                  this.minDuration = minDuration
                                  this.transferedMinDuration = this.durationTransfer(minDuration)
                                  this.maxDuration = maxDuration
                                  this.transferedDuration = this.durationTransfer(maxDuration)
                                  this.duration = this.maxDuration
                                  this.numofFlights = this.flights.length
                                  // console.log(this.flights)
                                }
                                this.loading = false
                                return
                              }

                            }
                            if (s < 2) {
                              return setTimeout(() => {this.getFlights(optionTypeIndex, s+1)}, 500);
                              // return this.getFlights(0, s+1)
                            }

                          })
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
          this.optionTypeIndex = sortTypeIndex
          this.updateResult()
        },
        // 2. 출발시간 슬라이더
        onChange(value) {
          this.outboundDepartStartTime = this.timeTransferforSlider(this.outrange[0])
          this.outboundDepartEndTime = this.timeTransferforSlider(this.outrange[1])
          this.inboundDepartStartTime = this.timeTransferforSlider(this.inrange[0])
          this.inboundDepartEndTime = this.timeTransferforSlider(this.inrange[1])
          this.updateResult()
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
        updateResult : function () {
          this.flights = []
          this.limit = 10
          this.loading = true
          console.log(this.flightsSorted[this.optionTypeIndex].length)
          this.transferedDuration = this.durationTransfer(this.duration)
          for (let i=0; i<this.flightsSorted[this.optionTypeIndex].length; i++) {
            // 경유 체크박스
            if ((this.selected.indexOf(this.flightsSorted[this.optionTypeIndex][i].InNumofStop) != -1)
                || (this.selected.indexOf(this.flightsSorted[this.optionTypeIndex][i].OutNumofStop) != -1)
                || (this.selected.indexOf('2') != -1 && Number(this.flightsSorted[this.optionTypeIndex][i].InNumofStop) > 1)
                || (this.selected.indexOf('2') != -1 && Number(this.flightsSorted[this.optionTypeIndex][i].OutNumofStop) > 1)) {

              // 총 소요시간
              if (this.flightsSorted[this.optionTypeIndex][i].totalDuration <= this.duration) {
                // 출발시간
                if (this.flightsSorted[this.optionTypeIndex][i].check.OutDepartureTime >= this.outrange[0]
                    && this.flightsSorted[this.optionTypeIndex][i].check.OutDepartureTime <= this.outrange[1]
                    && this.flightsSorted[this.optionTypeIndex][i].check.InDepartureTime >= this.inrange[0]
                    && this.flightsSorted[this.optionTypeIndex][i].check.InDepartureTime <= this.inrange[1]) {
                  // 항공사 체크박스
                  let flag = false
                  for (let j=0; j<this.flightsSorted[this.optionTypeIndex][i].OutSegments.length; j++) {
                    for (let k=0; k<this.flightsSorted[this.optionTypeIndex][i].OutSegments[j].Carrier.length; k++) {
                      if (this.flightselectedName.indexOf(this.flightsSorted[this.optionTypeIndex][i].OutSegments[j].Carrier[k].Name) != -1) {
                        this.flights.push(this.flightsSorted[this.optionTypeIndex][i])
                        flag = true
                        break;
                      }
                    }
                    if (flag == true) break;
                  }
                  if (flag == false) {
                    for (let j=0; j<this.flightsSorted[this.optionTypeIndex][i].InSegments.length; j++) {
                      for (let k=0; k<this.flightsSorted[this.optionTypeIndex][i].InSegments[j].Carrier.length; k++) {
                        if (this.flightselectedName.indexOf(this.flightsSorted[this.optionTypeIndex][i].InSegments[j].Carrier[k].Name) != -1) {
                          this.flights.push(this.flightsSorted[this.optionTypeIndex][i])
                          flag = true
                          break;
                        }
                      }
                      if (flag == true) break;
                    }
                  }
                }
              }
            }
          }
          console.log(this.flights)
          this.numofFlights = this.flights.length
          this.loading = false
          // setTimeout("this.changeLoading()", 100);
        },
        transferforCheck : function(time) {
          return parseInt(time.slice(11, 13)) * 60 + parseInt(time.slice(14, 16))
        },
        getAirportName: function(name) {
          return name.slice(0, name.indexOf(','))
        },
        // changeLoading : function () {
        //   this.loading = false;
        // }

    },
}
</script>
