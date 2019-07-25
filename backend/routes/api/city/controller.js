const Airport = require('../../../models/airport')

exports.cityList = (req, res) => {
    Airport.find({})
    .select('city_eng city_kor')
    .then( async (cities) => {
        let cities_eng =  []
        let cities_kor = []
        await cities.forEach( city => {
            cities_eng.push(city.city_eng)
            cities_kor.push(city.city_kor)
        })
        cities_eng = [...new Set(cities_eng)]
        cities_kor = [...new Set(cities_kor)]

        res.json({cities_eng, cities_kor})
    })
}