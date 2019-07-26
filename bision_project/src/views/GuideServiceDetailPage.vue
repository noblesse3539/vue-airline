<template>
    <div class="GS-detail-page">
        <div class="GS-travel-route">{{thisPostInfo.city_kor[0]}} > {{thisPostInfo.city_kor[1]}}</div>
        <div class="GS-hero">
        </div>
        <section class="GS-body-1">
            <div class="GS-body-left">
                <div class="GS-guide-detail-content">
                    <div class="GS-guide-detail-title">
                        <div style="margin-right: 10px;">
                            {{thisPostInfo.title}}
                        </div>
                        <i class="far fa-heart"></i>
                        <!-- <i class="fas fa-heart guide-list-page-like-btn-active"></i> -->
                    </div>
                    <div class="GS-guide-detail-option">
                        <div class="GS-guide-duration GS-guide-detail-icon">
                            <i class="far fa-clock"></i> <span style="margin-left: 10px;">소요시간 100 시간</span> 
                        </div>
                        <div class="GS-guide-language GS-guide-detail-icon">
                            <i class="fas fa-language"></i> <span style="margin-left: 10px;">영어/프랑스어 가이드 언어</span> 
                        </div>
                        <div class="GS-guide-refund GS-guide-detail-icon">
                            <i class="fas fa-coins"></i> <span style="margin-left: 10px;">환불 규정</span> 
                        </div>
                    </div>
                    <div class="GS-guide-detail-description">
                        <div class="GS-guide-detail-simple-description">
                            <span>
                                {{thisPostInfo.desc}}
                            </span>
                        </div>
                        <div class="GS-guide-detail-best-review">
                            <h3>최고 평점 이용후기</h3> <a class="see-more-review" href="#">리뷰 더보기 <i class="fas fa-sign-in-alt"></i></a>
                        </div>
                        <div class="GS-guide-detail-best-review-content">
                            <div 
                                class="GS-guide-detail-best-review-user-img"
                                style="background: url('https://i.imgur.com/gB9Ooj4.jpg')"
                            >
                            </div>
                            <div class="GS-guide-detail-best-review-right">
                                <div class="text-center GS-guide-detail-best-review-right-inside">
                                    <v-rating v-model="rating" dense size="17.4"></v-rating>
                                    <div class="userinfo-used-this-service">
                                        <p class="userinfo-used-this-service-name">이빵글</p>
                                        <p class="userinfo-used-this-service-date">이용날짜</p>
                                    </div>
                                </div>
                                <div class="user-comment">
                                    어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘 
                                    어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘
                                    어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘
                                    어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 결제용 following side-bar -->
            <div class="GS-body-right">
                <div class="GS-payment-box">
                    <div class="GS-payment-price">KRW <span style="font-size: 3rem;">10,000</span></div>
                    <div class="GS-payment-choose-option">
                        <button class="GS-payment-decision-btn">결제하기</button>
                    </div>
                    <div class="GS-payment-detail-info">
                        <div class="GS-payment-detail-info-each">
                            <i class="fas fa-check-double" style="margin-right: 2px;"></i>
                            예약 즉시 이메일로 예약 정보가 발송됩니다!
                        </div>
                        <div class="GS-payment-detail-info-each">
                            <i class="far fa-check-circle" style="margin-right: 2px;"></i>
                            결제 전 환불 규정을 다시 한 번 확인해주세요!
                        </div>
                        <div class="GS-payment-detail-info-each">
                            <i class="far fa-check-circle" style="margin-right: 2px;"></i>
                            선택한 상품 옵션이 정확한지 확인해주세요!
                        </div>
                    </div>
                    <div class="GS-payment-current-info">
                        <div class="GS-payment-current-info-each">
                            <i class="fas fa-user-check"></i> 100명의 고객님이 예약한 상품입니다.
                        </div>
                        <div class="GS-payment-current-info-each">
                            평점: <v-rating class="serviceRating" v-model="rating" dense size="17.4"></v-rating>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 상품 결제 전 옵션 고르기-->
        <section class="GS-body-2">
        </section>

        <!-- 상품 소개 -->
        <section v-html="guideServiceUserWrote" class="GS-body-3">

        </section>
    </div>
</template>

<script>
import './GuideServiceDetailPage.css'

export default {
    name: "GuideServiceDetailPage",
    created() {
    },
    mounted() {
        window.addEventListener('scroll', this.dragDownSideBar)
        this.getServiceInformation()
    },
    data() {
        return {
            isSideBarSticky : false,
            guideServiceUserWrote: this.thisPostInfo.rawDetail || '',
            thisPostInfo: {},
        }
    },
    methods: {
        dragDownSideBar: function() {
            const scrollY = window.scrollY
            const sideBar = document.body.querySelector('.GS-payment-box')
            // console.log(scrollY)
            
            if (scrollY >= 500) {
                sideBar.classList.add('GS-sidebar-sticky')
                // sideBar.classList.remove('GS-payment-box')
                // console.log(sideBar.classList)

            } else {
                sideBar.classList.remove('GS-sidebar-sticky')
                // sideBar.classList.add('GS-payment-box')
            }
        },
        setHero: function() {
            const hero = document.querySelector(".GS-hero")
            hero.style.background = `url(${this.thisPostInfo.mainImg})` 
            hero.style.backgroundRepeat = "no-repeat"  
            hero.style.backgroundSize = "cover"
            hero.style.backgroundPosition = "50%"

        },
        getServiceInformation: function() {
            this.$http.get(`/api/guideservice/findGSById/${this.$route.query.serviceId}`)
                .then( res => {
                    // this.thisPostInfo.title = res.data.title
                    // this.thisPostInfo.city = res.data.city_kor
                    // this.thisPostInfo.image = res.data.mainImg
                    // this.thisPostInfo.duration = res.data.duration
                    // this.thisPostInfo.rawDetail = res.data.detail
                    // this.thisPostInfo.desc = res.data.desc
                    this.thisPostInfo = res.data
                })
                // .then(() => {
                //     this.setHero()
                // })
                // .catch( err => {
                //     console.log(err)
                // })
        },
    },
    computed: {

    },
}   
</script>