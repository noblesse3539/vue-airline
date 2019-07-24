const GuideService = require('../../../models/guideservice')

exports.findReview = (req, res) => {
    GuideService.findOne({ _id : req.params.id })
      .populate('reviews')
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
};

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
    GuideService.findOne({user:req.params.user,title:req.params.title}, (err,guideservice) => {
        if (guideservice) {
              console.log(guideservice)
              let id=guideservice._id
              GuideService.update({ _id: id }, { $set: req.body }, function(err, output){
                  if(err) res.status(500).json({ error: 'database failure' });
                  console.log(output);
                  if(!output.n) return res.status(404).json({ error: 'guideservice not found' });
                  res.json( { message: 'guideservice updated' } );
              })
          if(err) res.status(500).json({err})
        }
        if(err) res.status(500).json({err})
      })
}


exports.findGSById=(req,res)=>{
  console.log(req.params);
  GuideService.findOne({_id:req.params.id})
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
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
