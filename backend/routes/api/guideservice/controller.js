const GuideService = require('../../../models/guideservice')
const Tag = require('../../../models/tag')
const Review = require('../../../models/review')
const User = require('../../../models/user')
const Option = require('../../../models/option')
const PaymentStore = require('../../../models/paymentStore')
const Room = require('../../../models/room')
const Chat = require('../../../models/chat')

exports.findReview = (req, res) => {
  console.log('findReview');
    GuideService.findOne({ _id : req.params.id })
      .populate({ path: 'reviews', populate: {path: 'payment'}, model: Review})
      .populate({ path: 'reviews', populate: {path: 'user'}, model: Review})
      .select('reviews')
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
};

exports.findOption = (req, res) => {
  console.log('findOption');
    GuideService.findOne({ _id : req.params.id })
      .populate('options')
      .select('options')
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
  GuideService.findOneAndRemove({_id:req.params.id})
  .then(respond)
  .then(onError)
}

exports.updateGuideService = (req, res) => {
    let tagsName=req.body.tags;
    req.body.tags=[];
    let gsId=req.params.id;
    let newTags=[]
    GuideService.update({ _id: gsId }, { $set: req.body }, function(err,output){
        if(!output.n) return res.status(404).json({ error: 'guideservice not found' });
        return res.json( { message: 'guideservice updated' } );
    })
    .then((output)=>{
      return Tag.find({guideservice:gsId})
    })
    .then((tags)=>{
      Promise.all(tags.map((tag) => {
        return tag.remove()
      }))
    })
    .then((output)=>{
        for (let i = 0; i < tagsName.length; i++) {
          newTags.push(new Tag({tag:tagsName[i],guideservice:gsId}))
        }
        Promise.all(newTags.map((newTag)=>{
          return newTag.save()
        }))
      }
    )
    .then((output)=>{
      GuideService.findById(gsId)
      .then((gs)=>{
        for (let i = 0; i < newTags.length; i++) {
          gs.tags.push(newTags[i]._id)
        }
        return gs.save()
      })
    })
    .catch((err)=>{
      res.status(500).json({err})
    })
}

exports.findGSAll=(req,res)=>{
  GuideService.find()
  .populate({path:'tags',model:Tag})
  .populate({path:'reviews',model:Review})
  .populate({path:'user',model:User,select:'-password'})
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error:error });
  });
}

exports.SearchGS=(req,res)=>{
  const keyword = req.params.keyword
  console.log(keyword);
  GuideService.find()
  .where('canceled').ne(true)
  .populate('tags')
  .populate('options')
  .populate({path:'reviews',model:Review})
  .or([{city_eng: { $regex: '.*' + keyword + '.*' }},
      {city_kor: { $regex: '.*' + keyword + '.*' }},
      {nation_eng: { $regex: '.*' + keyword + '.*' }},
      {nation_kor: { $regex: '.*' + keyword + '.*' }}])
  .lean()
  .then( guideservices => {
    guideservices = guideservices.map( gs => {
      let reviews = gs.reviews
      let rateAvg = 0
      reviews.forEach( review => {
        rateAvg += review.rating
      })
      rateAvg = reviews.length === 0 ? 0 : rateAvg/reviews.length
      gs.rateAvg = rateAvg
      return gs
    })  
    console.log(guideservices);
    res.json({guideservices})
  })
}


exports.findGSById=(req,res)=>{
  console.log(req.params);
  GuideService.findOne({_id:req.params.id})
  .populate('tags')
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
  console.log('findGSByUserObIdTitle');
  GuideService.findGSByUserObIdTitle(req.params.userObId,req.params.title)
  .then(
      guideservice => {
          res.json(guideservice)
      }
  )
  .catch(onError)
}

exports.findGSByGuideObId = (req,res)=>{
  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }
  console.log('findGSByGuideObId');
  GuideService.find({guide:req.params.guide})
  .populate('tags')
  .populate('guide')
  .then(
      guideservices => {
          res.json(guideservices)
      }
  )
  .catch(onError)
}



exports.createGuideService = (req,res) =>{
  console.log(req.body);
  tagsName=req.body.tags;
  req.body.tags=[];
  options=req.body.options;
  req.body.options=[];
  console.log(options);
  var GS=new GuideService(req.body);
  let guideserviceId=GS._id
  GS.save(err => {
    for (var i = 0; i < tagsName.length; i++) {
      const tag = new Tag({tag:tagsName[i]})
      tag.guideservice=GS._id
      tag.save()
        .then((result) => {
          GuideService.findOne({_id:guideserviceId}, (err, guideservice) => {
              if(err) res.status(500).json({err})
              if (guideservice) {
                  guideservice.tags.push(tag);
                  guideservice.save();
              }
          });
        })
    }
    for (var i = 0; i < options.length; i++) {
      const option = new Option(options[i])
      option.guideservice=GS._id
      option.save()
        .then((result) => {
          GuideService.findOne({_id:guideserviceId}, (err, guideservice) => {
              if(err) res.status(500).json({err})
              if (guideservice) {
                  guideservice.options.push(option);
                  guideservice.save();
              }
          });
        })
    }
    if (err) res.status(500).send(err);
    res.json(GS);
  })
}

exports.likeGuideService = (req, res) => {
  User.findById(req.params.userId)
  .then( user => {
    GuideService.findById(req.params.guideServiceId)
    .then( async (guideService) => {
      user.likeGuideServices.forEach(service => {
        console.log(service.toString())
      })
      if(user.likeGuideServices.filter( service => service.toString() === guideService._id.toString()).length !== 0) { // 좋아요 삭제
        user.likeGuideServices = await user.likeGuideServices.filter( likeService => {
          return likeService.toString() !== guideService._id.toString()
        })
        guideService.likeUsers = await guideService.likeUsers.filter( likeUser => {
          return likeUser.toString() !== user._id.toString()
        })
        user.save()
        guideService.save()
        res.status(200).json({message:"삭제 완료", added:false})
      }
      else {
        await user.likeGuideServices.push(guideService)
        await guideService.likeUsers.push(user)
        user.save()
        guideService.save()
        res.status(200).json({message:"추가 완료", added:true})
      }
    })
  })
  .catch( err => {
    res.status(500).json({error: err})
  })
}


/**
 * 모든 태그를 지우고 싶으면 이걸 살리십시오
 */
// exports.deleteAllTags = (req, res) => {
//   GuideService.find({})
//   .then( gss => {
//     for( gs of gss) {
//       gs.tags = []
//       gs.save()
//     }
//   })
//   .then( () => {
//     res.json({얍얍:'얍얍'})
//   })
// }


exports.cancelGuideService = (req, res) => {
  const guideServiceId = req.params.id

  GuideService.findById(guideServiceId)
  .then(gs => {
    if(gs.canceled) return res.status(412).json({success:false, msg:'이미 상품이 취소되어 있습니다.'})
    gs.canceled = true
    gs.save()
    return gs
  })
  .then(gs => { 
    PaymentStore.find()
    .where('status').equals('결제')
    .populate('user')
    .then(async payments => { // 해당 서비스의 결제목록 필터링 및 결제 상태를 취소로 변경
      let list = []
      for(let i=0; i< payments.length; i++) {
        const gsid = await payments[i].getGSId()
        if (gsid && gsid.equals(guideServiceId)) {
          payments[i].status = "결제취소"
          payments[i].save()
          list.push({user: payments[i].user, payment:payments[i]})
        }
      }
      return list
    })
    .then( canceledUserList => { // 결제 상태를 결제 취소로 변경
      return Promise.all(canceledUserList.map( async (info) => {
        let room = await Room.findOne({user: info.user._id, guide:info.payment.guide._id})
        try {
          if (!room) {
            console.log(`userid: ${info.user._id}, guideid: ${info.payment.guide._id}`)
            room = await Room.create({user: info.user._id, guide:info.payment.guide._id })
          }
          console.log(`roomId: ${room._id}`)
          const msg = `여행 상품(${info.payment.service.title})이 가이드의 사정에 의해 최소되었습니다. ${info.payment.created_at}에 요청하신 결제가 취소되었습니다.`
          const chat = await Chat.create({room: room._id, guide:info.payment.guide, chat:msg})
          return {info: info, success: true, sendNoti:true}
        } catch (err) {
          console.log(err)
          return {info: info, success: true, sendNoti:false}
        }
      }))
    })
    .then( val => {
      console.log(val)
      res.status(200).json({successes: val})
    })
    .catch( err => {
      console.log(err)
      res.status(400).json({success:false, err:err})
    })
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({success:false})
  })
}