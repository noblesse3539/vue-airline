const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const paidOption = new Schema({
  guideservice:{ type: Schema.Types.ObjectId, ref: 'GuideService' }, // 특정 가이드서비스
  user:{type:Schema.Types.ObjectId, ref: 'User'},
  title:String, // 제목 예) 4인 1실|3월~6월|세부선셋호핑투어(점심포함)|
  fromDate: String, // 서비스 시작 날짜
  toDate: String, // 서비스 종료 날짜
  times:[String], // 시간대
  desc:[String],   // 예) 최소 예약 인원수(성인) 1요구|최소 2명 이상 예약 가능합니다.|점심불포함가격입니다.
  refPeople:Number,// 기준인원. 예) 4인 1실 => 4
        //num: 예약인원, costOfPerson: 1인당 가격
  senior:{num:Number,costOfPerson:Number}, // 고령자
  adult:{{num:Number,default:1},costOfPerson:Number}, // 성인
  child:{num:Number,costOfPerson:Number}, // 아동
  infant:{num:Number,costOfPerson:Number}, //유아
  totalPeopleNumber:Number, // 이용하는 총 인원수 Option에서의 모든 num 의 합.
  totalPrice:Number, // 지불한 총 가격
  state:String // done|doing|todo로 이용했는지 이용중인지 이용예정인지 구분해서 이용 예정인 서비스는 MyPage에 보여주도록.
})

module.exports = mongoose.model('paidOption',paidOption)
