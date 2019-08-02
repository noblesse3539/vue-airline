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
                                <input
                                    type="text"
                                    placeholder="국가, 도시 또는 공항"
                                    class="left-end-input"
                                    v-model="departureInput"
                                    @input="departureInput = $event.target.value"
                                    @keyup="getDepartureOutput"
                                    @keydown.up="onArrowUp('departure')"
                                    @keydown.down="onArrowDown('departure')"
                                    @keydown.enter="onEnter('departure')"
                                >
                                <div class="searchListWrapper" v-show="isOpen">
                                    <div class="dep-triangle-box">
                                            <div class="country-triangle"></div>
                                    </div>
                                    <div class="dep-country-list">
                                        <div v-for="(airport, id) in departureOutput.slice(0, 10)"
                                            :key="id"
                                            class="country-name"
                                            :class="{ 'is-active' : id === departureArrowCounter }"
                                        >
                                            <!-- 출발지 검색 리스트 -->
                                            <div
                                                @click="saveUserChoiceAirport(`${airport.code}`, `${airport.name_kor}`, 'departure')"
                                                style="color: black; font-size: 3rem;"
                                            >
                                                <div class="airportList">
                                                    <div class="airport-name">
                                                        <i class="fas fa-plane-departure"></i>
                                                        {{airport.name_kor}} {{airport.code}}<br>
                                                        <span class="nation-name">{{airport.nation_kor}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div class="destination">
                            <label> 도착지
                                <input
                                    type="text"
                                    v-model="destinationInput"
                                    placeholder="국가, 도시 또는 공항"
                                    class="cancelBorder"
                                    @input="destinationInput = $event.target.value"
                                    @keyup="getDestinationOutput"
                                    @keydown.up="onArrowUp('destination')"
                                    @keydown.down="onArrowDown('destination')"
                                    @keydown.enter="onEnter('destination')"
                                >
                                <div class="searchListWrapper-dst">
                                    <div class="dst-triangle-box">
                                            <div class="country-triangle"></div>
                                    </div>
                                    <div class="dst-country-list">
                                        <div v-for="(airport, id) in destinationOutput.slice(0, 10)"
                                            :key="id"
                                            class="country-name"
                                            :class="{ 'is-active' : id === destinationArrowCounter }"
                                        >
                                            <!-- 도착지 검색 리스트 -->
                                            <div @click="saveUserChoiceAirport(`${airport.code}`, `${airport.name_kor}`, 'destination')" style="color: black; font-size: 3rem;">
                                                <div class="airportList">
                                                    <div class="airport-name">
                                                        <i class="fas fa-plane-departure"></i>
                                                        {{airport.name_kor}} {{airport.code}}<br>
                                                        <span class="nation-name">{{airport.nation_kor}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div class="duration-start" @click="openCalender('.leavingDate', '.leavingDate-picker')">
                            <label> 가는날
                                <input  class="leavingDate" type="text" :placeholder="todayDate" :value="leavingDate" disabled>
                                <div class="leavingDate-picker">
                                    <v-date-picker :min="minDate" locale="ko-KR"  v-model="leavingDate" :reactive="reactive" color="#45CE30"></v-date-picker>
                                </div>
                            </label>
                        </div>
                        <div class="duration-end" @click="openCalender('.comingDate', '.comingDate-picker')">
                            <label class="comingDateText"> 오는날
                                <input class="comingDate" type="text" placeholder="" :value="comingDate" disabled>
                                <div class="comingDate-picker">
                                    <v-date-picker :min="minComingDate" locale="ko-KR" v-model="comingDate" :reactive="reactive" color="#45CE30"></v-date-picker>
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
                                        <!-- 성인 인원수 -->
                                        <p class="noOfAdults">성인</p>
                                        <v-btn class="decreaseAdults" @click="decreaseAdults" fab dark color="rgba(47, 220, 62, 1)">
                                            <v-icon dark>remove</v-icon>
                                        </v-btn>
                                        <span class="adultsCount">{{adults}}</span>
                                        <v-btn class="increaseAdults" @click="increaseAdults" fab dark color="rgba(47, 230, 62, 1)">
                                            <v-icon dark>add</v-icon>
                                        </v-btn>
                                        <!-- 유/소아 인원수 -->
                                        <p class="noOfInfants">유/소아</p>
                                        <v-btn class="decreaseInfants" @click="decreaseInfants" fab dark color="rgba(47, 220, 62, 1)">
                                            <v-icon dark>remove</v-icon>
                                        </v-btn>
                                        <span class="infantsCount">{{infants}}</span>
                                        <v-btn class="increaseInfants" @click="increaseInfants" fab dark color="rgba(47, 230, 62, 1)">
                                            <v-icon dark>add</v-icon>
                                        </v-btn>
                                        <br>
                                        <span class="confirm">여행 시 탑승객의 나이는 예약된 연령 범주에 부합해야 합니다. 항공사는 만 18세 미만의 단독 여행 탑승객에 대한 제한이 있습니다.
                                        <br><br>유/소아 동반 여행 시 연령 제한과 정책은 항공사별로 다를 수 있으니 예약하기 전에 해당 항공사와 확인하시기 바랍니다.</span>
                                    </div>
                                    <hr style="width: 100%; border: 0.5px solid grey;">
                                    <p class="classSubmit" @click="focusOnSubmit">완료</p>
                                </div>
                            </label>
                            <div class="flight-search-submit">
                                <button class="flight-search-submitBtn" type="submit"
                                    @click="goToUrl()">항공권 검색                       
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import airportList from './AirportList'
import './FlightSearch.css'
import Autocomplete from './Autocomplete'

export default {
    name: 'FlightSearch',
    components: {
        Autocomplete,
    },
    data() {
        return {

            RadioLabels: ["왕복", "편도", ],
            classes: ['Economy', 'Business', 'First'],

            isOpen : false,

            // 전체 DB 내 공항 리스트
            airportList: airportList,

            // 출발지 및 도착지 관련 변수
            departureInput: '',
            destinationInput: '',
            departureOutput: [],
            destinationOutput: [],

            // 출발지 및 도착지 검색 리스트에서 사용할 arrow key 관련 변수
            departureArrowCounter: -1,
            destinationArrowCounter: -1,

            // 항공권 검색에 사용할 6가지 데이터
            departure: '',
            destination: '',
            leavingDate: new Date().toISOString().substr(0, 10),
            comingDate: new Date().toISOString().substr(0, 10),
            flightClass: 'Economy',
            adults: 1,
            infants: 0,

            // data picker 관련 데이터
            todayDate: new Date(),
            reactive: true,
            datePickerFlag: {
                '.leavingDate': false,
                '.comingDate': false,
            },
            minDate: new Date().toISOString().substr(0, 10),
            // comingMinDate: ,
            isDateWeird: function() {
                return minDate > comingDate? true : false
            },
        }
    },
    created() {
        // this.getAirportList()
    },
    mounted() {
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
        document.body.addEventListener('keyup', this.showSearchResult)
    },
    destroyed() {
        document.body.removeEventListener("click",  this.hideSearchResult)
    },
    methods: {

        // 항공권 리스트로 데이터 넘겨주기 (IMPORTANT)
        goToUrl : function() {
            const query = {}
            query.departure = this.departure // ICN
            query.destination = this.destination // NRT
            query.leavingDate = this.leavingDate
            query.comingDate  = this.comingDate
            query.flightClass = this.flightClass
            query.adults = this.adults
            query.infants = this.infants
            query.departureInput = this.departureINput
            query.destinationInput = this.destinationInput

            this.$router.push({name: "FlightListPage", query: query})

        },
        showSearchResult : function(e) {
            const leftInput = document.querySelector('.searchListWrapper')
            const rightInput = document.querySelector('.searchListWrapper-dst')

            console.log(e.target.classList[0])
            // left-end-input
            if (e.key !== 'Enter' && e.target.classList[0] === 'left-end-input') {
                leftInput.style.display = "block"
            } else if (e.key !== 'Enter' && e.target.classList[0] === 'right-end-input') {
                rightInput.style.display = "block"
            }
        },
        hideSearchResult : function(e) {

            const leavingDatePicker = document.querySelector('.leavingDate-picker')
            const comingDatePicker = document.querySelector('.comingDate-picker')
            const psgTriangleBox = document.querySelector(".psg-triangle-box")
            const psgaAdultsPicker = document.querySelector(".psg-adults-picker")
            const flightSearchBtn = document.querySelector(".flight-search-submit")
            // const vBtn = document.query(".v-btn")

            // 인원 수 고를 때 제출 숨긴 버튼 다시 보이게 하기
            // console.log(flightSearchBtn.style.display)

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
                && e.target.classList[0] !== 'className'
                && e.target.classList[0] !== 'vBtn'
                ) {
                flightSearchBtn.style.display = "block"
                psgTriangleBox.style.display = "none"
                psgaAdultsPicker.style.display = "none"

            }
        },

        // future task)
        // 검색 결과물 중 상위 10개 항목만 보여주므로 인덱스가 11개 이상 넘어갔을 때 처리해줘야합니다.
        onArrowDown(travelType) {

            if (travelType == 'departure') {
                if (this.departureArrowCounter < this.departureOutput.length) {
                    this.departureArrowCounter += 1
                }
            } else {
                if (this.destinationArrowCounter < this.destinationOutput.length) {
                    this.destinationArrowCounter += 1
                }
            }
        },
        onArrowUp(travelType) {
            
            if (travelType == 'departure') {
                if (this.departureArrowCounter > 0) {
                    this.departureArrowCounter --
                }
            } else {
                if (this.destinationArrowCounter > 0) {
                    this.destinationArrowCounter --
                }
            }
        },
        onEnter(travelType) {


            const leftInput = document.querySelector('.searchListWrapper')
            const rightInput = document.querySelector('.searchListWrapper-dst')

            if (travelType == 'departure') {
                this.saveUserChoiceAirport(this.departureOutput[this.departureArrowCounter].code,
                                           this.departureOutput[this.departureArrowCounter].name_kor,
                                           "departure")
                leftInput.style.display = "none"
            } else {
                this.saveUserChoiceAirport(this.destinationOutput[this.destinationArrowCounter].code,
                                           this.destinationOutput[this.destinationArrowCounter].name_kor,
                                           "destination")
                rightInput.style.display = "none"
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
            const passengers = document.querySelector('.passengers')
            psgTriangleBox.style.display = "block"
            psgTriangleBox.style.zIndex = "1010"
            psgaAdultsPicker.style.display = "block"
            psgaAdultsPicker.style.zIndex = "1010"
            flightSearchBtn.style.display = "none"
            passengers.scrollIntoView({'behavior' : 'smooth'})

        },
        oneWayTrip: function() {
            const comingDatePicker = document.querySelector(".comingDate")
            const comingDateText   = document.querySelector('.comingDateText')
            comingDatePicker.placeholder = "(편도)"
            comingDatePicker.value = ""
            comingDateText.style.color = "white"
            this.comingDate = ''
            
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

            if (this.adults != 1 ){
                this.adults -= 1
            }
        },
        increaseInfants: function() {
            if (this.infants <= 7) {
                this.infants += 1
            }
        },
        decreaseInfants: function() {
            if (this.infants != 1) {
                this.infants -= 1
            }
        },

        getDepartureOutput() {
            this.isOpen = true

            this.DepartureAirportAutoCompleteSearch()
        },
        getDestinationOutput() {
            this.DestinationAirportAutoCompleteSearch()
        },
        saveUserChoiceAirport: function(userChoiceAirport, airportName, travelType) {

            const airportNameSplit = airportName.replace(/\s/g, '');

            if (travelType == "departure") {
                this.departure = userChoiceAirport
                this.departureInput = `${airportNameSplit}, ${this.departure}`
            } else {
                this.destination = userChoiceAirport
                this.destinationInput = `${airportNameSplit}, ${this.destination}`
            }
        },
        DepartureAirportAutoCompleteSearch() {
            this.departureOutput = this.airportList.filter( airport => {
                
                if ( airport.name_kor.includes(this.departureInput)
                    || airport.name_eng.toLowerCase().match(this.departureInput.toLowerCase())
                    || airport.nation_kor.includes(this.departureInput)
                    || airport.city_kor.toLowerCase().includes(this.departureInput)
                    || airport.city_eng.toLowerCase().includes(this.departureInput.toLowerCase())
                    || airport.code.toLowerCase().includes(this.departureInput.toLowerCase())
                    ) {
                    return airport
                }
            })
            // console.log(this.departureOutput)
        },
        DestinationAirportAutoCompleteSearch() {
            this.destinationOutput = this.airportList.filter( airport => {
                if ( airport.name_kor.includes(this.destinationInput)
                    || airport.name_eng.toLowerCase().match(this.destinationInput.toLowerCase())
                    || airport.nation_kor.includes(this.destinationInput)
                    || airport.city_kor.includes(this.destinationInput)
                    || airport.city_eng.toLowerCase().includes(this.destinationInput.toLowerCase())
                    || airport.code.toLowerCase().includes(this.destinationInput.toLowerCase())
                    ) {
                    return airport
                }
            })
            //  console.log(this.destinationOutput)
        },
        focusOnSubmit() {

        },
    },
    // 공항 출발지 및 도착지 Autocomplete 방식으로 검색
    computed: {
        minComingDate() {
            return this.leavingDate
        },
    },
    watch: {
        departureInput: function() {

            const leftInput = document.querySelector('.searchListWrapper')
            const countryList = document.querySelector(".dep-country-list")
            const triangle    = document.querySelector(".dep-triangle-box")
            countryList.style.display = "block"
            countryList.style.position = "absolute"
            countryList.style.zIndex = "1000"
            triangle.style.display = 'block'
            // this.getDepartureOutput()
            // this.departureOutput = this.airportDepartureSearch()
            // console.log(this.departureOutput)
        },
        destinationInput: function(userInput) {

            const countryList = document.querySelector(".dst-country-list")
            const triangle    = document.querySelector(".dst-triangle-box")
            countryList.style.display = "block"
            countryList.style.position = "absolute"
            countryList.style.zIndex = "1000"
            triangle.style.display = 'block'
            // this.getDestinationOutput()

        },
        adults: function() {
            const increaseAdults = document.body.querySelector(".increaseAdults")
            const decreaseAdults = document.body.querySelector(".decreaseAdults")

            if (this.adults >= 8) {
                // console.log(increaseAdults)
                increaseAdults.disabled = true
                increaseAdults.style.cursor = "not-allowed"
                increaseAdults.style.background = "grey"
                // decreaseAdults.style.cursor = "pointer"
                // decreaseAdults.style.background = "rgba(47, 250, 62, 1)"
            } else if ( this.adults > 1) {
                decreaseAdults.disabled = false
                decreaseAdults.style.cursor = "pointer"
                decreaseAdults.style.background = "rgba(47, 250, 62, 1)"
            } else if ( this.adults == 1) {
                decreaseAdults.style.background = "grey"
                increaseAdults.disabled = false
                increaseAdults.style.cursor = "pointer"
                increaseAdults.style.background = "rgba(47, 250, 62, 1)"
            } else {
                increaseAdults.disabled = false
                increaseAdults.style.cursor = "pointer"
                increaseAdults.style.background = "rgba(47, 250, 62, 1)"
                decreaseAdults.disabled = false
                decreaseAdults.style.curosr = "not-pointer"
                decreaseAdults.style.backgronud = "rgba(47, 250, 62, 1)"
            }
        },
        deep: true,
    }
}
</script>
