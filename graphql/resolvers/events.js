const Event = require('../../models/event')
const User = require('../../models/user')
const { transformEvent } = require('./merge')

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => transformEvent(event))
    } catch (err) {
      throw err
    }
  },
  createEvent: async ({ eventInput: { title, description, price, date } }, { isAuth, userId }) => {
    if (!isAuth) {
     throw new Error('Unauthorized!') 
    }

    const event = new Event({
      title,
      description,
      price,
      date: new Date(date),
      creator: userId
    })

    let createdEvent

    try {
      const result = await event.save()
      createdEvent = transformEvent(result)
      const creator = await User.findById(userId)

      if (!creator) {
        throw new Error('User not found')
      }

      creator.createdEvents.push(event)
      await creator.save()
      return createdEvent
    } catch (err) {
      throw err
    }
  }
}