<template>
    <div class="Api">
      <h1>ㅎㅇ</h1>
      <h1>ㅎㅇ</h1>
      <h1>ㅎㅇ</h1>
      <v-layout mt-5 wrap v-for="i in flights.length > limits ? limits : flights.length">
        <Flight class="ma-3"
            :AgentsImageUrl="flights[i - 1].AgentsImageUrl"
            :InDepartureTime="flights[i - 1].InDepartureTime"
            :InArrivalTime="flights[i - 1].InArrivalTime"
            :OutDepartureTime="flights[i - 1].OutDepartureTime"
            :OutArrivalTime="flights[i - 1].OutArrivalTime"
            :OutCarriers="flights[i - 1].OutCarriers"
            :Price="flights[i - 1].Price"
            :DeeplinkUrl="flights[i - 1].DeeplinkUrl"
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
                            'outboundDate': '2019-07-16',
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
                      // 출발 시간, 도착시간, Carrier, OperatingCarrier, Duration, FlightNumber, Directionality

                      let OutboundLegId, InboundLegId, AgentsCode, Price, DeeplinkUrl
                      for (let j=0; j<res.data.Itineraries.length; j++) {
                        Price = res.data.Itineraries[j].PricingOptions[0].Price
                        DeeplinkUrl = res.data.Itineraries[j].PricingOptions[0].DeeplinkUrl
                        OutboundLegId = res.data.Itineraries[j].OutboundLegId
                        InboundLegId = res.data.Itineraries[j].InboundLegId
                        AgentsCode = res.data.Itineraries[j].PricingOptions[0].Agents[0]
                        console.log("가격 " + Price)
                        console.log("딥링크 " + DeeplinkUrl)
                        console.log("아웃레그 " + OutboundLegId)
                        console.log("인레그" + InboundLegId)
                        console.log("에이전트코드 " + AgentsCode)

                        let Inflag = false
                        let Outflag = false
                        let InDepartureTime, InArrivalTime, OutDepartureTime, OutArrivalTime, InCarriers, OutCarriers
                        // let a = 0
                        for (let k=0; k<res.data.Legs.length; k++) {
                          // console.log(k)
                          if (Inflag == false && res.data.Legs[k].Id == InboundLegId) {
                            console.log("길이" + res.data.Legs.length)

                            InDepartureTime = res.data.Legs[k].Departure
                            InArrivalTime = res.data.Legs[k].Arrival
                            InCarriers = res.data.Legs[k].Carriers
                            console.log("인출발 " + InDepartureTime)
                            console.log("인도착 " + InArrivalTime)
                            Inflag = true
                          }
                          if (Outflag == false && res.data.Legs[k].Id == OutboundLegId) {
                            OutDepartureTime = res.data.Legs[k].Departure
                            OutArrivalTime = res.data.Legs[k].Arrival
                            OutCarriers = res.data.Legs[k].Carriers
                            Outflag = false
                          }
                          if (Inflag == true && Outflag == true) {
                            break;
                          }
                        }
                        let AgentsImageUrl, flight
                        for (let k=0; k<res.data.Agents.length; k++) {
                          if (res.data.Agents[k].Id == AgentsCode) {
                            AgentsImageUrl = res.data.Agents[k].ImageUrl
                          }
                        }
                        flight = {'AgentsImageUrl': AgentsImageUrl,
                                   'InDepartureTime': InDepartureTime,
                                   'InArrivalTime': InArrivalTime,
                                   'OutDepartureTime': OutDepartureTime,
                                   'OutArrivalTime': OutArrivalTime,
                                   'Price': Price,
                                   'DeeplinkUrl': DeeplinkUrl,
                                   'InCarriers': InCarriers,
                                   'OutCarriers': OutCarriers,
                                  }
                        this.flights.push(flight)

                      }
                        // 여기서부터 데이터 뽑아오면 됩니다.
                      console.log(this.flights)
                    })
                })

        },
    },
}
</script>
