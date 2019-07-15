<template>
    <div class="Api">
    </div>
</template>

<script>
import qs from 'qs'

export default {
    name: 'Api',
    data: function() {
        return {

        }
    },
    mounted() {
        window.addEventListener('load', this.getAirlines)
    },
    methods: {
        getAirlines: function(){
            
            const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0'
            const data  = {
                            'country': 'KR',
                            'currency': 'KRW',
                            'locale': 'ko-KR',
                            'originPlace': 'ICN-sky',
                            'destinationPlace': 'NRT-sky',
                            'outboundDate': '2019-07-15',
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
                        // 여기서부터 데이터 뽑아오면 됩니다.
                        console.log(res)
                    })
                })

        },
    },
}
</script>