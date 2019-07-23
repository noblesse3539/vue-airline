const Guide = require('../../../models/guide')

exports.createGuide = (req,res) =>{
  console.log(req.body);
  var guide=new Guide(req.body);

  guide.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(guide);
  })
}

exports.deleteByUserObId = (req,res) => {
  const {user}=req.params
  const repond=()=>{
    res.json({
      message:"delete Guide Account OK"
    })
  }

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }

  Guide.deleteByUserObId(user)
  .then(repond)
  .catch(onError)
}

exports.updateByUserObId = (req,res) => {
  Guide.update=(_id)=>{(
        {_id: _id},
        { $set: req.body },
        (err, output) => {
            if(err) res.status(500).json({ error: 'database failure' })
            if(!output.n) return res.status(404).json({ error: 'user not found'})
            res.json({ message: 'user updated'})
        }
    )
  }

  Guide.findByUserObId(req.params)
  .then(Guide.update(res.data._id))
}

exports.findByUserObId = (req,res) => {
  const {user}=req.params

  const repond=(guide)=>{
    res.json({guide})
  }

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }

  Guide.findByUserObId(user)
  .then(repond)
  .catch(onError)
}
