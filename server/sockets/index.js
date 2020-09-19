const { users, waitingUsers } = require('../data');
const { getIo } = require('../core/SocketManager');
const Chat = require('../core/Chat');
const User = require('../core/User');

const usersInfo = { free: -1, online: -1 }
const io = getIo();

io.on('connection', socket => {
  let user;
  let randomUser;
  let chat;
  usersInfo.free++;
  usersInfo.online++;
  io.sockets.emit('usersInfo', usersInfo);
  
  socket.on('disconnect', () => {
    usersInfo.free--;
    usersInfo.online--;
    io.sockets.emit('usersInfo', usersInfo);
  });
  socket.on('joinSearch', userData => {
    user = new User(userData.age, userData.gender, userData.preferAge, userData.preferGender, socket.id);
    users.push(user);
    const allowUsers = waitingUsers.filter(u => u.free &&
        (user.age >= u.preferAge.min && user.age <= u.preferAge.max) &&
        (u.age >= user.preferAge.min && u.age <= u.preferAge.max) &&
        (user.gender === u.preferGender || u.preferGender === 'both') &&
        (u.gender === user.preferGender || user.preferGender === 'both')
    );
    
    if (!allowUsers.length) {
      waitingUsers.push(user);
    } else {
      randomUser = allowUsers[Math.floor(Math.random() * allowUsers.length)];
      chat = new Chat(user, randomUser);
      io.to(randomUser.socketId).emit('chatFound', chat);
      io.to(user.socketId).emit('chatFound', chat);
    }
    
  });
  
  socket.on('joinChat', (chatData, cb) => {
    console.log('JoinCat:');
    console.log(user);
    user.free = false;
    chat = chatData;
    socket.join(chatData.id);
    cb();
  });
  
  socket.on('requestReconnect', (chatId, cb) => {
    console.log('Refresh:');
    console.log(chat);
    socket.join(chatId);
  })
  
  socket.on('message', data => {
    console.log('Message:');
    console.log(chat);
    const message = {
      message: data.message,
      author: data.author
    }
    io.to(data.chat.id).emit('messageFormServer', message);
  });
  
  socket.on('leaveChat', data => {
    console.log('Leave chat:');
    console.log(data);
    usersInfo.free++;
    io.sockets.emit('usersInfo', usersInfo);
    socket.leave(data.chatId);
    // console.log('LeaveChat:');
    // console.log(chat);
    if (chat) {
      data.first && io.to(chat.id).emit('partnerLeave', data.chatId);
      const userIndex = waitingUsers.findIndex(user => user.id === chat.you.id);
      waitingUsers.splice(userIndex, 1);
    }
  });
  
});
