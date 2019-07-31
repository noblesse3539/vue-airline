<template>
    <button type = "button" name = "button" v-on:click="setNotification">
        Send Notification
    </button>
</template>
<script>

    export default {
        name: "Notification",
        data () {
            return {
                notification: window.Notification,
            }
        },
        mounted () {
            setNotification
        },
        methods: {
            setNotification() {
                if (!window.Notification) {
                    console.log('This browser does not support desktop notification')
                } else if (window.Notification.permission === "granted") {
                    // If it's okay let's create a notification
                    this.notification = new window.Notification("Hi there!");
                } else if (window.Notification.permission !== 'denied') {
                    window.Notification.requestPermission(function (permission) {
                        // If the user accepts, let's create a notification
                        if (permission === "granted") {
                            var notification = new Notification("Hi there!");
                        }
                    });
                }
            }
        }
    }
    








</script>