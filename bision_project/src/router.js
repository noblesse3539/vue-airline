import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Pandora from './views/Pandora/Pandora'

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
        {   // 1주차 프로젝트 요구사항 보존을 위한 경로입니다.
            path: '/pandora',
            name: 'Pandora',
            component: Pandora
        },
        // {
        //     path: '/mypage',
        //     name: 'Mypage',
        //     component: MyPage
        // },
        // {
        //     path: '/guidemypage',
        //     name: 'GuideMyPage',
        //     component: GuideMyPage
        // },
        // {
        //     path: '/login',
        //     name: 'Login',
        //     component: Login
        // },
        // {
        //     path: '/airlines',
        //     name: 'AirLinePage',
        //     component: AirLinePage
        // },
    ]
})
