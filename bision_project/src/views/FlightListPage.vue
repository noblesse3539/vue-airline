<template>
    <div class="Api">
      <v-layout mt-3 wrap v-for="i in flights.length > limits ? limits : flights.length" :key="i">
        <Flight class="ma-3"
            :AgentsImageUrl="flights[i - 1].AgentsImageUrl"
            :CurrencySymbol="flights[i - 1].CurrencySymbol"
            :InDepartureTime="flights[i - 1].InDepartureTime"
            :InArrivalTime="flights[i - 1].InArrivalTime"
            :InCarrierImageUrl="flights[i - 1].InCarrierImageUrl"
            :InDuration="flights[i - 1].InDuration"
            :InDay="flights[i - 1].InDay"
            :OutDepartureTime="flights[i - 1].OutDepartureTime"
            :OutArrivalTime="flights[i - 1].OutArrivalTime"
            :OutCarrierImageUrl="flights[i - 1].OutCarrierImageUrl"
            :OutDuration="flights[i - 1].OutDuration"
            :OutDay="flights[i - 1].OutDay"
            :Price="flights[i - 1].Price"
            :DeeplinkUrl="flights[i - 1].DeeplinkUrl"
            :OriginAirportCode="flights[i - 1].OriginAirportCode"
            :DestinationAirportCode="flights[i - 1].DestinationAirportCode"
        ></Flight>
      </v-layout>
      <v-btn color="info" dark v-on:click="loadMoreFlightList"><v-icon size="25" class="mr-2">fa-plus</v-icon> 더 보기</v-btn>

      <div style="height:100px; width:100px;">

      </div>
    </div>
</template>

<script>
import qs from 'qs'
import Flight from '../components/Flight'

export default {
    name: 'FlightList',
    props: {
      limits: {type: Number, default: 10},
      pageIndex: {type: String, default: 0},
      pageSize: {type: String, default: 10},
      // loadMore: {type: Boolean, default: true}
    },
    components: {
      Flight
    },
    data: function() {
        return {
          flights: [],
        }
    },
    mounted() {
        // window.addEventListener('load', this.getFlights)
        this.getFlights();
    },
    methods: {
        getFlights: function(){
            console.log("실행")
            console.log(this.$route.params)
            const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0'
            let data  = {
                            'country': 'US',
                            'currency': 'USD',
                            'locale': 'en-US',
                            'originPlace': 'LHR-sky',
                            'destinationPlace': 'ICN-sky',
                            'outboundDate': '2019-07-18',
                            'inboundDate': '2019-07-20',
                            'adults': '1',

                            // 'originPlace': this.$route.params.departure + '-sky',
                            // 'destinationPlace': this.$route.params.destination + '-sky',
                            // 'outboundDate': this.$route.params.leavingDate,
                            // 'inboundDate': this.$route.params.comingDate,
                            // 'adults': this.$route.params.adults
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
                    console.log(sessionKey)
                    let data  = {
                                    'pageIndex': '0',
                                    'pageSize': '10',
                                }
                    console.log(data)
                    this.$http({
                        method: 'GET',
                        url   : 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/' + sessionKey,
                        data  : qs.stringify(data),
                        headers: {
                        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
                        'X-RapidAPI-Key' : '25703e8168mshcbae189ae6af368p1fcb8djsnead03bdc43f6',
                        "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                    .then( res => {
                      console.log(data)
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
                      console.log(CurrencySymbol)

                      // 가격, 에이전트연결 url
                      let OutboundLegId, InboundLegId, AgentsCode, Price, DeeplinkUrl
                      for (let j=0; j<res.data.Itineraries.length; j++) {
                        Price = this.priceTransfer(res.data.Itineraries[j].PricingOptions[0].Price)
                        DeeplinkUrl = res.data.Itineraries[j].PricingOptions[0].DeeplinkUrl
                        OutboundLegId = res.data.Itineraries[j].OutboundLegId
                        InboundLegId = res.data.Itineraries[j].InboundLegId
                        AgentsCode = res.data.Itineraries[j].PricingOptions[0].Agents[0]

                        // 출발 시간, 도착시간 (왕복), 날짜 변화, 걸리는 시8
                        let Inflag = false
                        let Outflag = false
                        let OutDepartureTime, OutArrivalTime, OutCarrierId, OutDuration, OutDay
                        let InDepartureTime, InArrivalTime, InCarrierId, InDuration, InDay

                        for (let k=0; k<res.data.Legs.length; k++) {
                          if (Outflag == false && res.data.Legs[k].Id == OutboundLegId) {
                            OutDepartureTime = res.data.Legs[k].Departure
                            OutArrivalTime = res.data.Legs[k].Arrival
                            OutDay = this.dayCalculate(OutDepartureTime, OutArrivalTime)
                            OutCarrierId = res.data.Legs[k].Carriers
                            OutDuration = this.durationTransfer(res.data.Legs[k].Duration)
                            Outflag = false
                          }
                          if (Inflag == false && res.data.Legs[k].Id == InboundLegId) {
                            InDepartureTime = res.data.Legs[k].Departure
                            InArrivalTime = res.data.Legs[k].Arrival
                            InDay = this.dayCalculate(InDepartureTime, InArrivalTime)
                            InCarrierId = res.data.Legs[k].Carriers
                            InDuration = this.durationTransfer(res.data.Legs[k].Duration)
                            Inflag = true
                          }
                          if (Inflag == true && Outflag == true) {
                            break;
                          }
                        }

                        // 에이전트이미지 url, 항공사이미지 url
                        let AgentsImageUrl, flight, InCarrierImageUrl, OutCarrierImageUrl
                        for (let k=0; k<res.data.Agents.length; k++) {
                          if (res.data.Agents[k].Id == AgentsCode) {
                            AgentsImageUrl = res.data.Agents[k].ImageUrl
                          }
                        }
                        for (let k=0; k<res.data.Carriers.length; k++) {
                          if (res.data.Carriers[k].Id == InCarrierId) {
                            InCarrierImageUrl = res.data.Carriers[k].ImageUrl
                          }
                          if (res.data.Carriers[k].Id == OutCarrierId) {
                            OutCarrierImageUrl = res.data.Carriers[k].ImageUrl
                          }
                        }

                        // 시간 변환
                        OutDepartureTime = this.timeTransfer(OutDepartureTime)
                        OutArrivalTime = this.timeTransfer(OutArrivalTime)
                        InDepartureTime = this.timeTransfer(InDepartureTime)
                        InArrivalTime = this.timeTransfer(InArrivalTime)

                        flight = {'OriginAirportCode': OriginAirportCode,
                                  'DestinationAirportCode': DestinationAirportCode,
                                  'CurrencySymbol': CurrencySymbol,
                                  'AgentsImageUrl': AgentsImageUrl,
                                  'InDepartureTime': InDepartureTime,
                                  'InArrivalTime': InArrivalTime,
                                  'InCarrierImageUrl': InCarrierImageUrl,
                                  'InDay': InDay,
                                  'OutDepartureTime': OutDepartureTime,
                                  'OutArrivalTime': OutArrivalTime,
                                  'OutCarrierImageUrl': OutCarrierImageUrl,
                                  'OutDay': OutDay,
                                  'Price': Price,
                                  'DeeplinkUrl': DeeplinkUrl,
                                  'OutDuration': OutDuration,
                                  'InDuration': InDuration,
                                 }
                        this.flights.push(flight)

                      }
                      console.log(this.flights)
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
          return parseInt(parseInt(duration)/60) + "시간 " + parseInt(duration)%60 + "분"
        },
        loadMoreFlightList: function () {
          this.limits += 10
          this.pageIndex += 1
          this.pageSize += 10
        }
    },
}
</script>
