const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bookingticketRoute = require('./src/routes/bookingticketRoute')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

require('dotenv').config()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/booking', bookingticketRoute);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
