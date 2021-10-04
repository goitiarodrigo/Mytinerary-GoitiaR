const mongoose = require ("mongoose")
mongoose.connect(process.env.DBMONGO, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() =>console.log("Conectado"))
.catch(err => console.log(err))