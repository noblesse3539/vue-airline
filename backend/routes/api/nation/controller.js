const Airport = require('../../../models/airport')

exports.nationList = (req, res) => {
    Airport.find({})
    .select('nation_eng nation_kor')
    .then( async (nations) => {
        let nations_eng =  []
        let nations_kor = []
        await nations.forEach( nation => {
            nations_eng.push(nation.nation_eng)
            nations_kor.push(nation.nation_kor)
        })
        nations_eng = [...new Set(nations_eng)]
        nations_kor = [...new Set(nations_kor)]

        res.json({nations_eng, nations_kor})
    })
}