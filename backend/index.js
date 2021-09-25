const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const graphQlResolvers = require('./graphql/resolvers')
const graphQlSchema = require('./graphql/schema')
const isAuth = require('./middleware/isAuth')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})

app.use(express.json())

app.use(cors())

app.use(isAuth)

app.use('/graphql', graphqlHTTP({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true

}))

mongoose
  .connect(`mongodb+srv://${
    process.env.MONGO_USER
  }:${
    process.env.MONGO_PASSWORD
  }@cluster1.ttcyy.mongodb.net/${
    process.env.MONGO_DB
  }?retryWrites=true&w=majority`)
  .then(() => app.listen('4000', () => console.log('runnin')))
  .catch(err => console.log('err: ', err))