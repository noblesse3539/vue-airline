<template>
    <div class="guidelistpage">
        <section class="result-roof">
            <div class="result-roof-background">
                <h1 style="margin: 0; margin-right: 20px; color: #f7f7f7;
                    text-shadow: 1px 2px 3px rgba(0,0,0,.2);">
                    {{country_kor}}
                </h1>
                <h2 style="margin: 0; color: white;
                    text-shadow: 1px 2px 3px rgba(0,0,0,.2);">
                    {{city_kor}}
                </h2>
            </div>
        </section>
        <section class="result-body bision-container">
            <div class="result-body-left">
                <!-- <div class="result-body__search-by-date">
                    <span class="result-body__search-by-date-icon">
                        <i class="far fa-calendar-check"></i>
                    </span> -->
                    <!-- <input placeholder="날짜별 검색" disabled class="result-body__search-by-date-input" type="text"> -->
                    <div @click="openCalender" class="result-body__search-by-date ">
                      <span class="result-body__search-by-date-icon" >
                        <i class="far fa-calendar-check"></i>
                      </span>
                      <input placeholder="날짜별 검색" disabled class="result-body__search-by-date-input" type="text" />
                      <div v-if="isCalenderOpen" class="GS-date-picker" @click="updateResult()">
                        <v-date-picker :min="minDate" locale="ko-KR"  v-model="leavingDate" :reactive="reactive" color="#45CE30"></v-date-picker>
                      </div>
                    </div>
                <!-- </div> -->
                <div class="result-body__search-by-tag">
                  <!-- 1안 -->
                  <!-- <div v-for="i in tags.length" :key="i">
                    <v-chip color="#5CE75C" text-color="white" @click="findTag('액티비티')">{{tags[i-1]}}</v-chip>
                  </div> -->

                  <!-- 2안 -->
                  <div v-for="i in tags.length" :key="i">
                    <v-chip color="#5CE75C" text-color="white" @click="findTag(tags[i-1])" v-if="selectedTags.indexOf(tags[i-1]) != -1">{{tags[i-1]}}</v-chip>
                    <v-chip color="#dcdcdc" text-color="black" @click="findTag(tags[i-1])" v-else>{{tags[i-1]}}</v-chip>
                  </div>
                    <!-- <input placeholder="# 태그별 검색" class="result-body__search-by-tag-search" type="text"> -->
                    <!-- <span class="result-body_search-by-tag-search-icon"><i class="fas fa-search"></i></span> -->
                </div>
                <div class="result-body__search-by-language">
                    <div class="result-body__search-by-lang-title">
                        <div>가이드 언어</div>
                        <div><i class="far fa-caret-square-up"></i></div>
                        <!-- On-off에 사용 -->
                        <!-- <i class="far fa-caret-square-down"></i> -->
                    </div>
                    <ul class="result-body__search-by-lang-body">
                        <li>
                            <v-checkbox
                                class="v-input-custom"
                                color="success"
                                width="20"
                                v-model="temp"
                                label="모든 언어"
                                value="allLang"
                                @change="disableAllVINput"
                            >
                          </v-checkbox>
                        </li>
                        <li v-for="(lang, idx) in langs" :key="idx">
                            <v-checkbox
                                class="v-input-custom"
                                color="success"
                                v-model="selected"
                                :label="lang[0]" :value="lang[1]"
                                :disabled="vInputDisabled"
                                @change="languageCheckbox"
                            >
                            </v-checkbox>
                        </li>
                    </ul>
                </div>
                <div class="result-body__search-by-price">
                    <p class="result-body__search-by-price-title">금액 (KRW)</p>
                    <p class="result-body__search-by-price-price">{{price[0]}} ~ {{price[1]}}</p>
                    <div class="result-body__search-by-price-box">
                        <v-range-slider
                            v-model="price"
                            :min="minPrice"
                            :max="maxPrice"
                            thumb-color="white"
                            thumb-size="100"
                            @change="updateResult($event)"
                        ></v-range-slider>
                    </div>
                </div>
                <div class="result-body__search-by-period">
                    <p class="result-body__search-by-period-title">여행 기간</p>
                    <ul class="result-body__search-by-period-body">
                        <li v-for="(period, idx) in periodList" :key="idx">
                            <v-checkbox
                                v-model="duration"
                                class="v-input-custom"
                                color="success"
                                :label="period[0]" :value="idx"
                                @change="updateResult"
                            >
                            </v-checkbox>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="result-body-right">
                <div class="result-body__result-show">
                    <span style="color: rgb(34,139,34);">{{guideServiceList.length}}</span> 개 상품 검색 결과
                </div>
                <!-- <div class="result-body__result-show">
                  <v-chip color="#5CE75C" text-color="white">유람선</v-chip>
                  <v-chip color="#5CE75C" text-color="white">2019-08-13</v-chip>
                </div> -->
                <!-- 가이드 상품 검색 결과 -->
                <div class="result-body__result-list"
                    v-for=" (service, idx) in guideServiceList.slice( (page-1)*10, page*10)"
                    :key = idx
                    @click="goToDetail(idx + (page-1)*10)"
                >
                    <div class="result-body-card" :id="service._id">
                        <div class="result-body-card-imgbox">
                            <img :src="service.image"
                                alt="guide-tour-image"
                                class="result-body-card-img"
                                >
                        </div>
                        <div class="result-body-card-content">
                            <h1 class="result-body-card-title">
                                {{service.title.slice(0, 20)}} ...
                                <i @click="serviceLike(service.guideId)" class="far fa-heart guide-list-page-like-btn"></i>
                                <i class="fas fa-heart guide-list-page-like-btn-active" id="fas-`${idx}`"></i>
                            </h1>
                            <p class="result-body-card-detail">
                                {{service.detail.slice(0, 120)}} ...
                            </p>
                            <div style="display: flex; flex-direction: row;">
                              <p class="result-body-card-city" style="padding-right: 20px;">
                                  <i class="fas fa-map-marker-alt"></i> {{service.city[0]}} · {{service.city[1]}}
                              </p>
                              <p class="result-body-card-city">
                                  <!-- <i class="far fa-clock"></i> {{service.duration}} -->
                                  <i class="fas fa-hourglass-half"></i> {{service.duration}}
                              </p>
                            </div>
                            <p class="result-body-card-city">
                                <i class="far fa-calendar-alt"></i> {{service.fromDate}} - {{service.toDate}}
                            </p>
                            <div style="display: flex; flex-direction: row;">
                              <div v-for="i in service.tags.length" :key="i">
                                <v-chip color="#5CE75C" text-color="white">
                                  {{service.tags[i-1].tag}}
                                </v-chip>
                              </div>
                            </div>
                            <div class="result-body-card-bottom">
                                <p>
                                    <v-rating v-model="guideRating" size="5" dense></v-rating>
                                </p>
                                <p class="result-body-card-bottom-price">
                                    <span class="currency">KRW</span>
                                    <span class="cost" style="color: rgb(34,139,34); font-size: 1.74rem;">{{service.cost}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 가이드 상품 검색 결과 끝 -->
                <div class="result_boddy__pagination">
                    <v-pagination
                        v-model="page"
                        :length="guideServiceList.length % 10 == 0 ? guideServiceList.length / 10 : guideServiceList.length / 10 + 1"
                        color="rgb(34,139,34)"
                        >
                    </v-pagination>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import './GuideListPage.css'
import JSSoup from 'jssoup'
import GuideServiceDetailPage from './GuideServiceDetailPage'
export default {
    name: 'GuideListPage',
    components: {
        GuideServiceDetailPage,
    },
    mounted() {
        // this.getServiceAll()
        this.getServiceByKeyword()
    },
    data() {
        return {
            // 나라 및 도시
            country_kor: this.$route.query.nation_kor || "",
            city_kor: this.$route.query.city_kor || "",
            // 가이드 상품 리스트 관련
            page: 1,
            guideRating: 4,
            guideServiceList: [],
            fixedguideServiceList: [],
            // 가이드 상품 좋아요 관련
            // 가이드 언어별 검색
            langs: [
                    ["한국어", "KR"],
                    ["영어", "US"],
                    ["프랑스어", "FR"],
                    ["스페인어", "ES"],
                    ["일본어", "JP"],
                    ],
            vInputDisabled: false,
            // allLang: true,
            selected: [],
            temp: [],
            // 상품 가격별 검색
            minPrice: 1000000000,
            maxPrice: 0,
            price: [8350, 700000],
            // 여행 기간
            periodList: [
                            ['0시간 ~ 4시간', 14400], // 0 ~ 4시간
                            ['4시간 ~ 1일', 86400], // 4시간 ~ 1일
                            ['1일 ~ 2일', 172800], // 1일 ~ 2일
                            ['2일 이상', 172801]     // 2일 이상
                        ],
            duration: [0, 1, 2, 3],

            // 달력 관련 변수
            isCalenderOpen: false,
            leavingDate: '',

            // 태그 관련 변수
            tags: ['액티비티', '경치', '유람선', '박물관', '푸파', '힐링', '고성', '맛집', '전통음식', '공연'],
            selectedTags: [],
        }
    },
    methods: {
        disableAllVINput : function() {
            if (this.vInputDisabled == false) {
                this.vInputDisabled = true
                this.selected = ["KR", "US", "FR", "ES", "JP"]
                // this.updateResult()
            } else {
                this.vInputDisabled = false
                this.selected = []
                // this.updateResult()
            }
        },
        getServiceByKeyword: function() {
            const keyword = this.city_kor || this.nation_kor
            this.$http.get(`/api/guideservice/search/${keyword}`)
            .then( res=> {
                console.log(res.data)
                res.data.guideservices.forEach( eachService => {
                        let parsedDetail = new JSSoup(eachService.detail).text
                        const temp = {}
                        temp.title      = eachService.desc
                        temp.detail     = parsedDetail
                        temp.rawDetail  = eachService.detail
                        temp.image      = eachService.mainImg
                        temp.duration   = eachService.duration
                        temp.cost       = eachService.cost
                        temp.city       = eachService.city_kor
                        temp.serviceId  = eachService._id
                        temp.fromDate   = eachService.fromDate
                        temp.toDate     = eachService.toDate
                        temp.tags       = eachService.tags
                        temp.guideId    = eachService.user ? eachService.user._id : ''
                        this.guideServiceList.push(temp)
                        this.fixedguideServiceList.push(temp)
                        if (temp.cost > this.maxPrice) this.maxPrice = temp.cost
                        if (temp.cost < this.minPrice) this.minPrice = temp.cost
                    })
                    this.price[0] = this.minPrice
                    this.price[1] = this.maxPrice
            })
        },
        getServiceAll : function() {
            this.$http.get("/api/guideservice/findGSALL")
                .then( res => {
                    console.log(res.data)
                    res.data.forEach( eachService => {
                        let parsedDetail = new JSSoup(eachService.detail).text
                        const temp = {}
                        temp.title      = eachService.desc
                        temp.detail     = parsedDetail
                        temp.rawDetail  = eachService.detail
                        temp.image      = eachService.mainImg
                        temp.duration   = eachService.duration
                        temp.cost       = eachService.cost
                        temp.city       = eachService.city_kor
                        temp.guideId    = eachService.user ? eachService.user._id : ''
                        this.guideServiceList.push(temp)
                        this.fixedguideServiceList.push(temp)
                    })
                })
        },
        // 좋아요 POST 요청
        serviceLike : function(guideId) {
            // console.log(guideId)
        },
        goToDetail: function(serviceIdx) {
            const params = this.guideServiceList[serviceIdx]
            const query = {serviceId: this.guideServiceList[serviceIdx].serviceId}
            this.$router.push({ name: "GuideServiceDetailPage", params: params, query: query})
            // {name: "GuideListPage", params: params}
        },
        // 추가
        updateResult : function () {
          console.log(this.leavingDate)
          this.guideServiceList = []
          for (let i=0; i<this.fixedguideServiceList.length; i++) {
            for(let j=0; j<this.duration.length; j++) {
              if (this.duration[j] == 0) {
                if (this.fixedguideServiceList[i].cost <= this.price[1] && this.durationTransfer(this.fixedguideServiceList[i].duration) <= 14400) {
                  if (this.dateCalculate(this.leavingDate, this.fixedguideServiceList[i].fromDate, this.fixedguideServiceList[i].toDate) || !this.leavingDate) {
                    this.guideServiceList.push(this.fixedguideServiceList[i])
                  }
                }
              } else if (this.duration[j] == 1) {
                if (this.fixedguideServiceList[i].cost <= this.price[1] && this.durationTransfer(this.fixedguideServiceList[i].duration) >= 14401 && this.durationTransfer(this.fixedguideServiceList[i].duration) <= 86400) {
                  if (this.dateCalculate(this.leavingDate, this.fixedguideServiceList[i].fromDate, this.fixedguideServiceList[i].toDate) || !this.leavingDate) {
                    this.guideServiceList.push(this.fixedguideServiceList[i])
                  }
                }
              } else if (this.duration[j] == 2) {
                if (this.fixedguideServiceList[i].cost <= this.price[1] && this.durationTransfer(this.fixedguideServiceList[i].duration) >= 86401 && this.durationTransfer(this.fixedguideServiceList[i].duration) <= 172800) {
                  if (this.dateCalculate(this.leavingDate, this.fixedguideServiceList[i].fromDate, this.fixedguideServiceList[i].toDate) || !this.leavingDate) {
                    this.guideServiceList.push(this.fixedguideServiceList[i])
                  }
                }
              } else if (this.duration[j] == 3) {
                if (this.fixedguideServiceList[i].cost <= this.price[1] && this.durationTransfer(this.fixedguideServiceList[i].duration) >= 172801) {
                  if (this.dateCalculate(this.leavingDate, this.fixedguideServiceList[i].fromDate, this.fixedguideServiceList[i].toDate) || !this.leavingDate) {
                    this.guideServiceList.push(this.fixedguideServiceList[i])
                  }
                }
              }
            }
          }
        },
        durationTransfer : function (duration) {
          if (duration.indexOf('박') != -1) {
            return parseInt(duration.slice(duration.indexOf('박') + 1, duration.indexOf('일'))) * 86400
          } else {
            return parseInt(duration.slice(0, duration.indexOf('시'))) * 3600
          }
        },
        languageCheckbox : function () {
          this.guideServiceList = []
          console.log(this.selected)
          // for (let i=0; i<this.fixedguideServiceList.length; i++) {
          //   if (this.selected.indexOf(this.fixedguideServiceList[i].lang) != -1) {
          //     this.guideServiceList.push(this.this.fixedguideServiceList[i])
          //   }
          // }
        },
        openCalender : function() {
          if (this.isCalenderOpen == true) {
            this.isCalenderOpen = false
          } else {
            this.isCalenderOpen = true
          }
        },
        sum : function (idx) {
          let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
          let sum = 0
          for (let i=0; i<idx; i++) {
            sum += days[i]
          }
          return sum
        },
        dateCalculate : function (select, from, to) {
          select = parseInt(select.slice(0, 4)) * 365 + this.sum(parseInt(select.slice(5, 7))) + parseInt(select.slice(8, 10))
          from = parseInt(from.slice(0, 4)) * 365 + this.sum(parseInt(from.slice(5, 7))) + parseInt(from.slice(8, 10))
          to = parseInt(to.slice(0, 4)) * 365 + this.sum(parseInt(to.slice(5, 7))) + parseInt(to.slice(8, 10))
          if (select >= from && select <= to) return true
          return false
        },
        findTag : function (tag) {
          console.log("태그를 찾아라")
          console.log(tag)
          if (this.selectedTags.indexOf(tag) == -1) {
            this.selectedTags.push(tag)
          } else {
            this.selectedTags.splice(this.selectedTags.indexOf(tag),1)
          }
          console.log(this.selectedTags)
          // for (let i=0; i<this.fixedguideServiceList.length; i++) {
          //   for (let j=0; j<this.fixedguideServiceList[i].tags.length; j++) {
          //     if (this.fixedguideServiceList[i].tags[j].tag == tag) {
          //       this.guideServiceList.push(fixedguideServiceList[i])
          //     }
          //   }
          // }
        }
    },
}
</script>
