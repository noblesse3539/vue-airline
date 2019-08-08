<template>
    <FullCalendar 
        defaultView="dayGridMonth"
        :plugins="calendarPlugins" 
        :events="events"
        @eventClick="handleDateClick"
    />
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
    name: 'GuideCalendar',
    props: [
        'events'
    ],
    components: {
        FullCalendar,
        dayGridPlugin,
    },
    data: function(){
        return {
            calendarPlugins: [ dayGridPlugin ]
        }
    },
    methods: {
        handleDateClick(url) {
            alert(url)
        },
    },
}
</script>

<style >

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

</style>