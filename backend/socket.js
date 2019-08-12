

module.exports = (server,app)=>{
  const io = require('socket.io')(server)
  app.set('io', io);

  const room = io.of('/room')
  const chat = io.of('/chat')

  // io.on('connection', function(socket) {
  //     console.log(socket.id)
  //     io.emit('socketId',socket.id)
  //     socket.on('SEND_MESSAGE', function(data) {
  //         io.emit('MESSAGE', data)
  //     });
  // });

  room.on('connection',(socket)=>{
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect',()=>{
      console.log('room 네임스페이스 접속 해제');
    })
  })

  chat.on('connection',(socket)=>{
    console.log('chat 네임스페이스에 접속');
    const req=socket.request;
    const {headers:{referer}}=req;
    const roomId =referer
      .split('/')[referer.split('/').length-1]
    socket.join(roomId);
    console.log(roomId);

    socket.on('MESSAGE',(data)=>{
      console.log(100,data);
      // room.to().emit('chat',(data))
      socket.to(data.room).emit('chat',(data))
    })

    socket.on('disconnect',()=>{
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId);
    })
  })

  io.origins('*:*')
}
