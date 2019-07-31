const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

// 예약 옵션으로 결제하면 생성되는 스키마
const paidOption = new Schema({
  option:{type:Schema.Types.ObjectId, ref: 'Option'},
  user:{type:Schema.Types.ObjectId, ref: 'User'},
  fromDate:String, // 가이드서비스 시작날짜, 예매할때 저장.
  senior:{num:Number,cost:Number}, // 고령자 num:예약인원, cost:1인당 가격
  adult:{num:Number,cost:Number}, // 성인
  child:{num:Number,cost:Number}, // 아동
  infant:{num:Number,cost:Number}, //유아
  totalPeopleNumber:Number, // 이용하는 총 인원수 Option에서의 모든 num의 합.
  totalPrice:Number, // 지불한 총 가격
  state:{type:String,default:"todo"} // done|doing|todo로 이용했는지 이용중인지 이용예정인지 구분해서 이용 예정인 서비스는 MyPage에 보여주도록.
})

module.exports = mongoose.model('paidOption',paidOption)
