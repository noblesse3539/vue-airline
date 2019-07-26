<template>
    <div class="pay">
        <h1>PayApproval</h1>
        <PayBtn v-bind="serviceInfo"></PayBtn>
    </div>
</template>

<script>
import PayBtn from '../../components/kakaopaycpn/PayBtn'
export default {
    name: "PayApproval",
    components: {
        PayBtn,
    },
    data () {
        return {
            serviceInfo : {
                'itemName': '베이징상품',
                'quantity': 1,
                'totalAmount': 300000,
                'taxFreeAmount': 3000,
            }
        }
    }
}
</script>
<style>
    .pay {
        margin-top: 100px;
    }
</style>