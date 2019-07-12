const GuideService = require('../../../models/guideservice')

exports.createGuideService = (req,res) =>{
  console.log(req)
  const {nation} = req.body
  let newGuideService=null

  const createGS = (guideservice) =>{
    if(guideservice){
      throw new Error('guideservice exists')
    } else{
      return GuideService.create(nation)
    }
  }

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

  GuideService.findOneByNation(req.params.nation)
  .then(createGS)
  .then(repond)
  .catch(onError)
}
