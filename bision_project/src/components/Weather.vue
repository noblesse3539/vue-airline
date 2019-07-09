<template>
    <div className="weather">
        <h1>{{result[0].city}}</h1>
        <i v-bind:class="[result[0].cod, weatherIcon]"></i>
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
    data: function() {
        return {
            result: [],
            weatherIcon: "weatherIcon"
        }
    },
    mounted() {

        // openweathermap API에서 현재 서울 날씨 가져오기
        const apiKey  = '79afaa4fcb45087af27c7ef8708f358c'
        const baseUrl = `http://api.openweathermap.org/data/2.5/weather?lat=37.5667&lon=126.9783&APPID=${apiKey}`
        // const result  = []
        this.$http.get(baseUrl).
            then( (res) => {
                let tempResult = {}
                tempResult.city       = res.data.name
                tempResult.temp       = Math.floor(res.data.main.temp - 273.15)
                tempResult.humidity   = res.data.main.humidity
                tempResult.wind       = res.data.wind.speed
                tempResult.weather    = res.data.weather[0].main.toLowerCase()
                tempResult.cod        = `wi wi-owm-${res.data.weather[0].id}`
                this.result.push(tempResult)
            })
    },
}
</script>