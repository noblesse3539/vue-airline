import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Pandora from './views/Pandora'

Vue.use(Router)

export default new Router({
    routes: [
        {   // 1주차 프로젝트 요구사항 보존을 위한 경로입니다.
            path: '/pandora',
            name: 'Pandora',
            component: Pandora
        },
            // -------------------------------------------
            // 2주차 시작
        {   
            // 메인 페이지 입니다.
            path: '/',
            name: 'Home',
            component: Home
        },
    ]
})
