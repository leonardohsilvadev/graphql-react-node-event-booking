const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const Event = require('./models/event')
const User = require('./models/user')

const app = express()

app.use(express.json())

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type User {
      _id: ID!
      email: String!
      password: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
      users: [User!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
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
        date: new Date(date),
        creator: '6140a79d1e1bde677ffe1d81'
      })

      event.save()
        .then(res => {
          return User.findById('6140a79d1e1bde677ffe1d81').then(user => {
            if (!user) {
              throw new Error('User dont exists')
            }

            user.createdEvents.push(event)
            user.save()
              .then(() => ({ ...res._doc }))
              .catch(err => console.log('err: ', err))
          })
        })
        .catch(err => console.log('err: ', err))

      return event
    },
    createUser: ({ userInput: { email, password } }) => {
      return User.findOne({ email })
        .then(user => {
          if (user) {
            throw new Error('User already exists.')
          }
          return bcrypt.hash(password, 12).then(hashPassword => {
            const user = new User({ email, password: hashPassword })
            return user.save()
              .then(({ _doc }) => ({ ..._doc, password: null }))
              .catch(err => console.log('err: ', err))
          }).catch(err => console.log('err: ', err))
        })
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