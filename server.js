const app = require('./app')
/*const express = require('express')
const contactsRouter = require('./routes/contacts')
const app = express()*/
const mongoose = require('mongoose')
require('dotenv').config()

const port = (process.env.PORT || 3000);

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function(err){
    if(err){
        console.log(err)
    } else {
        console.log('MongoDB Conectado com sucesso!')
    }
});

app.listen(port, () => {
    console.log(`Server Started at port: ${port}`)
});