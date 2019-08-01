const Guide = require('../../../models/guide')
const User = require('../../../models/user')

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
  Guide.findOne({id:req.params.id}, (err, guide) => {
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

exports.guideList = (req, res) => {
  Guide.find({})
  .populate('user', '-password')
  .then( guides => {
    res.json({guides})
  })
}

// google guide 함수들
exports.updateGuide = (req,res) => {
  Guide.findOneAndUpdate(
    {id: req.params.id}, 
    { $set: req.body}, 
    (err, guide) => {
      if (err) {
        console.log(err)
        res.json({success: false, error: err})
      }
      res.json({success: true})
  })
}

exports.deleteGuide = (req,res) => {
  Guide.findOneAndDelete(
    {id: req.params.id},  
    (err, result) => {
      if (err) res.status(500).json({error: err})
      res.status(200).json({success: true})
  })
}

exports.getGuide = (req,res) => {
  Guide.find()
  .where('id').equals(req.params.id)
  .then( guide => {
    if (!guide) res.status(204).json({message:"가이드를 찾을 수 없습니다."})
    res.status(200).json({guide})
  })
  .catch( err => {
    console.log(err)
    res.status(500).json({error: err})
  })
}

exports.getGuideList = (req,res) => {
  Guide.find({})
  .then( guides => {
    res.status(200).json({guides})
  })
  .catch(err => {
    res.status(500).json({'error': err})
  })
}