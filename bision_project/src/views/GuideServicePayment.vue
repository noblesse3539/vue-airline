<template>
    <div class="GuideServicePayment">
        <!-- 로그인 시 보여줄 결제 버튼 -->
        <div class="GS-payment-left" v-if="getIsLoggedIn">
            <h1 class="GS-payment-left-title" style="margin: 0;">결제하기</h1>
            <div class="GS-payment-deco-bar"></div>
            <div class="GS-payment-means">
                <PayBtn v-bind="serviceInfo" class="kakako-payBtn"></PayBtn>
            </div>
        </div>
        <!-- 비로그인 시 띄워줄 로그인 유도 화면 -->
        <div class="GS-payment-left" v-else>
            <h1>로그인 후 예약 가능합니다.</h1>
            <GoogleLoginBtn></GoogleLoginBtn>
        </div>
        <div class="GS-payment-right">
            <div class="GS-payment-GSImage">
                <img class="GS-payment-GSImage-image" :src="serviceInfo.mainImg" alt="가이드 상품 메인 이미지"/>
            </div>
            <div class="GS-payment-GSTitle GS-payment-info-toCheck">
                {{serviceInfo.title}}
            </div>
            <div calss="GS-payment-GSOption GS-payment-info-toCheck" v-if="serviceInfo.options.length > 1">
                <div>
                    <h3>옵션</h3>
                    <span>{{serviceInfo.options[0]}}</span>
                </div>
            </div>
            <div class="GS-payment-GSDate GS-payment-info-toCheck">
                <h3>날짜</h3>
                {{serviceInfo.date}}
            </div>
            <div class="GS-payment-GSPrice GS-payment-info-toCheck">
                <h3>인원</h3>
                {{serviceInfo.people}} 명
            </div>
            <div class="GS-payment-GSTotalprice GS-payment-info-toCheck">
                <h3>총 금액</h3>
                KRW {{serviceInfo.totalAmount}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import './GuideServicePayment.css'
import PayBtn from "../components/kakaopaycpn/PayBtn";
import GoogleLoginBtn from '../components/googleOAuth/SignInBtn'

export default {
    name: 'GuideServicePayment',
    components: {
        PayBtn,
        GoogleLoginBtn,
    },
    data() {
        return {
            serviceInfo: {},
        }
    },
    mounted() {

        this.closeHeader()
        this.serviceInfo = this.$route.query
        console.log(this.serviceInfo)
        this.setServiceInfo(this.serviceInfo)
        this.addTempServiceInfo()
        // console.log(this.getServiceInfo)
    },
    updated() {
        this.closeGuideCheckBtn()
    },
    destroyed() {
        this.openHeader()
    },
    computed: {
        ...mapState({
            getServiceInfo: state => state.Guideservice.serviceInfo,
            getUserId     : state => state.User.userId,
            getIsLoggedIn : state => state.User.isLoggedIn
        }),
    },
    methods: {
        closeGuideCheckBtn() {
            const guideCheckBtn = document.querySelector(".login-boxbox")
            guideCheckBtn.style.display = "none"
        },
        closeHeader() {
            this.$store.commit("closeHeader")
        },
        openHeader() {
            this.$store.commit("openHeader")
        },
        setServiceInfo(serviceInfo) {
            this.$store.commit("setServiceInfo", {serviceInfo})
        },
        addTempServiceInfo(){
            const baseUrl = '/api/paymentstore/tmp/' + this.getUserId
            this.$http.post(baseUrl, { service: this.serviceInfo})
                .then( res => {
                    // console.log(res)
                })
        },
    },
}
</script>