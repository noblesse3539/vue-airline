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
                                    <div>
                                        <p style="color: black; font-size: 3rem;">{{fakeDataResult}}</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div class="duration-start" @click="openCalender('.leavingDate', '.leavingDate-picker', e)">
                            <label> 가는날
                                <input  class="leavingDate" type="text" :placeholder="todayDate" :value="leavingDate" disabled>

                                <div class="leavingDate-picker"> 
                                    <v-date-picker  v-model="leavingDate" :reactive="reactive" color="#45CE30"></v-date-picker>
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
                        <div class="passengers" @click="openClassPicker('right-end-input')">
                            <label> 좌석 등급 및 승객
                                <input type="text" placeholder="" :value="`${adults} 승객, ${flightClass}`" class="right-end-input" disabled>
                                <div class="psg-triangle-box">
                                        <div class="psg-triangle"></div>
                                </div>
                                <div class="psg-adults-picker">
                                    <div class="psg-adults-picker-inside">
                                        <p class="className">좌석 등급</p>
                                        <v-flex xs12 sm12 d-flex>
                                            <v-select
                                            v-model="flightClass"
                                            :items="classes"
                                            :value="flightClass"
                                            :item-value="flightClass"
                                            dense
                                            light
                                            ></v-select>
                                        </v-flex>
                                        <p class="noOfAdults">성인</p>
                                        <v-btn @click="decreaseAdults" fab dark color="rgba(47, 220, 62, 1)">
                                            <v-icon dark>remove</v-icon>
                                        </v-btn>
                                        <span class="adultsCount">{{adults}}</span>
                                        <v-btn class="increaseAdults" @click="increaseAdults" fab dark color="rgba(47, 230, 62, 1)">
                                            <v-icon dark>add</v-icon>
                                        </v-btn>
                                        <span style="display: inline-block; height: 20px; margin-top: 20px; margin-bottom: 20px;">만 16세 이상</span></br>
                                        <span class="confirm">여행 시 탑승객의 나이는 예약된 연령 범주에 부합해야 합니다. 항공사는 만 18세 미만의 단독 여행 탑승객에 대한 제한이 있습니다.
                                        유/소아 동반 여행 시 연령 제한과 정책은 항공사별로 다를 수 있으니 예약하기 전에 해당 항공사와 확인하시기 바랍니다.</span>
                                    </div>
                                    <hr style="width: 100%; border: 0.5px solid grey;">
                                    <p class="classSubmit">완료</p>
                                </div>
                            </label>
                            <div class="flight-search-submit">
                                <button class="flight-search-submitBtn" type="submit" @click="goToUrl(urls.airline)">항공권 검색</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import './FlightSearch.css'

// 테스트용 더미 데이터
import fakeData from './FakeData/fakeData.json'

export default {
    name: 'FlightSearch',
    data() {
        return {
            
            fakeData : fakeData,
            fakeDataResult: '',

            RadioLabels: ["왕복", "편도", "다구간"],
            urls: {
                'airline' : '/airlineDetail'
            },
            classes: ['Economy', 'Business', 'First'],
            // 항공권 검색에 사용할 6가지 데이터
            departureInput: '',
            destinationInput: '',
            leavingDate: new Date().toISOString().substr(0, 10),
            comingDate: new Date().toISOString().substr(0, 10),
            flightClass: 'Economy',
            adults: 1,

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
        const radioBtnOneWay = document.querySelectorAll('.radio-container')[1].children[0]
        radioBtnOneWay.addEventListener('click', this.oneWayTrip)

        // 왕복 버튼 클릭시 <오는날> 버튼 활성화 및 현재 날짜로 되돌리기
        const radioBtnRoundTrip = document.querySelectorAll('.radio-container')[0].children[0]
        radioBtnRoundTrip.addEventListener('click', this.roundTrip)

        // 검색창 바깥 부분 클릭 시 출발지 및 도착지 검색 모달 숨기기
        document.body.addEventListener("click",  this.hideSearchResult)
        document.body.addEventListener("tap", this.hideSearchResult)
        document.body.addEventListener("keydown", this.hideSearchResult)

        console.log(fakeData)
    },
    methods: {
        goToUrl : function(url) {
            
            this.$router.push(url)
        },
        hideSearchResult : function(e) {
            
            const leavingDatePicker = document.querySelector('.leavingDate-picker')
            const comingDatePicker = document.querySelector('.comingDate-picker')
            const psgTriangleBox = document.querySelector(".psg-triangle-box")
            const psgaAdultsPicker = document.querySelector(".psg-adults-picker")
            const flightSearchBtn = document.querySelector(".flight-search-submit")
            
            // 인원 수 고를 때 제출 숨긴 버튼 다시 보이게 하기
            console.log(flightSearchBtn.style.display)

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

            }

            if (e.target.classList[0] !== 'flight-search-submitBtn' 
                && e.target.classList[0] !== 'right-end-input'
                && e.target.classList[0] !== 'psg-adults-picker'
                && e.target.classList[0] !== 'psg-adults-picker-inside'
                && e.target.classList[0] !== 'v-messages'
                && e.target.classList[0] !== 'v-input__control'
                && e.target.classList[0] !== 'v-select__selections'
                && e.target.classList[0] !== 'v-input__slot'
                && e.target.classList[0] !== 'v-input__icon'
                && e.target.classList[0] !== 'v-icon'
                && e.target.classList[0] !== 'container'
                && e.target.classList[0] !== 'className') {
                flightSearchBtn.style.display = "block"
                psgTriangleBox.style.display = "none"
                psgaAdultsPicker.style.display = "none"

            }
        },
        openCalender: function(className, data, e) {
            
            if (className == ".comingDate") {
                const comingDatePicker = document.querySelector(".comingDate")
                const roundTrip = document.querySelector("input")
                // this.comingDate = new Date().toISOString().substr(0, 10)
                roundTrip.checked = true
                
            }

            const leavingDataPicker = document.querySelector(data)
            leavingDataPicker.style.display = "block"
            leavingDataPicker.style.zIndex = "1005"
            this.datePickerFlag[className] = true
            
        },
        openClassPicker: function() {
            const psgTriangleBox = document.querySelector(".psg-triangle-box")
            const psgaAdultsPicker = document.querySelector(".psg-adults-picker")
            const flightSearchBtn = document.querySelector(".flight-search-submit")
            psgTriangleBox.style.display = "block"
            psgTriangleBox.style.zIndex = "1010"            
            psgaAdultsPicker.style.display = "block"
            psgaAdultsPicker.style.zIndex = "1010"
            flightSearchBtn.style.display = "none"

        },
        oneWayTrip: function() {
            const comingDatePicker = document.querySelector(".comingDate")
            const comingDateText   = document.querySelector('.comingDateText')
            comingDatePicker.placeholder = "(편도)"
            comingDatePicker.value = ""
            comingDateText.style.color = "white"
            
        },
        roundTrip: function() {
            const comingDatePicker = document.querySelector(".comingDate")
            const comingDateText   = document.querySelector('.comingDateText')
            comingDatePicker.placeholder = new Date().toISOString().substr(0, 10)
            // this.comingDate = comingDatePicker.placeholder
            comingDatePicker.value = this.comingDate
            // comingDatePicker.style.color = "grey"
            comingDateText.style.color = "white"
        },
        increaseAdults: function() {
            this.adults += 1
        },
        decreaseAdults: function() {
            this.adults -= 1
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

            console.log(this.fakeDataResult)
            this.fakeDataResult = userInput

        },
        destinationInput: function(userInput) {

            const countryList = document.querySelector(".dst-country-list")
            const triangle    = document.querySelector(".dst-triangle-box")
            countryList.style.display = "block"
            countryList.style.position = "absolute"
            countryList.style.zIndex = "1000"
            triangle.style.display = 'block'

            // this.fakeDataResult = userInput
            let airport = ''
            console.log(this.fakeData["flights"][userInput])
            if (this.fakeData["flights"][userInput]) {
                airport = this.fakeData["flights"][userInput][0]["seoul"].values()
                const result = `${airport}`
                this.fakeDataResult = result
            }

        },
        adults: function() {
            const increaseAdults = document.body.querySelector(".increaseAdults")
            if (this.adults >= 8) {
                console.log(increaseAdults)
                increaseAdults.disabled = true
                increaseAdults.style.cursor = "not-allowed"
                increaseAdults.style.background = "grey"
            }
        },
        deep: true,
    }
} 
</script>