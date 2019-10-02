const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

mongoose.connect('mongodb+srv://test:123@test-api-qk3vk.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

//req.params.nomedoParametro (Para parametro dentro da URL [com :], sem ?. Utiliza-se para put, get, delete)
//req.query.nomeParametro (Parametro utilizando ?nomedoParametro=valor dentro da URL. Utiliza-se para filtros de get)
//req.body = Para acessar o body da requisicao (post, put)

app.use(express.json())
app.use(routes)

app.listen(3333)