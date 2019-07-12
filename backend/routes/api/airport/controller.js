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

exports.listOfAirport = (req, res) => {
    // res.json(Airport.find({}))
    console.log('hello')
}

// exports.searchAirport = (req, res) => {

// }