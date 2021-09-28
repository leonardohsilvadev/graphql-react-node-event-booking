import { gql } from '@apollo/client'

const EVENTS = gql`
  query GetEvents {
    events {
      _id
      title
      description
      price
      date
    }
  }
`

const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
    createEvent(eventInput: { title: $title, description: $description, price: $price, date: $date }) {
      _id
      title
      description
      price
      date
      creator {
        _id
        email
      }
    }
  }
`

export { EVENTS, CREATE_EVENT }