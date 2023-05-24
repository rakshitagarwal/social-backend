const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userRouter = require('./router/user');

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("some error" + err);
})

app.use(express.json());
app.use("/api/user", userRouter)

app.listen(5000,()=>{
    console.log('server is running');
});