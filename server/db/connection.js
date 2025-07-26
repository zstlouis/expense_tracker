const mongoose = require('mongoose')

const conn = mongoose.connect(process.env.MONGODB_URI)
    .then(db=>{
    console.log('DB connection.')
    return db
}).catch(err=>{
    console.log('Connection error.')
})


module.exports = conn