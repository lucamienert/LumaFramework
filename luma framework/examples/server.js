import express from 'express'
import compression from 'compression'

const app = express()

app.use(compression())
app.use((req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(3000)