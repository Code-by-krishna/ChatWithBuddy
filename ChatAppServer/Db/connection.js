const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI)
.then((res) => console.log("connected db"))
.catch((err) => console.log(err));

