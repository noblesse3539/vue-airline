<template>
    <FullCalendar 
        defaultView="dayGridMonth"
        :plugins="calendarPlugins" 
        :events="events"
        themeSystem="minty"
        @eventClick="handleDateClick(events)"
        @eventRender="eventRender"
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
        handleDateClick(info) {
            console.log(info)
        },
    },
}
</script>

<style >

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

.fc-today {
    background: rgba(0, 171, 132, 0.5) !important;
}

.fc-day-number {
    font-weight: 700 !important;
}

.fc-today-button {
    background: rgba(30, 144, 255, 1) !important;
    height: 100% !important;
}

.fc-title {
    font-size: 1vw !important;
}

</style>