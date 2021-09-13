const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const Event = require('./models/event')

const app = express()

app.use(express.json())

const events = []

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation 
    }
  `),
  rootValue: {
    events: () => Event.find()
      .then(e => e.map(({ _doc }) => ({ ..._doc })))
      .catch(err => console.log('err: ', err)),
    createEvent: ({ eventInput: { title, description, price, date } }) => {
      const event = new Event({
        title,
        description,
        price,
        date: new Date(date)
      })

      event.save()
        .then(res => {
          console.log('res: ', res)
          return { ...res._doc }
        })
        .catch(err => {
          console.log('err: ', err)
          throw err
        })

      return event
    }
  },
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