<template>
    <div className="home">
        <FlightSearch></FlightSearch>
        <Weather></Weather>
        <Api></Api>
    </div>
</template>

<script>
import FlightSearch from '../components/FlightSearch'
import Weather from '../components/Weather' 
import Api from '../components/Api'

export default {
    name: "Home",
    components: {
        FlightSearch,
        Weather,
        Api,
    },
}
</script>