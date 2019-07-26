<template>
    <div class="pay-btn">
        <img 
            src="../../assets/kakaopay/kakaopay/payment_icon_yellow_large.png"
            v-on:click="payment"
        />
    </div>
</template>

<script>
import payIcon from '../../assets/kakaopay/kakaopay/payment_icon_yellow_large.png'

export default {
    name: "PayBtn",
    components: {

    },
    props: [
        'itemName',
        'quantity',
        'totalAmount',
        'taxFreeAmount'
    ],
    methods: {
        payment() {
            const paymentURL = '/api/kakaopay'
            const data = {
                'item_name'         : this.itemName,
                'quantity'          : this.quantity,
                'total_amount'      : this.totalAmount,
                'tax_free_amount'   : this.taxFreeAmount
            }
            this.$http.post(paymentURL, data)
                .then( res => {
                    console.log(res)
                    window.location.href = res.data.next_redirect_pc_url
                })

        },
    }
}
</script>
<style>
    .pay-btn {

    }
</style>