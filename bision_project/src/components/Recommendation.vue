<template>
    <div class="Recommendation">
        <h2>Bision 개발자의 추천 상품</h2>
        <h3>2019년 7월 New York</h3>

        <div class="Recommended-city">
            <div class="city-left-sec">
                <div class="city-name"> 
                </div>
                <span class="city-name-text">뉴욕, <span class="city-name-conutry">미국</span></span>
            </div>
            <div class="city-right-sec">
                <Weather></Weather>
            </div>
        </div>
        
    </div>
</template>

<script>
import './Recommendation.css'
import Weather from './Weather'

export default {
    name: 'Recommendation',
    components: {
        Weather,
    },
}
</script>