const Guide = require('../../../models/guide')

exports.createGuide = (req,res) =>{
  const {
      user,
      nation_kor,
      nation_eng,
      city_kor,
      city_eng,
      language_kor,
      language_eng,
      starRating,
      starRatingList
  } = req.body
  let newGuideService=null

  const repond=()=>{
    res.json({
      message:"create Guide Account OK"
    })
  }

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }

  Guide.create(
    user,
    nation_kor,
    nation_eng,
    city_kor,
    city_eng,
    language_kor,
    language_eng,
    starRating,
    starRatingList
  )
  .then(repond)
  .catch(onError)
}

exports.deleteByUserObId = (req,res) => {
  const {user}=req.params
  const repond=()=>{
    res.json({
      message:"delete Guide Account OK"
    })
  }

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }

  Guide.deleteByUserObId(user)
  .then(repond)
  .catch(onError)
}

exports.updateByUserObId = (req,res) => {
    const {user}=req.params
    const {
      nation_kor,
      nation_eng,
      city_kor,
      city_eng,
      language_kor,
      language_eng
    }=req.body

    const repond=()=>{
      res.json({
        message:"update Guide Account OK"
      })
    }

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    Guide.updateByUserObId(user,nation_kor,nation_eng,city_kor,city_eng,language_kor,language_eng)
    .then(repond)
    .catch(onError)
  }

exports.findByUserObId = (req,res) => {
  const {user}=req.params

  const repond=(guide)=>{
    res.json({guide})
  }

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }

  Guide.findByUserObId(user)
  .then(repond)
  .catch(onError)
}
