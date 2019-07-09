<template>
    <div className="home">
        <FlightSearch></FlightSearch>
        <Weather></Weather>
    </div>
</template>

<script>
import FlightSearch from '../components/FlightSearch'
import Weather from '../components/Weather'

export default {
    name: "Home",
    components: {
        FlightSearch,
        Weather,
    },
}
</script>