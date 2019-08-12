import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Pandora from './views/Pandora/Pandora'
import AirLineDetailPage from './views/AirLineDetailPage'
import LoginModal from './components/LoginModal'
import GuideMyPage from './views/GuideMyPage'
import MyPage from './views/MyPage'
import Admin from './views/Admin'
import FlightListPage from './views/FlightListPage'
import VuexTutorial from './views/VuexTutorial'
import GuideListPage from './views/GuideListPage'
import GuideServiceDetailPage from './views/GuideServiceDetailPage'
import GuideSearch from './views/GuideSearch'
import PayApproval from './views/kakaopay/PayApproval'
import payCancel from './views/kakaopay/payCancel'
import PayFail from './views/kakaopay/PayFail'
import GuideServicePayment from './views/GuideServicePayment'
import Chat from './components/Chat'
import Room from './components/Room'

Vue.use(Router)

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        // -------------------------------------------
        // 2주차 시작
        {
            // 메인 페이지 입니다.
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/guidesearch',
            name: 'GuideSearch',
            component: GuideSearch,
            props: true,
        },
        {   // 1주차 프로젝트 요구사항 보존을 위한 경로입니다.
            path: '/pandora',
            name: 'Pandora',
            component: Pandora
        },
        {
            path: '/user/:userid',
            name: 'Mypage',
            component: MyPage,
            props: true
        },
        {
            path: '/guide/:guideId',
            name: 'GuideMyPage',
            component: GuideMyPage,
            props: true
        },
        {
            path: '/guideListPage',
            name: 'GuideListPage',
            component: GuideListPage,
            props: true,
        },
        {
            path: '/guideServiceDetailPage',
            name: 'GuideServiceDetailPage',
            component: GuideServiceDetailPage,
            props: true,
        },
        {
            path: '/login',
            name: 'LoginModals',
            component: LoginModal
        },
        {
            path: '/airlineDetail',
            name: 'AirLineDetailPage',
            component: AirLineDetailPage,
        },
        {
            path: '/flightlist',
            name: 'FlightListPage',
            component: FlightListPage,
            props: true,
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        },
        {
            path: '/vuex',
            name: 'Vuex',
            component: VuexTutorial
        },
        {
            path: '/guideservicepayment',
            name: 'GuideServicPayment',
            component: GuideServicePayment,
            props: true
        },
        {
            path: '/payapproval',
            name: 'PayApproval',
            component: PayApproval
        },
        {
            path: '/paycancel',
            name: 'payCancel',
            component: payCancel
        },
        {
            path: '/payfail',
            name: 'PayFail',
            component: PayFail
        },
        {
            path: '/room',
            name: 'Room',
            component: Room,
            props:true
        },
        {
            path: '/room/:roomId',
            name: 'Chat',
            component: Chat,
            props:true
        },
    ]
})
