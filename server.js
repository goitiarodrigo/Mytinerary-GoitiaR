const express = require('express')
const path = require("path")
const cors = require('cors')
const passport = require("passport")
const router = require('./routes/index')
require("dotenv").config()
require("./config/databases")
require("./config/passport")



const app = express()


// Middleware

app.use(cors())
app.use(express.json())



app.use('/api', router)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname + "/client/build/index.html"))
    })
}

app.listen(process.env.PORT || 4000, '0.0.0.0',()=>console.log('Running on port 4000'))


// app.get("/api/items", (req, res) => {
// })mongodb+srv://rodrigoGoitia:mindhub21@cluster0.aeqdq.mongodb.net/Mytinerary?retryWrites=true&w=majority


