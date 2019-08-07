const Voc = require('../../../models/voc')
const nodemailer = require('nodemailer')
const config = require('../../../config')
const bisionEmail = config.gmail.auth.user
const User = require('../../../models/user')
const Schema = require('mongoose').Schema
exports.findVocByUser=(req,res)=>{
    Voc.find({user:req.params.user})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

exports.createVoc = (req,res)=>{
  
  const {subject, content} = req.body
  const {email, isGuide, _id} = req.decoded

  const context = {
    userOrGuide: _id,
    subject: subject,
    content: content,
    isGuide: isGuide,
  }

  Voc.create(context)
  .then( async (voc) => {
    
    const transporter = await nodemailer.createTransport(config.gmail)
    const mailOptions = {
        from: email,
        to: bisionEmail,
        subject: `${isGuide? 'GUIDE |':'USER |'}${email}| ${subject}`,
        text: `${isGuide? 'guide':'user'} id: ${_id}\n${content}`
    }
  
    transporter.sendMail(mailOptions, (error, info) => {
      if( error ) {
          console.log(error)
          res.json({sendEmail: false, save: true})
      }
      else {
          console.log('Email sent: ' + info.response)
          res.status(200).json({sendEmail: true, save: true})
      }
    })
  })
  .catch( err => {
    console.log(err)
    console.log('이거야?')
    res.status(500).send(err);
  })
}


exports.deleteVoc = (req,res)=>{
  Voc.findByIdAndRemove({_id:req.params.id},(err)=>{
    if(err) res.status(500).json({err})
    return res.json({message:'voc deleted'})
  })
}

exports.updateVoc = (req,res)=>{
  console.log(req.params.id);
  Voc.update({_id:req.params.id}, { $set: req.body }, function(err, output){
      if(err) res.status(500).json({ error: 'database failure' });
      if(!output.n) return res.status(404).json({ error: 'voc not found' });
      res.json( { message: 'voc updated' } );
  })
}
