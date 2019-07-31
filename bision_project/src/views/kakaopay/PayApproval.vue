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
        <a id="kakao-link-btn" @click="sendLink()">
            <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"/>
        </a>
        {{this.getServiceInfo}}
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
            },

            notification: window.Notification,
        }
    },
    mounted() {
        this.sendPaymentInfo()
        // this.setNotification()
        this.$store.subscribe( (mutation, state) => {
            console.log(state.Guideservice)
        })
    },
    updated() {
    },
    methods: {
        ...mapGetters({
            // getServiceInfo: 'getServiceInfo'
        }),
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
            Kakao.Link.sendDefault({
                objectType: 'list',
                headerTitle: 'WEEKLY MAGAZINE',
                headerLink: {
                mobileWebUrl: 'https://developers.kakao.com',
                webUrl: 'https://developers.kakao.com'
                },
                contents: [{
                title: '취미의 특징, 탁구',
                description: '스포츠',
                imageUrl: 'http://mud-kage.kakao.co.kr/dn/bDPMIb/btqgeoTRQvd/49BuF1gNo6UXkdbKecx600/kakaolink40_original.png',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
                }, {
                title: '크림으로 이해하는 커피이야기',
                description: '음식',
                imageUrl: 'http://mud-kage.kakao.co.kr/dn/QPeNt/btqgeSfSsCR/0QJIRuWTtkg4cYc57n8H80/kakaolink40_original.png',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
                }, {
                title: '감성이 가득한 분위기',
                description: '사진',
                imageUrl: 'http://mud-kage.kakao.co.kr/dn/c7MBX4/btqgeRgWhBy/ZMLnndJFAqyUAnqu4sQHS0/kakaolink40_original.png',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
                }],
                buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                    }
                },
                {
                    title: '앱으로 보기',
                    link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                    }
                }
                ]
            });
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