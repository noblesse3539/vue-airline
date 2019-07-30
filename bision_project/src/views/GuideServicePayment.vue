<template>
    <div class="GuideServicePayment">
        <div class="GS-payment-left">
            <h1 class="GS-payment-left-title" style="margin: 0;">결제하기</h1>
            <div class="GS-payment-deco-bar"></div>
            <div class="GS-payment-means">
                <PayBtn v-bind="serviceInfo" class="kakako-payBtn"></PayBtn>
            </div>
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
                {{serviceInfo.people}} {{serviceInfo.totalAmount}}
            </div>
            <div class="GS-payment-GSTotalprice GS-payment-info-toCheck">
                <h3>총 금액</h3>
                {{serviceInfo.totalAmount}}
            </div>
        </div>
    </div>
</template>

<script>
import './GuideServicePayment.css'
import PayBtn from "../components/kakaopaycpn/PayBtn";

export default {
    name: 'GuideServicePayment',
    components: {
        PayBtn,
    },
    data() {
        return {
            serviceInfo: {},
        }
    },
    mounted() {
        this.closeHeader()
        this.serviceInfo = this.$route.query
    },
    destroyed() {
        this.openHeader()
    },
    methods: {
        closeHeader() {
            this.$store.commit("closeHeader")
        },
        openHeader() {
            this.$store.commit("openHeader")
        },
    },
}
</script>