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
    console.log('#### t e s t ####')
    console.log(
        // 원하는 값이 안나옴. 정말 주의! db아이디 비번 다나옴. 쿼리 수정해야함
        Airport.find()
        .where('nation')
        .equals('')
        .select('nation city airportName airportCode')
    )
    console.log('#### t e s t ####')
    
    res.json({})
}


// GET api/airport/search/:keyword
// exports.searchAirport = (req, res) => {

// }