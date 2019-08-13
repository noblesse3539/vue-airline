const Room = require('../../../models/room')
const Chat = require('../../../models/chat')
const User = require('../../../models/user')
const Guide = require('../../../models/guide')

const mongoose = require('mongoose')

 exports.createChat = async (req, res, next) => {
  try {
    if(req.body.user===''){
      delete req.body.user
    }else if(req.body.guide===''){
      delete req.body.guide
    }
    console.log(req.body.chat);
    const chat = new Chat({
      room: req.params.id,
      user: req.body.user,
      guide: req.body.guide,
      chat: req.body.chat,
    });
    await chat.save();
    let msg=await Chat.findById(chat._id).populate('user').populate('guide')
    console.log('req.params.id',req.params.id);
    console.log(msg);
    req.app.get('io').of('/chat').to(req.params.id).emit('chat', msg);
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.roomListByUser = (req, res) => {
    Chat.find({user:{$in:req.params.user}})
    .sort("-created_at")
    .distinct('room',(err,roomIds)=>{
      Room.find({'_id':{$in:roomIds}},(err,rooms)=>{
        res.json(rooms)
      })
      .populate('guide')
    })
    .catch(err=>{
      res.json(err)
    })
}

exports.roomListByGuide = (req, res) => {
  Chat.find({guide:{$in:req.params.guide}})
  .sort("-created_at")
  .distinct('room',(err,roomIds)=>{
    Room.find({'_id':{$in:roomIds}},(err,rooms)=>{
      res.json(rooms)
    })
    .populate('user')
  })
  .catch(err=>{
    res.json(err)
  })
}
