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
        randomUser && socket.to(randomUser.socketId).emit('partnerLeave')
        user = null;
        randomUser = null;
        chat = null;
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
            io.to(user.socketId).emit('chatFound', chat)
        }
        
    });
    
    socket.on('joinChat', ({ id }, cb) => {
        usersInfo.free--;
        socket.join(id);
        cb();
    });
    
    socket.on('requestReconnect', chatId => {
        socket.join(chatId);
    })
    
    socket.on('message', data => {
        const message = {
            message: data.message,
            author: data.author
        }
        console.log(chat)
        io.to(data.chat.id).emit('messageFormServer', message);
    });
    
    socket.on('leaveChat', chatId => {
        console.log(user, randomUser, chat)
        socket.leave(chatId);
        io.to(randomUser.socketId).emit('partnerLeave');
    });
    
});
