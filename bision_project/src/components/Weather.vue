<template>
    <div class="weather" v-if="isApiDone">
        <h1 class="weather-city-name">현재 {{city}}의 날씨</h1>
        <i class="weather-icon" v-bind:class="[result[0].cod, weatherIcon]"></i>
        <h1>{{result[0].temp}}°C</h1>
        <p>습도: {{result[0].humidity}}</p>
        <p>바람: {{result[0].wind}} m/s</p>
    </div>
</template>

<script>
import '../../public/css/weather-icons.min.css'
import './Weather.css'

export default{
    name: 'Weather',
    props : [
        'city'
    ],
    data: function() {
        return {
            result: [],
            weatherIcon: "weatherIcon",
            isApiDone: false,
            translatedText: '',
        }
    },
    mounted() {
        this.translate()
        // openweathermap API에서 현재 서울 날씨 가져오기

            
    },
    methods: {
        async translate() {

            const taxios = await this.$http.create({
                baseURL: "https://translation.googleapis.com"
            });
            const getTranslate = await taxios.post("/language/translate/v2", null, {
                params: {
                source: "ko",
                target: "en",
                q: this.$props.city,
                key: "AIzaSyD9-6TuS5C7IJVWPFv5i10l_Z2JjXyb9zw"
                }
            })
            this.translatedText = getTranslate.data.data.translations[0].translatedText
            const apiKey  = '79afaa4fcb45087af27c7ef8708f358c'
            const baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.translatedText}&APPID=${apiKey}`
            // const result  = []
            this.$http.get(baseUrl)
                .then( (res) => {
                    let tempResult = {}
                    tempResult.city       = res.data.names
                    tempResult.temp       = Math.floor(res.data.main.temp - 273.15)
                    tempResult.humidity   = res.data.main.humidity
                    tempResult.wind       = res.data.wind.speed
                    tempResult.weather    = res.data.weather[0].main.toLowerCase()
                    tempResult.cod        = `wi wi-owm-${res.data.weather[0].id}`
                    this.result.push(tempResult)
                    this.isApiDone = true
                })
        }
    },
}
</script>