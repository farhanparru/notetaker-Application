require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000;
const cors = require('cors')
const bodyParser = require('body-parser')
const noteRouter = require('./router/Noterouter')

mongoose.connect('mongodb://localhost:27017/notes',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Connected MongoDB');
}).catch(err =>{
    console.log('Failed to connect to mongoDb', err);
})


app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
  }));   
  
app.use(bodyParser.json())

app.use('/api/note',noteRouter)


app.listen(PORT, ()=>{
    console.log('Server is Runing port on 3000');
})