const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

//req.params.nomedoParametro (Para parametro dentro da URL [com :], sem ?. Utiliza-se para put, get, delete)
//req.query.nomeParametro (Parametro utilizando ?nomedoParametro=valor dentro da URL. Utiliza-se para filtros de get)
//req.body = Para acessar o body da requisicao (post, put)

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

app.listen(3333)