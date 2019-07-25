<template>
    <div class="guidelistpage">
        <section class="result-roof">
            <div class="result-roof-background">
                <h1 style="margin: 0; margin-right: 20px; color: #f7f7f7;
                    text-shadow: 1px 2px 3px rgba(0,0,0,.2);">
                    한국
                </h1>
                <h2 style="margin: 0; color: white;
                    text-shadow: 1px 2px 3px rgba(0,0,0,.2);">
                    제주도
                </h2>
            </div>
        </section>
        <section class="result-body bision-container">
            <div class="result-body-left">
                <div class="result-body__search-by-date">
                    <span class="result-body__search-by-date-icon">
                        <i class="far fa-calendar-check"></i>
                    </span>
                    <input placeholder="날짜별 검색" disabled class="result-body__search-by-date-input" type="text">
                </div>
                <div class="result-body__search-by-tag">
                    <input placeholder="# 태그별 검색" class="result-body__search-by-tag-search" type="text">
                    <span class="result-body_search-by-tag-search-icon"><i class="fas fa-search"></i></span>
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
                                v-model="selected" 
                                label="모든 언어" 
                                value="allLang"
                                @click="disableAllVINput"
                            >
                            </v-checkbox> 
                        </li>
                        <li v-for="(lang, idx) in langs" :key=idx>
                            <v-checkbox 
                                class="v-input-custom" 
                                color="success" 
                                :label="lang[0]" :value="lang[1]"
                                :disabled="vInputDisabled"
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
                        ></v-range-slider>
                    </div>
                </div>
                <div class="result-body__search-by-period">
                    <p class="result-body__search-by-period-title">여행 기간</p>
                    <ul class="result-body__search-by-period-body">
                        <li v-for="(period, idx) in periodList" :key=idx>
                            <v-checkbox 
                                class="v-input-custom" 
                                color="success" 
                                :label="period[0]" :value="period[2]"
                                :disabled="vInputDisabled"
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
                <div class="result-body__result-list"
                    v-for=" (guideServce, idx) in 10"
                    :key = idx
                >

                    <!-- 가이드 상품 검색 결과 -->
                    <div class="result-body-card">
                        <div class="result-body-card-imgbox">
                            <img src="https://image.kkday.com/v2/image/get/h_650%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_9182/20160711072229_bNjCD/jpg" 
                                alt="guide-tour-image"
                                class="result-body-card-img"
                                >
                        </div>
                        <div class="result-body-card-content">
                            <h1 class="result-body-card-title">
                                타이틀
                            </h1>
                            <p class="result-body-card-detail">
                                Pellentesque habitant morbi tristique 
                                senectus et netus et malesuada fames ac turpis egestas. 
                                Vestibulum tortor quam, feugiat vitae, ultricies eget.
                            </p>
                            <p class="result-body-card-city">
                                <i class="fas fa-map-marker-alt"></i> city
                            </p>
                            <div class="result-body-card-bottom">
                                <p>
                                    <v-rating v-model="guideRating" size="5" dense></v-rating> 
                                </p>
                                <p class="result-body-card-bottom-price">KRW price</p>
                            </div>
                        </div>
                    </div>
                    <!-- 가이드 상품 검색 결과 끝 -->
                </div>
                <div class="result_boddy__pagination">
                    <v-pagination
                        v-model="page"
                        :length="6"
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

export default {
    name: 'GuideListPage',
    components: {

    },
    data() {
        return {
            guideServiceList: [],
            
            // 가이드 상품 리스트 관련
            page: 1,
            guideRating: 4,

            // 가이드 언어별 검색
            langs: [
                    ["한국어", "KR"], 
                    ["영어", "US"], 
                    ["프랑스어", "FR"], 
                    ["스페인어", "ES"], 
                    ["일본어", "JP"],
                    ],
            vInputDisabled: false,
            allLang: true,

            // 상품 각겨별 검색
            minPrice: 8350,
            maxPrice: 700000,
            price: [8350, 700000],

            // 여행 기간
            periodList: [
                            ['0시간 ~ 4시간', 14400], // 0 ~ 4시간
                            ['4시간 ~ 1일', 86400], // 4시간 ~ 1일
                            ['1일 ~ 2일', 172800], // 1일 ~ 2일
                            ['2일 이상', 172801]     // 2일 이상
                        ],
        }
    },
    methods: {
        disableAllVINput : function() {

            if (this.vInputDisabled == false) {
                this.vInputDisabled = true
            } else {
                this.vInputDisabled = false
            }
        },
        getServiceAll : function() {
            this.$http.get()
                .then( res => {

                })
        },
    },
    monuted: {
        
    },
}
</script>