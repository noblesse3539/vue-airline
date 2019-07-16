const Guide = require('../../../models/guide')

exports.createGuide = (req,res) =>{
  const {
      guideID,
      guidePW,
      email,
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
      message:"create OK"
    })
  }

  const onError = (error) => {
      res.status(403).json({
          message: error.message
      })
  }

  Guide.create(
    guideID,
    guidePW,
    email,
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
