var express = require('express');

var app = express()
var http = require('http').createServer(app)
app.use(express.static('public'))

var io = require('socket.io')(http)

var userNo = 0

io.on('connect', function(socket) {
  var user = (++userNo)
  console.log(user + ' 上线了')
  io.emit('msg_from_server', user + ' 上线了')

  socket.on('msg_from_client', function(data) {
    console.log(user +' 发来消息：', data)
    io.emit('msg_from_server', user + '说：' + data)
  })
  socket.on('disconnect', function() {
    console.log(user + ' 下线了')
    io.emit('msg_from_server', user + ' 下线了')
  })
})

http.listen(9999, function() {
  console.log('server is running on 9999')
})
