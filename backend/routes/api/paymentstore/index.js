const express = require('express')
const router = express.Router()
const tmpPaymentStore = require('../../../models/tmpPaymentStore')
const PaymentStore = require('../../../models/paymentStore')
const mongoose = require('mongoose')
const Option = require('../../../models/option')
const GuideService = require('../../../models/guideservice')

router.post('/tmp/:id', (req, res) => {
    const service = req.body
    const condition = { id: req.params.id, service: service}
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
    const service = req.body
    Option.findById(service.options[0])
    .then( option => {
        // console.log(option.guideservice)
        GuideService.findById(option.guideservice)
        .then( gs => {
            PaymentStore.create({
                user: new mongoose.Types.ObjectId(id),
                guide: new mongoose.Types.ObjectId(gs.guide),
                service:service
            })
            .then( ps => {
                res.json({success: true, ps})
            })
            .catch( err => {
                res.json({error: err})
            })

        })
        .catch( err => {
            console.log(err)
            res.json({success:false})
        })
    })
    .catch( err => {
        console.log(err)
        res.json({success:false})
    })
})

router.get('/findByGuide/:guideId', (req, res) => {
    PaymentStore.find({guide: req.params.guideId})
    .then( payments => {
        res.status(200).json({success: true, payments})
    })
    .catch(err => {
        console.log(err)
        res.json({success: false})
    })
    
})

module.exports = router