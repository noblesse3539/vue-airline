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
                            <div class="dep-triangle-box">
                                    <div class="country-triangle"></div>
                            </div>
                            <div class="dep-country-list">
                                <div class="country-name">인천</div>
                            </div>
                            </label>
                        </div>
                        <div class="destination">
                            <label> 도착지
                            <input v-model="destinationInput" type="text" placeholder="국가, 도시 또는 공항">
                            <div class="dst-triangle-box">
                                    <div class="country-triangle"></div>
                            </div>
                            <div class="dst-country-list">
                                <div></div>
                            </div>
                            </label>
                        </div>
                        <div class="duration-start" @click="openCalender('.leavingDate', '.leavingDate-picker', e)">
                            <label> 가는날
                            <input  class="leavingDate" type="text" :placeholder="todayDate" :value="leavingDate" disabled>
                            <div class="leavingDate-picker">
                                <v-date-picker v-model="leavingDate" :reactive="reactive" color="#45CE30"></v-date-picker>
                            </div>
                            </label>
                        </div>
                        <div class="duration-end" @click="openCalender('.comingDate', '.comingDate-picker', e)">
                            <label class="comingDateText"> 오는날
                            <input class="comingDate" type="text" placeholder="" :value="comingDate" disabled>
                            <div class="comingDate-picker">
                                <v-date-picker v-model="comingDate" :reactive="reactive" color="#45CE30"></v-date-picker>
                            </div>
                            </label>
                        </div>
                        <div class="passengers">
                            <label> 좌석 등급 및 승객
                            <input type="text" placeholder="" class="right-end-input">
                            </label>
                            <div class="flight-search-submit">
                                <button type="submit" @click="goToUrl(urls.airline)">항공권 검색</button>
                            </div>
                        </div>
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
            leavingDate: new Date().toISOString().substr(0, 10),
            comingDate: new Date().toISOString().substr(0, 10),
            todayDate: new Date(),
            reactive: true,
            datePickerFlag: {
                '.leavingDate': false,
                '.comingDate': false,
            },
        }
    },
    mounted(){
        const roundTrip = document.querySelector("input")
        roundTrip.checked = true

        // 편도 버튼 클릭시 <오는날> 버튼 비활성화 처리
        const radioBtn = document.querySelectorAll('.radio-container')[1].children[0]
        radioBtn.addEventListener('click', this.oneWayTrip)

        // 검색창 바깥 부분 클릭 시 출발지 및 도착지 검색 모달 숨기기
        document.body.addEventListener("click",  this.hideSearchResult)
        document.body.addEventListener("tap", this.hideSearchResult)
        document.body.addEventListener("keydown", this.hideSearchResult)
    },
    methods: {
        goToUrl : function(url) {
            
            this.$router.push(url)
        },
        hideSearchResult : function(e) {
            
            const leavingDatePicker = document.querySelector('.leavingDate-picker')
            const comingDatePicker = document.querySelector('.comingDate-picker')

            if (e.target.classList[0] !== 'leavingDate' && e.target.classList[0] !== 'comingDate') {
                
                const searchInput = [".dep-country-list", ".dst-country-list", 
                                        ".dep-triangle-box", ".dst-triangle-box"]
                searchInput.forEach( className => { 
                    const countryList = document.querySelector(className)
                    countryList.style.display = "none"
                    countryList.style.position = "none"
                    countryList.style.zIndex = "-1"
                })

                if (this.datePickerFlag['.leavingDate'] == true || this.datePickerFlag['.comingDate'] == true){
                    leavingDatePicker.style.display = "none"
                    comingDatePicker.style.display = "none"
                }

            } else {
                // pass
            }
        },
        openCalender: function(className, data, e) {
            
            console.log(className, data)
            if (className == ".comingDate") {
                const comingDatePicker = document.querySelector(".comingDate")
                const roundTrip = document.querySelector("input")
                this.comingDate = new Date().toISOString().substr(0, 10)
                roundTrip.checked = true
            }

            const leavingDataPicker = document.querySelector(data)
            leavingDataPicker.style.display = "block"
            leavingDataPicker.style.zIndex = "1005"
            this.datePickerFlag[className] = true
            
        },
        oneWayTrip: function() {
            const comingDatePicker = document.querySelector(".comingDate")
            const comingDateText   = document.querySelector('.comingDateText')
            comingDatePicker.placeholder = "(편도)"
            comingDatePicker.value = ""
            comingDateText.style.color = "grey"
            this.comingDate = '' 
            
        },
    },
    watch: {
        departureInput: function(userInput) {

            const countryList = document.querySelector(".dep-country-list")
            const triangle    = document.querySelector(".dep-triangle-box")
            countryList.style.display = "block"
            countryList.style.position = "absolute"
            countryList.style.zIndex = "1000"
            triangle.style.display = 'block'
        },
        destinationInput: function(userInput) {

            const countryList = document.querySelector(".dst-country-list")
            const triangle    = document.querySelector(".dst-triangle-box")
            countryList.style.display = "block"
            countryList.style.position = "absolute"
            countryList.style.zIndex = "1000"
            triangle.style.display = 'block'
        }
    }
} 
</script>