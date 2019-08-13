<template>
    <div class="GuideServicePayment">
        <!-- 로그인 시 보여줄 결제 버튼 -->
        <div class="GS-payment-left" v-if="getIsLoggedIn">
            <h1 class="GS-payment-left-title" style="margin: 0;">결제하기</h1>
            <div class="GS-payment-deco-bar"></div>
            <div class="GS-payment-means">
                <PayBtn v-bind="serviceInfo" :serviceId="serviceInfo.serviceId" class="kakako-payBtn"></PayBtn>
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
            <!-- <div calss="GS-payment-GSOption GS-payment-info-toCheck" v-if="serviceInfo.options.length > 1"> -->
            <div class="GS-payment-GSOption GS-payment-info-toCheck">
                <h3>옵션</h3>
                <span>{{serviceInfo.itemName}}</span>
            </div>
            <div class="GS-payment-GSDate GS-payment-info-toCheck">
                <h3>날짜</h3>
                {{serviceInfo.date}}
            </div>
            <div class="GS-payment-GSPrice GS-payment-info-toCheck">
                <h3>인원</h3>
                <div class="">
                  {{serviceInfo.people}} 명
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on" style="margin-bottom: 5px;">(자세히)</v-icon>
                    </template>
                    <span>
                      <div v-if="serviceInfo.senior > 0">경로 : {{serviceInfo.senior}} 명</div>
                      <div v-if="serviceInfo.adult > 0">성인 : {{serviceInfo.adult}} 명</div>
                      <div v-if="serviceInfo.child > 0">아동 : {{serviceInfo.child}} 명</div>
                      <div v-if="serviceInfo.infant > 0">유아 : {{serviceInfo.infant}} 명</div>
                    </span>
                  </v-tooltip>
                </div>
            </div>
            <div class="GS-payment-GSTotalprice GS-payment-info-toCheck">
                <h3>총 금액</h3>
                KRW {{this.priceTransfer(serviceInfo.totalAmount)}}
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
        console.log('서비스인포', this.serviceInfo)
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
            this.$http.post(baseUrl, this.serviceInfo)
                .then( res => {
                    // console.log(res)
                })
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
}
</script>
