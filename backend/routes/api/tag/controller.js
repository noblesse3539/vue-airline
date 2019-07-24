const Tag = require('../../../models/tag')
const GuideService =require('../../../models/guideservice')

exports.createTag = (req,res)=>{
  const tag = new Tag(req.body)
  tag.guideservice=req.params.id
  console.log(tag);
  tag.save()
    .then((result) => {
      GuideService.findOne({_id:req.params.id}, (err, guideservice) => {
        console.log(tag);
          if(err) res.status(500).json({err})
          if (guideservice) {
              guideservice.tags.push(tag);
              guideservice.save();
              res.json(tag);
          }
      });
    })
}

exports.deleteTag = (req,res)=>{
  let newTag
  let tagId
  console.log(req.params);
  Tag.findOne({guideservice:req.params.id,tag:req.params.tag},(err,tag)=>{
    if(err) res.status(500).json({err})
    if(tag) {
      newTag=new Tag(tag)
      tagId=tag._id
      console.log(tag);
      GuideService.findOne({_id:req.params.id}, (err,guideservice) => {
              if (guideservice) {
                    console.log(guideservice);
                    const idx=guideservice.tags.indexOf(tagId);
                    console.log(tagId);
                    console.log(guideservice.tags);
                    console.log(idx);
                    if(idx>-1) guideservice.tags.splice(idx,1)
                    guideservice.save()
                    Tag.findByIdAndRemove({_id:tagId},(err)=>{
                      if(err) res.status(500).json({err})
                      return res.json(newTag)
                    })
                }
                if(err) res.status(500).json({err})
          })
    }
  })
}

exports.findGSByTag = (req, res) => {
    Tag.find({tag:req.params.tag})
    .select('guideservice')
      .populate('guideservice')
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
};
