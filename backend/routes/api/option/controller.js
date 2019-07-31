const Option = require('../../../models/option')
const GuideService =require('../../../models/guideservice')

exports.createOption = (req,res)=>{
  const option = new Option(req.body)
  option.guideservice=req.params.gs
  console.log(option);
  option.save()
    .then((result) => {
      GuideService.findOne({_id:req.params.gs}, (err, guideservice) => {
        console.log(option);
          if(err) res.status(500).json({err})
          if (guideservice) {
              guideservice.options.push(option);
              guideservice.save();
              res.json(option);
          }
      });
    })
}

exports.deleteOption = (req,res)=>{
  console.log(req.params);
  Option.findById(req.params.id,(err,option)=>{
    if(err) res.status(500).json({err})
    if(option) {
      let newOption=new Option(option)
      console.log(option);
      GuideService.findById(option.guideservice, (err,guideservice) => {
              if (guideservice) {
                    console.log(guideservice);
                    const idx=guideservice.options.indexOf(req.params.id);
                    console.log(req.params.id);
                    console.log(guideservice.options);
                    console.log(idx);
                    if(idx>-1) guideservice.options.splice(idx,1)
                    guideservice.save()
                    Option.findByIdAndRemove({_id:req.params.id},(err)=>{
                      if(err) res.status(500).json({err})
                      return res.json(newOption)
                    })
                }
                if(err) res.status(500).json({err})
          })
    }
  })
}

exports.updateOption=(req,res)=>{
  let id=req.params.id
    Option.findOne({_id:id}, (err,option) => {
        if (option) {
              console.log(option)
              Option.update({ _id: id }, { $set: req.body }, function(err, output){
                  if(err) res.status(500).json({ error: 'database failure' });
                  console.log(output);
                  if(!output.n) return res.status(404).json({ error: 'option not found' });
                  res.json( { message: 'option updated' } );
              })
          if(err) res.status(500).json({err})
        }
        if(err) res.status(500).json({err})
      })

  }
