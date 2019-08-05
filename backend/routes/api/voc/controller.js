const Voc = require('../../../models/voc')

exports.findVocByUser=(req,res)=>{
    Voc.find({user:req.params.user})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

exports.createVoc = (req,res)=>{
  const voc = new Voc(req.body)
  voc.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(voc);
  })
}


exports.deleteVoc = (req,res)=>{
  Voc.findByIdAndRemove({_id:req.params.id},(err)=>{
    if(err) res.status(500).json({err})
    return res.json({message:'voc deleted'})
  })
}

exports.updateVoc = (req,res)=>{
  console.log(req.params.id);
  Voc.update({_id:req.params.id}, { $set: req.body }, function(err, output){
      if(err) res.status(500).json({ error: 'database failure' });
      if(!output.n) return res.status(404).json({ error: 'voc not found' });
      res.json( { message: 'voc updated' } );
  })
}
