const Airport = require('../../../models/airport')
const City = require('../../../models/city')
const mongoose = require('mongoose')
exports.cityList = (req, res) => {
    City.find({})
    .populate('nation')
    .lean()
    .then( cities => {
        res.json({cities})
    })
    .catch( err => {
        res.json({error:err})
    })
}

exports.createCities = (req, res) => {
    Airport.find({})
    .select('nation city_eng city_kor -_id')
    .lean()
    .then( airports => {
        return airports.filter( airport => {
            return airport.nation
        })
    })
    .then( (airports) => {
        // res.json({airports})
        const cities = airports.map((airport) => {
            return {
                nation: mongoose.Types.ObjectId(airport.nation),
                city_eng: airport.city_eng,
                city_kor: airport.city_kor
            }
        })
       return cities
    })
    .then( citiesArr => {
        // console.log(citiesArr[0])
        City.create(citiesArr, (err, cities) => {
            if (err) res.json({error: err})
            else res.json({success: true})
        })
        // res.json({test:'test'})
    })
    .catch( err => {
        res.json({error:err})
    })
}