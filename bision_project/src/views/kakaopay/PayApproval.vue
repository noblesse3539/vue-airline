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

        <div class="sharing-itineraries">
            <p class="sharing-itineraries-title">
                친구들에게 일정을 공유해보세요!
            </p>
            <a id="kakao-link-btn" @click="sendLink()">
                <img class="kakao-link-btn-img" src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"/>
            </a>
        </div>
        <!-- {{this.serviceInfo}} -->
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
            },
            userId: '',
            userName: this.getUsername,

            notification: window.Notification,
        }
    },
    mounted() {
        // this.sendPaymentInfo()
        this.getTempServiceInfo()
        // this.updateRealServiceInfo()
        // this.deleteTempServiceInfo()
    },
    updated() {
    },
    methods: {
        getTempServiceInfo() {

            const token = this.$getToken("BisionToken");
            const config = {
                headers: { "x-access-token": token }
            };

            this.$http
                .get("/api/auth/check", config)
                .then(res => {
                if (res.status == 200) {
                    this.userId = res.data.info._id
                    const baseUrl = "/api/paymentstore/tmp/" + this.userId  
                    this.$http.get(baseUrl)
                        .then( res => {
                            // console.log(res.data)
                            this.serviceInfo = res.data.tmpStore.service
                    })
                        .then( () => {
                            if (this.serviceInfo) {
                                this.updateRealServiceInfo()
                            }
                        })
                }
                })
                .catch(err => {
                console.log(err);
                });
        
        },
        updateRealServiceInfo() {
            const baseUrl = '/api/paymentstore/real/' + this.getUserId
            this.$http.post(baseUrl, {service: this.serviceInfo})
                .then( () => {
                    this.deleteTempServiceInfo()
                })
        },
        deleteTempServiceInfo() {
            const baseUrl = "/api/paymentstore/tmp/" + this.getUserId
            this.$http.delete(baseUrl)
                .then( res => {
                    // console.log(res)
                })
        },

        sendPaymentInfo: function() {
            
            const baseUrl = 'api/kakaopay/sendemail'
            const data    = {_id: this.getUserId}
            this.$http.post(baseUrl, data)
                .then( res => {
                    // console.log(res)
                })
        },
        setNotification() {

                if (!window.Notification) {
                    // console.log('This browser does not support desktop notification')
                } else if (window.Notification.permission === "granted") {
                    // If it's okay let's create a notification
                    this.notification = new window.Notification("예약이 완료되었습니다!");
                } else if (window.Notification.permission !== 'denied') {
                    window.Notification.requestPermission(function (permission) {
                        // If the user accepts, let's create a notification
                        if (permission === "granted") {
                            var notification = new Notification("예약이 완료되었습니다!");
                        }
                    });
            }
        },
        sendLink() {
                Kakao.Link.sendCustom({
                templateId: 17427,
                templateArgs: {
                'title': this.getUsername + '님의 두근두근 콩닥콩닥 여행 일정입니다.',
                'description': this.serviceInfo.title ? this.serviceInfo.title : '',
                'imageUrl' : this.serviceInfo.mainImg,
                }
            })
        }
    },
    computed: {
        ...mapState({
            getUsername: state => state.User.userName,
            getUserId  : state => state.User.userId,
            getServiceInfo: state => state.Guideservice.serviceInfo
        })
    },
}
</script>

<style>
    .pay {
        margin-top: 100px;
    }
</style>