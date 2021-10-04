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




// app.get("/api/items", (req, res) => {
// })mongodb+srv://rodrigoGoitia:mindhub21@cluster0.aeqdq.mongodb.net/Mytinerary?retryWrites=true&w=majority


app.listen(4000, () => console.log('Hi! Server listening on port 4000'))