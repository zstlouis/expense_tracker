const express = require('express')
const app = express();
const cors = require('cors')


require('dotenv').config({ path: './config.env' })
const PORT = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

//mongodb connection
const con = require('./db/connection')

//using routes
app.use(require('./routes/route'))


con.then(db => {
    if (!db) return process.exit(1)

    // listten to server
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`)
    })

    app.on('error', err=> console.log(`Failed to connect with HTTP Server: ${err}`))

}).catch(err=>{
    console.log(`Connection Failed: ${err}`)
})
