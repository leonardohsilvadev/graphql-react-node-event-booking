const DataLoader = require('dataloader')

const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToString } = require ('../../helpers/date')

const eventLoader = new DataLoader(eventIds => events(eventIds))

const userLoader = new DataLoader(userIds => User.find({ _id: { $in: userIds } }))

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    events.sort((a,b) => eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString()))
    return events.map(event => transformEvent(event))
  } catch (err) {
    throw err
  }
}

const singleEvent = async eventId => {
  try {
    const event = await eventLoader.load(eventId.toString())
    return event
  } catch (err) {
    throw err
  }
}

const user = async userId => {
  try {
    const { _doc } = await userLoader.load(userId.toString())
    return {
      ..._doc,
      createdEvents: () => eventLoader.loadMany(_doc.createdEvents)
    }
  } catch (err) {
    throw err
  }
}

const transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  }
}

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  }
}

module.exports = { transformEvent, transformBooking }