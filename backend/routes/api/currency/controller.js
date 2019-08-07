const Currency = require('../../../models/currency')
const Nation = require('../../../models/nation')
const Airport = require('../../../models/nation')

exports.createCurrency = (req,res)=>{
  Nation.findOne({code2: req.body.nationCode},(err,nat)=>{
    if(nat===null) {
      console.log(req.body.nationCode);
      return res.status(500).send({message:req.body.nationCode+' is not Found Nation Code'})
    }else{
      const currency=new Currency({nation:nat._id,code:req.body.costCode});
      currency.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(currency);
      })
    }
  })
}

exports.findListCurrency = (req,res) =>{
  Currency.find({})
  .select('code')
  .then( currencies => {
    return currencies.map( currency => {
      return currency.code
    })
  })
  .then(currencyList=>{
    res.json({currencies:[...new Set(currencyList)]})
  })
  .catch( err => {
    console.log(err)
    res.json({error:err})
  })
}

exports.searchCurrency = (req,res) =>{
  Nation.findOne({nation_kor:req.params.nationKor})
  .then(nat=>{
    Currency.findOne({nation:nat._id})
    .populate({path:'nation', model:Nation})
    .then(currency => {return res.json({currency})})
  })
  .catch(err=>{return res.status(500).send(err)})
}
