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
  Guide.findOne({user:req.params.user}, (err,guide) => {
      if (guide) {
            console.log(guide)
            let id=guide._id
            Guide.update({ _id: id }, { $set: req.body }, function(err, output){
                if(err) res.status(500).json({ error: 'database failure' });
                console.log(output);
                if(!output.n) return res.status(404).json({ error: 'guide not found' });
                res.json( { message: 'guide updated' } );
            })
        if(err) res.status(500).json({err})
      }
      if(err) res.status(500).json({err})
    })
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
