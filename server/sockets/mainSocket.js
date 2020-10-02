const { users, waitingUsers } = require('../data');
const { getIo } = require('../core/SocketManager');
const Chat = require('../core/Chat');
const User = require('../core/User');

const usersInfo = { online: 0, free: 0 }
const io = getIo();

io.on('connection', socket => {
  let user;
  let randomUser;
  let page;
  let chat;
  usersInfo.online++;
  io.sockets.emit('usersInfo', usersInfo);
  
  
  socket.on('disconnect', () => {
    usersInfo.online--;
    io.sockets.emit('usersInfo', usersInfo);
    
    if (page === 'load') {
      usersInfo.free--;
      io.sockets.emit('usersInfo', usersInfo);
    }
    
    if (user) {
      const userIndex = waitingUsers.findIndex(usr => usr.id === user.id);
      waitingUsers.splice(userIndex, 1);
    }
  });
  
  socket.on('joinSearch', (userData, cb) => {
    usersInfo.free++;
    io.sockets.emit('usersInfo', usersInfo);
    
    user = new User(userData.age, userData.gender, userData.preferAge, userData.preferGender, socket.id);
    users.push(user);
    const allowUsers = waitingUsers.filter(u => {
          return u.free &&
              (parseInt(user.age) >= parseInt(u.preferAge.min) && parseInt(user.age) <= parseInt(u.preferAge.max)) &&
              (parseInt(u.age) >= parseInt(user.preferAge.min) && parseInt(u.age) <= parseInt(user.preferAge.max)) &&
              (user.gender === u.preferGender || u.preferGender === 'both') &&
              (u.gender === user.preferGender || user.preferGender === 'both')
        }
    );
    
    if (!allowUsers.length) {
      waitingUsers.push(user);
      cb(user);
    } else {
      randomUser = allowUsers[Math.floor(Math.random() * allowUsers.length)];
      chat = new Chat(user, randomUser);
      
      usersInfo.free -= 2;
      io.sockets.emit('usersInfo', usersInfo);
      
      io.to(randomUser.socketId).emit('chatFound', chat);
      io.to(user.socketId).emit('chatFound', chat);
    }
    
  });
  
  socket.on('changePage', changedPage => {
    page = changedPage;
  });
  
  socket.on('quitSearch', (userId, cb) => {
    io.sockets.emit('usersInfo', usersInfo);
    const userIndex = waitingUsers.findIndex(user => user.id === userId);
    waitingUsers.splice(userIndex, 1);
    usersInfo.free--;
    io.sockets.emit('usersInfo', usersInfo);
    cb()
  });
  
  socket.on('joinChat', (chatData, cb) => {
    user.free = false;
    
    chat = chatData;
    socket.join(chatData.id);
    cb();
  });
  
  socket.on('requestReconnect', chatId => {
    socket.join(chatId);
  });
  
  socket.on('message', data => {
    const message = {
      message: data.message,
      author: data.author
    }
    
    io.to(data.chat.id).emit('messageFormServer', message);
  });
  
  socket.on('leaveChat', data => {
    io.sockets.emit('usersInfo', usersInfo);
    
    socket.leave(data.chatId);
    data.first && io.to(data.chatId).emit('partnerLeave', data.chatId);
    if (chat) {
      const userIndex = users.findIndex(user => user.id === chat.you.id);
      users.splice(userIndex, 1);
      chat = null;
      user = null;
      randomUser = null;
    }
  });
  
});
