<template>
    <div class="pay-btn" v-on:click="payment">
        <!-- 결제하기 -->
        <img
            src="../../assets/kakaopay/kakaopay/payment_icon_yellow_large.png"
            v-on:click="payment"
        />
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import payIcon from '../../assets/kakaopay/kakaopay/payment_icon_yellow_large.png'

export default {
    name: "PayBtn",
    components: {

    },
    props: [
        'itemName',
        'quantity',
        'totalAmount',
        'taxFreeAmount',
        'title',
        'people'
    ],
    mounted() {

    },
    computed: {
        ...mapState({
            // getServiceInfo : state => state.Guideservice.serviceInfo
        }),
        ...mapGetters({
            getServiceInfo: 'getServiceInfo',
        })
    },
    methods: {
        payment() {
            const paymentURL = '/api/kakaopay'
            const data = {
                'item_name'         : this.title,
                'quantity'          : this.people,
                'total_amount'      : this.totalAmount,
                'tax_free_amount'   : parseInt(this.totalAmount*0.01),
                // 'item_name'         : 'hello',
                // 'quantity'          : 3,
                // 'total_amount'      : 10000,
                // 'tax_free_amount'   : 2000,
            }
            this.$http.post(paymentURL, data)
                .then( res => {
                    console.log(res.data)

                    console.log(res.data.next_redirect_pc_url)
                    console.log(this.getServiceInfo)
                    window.location.href = res.data.next_redirect_pc_url
                })
        },
        goToNext() {

        },
    }
}
</script>
<style>
    .pay-btn {
        text-align: center;
    }

    .pay-btn:hover {
        cursor: pointer;
    }
</style>
