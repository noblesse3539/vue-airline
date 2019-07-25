const Review = require('../../../models/review')
const GuideService =require('../../../models/guideservice')

exports.createReview = (req,res)=>{
  const review = new Review(req.body)
  review.guideservice=req.params.id
  console.log(req.params.id);
  review.save()
    .then((result) => {
      GuideService.findOne({_id:req.params.id}, (err, guideservice) => {
        console.log(review);
          if(err) res.status(500).json({err})
          if (guideservice) {
              guideservice.reviews.push(review);
              guideservice.save();
              res.json(review);
          }
      });
    })
}

exports.deleteReview = (req,res)=>{
  let newReview
  let reviewId
  Review.findOne({guideservice:req.params.id,title:req.params.title,content:req.params.content},(err,review)=>{
    if(err) res.status(500).json({err})
    if(review) {
      newReview=new Review(review)
      reviewId=review._id
      console.log(review);
      GuideService.findOne({_id:req.params.id}, (err,guideservice) => {
              if (guideservice) {
                    console.log(guideservice);
                    const idx=guideservice.reviews.indexOf(reviewId);
                    console.log(reviewId);
                    console.log(guideservice.reviews);
                    console.log(idx);
                    if(idx>-1) guideservice.reviews.splice(idx,1)
                    guideservice.save()
                    Review.findByIdAndRemove({_id:reviewId},(err)=>{
                      if(err) res.status(500).json({err})
                      return res.json(newReview)
                    })
                }
                if(err) res.status(500).json({err})
          })
    }
  })
}

exports.updateReview=(req,res)=>{
    Review.findOne({guideservice:req.params.id,title:req.params.title,content:req.params.content}, (err,review) => {
        if (review) {
              console.log(review)
              let id=review._id
              Review.update({ _id: id }, { $set: req.body }, function(err, output){
                  if(err) res.status(500).json({ error: 'database failure' });
                  console.log(output);
                  if(!output.n) return res.status(404).json({ error: 'review not found' });
                  res.json( { message: 'reivew updated' } );
              })
          if(err) res.status(500).json({err})
        }
        if(err) res.status(500).json({err})
      })

  }
