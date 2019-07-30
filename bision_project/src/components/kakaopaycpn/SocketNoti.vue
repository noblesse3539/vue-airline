<template>
    <button type = "button" name = "button" v-on:click="setNotification">
        Send Notification
    </button>
</template>
<script>
    import io from 'socket.io-client'

    export default {
        name: "SocketNoti",
        mounted () {
            this.initSocket()
        },
        methods: {

            initSocket() {
                const socket = io('http://localhost:3000')
                /**
                 * Set Default Socket For Show Notification
                 * @param {type} data
                 * @returns {undefined}
                 */
                socket.on('show_notification', (data) => {
                    this.showDesktopNotification(data.title, data.message, data.icon)

                })
                /**
                 * Check Browser Notification Permission
                 * @type window.Notification|Window.Notification|window.webkitNotification|Window.webkitNotification|Window.mozNotification|window.mozNotification
                 */
                const Notification = window.Notification || window.mozNotification || window.webkitNotification;
                Notification.requestPermission(function (permission) {

                });
            },

            /**
             * Set Notification Request
             * @type type
             */
            setNotification() {
                // this.showDesktopNotification('Lokesh', 'Desktop Notification..!', '/index.jpeg')
                this.sendNodeNotification('Lokesh', 'Browser Notification..!', '/index.jpeg')
            },

            /**
             * Request Browser Notification Permission 
             * @type Arguments
             */
            requestNotificationPermissions() {
                if (Notification.permission !== 'denied') {
                    Notification.requestPermission(function (permission) {

                    });
                }
            },

            /**
             * Show Desktop Notification If Notification Allow
             * @param {type} title
             * @param {type} message
             * @param {type} icon
             * @returns {undefined}
             */
            showDesktopNotification(message, body, icon, sound=null, timeout = 4000) {

                this.requestNotificationPermissions()
                const instance = new Notification(
                        message, {
                            body: body,
                            icon: icon,
                            sound: sound
                        }
                );
                instance.onclick = function () {
                    // Something to do
                };
                instance.onerror = function () {
                    // Something to do
                };
                instance.onshow = function () {
                    // Something to do
                };
                instance.onclose = function () {
                    // Something to do
                };
                if (sound)
                {
                    instance.sound
                }
                setTimeout(instance.close.bind(instance), timeout);
                return false;
            },

            /**
             * Send Node Notification
             * @param {type} title
             * @param {type} message
             * @param {type} icon
             * @returns {undefined}
             */
            sendNodeNotification(title, message, icon) {
                const socket = io('http://localhost:3000')
                socket.emit('new_notification', {
                    message: message,
                    title: title,
                    icon: icon,
                })
            },

        }
    }
    








</script>