const http = require('http')
const express = require('express')

// DB
require('./db')

const app = express()

app.use(express.json())

const httpServer = http.createServer(app)

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`Server up at PORT:${PORT}`)
})
