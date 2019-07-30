<template>
    <div class="payApproval">
        
        <div class="payApproval-head">
            <div class="icon icon--order-success svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px">
                <g fill="none" stroke="#45CE30" stroke-width="2.8">
                <circle cx="36" cy="36" r="35" style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;"></circle>
                <path d="M17.417,37.778l9.93,9.909l25.444-25.393" style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px;"></path>
                </g>
                </svg>
            </div>
            <h1 style="margin: 0; display: inline-block;">결제가 완료되었습니다!</h1>
        </div>
        <p><span style="font-weight: 700; text-transform: capitalize;">
            {{getUsername}}</span>님의 메일로 예약하신 가이드 상품에 대한 상세 정보를 발송하였습니다.
        </p>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import PayBtn from '../../components/kakaopaycpn/PayBtn'
import './payApproval.css'

export default {
    name: "PayApproval",
    components: {
        PayBtn,
    },
    data () {
        return {
            serviceInfo : {
                'itemName': '베이징상품',
                'quantity': 1,
                'totalAmount': 300000,
                'taxFreeAmount': 3000,
            }
        }
    },
    mounted() {
        this.sendPaymentInto()
    },
    methods: {
        sendPaymentInto: function() {

            const baseUrl = 'api/kakaopay/sendemail'
            const data    = {_id: this.getUserId}
            this.$http.post(baseUrl, data)
                .then( res => {
                    console.log(res)
                })
        },
    },
    computed: { 
        ...mapState({
            getUsername: state => state.User.userName,
            getUserId  : state => state.User.userId
        })
    },
}
</script>
<style>
    .pay {
        margin-top: 100px;
    }
</style>