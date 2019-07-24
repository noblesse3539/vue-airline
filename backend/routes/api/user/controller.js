const User = require('../../../models/user')

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
    .then( userInfo => {
        res.json({userInfo})
    })
}