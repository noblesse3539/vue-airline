<template>
    <div class="Api">
      <v-layout mt-3 wrap v-for="i in flights.length > limits ? limits : flights.length">
        <Flight class="ma-3"
            :AgentsImageUrl="flights[i - 1].AgentsImageUrl"
            :InDepartureTime="flights[i - 1].InDepartureTime"
            :InArrivalTime="flights[i - 1].InArrivalTime"
            :InCarrierImageUrl="flights[i - 1].InCarrierImageUrl"
            :OutDepartureTime="flights[i - 1].OutDepartureTime"
            :OutArrivalTime="flights[i - 1].OutArrivalTime"
            :OutCarrierImageUrl="flights[i - 1].OutCarrierImageUrl"
            :Price="flights[i - 1].Price"
            :DeeplinkUrl="flights[i - 1].DeeplinkUrl"
            :OriginAirportCode="flights[i - 1].OriginAirportCode"
            :DestinationAirportCode="flights[i - 1].DestinationAirportCode"
        ></Flight>
      </v-layout>
      <h1>ㅎㅇ</h1>
      <h1>ㅎㅇ</h1>
    </div>
</template>

<script>
import qs from 'qs'
import Flight from '../components/Flight'

export default {
    name: 'FlightList',
    props: {
      limits: {type: Number, default: 10},
      loadMore: {type: Boolean, default: true}
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
        window.addEventListener('load', this.getFlights)
    },
    methods: {
        getFlights: function(){
            console.log("실행")
            const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0'
            const data  = {
                            'country': 'KR',
                            'currency': 'KRW',
                            'locale': 'ko-KR',
                            'originPlace': 'ICN-sky',
                            'destinationPlace': 'NRT-sky',
                            'outboundDate': '2019-07-17',
                            'inboundDate': '2019-07-20',
                            'adults': '1'
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
                    this.$http({
                        method: 'GET',
                        url   : 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/' + sessionKey,
                        headers: {
                        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
                        'X-RapidAPI-Key' : '25703e8168mshcbae189ae6af368p1fcb8djsnead03bdc43f6',
                        "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                    .then( res => {
                      console.log(res)

                      // 출발, 도착 공항이름
                      let OriginAirportCode, DestinationAirportCode
                      for (let j=0; j<res.data.Places.length; j++) {
                        if (res.data.Places[j].Id == res.data.Query.OriginPlace) {
                          OriginAirportCode = res.data.Places[j].Code
                        }
                        if (res.data.Places[j].Id == res.data.Query.DestinationPlace) {
                          DestinationAirportCode = res.data.Places[j].Code
                        }
                      }

                      // 가격, 에이전트연결 url
                      let OutboundLegId, InboundLegId, AgentsCode, Price, DeeplinkUrl
                      for (let j=0; j<res.data.Itineraries.length; j++) {
                        Price = res.data.Itineraries[j].PricingOptions[0].Price
                        DeeplinkUrl = res.data.Itineraries[j].PricingOptions[0].DeeplinkUrl
                        OutboundLegId = res.data.Itineraries[j].OutboundLegId
                        InboundLegId = res.data.Itineraries[j].InboundLegId
                        AgentsCode = res.data.Itineraries[j].PricingOptions[0].Agents[0]

                        // 출발 시간, 도착시간 (왕복)
                        let Inflag = false
                        let Outflag = false
                        let InDepartureTime, InArrivalTime, OutDepartureTime, OutArrivalTime, InCarrierId, OutCarrierId

                        for (let k=0; k<res.data.Legs.length; k++) {
                          if (Inflag == false && res.data.Legs[k].Id == InboundLegId) {
                            InDepartureTime = res.data.Legs[k].Departure
                            InArrivalTime = res.data.Legs[k].Arrival
                            InCarrierId = res.data.Legs[k].Carriers
                            Inflag = true
                          }
                          if (Outflag == false && res.data.Legs[k].Id == OutboundLegId) {
                            OutDepartureTime = res.data.Legs[k].Departure
                            OutArrivalTime = res.data.Legs[k].Arrival
                            OutCarrierId = res.data.Legs[k].Carriers
                            Outflag = false
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
                                  'AgentsImageUrl': AgentsImageUrl,
                                  'InDepartureTime': InDepartureTime,
                                  'InArrivalTime': InArrivalTime,
                                  'InCarrierImageUrl': InCarrierImageUrl,
                                  'OutDepartureTime': OutDepartureTime,
                                  'OutArrivalTime': OutArrivalTime,
                                  'OutCarrierImageUrl': OutCarrierImageUrl,
                                  'Price': Price,
                                  'DeeplinkUrl': DeeplinkUrl,
                                 }
                        this.flights.push(flight)

                      }
                      console.log(this.flights)
                    })
                })

        },
        // 시간 변환 함수
        timeTransfer: function (time) {
          let hour = parseInt(time.slice(12, 14))
          if (hour > 12) {
            hour = time.slice(12, 14) - 12
            return "오후 " + hour + ":" + time.slice(14, 16)
          } else {
            return "오전 " + hour + ":" + time.slice(14, 16)
          }
        },
        // priceTransfer: function (price) {
        //   for (let i=0; i<price.length; i++) {
        //     if (price[i] == ".")
        //       price = price.slice(,i)
        //   }
        //   let result = ''
        //   for (let i=price.length-1; i>=0; i--) {
        //
        //   }
        // }
    },
}
</script>
