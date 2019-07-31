const express = require('express')
const router = express.Router()
const tmpPaymentStore = require('../../../models/tmpPaymentStore')
const PaymentStore = require('../../../models/paymentStore')
const mongoose = require('mongoose')

router.post('/tmp/:id', (req, res) => {
    const condition = { id: req.params.id, service: req.body.service}
    tmpPaymentStore.findOrCreate(condition, (err, tmpStore) => {
        if(err) res.json({error: err})
        res.json({stored: true})
    })
})

router.get('/tmp/:id', (req, res) => {
    tmpPaymentStore.findOne({id:req.params.id})
    .then( tmpStore => {
        res.json({tmpStore})
    })
    .catch( err => {
        res.json({error: '상품이 없습니다.'})
    })
})

router.delete('/tmp/:id', async (req, res) => {
    await tmpPaymentStore.findOneAndDelete({id:req.params.id})
    res.json({delete: true})
})


router.post('/real/:id', (req, res) => {
    const id = req.params.id
    const {service, status} = req.body
    PaymentStore.create({
        user: new mongoose.Types.ObjectId(id),
        service:service,
        status:status
    })
    .then( ps => {
        res.json({ps})
    })
    .catch( err => {
        res.json({error: err})
    })
})

module.exports = router