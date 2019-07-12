const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Airport = new Schema({
    nation: { type: String },
    city: { type: String },
    airportName: { type: String, required: true, unique: true },
    airportCode: { type: String, required: true, unique: true }
})

Airport.statics.create = function( nation, city, airportName, airportCode) {
    const airport = new this({
        nation: nation, 
        city: city, 
        airportName: airportName, 
        airportCode: airportCode
    })

    return airport.save()
}

Airport.statics.findOneByAirportName = function(airportName) {
    return this.findOne({
        airportName
    }).exec()
}


module.exports = mongoose.model('Airport', Airport)