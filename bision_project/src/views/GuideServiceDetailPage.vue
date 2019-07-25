<template>
    <div class="GS-detail-page">
        <div class="GS-travel-route">서울 > 제주도</div>
        <div class="GS-hero">
            
        </div>
        <section class="GS-body-1">
            <div class="GS-body-left">
                
            </div>
            <!-- 결제용 following side-bar -->
            <div class="GS-body-right">
                <div class="GS-payment-box">
                    스티키스티키
                </div>
            </div>
        </section>
        <section class="GS-body-2">

        </section>
        <section class="GS-body-3">

        </section>
    </div>
</template>

<script>
import './GuideServiceDetailPage.css'

export default {
    name: "GuideServiceDetailPage",
    data() {
        return {
            isSideBarSticky : false
        }
    },
    created() {

    },
    mounted() {
        window.addEventListener('scroll', this.dragDownSideBar)
    },
    methods: {
        dragDownSideBar: function() {
            const scrollY = window.scrollY
            const sideBar = document.body.querySelector('.GS-payment-box')
            console.log(scrollY)
            
            if (scrollY >= 400) {
                sideBar.classList.add('GS-sidebar-sticky')
                // console.log(sideBar.classList)

            } else {
                sideBar.classList.remove('GS-sidebar-sticky')
            }
        },
    },
    computed: {

    },
}   
</script>