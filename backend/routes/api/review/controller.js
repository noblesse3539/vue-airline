const Review = require('../../../models/review')
const GuideService =require('../../../models/guideservice')

exports.createReview = (req,res)=>{
  console.log(req.params.payment);
  Review.findOne({payment:req.params.payment},(err,existReview)=>{
    if(err) return res.status(500).json({err})
    if(existReview){
      console.log('this paymentstore review already exists');
      console.log(existReview);
      res.status(500).json({message:'this paymentstore review already exists'})
    } else{
      console.log(req.body);
      const review = new Review(req.body)
      review.guideservice=req.params.id
      review.payment=req.params.payment
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
  })
}

exports.deleteReview = (req,res)=>{
  let newReview
  let reviewId
  Review.findById(req.params.id,(err,review)=>{
    if(err) res.status(500).json({err})
    if(review) {
      newReview=new Review(review)
      reviewId=review._id
      console.log(review);
      GuideService.findOne({_id:review.guideservice}, (err,guideservice) => {
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

exports.findReviewByUser = (req,res)=>{
  console.log(req.params.user);
  Review.find({user:req.params.user},(err,reviews)=>{
    if(err) res.status(500).json({err})
    if(reviews){
      return res.json({reviews})
    }
  })
}

exports.deleteReviewByGSTitleContent = (req,res)=>{
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
    Review.findById(req.params.id, (err,review) => {
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
