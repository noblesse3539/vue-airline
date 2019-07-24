const User = require('../../../models/user')
const GuideService = require('../../../models/guideservice')
const ObjectID = require('mongodb').ObjectID; 
/*
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    User.find({})
    .then(
        users => {
            res.json({users})
        }
    )
}

// exports.assignAdmin = (req, res) => {
//     // refuse if not an admin
//     if(!req.decoded.admin) {
//         return res.status(403).json({
//             message: 'you are not an admin'
//         })
//     }

//     User.findOneByUserName(req.params.username)
//     .then(
//         user => user.assignAdmin()
//     ).then(
//         res.json({
//             success: true
//         })
//     )
// }

exports.userDelete = (req, res) => {
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'yue are not an admin'
        })
    }
    
    User.remove({ username: req.params.username}, function(err, output) {
        if(err) return res.status(500).json({ error: 'database failure'})

        res.status(204).end()
    })
}

exports.update = (req, res) => {
    const {_id } = req.decoded

    User.update(
        {_id: _id},
        { $set: req.body },
        (err, output) => {
            if(err) res.status(500).json({ error: 'database failure' })
            if(!output.n) return res.status(404).json({ error: 'user not found'})
            res.json({ message: 'user updated'})
        }
    )
}

exports.mypage = (req, res) => {
    const {_id} = req.decoded
    User.findById(_id)
    .select('-password')
    .populate('UsedGuideServices')
    .populate('UsedGuides')
    .then( userInfo => {
        res.json({userInfo})
    })
}

exports.addUsedGuideServices = (req, res) => {
    const {_id, username, admin} = req.decoded
    if( !admin && username !== req.params.username ) return res.status(403).json({ error: 'permission denied!!!'})

    User.findOne({_id:_id},(err,user)=>{
        if(err) res.status(404).json({err})
        if(user){
            GuideService.findOne({_id:req.params.guideServiceId},(err,guideservice)=>{
                console.log(guideservice)
                user.UsedGuideServices.push(req.params.guideServiceId)
                user.save()
                res.json({message:'success save!!'})
            })
        }
    })
}

exports.removeUsedGuideServices = (req, res) => {
    const {_id, username, admin} = req.decoded
    if( !admin && username !== req.params.username ) return res.status(403).json({ error: 'permission denied!!!'})

    User.findById(_id)
    .then( async (user) => {
        const deleted = await user.UsedGuideServices.filter( service => {
            return service._id !== req.params.guideServiceId
        })
        user.UsedGuideServices = deleted
        await user.save()
        res.json({'message': 'deleted!!'})
    })
}