const GuideService = require('../../../models/guideservice')
const User = require('../../../models/user')

exports.deleteGuideService = (req,res) =>{
  console.log(req)
  const respond=()=>{
    res.json({
      message:"delete GuideService OK"
    })
  }

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }
  GuideService.deleteByTitle(req.params,req.params.title)
  .then(respond)
  .then(onError)
}

exports.updateGuideService = (req, res) => {
    GuideService.update=(_id)=>{(
        {_id: _id},
        { $set: req.body },
        (err, output) => {
            if(err) res.status(500).json({ error: 'database failure' })
            if(!output.n) return res.status(404).json({ error: 'user not found'})
            res.json({ message: 'user updated'})
        }
    )
  }

    GuideService.findGSByUserObIdTitle(req.params.userObId,req.params.title)
    .then(GuideService.update(res.data._id))
}


exports.findGSByUserObIdTitle = (req,res)=>{
  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }

  GuideService.findGSByUserObIdTitle(req.params.userObId,req.params.title)
  .then(
      guideservice => {
          res.json(guideservice)
      }
  )
  .catch(onError)
}


exports.createGuideService = (req,res) =>{
  console.log(req.body);
  var GS=new GuideService(req.body);

  GS.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(GS);
  })
}

exports.likeGuideService = (req, res) => {
  User.findById(req.params.userId)
  .then( user => {
    GuideService.findById(req.params.guideServiceId)
    .then( async (guideService) => {
      user.likeGuideServices.forEach(service => {
        console.log(service.toString())
      })
      if(user.likeGuideServices.filter( service => service.toString() === guideService._id.toString()).length !== 0) { // 좋아요 삭제
        user.likeGuideServices = await user.likeGuideServices.filter( likeService => {
          return likeService.toString() !== guideService._id.toString()
        })
        guideService.likeUsers = await guideService.likeUsers.filter( likeUser => {
          return likeUser.toString() !== user._id.toString()
        })
        user.save()
        guideService.save()
        res.json({message:"삭제 완료"})
      }
      else {
        await user.likeGuideServices.push(guideService)
        await guideService.likeUsers.push(user)
        user.save()
        guideService.save()
        res.json({message:"추가 완료"})
      }
    })
  })
  .catch( err => {
    res.json({error: err})
  })
}
