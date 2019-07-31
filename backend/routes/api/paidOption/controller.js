const PaidOption = require('../../../models/paidOption')
const GuideService =require('../../../models/guideservice')
const User =require('../../../models/guideservice')

exports.findPaidOptionByUser = (req,res)=>{
  PaidOption.find({user:req.params.user}, (err, paidOption) =>{
      if (err) return res.status(500).send(err)
      // send the list of all people in database with name of "John James" and age of 36
      // Very possible this will be an array with just one Person object in it.
      return res.status(200).send(paidOption);
  });
}

exports.findPaidOptionById = (req,res)=>{
  PaidOption.findById(req.params.id, (err, paidOption) =>{
      if (err) return res.status(500).send(err)
      return res.status(200).send(paidOption);
  });
}

exports.createPaidOption = (req,res)=>{
  const paidOption = new PaidOption(req.body)
  paidOption.option=req.params.option
  paidOption.user=req.params.user
  console.log(paidOption);
  paidOption.save(err => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(paidOption);
  });
}

exports.deletePaidOption = (req,res)=>{
  PaidOption.findByIdAndRemove(req.params.id, (err, paidOption) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(paidOption);
  });
}

exports.updatePaidOption=(req,res)=>{
  let id=req.params.id
    PaidOption.findOne({_id:id}, (err,paidOption) => {
        if (paidOption) {
              console.log(paidOption)
              PaidOption.update({ _id: id }, { $set: req.body }, function(err, output){
                  if(err) res.status(500).json({ error: 'database failure' });
                  console.log(output);
                  if(!output.n) return res.status(404).json({ error: 'paidOption not found' });
                  res.json( { message: 'paidOption updated' } );
              })
          if(err) res.status(500).json({err})
        }
        if(err) res.status(500).json({err})
      })

  }
