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
                      <div v-if="isCalenderOpen" class="GS-date-picker" @click="selectDate(leavingDate)">
                        <v-date-picker :min="minDate" locale="ko-KR"  v-model="leavingDate" :reactive="reactive" color="#45CE30" :allowed-dates="allowedDates"></v-date-picker>
                      </div>
                    </div>
                <!-- </div> -->
                <div class="result-body__search-by-tag">
                  <!-- 1안 -->
                  <!-- <div v-for="i in tags.length" :key="i">
                    <v-chip color="#5CE75C" text-color="white" @click="findTag('액티비티')">{{tags[i-1]}}</v-chip>
                  </div> -->
                  
                  <!-- 2안 -->
                  <div v-for="i in tags.length > 10 ? 10 : tags.length" :key="i">
                    <v-chip color="#5CE75C" text-color="white" style="font-weight: 300;" @click="selectTags(tags[i-1])" v-if="selectedTags.indexOf(tags[i-1]) != -1">{{tags[i-1]}}</v-chip>
                    <v-chip color="#EBEBEB" text-color="black" style="font-weight: 700;" @click="selectTags(tags[i-1])" v-else>{{tags[i-1]}}</v-chip>
                  </div>
                    <!-- <input placeholder="# 태그별 검색" class="result-body__search-by-tag-search" type="text"> -->
                    <!-- <span class="result-body_search-by-tag-search-icon"><i class="fas fa-search"></i></span> -->
                </div>
                <!-- <div class="result-body__search-by-language">
                    <div class="result-body__search-by-lang-title">
                        <div>가이드 언어</div>
                        <div><i class="far fa-caret-square-up"></i></div>
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
                </div> -->
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
                                @change="selectDuration(idx)"
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
                <div class="result-body__result-show" v-if="searchChips.length != 0">
                  <div v-for="i in searchChips.length" :key="i">
                    <v-chip class="guide-list-page-selected-chip">{{searchChips[i-1]}}<i class="fas fa-times-circle delete-chip" @click="deletechip(searchChips[i-1])"></i></v-chip>
                  </div>
                </div>
                <!-- 가이드 상품 검색 결과 -->
                <div class="result-body__result-list"
                    v-for=" (service, idx) in guideServiceList.slice( (page-1)*10, page*10)"
                    :key = idx
                    @click="goToDetail(idx + (page-1)*10, service.likeUsers.indexOf(getuserId), $event)"
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
                                <div v-if="service.title.length > 20">{{service.title.slice(0, 20)}} ...</div>
                                <div v-else>{{service.title.slice(0, 20)}}</div>
                                <div class="likeBtn-box" v-if="getIsGuide !== true">
                                  <i v-if="service.likeUsers.indexOf(getuserId) != -1" @click="serviceLike(service.serviceId, idx + (page-1)*10)" class="likeBtn fas fa-heart guide-list-page-like-btn-active" :id="`fas-heart-${idx}`"></i>
                                  <i v-else @click="serviceLike(service.serviceId, idx + (page-1)*10)" class="likeBtn far fa-heart guide-list-page-like-btn" :id="`fa-heart-${idx}`"></i>
                                </div>
                            </h1>
                            <p class="result-body-card-detail">
                                <div v-if="service.title.length > 120">{{service.desc.slice(0, 120)}} ...</div>
                                <div>{{service.desc.slice(0, 120)}}</div>
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
                                    <v-rating v-model="service.rateAvg" size="5" dense></v-rating>
                                </p>
                                <p class="result-body-card-bottom-price">
                                    <span class="currency">KRW</span>
                                    <span class="cost" style="color: rgb(34,139,34); font-size: 1.74rem;">{{priceTransfer(service.cost)}}</span>
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
import { mapState } from 'vuex'
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

            isLoaded : false,

            // 나라 및 도시
            country_kor: this.$route.query.nation_kor,
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
            duration: [],

            // 달력 관련 변수
            isCalenderOpen: false,
            leavingDate: '',
            leavingDates: [],

            // 태그 관련 변수
            tags: [],
            selectedTags: [],
            searchChips: [],
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
                console.log("데이터", res.data)
                res.data.guideservices.forEach( eachService => {
                        let parsedDetail = new JSSoup(eachService.detail).text
                        const temp = {}
                        temp.title      = eachService.title
                        temp.desc       = eachService.desc
                        temp.detail     = parsedDetail
                        temp.rawDetail  = eachService.detail
                        temp.image      = eachService.mainImg
                        temp.duration   = eachService.duration
                        temp.rateAvg    = eachService.rateAvg
                        if (eachService.options.length != 0) {
                          temp.cost = eachService.options[0].adult.cost
                        } else {
                          temp.cost = 0
                        }
                        // temp.cost       = eachService.options[0].adult.cost || 0
                        temp.city       = eachService.city_kor
                        temp.serviceId  = eachService._id
                        temp.fromDate   = eachService.fromDate
                        temp.toDate     = eachService.toDate
                        temp.tags       = eachService.tags
                        // temp.guideId    = eachService.guide
                        temp.likeUsers   = eachService.likeUsers || []

                        // this.guideServiceList.push(temp)
                        // this.fixedguideServiceList.push(temp)
                        //
                        // if (temp.cost > this.maxPrice) this.maxPrice = temp.cost
                        // if (temp.cost < this.minPrice) this.minPrice = temp.cost
                        // for (let i=0; i<eachService.tags.length; i++) {
                        //   if (this.tags.indexOf(eachService.tags[i].tag) == -1) {
                        //     this.tags.push(eachService.tags[i].tag)
                        //   }
                        // }
                        // console.log(this.dateCalculate(temp.toDate))
                        // console.log(this.dateCalculate(new Date().toISOString().substr(0, 10)))

                        if (this.dateCalculate(temp.toDate) >= this.dateCalculate(new Date().toISOString().substr(0, 10))) {                     
                          this.guideServiceList.push(temp)
                          this.fixedguideServiceList.push(temp)

                          if (temp.cost > this.maxPrice) this.maxPrice = temp.cost
                          if (temp.cost < this.minPrice) this.minPrice = temp.cost
                          for (let i=0; i<eachService.tags.length; i++) {
                            if (this.tags.indexOf(eachService.tags[i].tag) == -1) {
                              this.tags.push(eachService.tags[i].tag)
                            }
                          }
                        }
                    })
                    console.log(this.guideServiceList)
                    this.price[0] = this.minPrice
                    this.price[1] = this.maxPrice
                    this.isLoaded = true
                    console.log(this.guideServiceList)
            })
        },
        getServiceAll : function() {
            this.$http.get("/api/guideservice/findGSALL")
                .then( res => {
                    // console.log(res.data)
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
        serviceLike : function(serviceId, index) {

            let userId  = this.getuserId

            this.$http.post(`/api/guideservice/${serviceId}/${userId}`)
              .then( res => {
                return res.data.added
              })
              .then( added => {
                this.$http.get(`/api/guideservice/findGSById/${serviceId}`)
                  .then( res => {
                    // console.log(res.data.likeUsers)
                    this.guideServiceList[index].likeUsers = res.data.likeUsers
                    console.log(this.guideServiceList[index].likeUsers)
                  })
              })

        },
        goToDetail: function(serviceIdx, like, event) {
          // console.log(event.target)

            if (event.target.classList[0] != 'likeBtn') {

              const params = this.guideServiceList[serviceIdx]
              const query = {serviceId: this.guideServiceList[serviceIdx].serviceId,
                              like: like}
              this.$router.push({ name: "GuideServiceDetailPage", params: params, query: query})
            }
            // {name: "GuideListPage", params: params}
        },

        // 달력 허용 날짜
        allowedDates: function (val) {
          if (this.dateCalculate(val) >= this.dateCalculate(new Date().toISOString().substr(0, 10))) {
            if (this.leavingDates.indexOf(val) == -1) {
              return val
            }
          }
        },

        // 날짜 선택 시
        selectDate : function (leavingDate) {
          // console.log(leavingDate)
          if (this.leavingDates.indexOf(leavingDate) == -1) {
            this.leavingDates.push(leavingDate)
            this.updateResult(leavingDate)
            this.searchChips.push(leavingDate)
          }
          this.updateResult()
        },

        // 여행 기간 선택 시
        selectDuration : function (idx) {
          console.log(this.duration)
          if (this.duration.indexOf(idx) != -1) {
            this.searchChips.push(this.periodList[idx][0])
          } else {
            if (this.searchChips.indexOf(this.periodList[idx][0]) != -1) {
              this.searchChips.splice(this.searchChips.indexOf(this.periodList[idx][0]),1)
            }
          }
          this.updateResult()
        },

        //태그 선택 시
        selectTags : function (tag) {
          if (this.selectedTags.indexOf(tag) == -1) {
            this.selectedTags.push(tag)
            this.searchChips.push(tag)
          } else {
            this.selectedTags.splice(this.selectedTags.indexOf(tag),1)
            this.searchChips.splice(this.searchChips.indexOf(tag),1)
          }
          this.updateResult()
        },

        // 검색 칩 삭제
        deletechip (chip) {
          console.log("칩 삭제")
          this.searchChips.splice(this.searchChips.indexOf(chip),1)
          // 날짜 삭제
          if (isNaN(this.dateCalculate(chip)) == false) {
            this.leavingDates.splice(this.leavingDates.indexOf(chip),1)
            // 여행기간 삭제
          } else if (chip.indexOf("시간 ~") != -1 || chip.indexOf("일 ~") != -1 || chip.indexOf("일 이상") != -1) {
            for (let i=0; i<this.periodList.length; i++) {
              if (this.periodList[i][0] == chip) {
                this.duration.splice(this.duration.indexOf(i),1)
                break;
              }
            }
            // 태그 삭제
          } else {
            this.selectedTags.splice(this.selectedTags.indexOf(chip),1)
          }
          console.log(this.duration)
          this.updateResult()
        },

        // 결과리스트 업데이트
        updateResult : function () {
          this.guideServiceList = []
          let flag
          for (let i=0; i<this.fixedguideServiceList.length; i++) {

            // 날짜
            flag = false
            if (this.leavingDates.length == 0) {
              flag = true
            } else {
              for (let k=0; k<this.leavingDates.length; k++) {
                if (this.dateCompare(this.leavingDates[k], this.fixedguideServiceList[i].fromDate, this.fixedguideServiceList[i].toDate)) {
                  flag = true
                  break;
                }
              }
            }

            if (flag == false) continue;

            // 태그
            flag = false
            if (this.selectedTags.length == 0) {
              flag = true
            } else {
              for (let j=0; j<this.fixedguideServiceList[i].tags.length; j++) {
                for (let k=0; k<this.selectedTags.length; k++) {
                  if (this.fixedguideServiceList[i].tags[j].tag == this.selectedTags[k]) {
                    flag = true
                    break;
                  }
                }
                if (flag == true) break;
              }
            }

            if (flag == false) continue;

            // 가격
            flag = false
            if (this.fixedguideServiceList[i].cost <= this.price[1] && this.fixedguideServiceList[i].cost >= this.price[0]) flag = true
            if (flag == false) continue;

            // 여행 기간
            flag = false
            if (this.duration.length == 0) {
              flag = true
            } else {
              for (let j=0; j<this.duration.length; j++) {
                if (this.duration[j] == 0) {
                  if (this.durationTransfer(this.fixedguideServiceList[i].duration) <= 14400) {
                    flag = true
                  }
                } else if (this.duration[j] == 1) {
                  if (this.durationTransfer(this.fixedguideServiceList[i].duration) >= 14401 && this.durationTransfer(this.fixedguideServiceList[i].duration) <= 86400) {
                    flag = true
                  }
                } else if (this.duration[j] == 2) {
                  if (this.durationTransfer(this.fixedguideServiceList[i].duration) >= 86401 && this.durationTransfer(this.fixedguideServiceList[i].duration) <= 172800) {
                    flag = true
                  }
                } else if (this.duration[j] == 3) {
                  if (this.durationTransfer(this.fixedguideServiceList[i].duration) >= 172801) {
                    flag = true
                  }
                }
              }
            }

            if (flag == true) {
              this.guideServiceList.push(this.fixedguideServiceList[i])
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
        // languageCheckbox : function () {
        //   this.guideServiceList = []
        //   console.log(this.selected)
        //   for (let i=0; i<this.fixedguideServiceList.length; i++) {
        //     if (this.selected.indexOf(this.fixedguideServiceList[i].lang) != -1) {
        //       this.guideServiceList.push(this.this.fixedguideServiceList[i])
        //     }
        //   }
        // },
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
        dateCompare : function (select, from, to) {
          select = parseInt(select.slice(0, 4)) * 365 + this.sum(parseInt(select.slice(5, 7))) + parseInt(select.slice(8, 10))
          from = parseInt(from.slice(0, 4)) * 365 + this.sum(parseInt(from.slice(5, 7))) + parseInt(from.slice(8, 10))
          to = parseInt(to.slice(0, 4)) * 365 + this.sum(parseInt(to.slice(5, 7))) + parseInt(to.slice(8, 10))
          if (select >= from && select <= to) return true
          return false
        },
        dateCalculate : function (date) {
          return date = parseInt(date.slice(0, 4)) * 365 + this.sum(parseInt(date.slice(5, 7))) + parseInt(date.slice(8, 10))
        },
        priceTransfer: function (price) {
          price = price.toString()
          for (let i=0; i<price.length; i++) {
            if (price[i] == ".")
              price = price.slice(0,i)
          }
          let result = ''
          for (let i=0; i<price.length; i++) {
            if (i>0 && i%3 == 0)
              result += ","
            result += price[price.length-i-1]
          }
          let reverse = ''
          for (let i=result.length-1; i>=0; i--) {
            reverse += result[i]
          }
          return reverse
        },

    },
    computed: {
        ...mapState({
            getIsHeaderOpen : state => state.Header.isHeaderOpen,
            getIsLoggedIn : state => state.User.isLoggedIn,
            getuserId : state => state.User.userId,
            getUsername : state => state.User.userName,
            getIsGuide : state => state.User.isGuide,
        }),
    },
}
</script>
