<template>
    <div class="Api">
    </div>
</template>

<script>
export default {
    name: 'Api',
    mounted() {
        window.addEventListener('load', this.getAirlines)
    },
    methods: {
        getAirlines: function(){
            
            const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-09-01?inboundpartialdate=2019-12-01'

            this.$http({
                method: 'get',
                url   : baseUrl,
                data  : {
                        'country': 'US',
                        'currency': 'USD',
                        'locale': 'en-US',
                        'originPlace': 'SFO-sky',
                        'destinationPlace': 'LHR-sky',
                        'outboundDate': '2019-09-01',
                        'adults': '1'
                    },
                headers: {
                        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
                        'X-RapidAPI-Key' : '25703e8168mshcbae189ae6af368p1fcb8djsnead03bdc43f6',
                }
            })
                .then( res => {
                    console.log(res)
                })

        },
    },
}
</script>