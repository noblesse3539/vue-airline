<template>
    <div className="home">
        <FlightSearch></FlightSearch>
    </div>
</template>

<script>
import FlightSearch from '../components/FlightSearch'

export default {
    name: "Home",
    components: {
        FlightSearch
    },
}
</script>