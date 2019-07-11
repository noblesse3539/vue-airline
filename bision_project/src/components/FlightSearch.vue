<template>
    <div class="flight-search">
        <div class="flight-search-bg"></div>
        <div class="flight-search-wrapper">
            <div class="flight-search-pannel">
                    <div class="flight-search-radio">
                        <label class="radio-container" v-for="label in RadioLabels">
                            <input type="radio" :aria-label="label" name="radio" class="radioBtn">
                            <span class="checkmark">{{label}}</span>
                        </label>
                    </div>
                    <div class="flight-search-info">
                        <div class="departure">
                            <label> 출발지
                            <input v-model="departureInput" type="text" placeholder="국가, 도시 또는 공항" class="left-end-input">
                            <div class="country-list"></div>
                            </label>
                        </div>
                        <div class="destination">
                            <label> 도착지
                            <input v-model="destinationInput" type="text" placeholder="국가, 도시 또는 공항">
                            </label>
                        </div>
                        <div class="duration-start">
                            <label> 가는날
                            <input type="text" placeholder="">
                            </label>
                        </div>
                        <div class="duration-end">
                            <label> 오는날
                            <input type="text" placeholder="">
                            </label>
                        </div>
                        <div class="passengers">
                            <label> 좌석 등급 및 승객
                            <input type="text" placeholder="" class="right-end-input">
                            </label>
                        </div>
                    </div>
                <div class="flight-search-submit">
                    <button type="submit" @click="goToUrl(urls.airline)">항공권 검색</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './FlightSearch.css'

export default {
    name: 'FlightSearch',
    data() {
        return {
            RadioLabels: ["왕복", "편도", "다구간"],
            urls: {
                'airline' : '/airlineDetail'
            },
            departureInput: '',
            destinationInput: '',

        }
    },
    mounted(){
        const roundTrip = document.querySelector("input")
        roundTrip.checked = true
    },
    methods: {
        goToUrl : function (url) {
            this.$router.push(url)
        },
    },
    watch: {
        departureInput: function(userInput){
            const countryList = document.querySelector(".country-list")
            countryList.style.display = "block"
            countryList.style.position = "absolute"
            countryList.style.zIndex = "1000"
            
        },
    }
} 
</script>