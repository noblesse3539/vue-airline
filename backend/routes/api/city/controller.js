const Airport = require('../../../models/airport')
const City = require('../../../models/city')
const Nation = require('../../../models/nation')

const mongoose = require('mongoose')
exports.cityList = (req, res) => {
    City.find({})
    .populate('nation')
    .lean()
    .sort('city_kor')
    .then( cities => {
        res.json({cities})
    })
    .catch( err => {
        res.json({error:err})
    })
}

exports.cityListByNation = (req, res) => {
    Nation.findOne({nation_kor:req.params.nationKor},(err,nat)=>{
      if(err) res.status(500).json(err)
      if(nat){
        City.find({nation:nat._id})
        .sort('city_kor')
        .then(cities=>{
           if(cities){
             return res.status(200).json(cities)
           }
        })
        .catch(err=>{
          res.json(err)
        })
      }
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

exports.cleanList = (req, res) => {
    City.find({})
    .populate('nation', 'nation_kor -_id')
    .select('-_id nation city_kor')
    .then( cities => {
        // console.log(cities[0])
        return cities.filter(city => {
            return typeof city.city_kor === 'string' && !city.city_kor.includes('/')
        })
    })
    .then( cities => {
        return cities.map( city => {
            return {nation: city.nation.nation_kor, city_kor: city.city_kor}
        })
    })
    .then( cities => {
        return cities.filter( city => {
            return city.city_kor !== ""
        })
    })
    .then( (cities) => {
        const cityList = []
        const newCities = []
        // console.log(cities[0])
        for (city of cities) {
            // console.log(cityList)
            if (cityList.indexOf(city.city_kor) == -1) {
                cityList.push(city.city_kor)
                newCities.push(city)
            }
        }
        return newCities
    })
    .then (newCities => {
        res.json({aa: newCities})
    })
    .catch( err => {
        console.log(err)
        res.json({error: err})
    })
}
