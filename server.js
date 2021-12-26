const express = require('express')
const app = express()
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
})

app.use(express.json())

const contactsRouter = require('./routes/contacts')
app.use('/contacts', contactsRouter)


app.listen(port, () => console.log('Server Started'))