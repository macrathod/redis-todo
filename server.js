const http = require('http')
const express = require('express')

// DB
require('./db')

const app = express()
app.use(express.json())

// morgan test
app.use(require('morgan')('dev'))

// ROUTERS
app.use('/user', require('./routers/userRouter'))

// Server setup
const httpServer = http.createServer(app)
const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`Server up at PORT:${PORT}`)
})
