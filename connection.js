const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(res =>{
    console.log("Database Connected Successfully")
}).catch(err=>{
    console.log(err);
})


