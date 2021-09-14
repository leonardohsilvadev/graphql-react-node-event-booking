const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')

const graphQlResolvers = require('./graphql/resolvers')
const graphQlSchema = require('./graphql/schema')

const app = express()

app.use(express.json())

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