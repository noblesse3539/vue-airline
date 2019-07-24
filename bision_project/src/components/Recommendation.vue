<template>
    <div class="Recommendation">
        <h2>이번 휴가 여기는 어때요?</h2>
        <h3>2019년 7월 New York</h3>
    
        <div class="Recommended-city">
            <div class="city-left-sec">
                <div class="city-name">
                </div>
                <span class="city-name-text">
                    뉴욕, <span class="city-name-conutry">미국</span>
                </span>
                <span class="city-right-sec">
                    <Weather class="weatherBox"></Weather>
                </span>
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