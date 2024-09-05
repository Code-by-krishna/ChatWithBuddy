const express = require('express');
const cors = require('cors');
const path = require("path");
require('dotenv').config()

const port = process.env.PORT || 5000

//require routers
const authRouter = require('./routers/auth.router');
const conversationRouter = require('./routers/conversation.router');
const messageRouter = require('./routers/message.router');
const alluserRouter = require('./routers/alluser.router');
const profileRouter = require("./routers/profile.router");

//require socket.io connection.
const socketio = require('./Socket.io/connection');



//App uses
const app = express();
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
