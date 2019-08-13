const Room = require('../../../models/room')
const Chat = require('../../../models/chat')
const User = require('../../../models/user')
const Guide = require('../../../models/guide')
const mongoose = require('mongoose')
let now = new Date();

exports.createRoom = (req, res) => {
    console.log(req.body);
    let userId=req.body.user
    let guideId=req.body.guide
    const newRoom = new Room(req.body);
    const io = req.app.get('io');
    io.of('/room').emit('newRoom', newRoom);
    Room.findOne({user:userId,guide:guideId})
    .then((room)=>{
      if(room) return res.status(208).json(room) // 방이 이미 존재하면 그 방 정보 리턴
      return newRoom.save(); // 존재하지 않으면 추가하고 아래 findOne 메소드를 통하여 추가된 방 정보 리턴
    })
    .then((output)=>{
      return Room.findOne({user:userId,guide:guideId})
    })
    .catch((error)=>{
      console.error(error);
    })
}

exports.findById = async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id }).populate('user').populate('guide');
    return res.json(room);
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.findChatById = async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    const chats = await Chat.find({ room: room._id }).populate('user').populate('guide');
    return res.json(chats);
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.findRoomByGuide = (req, res) => {
  Room.find({guide:req.params.guide})
  .populate('user')
  .then((rooms)=>{
    return res.json(rooms)
  })
  .catch((err)=>{
    return res.json(err)
  })
}

exports.findRoomByUser = (req, res) => {
  Room.find({user:req.params.user})
  .populate('guide')
  .then((rooms)=>{
    return res.json(rooms)
  })
  .catch((err)=>{
    return res.json(err)
  })
}

exports.findRoomOne = (req, res) => {
  Room.findOne({user:req.params.user,guide:req.params.guide})
  .then((room)=>{
    return res.json(room)
  })
  .catch((err)=>{
    return res.json(err)
  })
}

