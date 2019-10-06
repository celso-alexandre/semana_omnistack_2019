const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

require('dotenv').config()

const app = express()
const server = http.Server(app)
const io = socketio(server)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const connectedUsers = {}

io.on('connection', socket => {
    console.log('Usuário conectado:', socket.id)
    console.log(socket.handshake.query)

    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

//req.params.nomedoParametro (Para parametro dentro da URL [com :], sem ?. Utiliza-se para put, get, delete)
//req.query.nomeParametro (Parametro utilizando ?nomedoParametro=valor dentro da URL. Utiliza-se para filtros de get)
//req.body = Para acessar o body da requisicao (post, put)

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3333)