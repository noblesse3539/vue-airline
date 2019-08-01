<template>
    <div class="guide-search">
        <div class="guide-search-hero"></div>
        <section class="guide-search-section">
            <div class="guide-search-userinput">
                <p class="guide-search-userinput-quote">Belong anywhere.</p>
                <input 
                    type="text" 
                    v-model="guideSearchInput"
                    :placeholder="defaultPlaceholder"
                    @input="guideSearchInput = $event.target.value"
                    @keyup="getGuideSearchOutput"
                    @keydown.up="onArrowUp()"
                    @keydown.down="onArrowDown()"
                    @keydown.enter="onEnter()"
                >

                <!-- 가이드 여행지 검색 결과 리스트 -->
                <div class="guide-search-result-wrapper" v-show="isOpen">
                    <div class="dep-triangle-box guide-search-triangle-box">
                        <div class="country-triangle guide-search-triangle"></div>
                    </div>
                    <div class="dep-country-list guide-search-list">
                        <div 
                            class="guide-search-result" 
                            v-for=" (location, id) in guideSearchOuput.slice(0, 4)"
                            :key="id"
                            :class="{ 'is-active-guide' : id === guideInputArrowCounter }"
                        >
                            <div 
                                class="guide-search-result-each"
                                @click="saveUserChoiceLocation(`${location.nation_kor}`, `${location.city_kor}`)"
                            >
                                <i class="fas fa-map-marker-alt" style="margin-right: 15px;"></i> 
                                <span>{{location.nation_kor}}</span> - {{location.city_kor}}
                            </div>
                        </div>
                    </div>
                </div>
                
                <button @click="goToUrl()" class="guide-search-submit">가이드 검색</button>

            </div>
        </section>
    </div>
</template>

<script>
import './GuideSearch.css'
import locationList from '../components/AirportList'

export default {
    name: 'GuideSearch',
    data() {
        return {
            locationList: locationList,
            guideSearchOuput: [],
            guideSearchInput: '',
            isOpen: false,

            defaultPlaceholder: '"어디로 떠나실건가요? 가고싶은 나라/도시 이름으로 가이드를 검색해보세요!"',
            userChoice : {},
            guideInputArrowCounter: 0,
        }
    },
    mounted() {
        document.body.addEventListener("click",  this.hideSearchResult)
    },
    destroyed() {
        document.body.addEventListener("click",  this.hideSearchResult)
    },
    methods: {
        goToUrl : function() {
            const params = {}
            params.city_kor = this.userChoice.city_kor // 도시이름
            params.nation_kor = this.userChoice.nation_kor // 국가이름
            console.log(params)

            this.$router.push({name: "GuideListPage", params: params, query: params})

        },
        hideSearchResult() {
            this.isOpen = false
        },
        getGuideSearchOutput: function(e) {
        
            if (e.key !== "Enter") {
                const searchListTri = document.querySelector(".guide-search-triangle-box")
                const searchList = document.querySelector(".guide-search-list")
                searchListTri.style.display = "block"
                searchList.style.display = "block"
            }

            this.isOpen = true
            this.guideSearchAutocomplete()
        },
        guideSearchAutocomplete() {
            this.guideSearchOuput = this.locationList.filter( location => {
                if ( location.name_kor.includes(this.guideSearchInput)
                    || location.name_eng.toLowerCase().match(this.guideSearchInput.toLowerCase())
                    || location.nation_kor.includes(this.guideSearchInput)
                    || location.city_kor.toLowerCase().includes(this.guideSearchInput)
                    || location.city_eng.toLowerCase().includes(this.guideSearchInput.toLowerCase())
                    || location.code.toLowerCase().includes(this.guideSearchInput.toLowerCase())
                    ) {
                    return location
                }
            })
        },
        saveUserChoiceLocation(nationKor, cityKor) {

            const userInput = document.querySelector('.guide-search-result-each')

            this.userChoice.nation_kor = nationKor
            this.userChoice.city_kor   = cityKor
            this.defaultPlaceholder = nationKor
            this.guideSearchInput = `" ${nationKor} - ${cityKor} "`

        },
        onArrowDown() {

            if (this.guideInputArrowCounter < this.guideSearchOuput.length) {
                this.guideInputArrowCounter += 1
            }

        },
        onArrowUp() {

            if (this.guideInputArrowCounter > 0) {
                this.guideInputArrowCounter --
            }
        },
        onEnter() {
            
            const searchListTri = document.querySelector(".guide-search-triangle-box")
            const searchList = document.querySelector(".guide-search-list")

            this.saveUserChoiceLocation(this.guideSearchOuput[this.guideInputArrowCounter].nation_kor,
                                        this.guideSearchOuput[this.guideInputArrowCounter].city_kor)
            this.isOpen = false
            searchListTri.style.display = "none"
            searchList.style.display = "none"
        },
    },
    watch() {

    },
}
</script>