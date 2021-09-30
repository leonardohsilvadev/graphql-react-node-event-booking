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

const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id
      title
      creator {
        _id
        email
      }
    }
  }
`

export { BOOKS, BOOK_EVENT, CANCEL_BOOKING }