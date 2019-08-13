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
    .populate('guideservice')
    .then( option => {
        if(option.guideservice.canceled) return res.status(406).json({success:false, msg:'취소된 상품은 결제할 수 없습니다. ^^'})
        // console.log(option.guideservice)
        GuideService.findById(option.guideservice)
        .then( gs => {
            PaymentStore.create({
                user: new mongoose.Types.ObjectId(id),
                guide: new mongoose.Types.ObjectId(gs.guide),
                service:service,
                status: '결제'
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

router.put('/realcancel/:paymentId', (req, res) => {
    PaymentStore.findById(req.params.paymentId)
    .then( payment => {
        if (payment.status !== '결제') return res.status(406).json({success:false, message:'결제들만 취소할 수 있습니다'})
        payment.status = "결제취소"
        payment.save()
        .then( result => {
            res.status(200).json({success: true, payment:payment})
        })
        .catch (err => {
            console.log(err)
            res.status(500).json({success: false, msg:"수정에 실패했습니다."})
        })
    })
    .catch(err => {
        console.log(err)
        res.json({success: false})
    })
})

// router.post('/realcancel/:paymentId', (req, res) => {
//     PaymentStore.findById(req.params.paymentId)
//     .then( payment => {
//         if (payment.status !== '결제') return res.status(406).json({success:false, message:'결제들만 취소할 수 있습니다'})
//         PaymentStore.create({
//             user: payment.user,
//             guide: payment.guide,
//             paymentRef: payment._id,
//             service: payment.service,
//             status: '결제취소'
//         })
//         .then( cancle => {
//             res.json({cancle})
//         })
//         .catch( err => {
//             console.log(err)
//             res.json({success: false})
//         })
//     })
//     .catch(err => {
//         console.log(err)
//         res.json({success: false})
//     })
// })

router.get('/findByGuide/:guideId', (req, res) => {
    PaymentStore.find({guide: req.params.guideId})
    .then( payments => {
        let cancelPayment = payments.filter( payment => {
            return payment.status==='결제취소'
        })
        let realPayment = payments.filter( payment => {
            return payment.status==='결제'
        })
        
        res.status(200).json( {
            payments: realPayment,
            cancel: cancelPayment,
            success: true
        })
    })
    .catch(err => {
        console.log(err)
        res.json({success: false})
    })
})

router.get('/findByUser/:userId/:optionId', (req, res) => {
    PaymentStore.find({user: req.params.userId})
    .then( payments => {
        console.log('얍얍')
        console.log(payments)
        console.log('얍얍')
        return payments.filter( payment => {
            return payment.service.options[0] === req.params.optionId
        })
    })
    .then( payments => {
        console.log(payments)
        res.status(200).json({payment: payments[0], success: true})
    })
    .catch( err => {
        console.log(err)
        res.status(204).json({success: false, msg:'결제정보를 찾을 수 없습니다.'})
    })
})

module.exports = router