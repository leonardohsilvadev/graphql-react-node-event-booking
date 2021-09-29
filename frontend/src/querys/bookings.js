import { gql } from '@apollo/client'

const BOOKS = gql`
  query GetBookings {
    bookings {
      _id
      createdAt
      event {
        _id
        title
        date
      }
    }
  }
`

const BOOK_EVENT = gql`
  mutation BookEvent($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id
      createdAt
    }
  }
`

export { BOOK_EVENT, BOOKS }