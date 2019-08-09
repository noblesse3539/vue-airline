<template>
    <div className="home" style="height: 100%;">
        <FlightSearch></FlightSearch>
        <!-- <Recommendation></Recommendation> -->
        <Api></Api>
    </div>
</template>

<script>
import FlightSearch from '../components/FlightSearch'
// import Weather from '../components/Weather' 
import Api from '../components/Api'
import Recommendation from '../components/Recommendation'

export default {
    name: "Home",
    components: {
        FlightSearch,
        // Weather,
        Api,
        Recommendation,
    },
}
</script>

<style scoped>
    ::-webkit-scrollbar { 
        display: none !important; 
    }
</style>