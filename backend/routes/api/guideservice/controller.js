const GuideService = require('../../../models/guideservice')

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
