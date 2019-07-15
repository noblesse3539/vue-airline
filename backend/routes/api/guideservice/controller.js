const GuideService = require('../../../models/guideservice')

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
  GuideService.deleteByTitle(req.params.guideID,req.params.title)
  .then(respond)
  .then(onError)
}

exports.updateGuideService = (req,res) =>{
  // console.log(req)
  let {
    title,
    nation,
    city,
    fromDate,
    toDate,
    duration,
    coreImg,
    imgList,
    cost,
    desc,
    detail,
    numOfGuest,
    reviewList}=req.body;
  const respond=()=>{
    res.json({
      message:"update GuideService OK"
    })
  }

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }
  GuideService.updateByTitle(req.params.guideID,req.params.title,title,nation,city,fromDate,toDate,duration,coreImg,imgList,cost,desc,detail,numOfGuest,reviewList)
  .then(respond)
  .then(onError)
}

exports.findGSByGuideIdTitle = (req,res)=>{

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }

  GuideService.findGSByGuideIdTitle(req.params.guideID,req.params.title)
  .then(
      guideservice => {
          res.json(guideservice)
      }
  )
  .catch(onError)
}


exports.createGuideService = (req,res) =>{
  console.log(req)
  console.log(req.body.nation)
  const {
    guideID,
    title,
    nation,
    city,
    fromDate,
    toDate,
    duration,
    coreImg,
    imgList,
    cost,
    desc,
    detail,
    numOfGuest,
    reviewList} = req.body
  let newGuideService=null

  // const createGS = (guideservice) =>{
  //   if(guideservice){
  //     throw new Error('guideservice exists')
  //   } else{
  //     return GuideService.create(nation)
  //   }
  // }

  const repond=()=>{
    res.json({
      message:"create OK"
    })
  }

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }

  GuideService.create(
    guideID,
    title,
    nation,
    city,
    fromDate,
    toDate,
    duration,
    coreImg,
    imgList,
    cost,
    desc,
    detail,
    numOfGuest,
    reviewList)
  .then(repond)
  .catch(onError)
}
