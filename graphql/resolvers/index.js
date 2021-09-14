const bcrypt = require('bcrypt')

const Event = require('../../models/event')
const User = require('../../models/user')

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(({ _doc, creator }) => ({
      ..._doc,
      date: new Date(_doc.date).toISOString(),
      creator: user.bind(this, creator)
    }))
  } catch (err) {
    throw err
  }
}

const user = async userId => {
  try {
    const { _doc } = await User.findById(userId)
    return {
      ..._doc,
      createdEvents: events.bind(this, _doc.createdEvents)
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()

      return events.map(({ _doc }) => ({
        ..._doc,
        date: new Date(_doc.date).toISOString(),
        creator: user.bind(this, _doc.creator)
      }))
    } catch (err) {
      throw err
    }
  },
  createEvent: async ({ eventInput: { title, description, price, date } }) => {
    const event = new Event({
      title,
      description,
      price,
      date: new Date(date),
      creator: '6140a79d1e1bde677ffe1d81'
    })

    let createdEvent

    try {

    const { _doc } = await event
      .save()
        createdEvent = {
          ..._doc,
          date: new Date(_doc.date).toISOString(),
          creator: user.bind(this, _doc.creator)
        }

        const creator = await User.findById('6140a79d1e1bde677ffe1d81')

          if (!creator) {
            throw new Error('User not found')
          }

          creator.createdEvents.push(event)
          await creator.save()
      return createdEvent
        } catch (err) {
          throw err
        }
  },
  createUser: async ({ userInput: { email, password } }) => {
    try {
      const findUser = await User.findOne({ email })
  
      if (findUser) {
        throw new Error('User already exists.')
      }
    
      const hashPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashPassword })
      const { _doc } = await user.save()
    
      return { ..._doc, password: null }
    } catch (err) {
      throw err
    }
  }
}