const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

// 가이드가 작성하는 예약 폼
const Option = new Schema({
  guideservice:{ type: Schema.Types.ObjectId, ref: 'GuideService' }, // 특정 가이드서비스
  title:String, // 제목 예) 4인 1실|3월~6월|세부선셋호핑투어(점심포함)
  fromDate: String, // 시작 날짜
  toDate: String, // 종료 날짜
  dayOfWeek:[String], // 서비스하는 요일들 선택 예) 1박2일 가이드면 월, 수, 금 선택
  times:[String], // 시간대 (당일 서비스일 경우에는 특히 더 필요함)
  desc:[String],   // 예) 최소 예약 인원수(성인) 1요구|최소 2명 이상 예약 가능합니다.|점심불포함가격입니다.
  refPeople:Number,// 기준인원. 예) 4인 1실 => 4
  // Adult의 use가 false면 나이정보 없이 Adult 하나만 사용하도록 아니면 boolean이 true인 것만 최저최고나이 보여주고 사용하도록
  Senior:{num:Number,cost:Number,{minAge:Number,default:60},{maxAge:Number,default:99},{use:Boolean,default:false}}, //고령자 num: 최소인원, cost: 1인당 가격
  Adult:{{num:Number,default:1},cost:Number,{minAge:Number,default:17},{maxAge:Number,default:59},{use:Boolean,default:false}}, //성인
  Child:{num:Number,cost:Number,{minAge:Number,default:5},{maxAge:Number,default:16},{use:Boolean,default:false}},//아동
  Infant:{num:Number,cost:Number,{minAge:Number,default:3},{maxAge:Number,default:4},{use:Boolean,default:false}},//유아
  minPeople:Number, // 최소이용객 수 지정하기위해
  maxPeople:Number, // 옵션별 최대인원
                    //예약 마감처리하기위해서

})

module.exports = mongoose.model('Option',Option)