const express = require('express');
const cors = require('cors');
const path = require("path");
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config()
const db = require("./Db/connection");

const app = express();
const server = http.createServer(app);

const Users = require("./model/user");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 5000

//connect io
let users = [];
io.on('connection', socket => {
  console.log('User Connected', socket.id);
  socket.on('addUser', userId => {
    const isUserExist = users.find(user => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit('getUsers', users);
    }
  })

  socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
    const receiver = users.find(user => user.userId === receiverId);
    const sender = users.find(user => user.userId === senderId);
    const user = await Users.findById(senderId);
    if (receiver) {
      io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
        senderId,
        message,
        conversationId,
        receiverId,
        user: { id: user._id, fullName: user.fullName, email: user.email }
      })
    } else {
      io.to(sender.socketId).emit('getMessage', {
        senderId,
        message,
        conversationId,
        receiverId,
        user: { id: user._id, fullName: user.fullName, email: user.email }
      })
    }
  })


  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id);
    io.emit('getUsers', users);
  })
  // io.emit('getUsers', socket.userId);
})

// module.exports = 

//require routers
const authRouter = require('./routers/auth.router');
const conversationRouter = require('./routers/conversation.router');
const messageRouter = require('./routers/message.router');
const alluserRouter = require('./routers/alluser.router');
const profileRouter = require("./routers/profile.router");




//App uses
app.use(cors());
app.use(express.json());

//Router middlewares
app.use('/auth',authRouter);
app.use('/user',conversationRouter);
app.use('/user',messageRouter);
app.use('/allUser',alluserRouter);
app.use('/user',profileRouter)

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(port, () => {
  console.log(`server listen on ${port} port`)
})
