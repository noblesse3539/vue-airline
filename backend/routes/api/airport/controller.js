const Airport = require('../../../models/airport')

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
    const { nation, city, airportName, airportCode } = req.body

    const create = (airport) => {
        if(airport) {
            throw new Error('airport exists')
        } else {
            return Airport.create(nation, city, airportName, airportCode)
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

    Airport.findOneByAirportName(airportName)
    .then(create)
    .then(respond)
    .catch(onError)
}

// GET api/airport/list
exports.listOfAirport = (req, res) => {
    Airport.find({}).select('nation city airportName airportCode')
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
    .or([{nation: { $regex: '.*' + keyword + '.*' }}, {city: { $regex: '.*' + keyword + '.*' }}, {airportName: { $regex: '.*' + keyword + '.*' }}, {airportCode: keyword}])
    .select('nation city airportName airportCode')
    .then(
        airports => {
            res.json({airports})
        }
    )
}