const Airport = require('../../../models/airport')
const Nation = require('../../../models/nation')
/*
    POST /api/airport/register
    {
        nation, 
        city, 
        airportName, 
        airportCode   
    }

    GET /api/airport/list

    GET /api/airport/search/:keyword
*/
exports.register = (req, res) => {
    const { name_eng, name_kor, nation_eng, nation_kor, city_eng, city_kor, code } = req.body
    console.log('')
    console.log(res.body)
    console.log('')

    const create = (airport) => {
        if(airport) {
            throw new Error('airport exists')
        } else {
            return Airport.create(name_eng, name_kor, nation_eng, nation_kor, city_eng, city_kor, code)
        }
    }

    const respond = (airport) => {
        res.json({
            message: `registered successfully ${airport}`
        })
    }

    const onError = (error) => {
            res.status(409).json({
            message: error.message
        })
    }

    Airport.create(name_eng, name_kor, nation_eng, nation_kor, city_eng, city_kor, code)
    .then(create)
    .then(respond)
    .catch(onError)
}

// GET api/airport/list
exports.listOfAirport = (req, res) => {
    Airport.find({})
    .populate({path:'nation', model:Nation})
    .then(
        airports => {
            res.json({airports})
        }
    )
}

// GET api/airport/search/:keyword
exports.searchAirport = (req, res) => {
    const keyword = req.params.keyword
    Airport.find()
    .or([{name_eng: { $regex: '.*' + keyword + '.*' }},
        {name_kor: { $regex: '.*' + keyword + '.*' }},
        {nation_eng: { $regex: '.*' + keyword + '.*' }},
        {nation_kor: { $regex: '.*' + keyword + '.*' }},
        {city_eng: { $regex: '.*' + keyword + '.*' }},
        {city_kor: { $regex: '.*' + keyword + '.*' }},
        {code: keyword}])
    .populate({path:'nation', model:Nation})
    .then(
        airports => {
            res.json({airports})
        }
    )
 }

 exports.nationUpdate = (req, res) => {
    Nation.find({})
    .then(nations => {
        nations.map( async (nation) => {
            await Airport.updateMany({nation_kor: nation.nation_kor}, {nation: nation._id})
            await Airport.updateMany({nation_eng: nation.nation_eng}, {nation: nation._id})
        })
    })
    .then( () => {
        res.json({'얍':'얍얍얍'})
    })
    .catch( err => {
        res.send({error: err})
    })
 }