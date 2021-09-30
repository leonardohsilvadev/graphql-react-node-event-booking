/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Backdrop, Modal, Spinner, Card } from '../../components'
import { BOOK_EVENT, CREATE_EVENT, EVENTS } from '../../querys'
import { required } from '../../validators/validators'
import authContext from '../../context/authContext'

import './styles.css'

export default function Events() {
  // * DECLARATIONS
  const [isAdd, setIsAdd] = useState(false)
  const [isDetails, setIsDetails] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({})
  const { token, userId } = useContext(authContext)
  const events = useQuery(EVENTS)
  const [createEvent, createdEvent] = useMutation(CREATE_EVENT)
  const [bookEvent, bookedEvent] = useMutation(BOOK_EVENT)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  // * FUNCTIONS
  const onSubmit = ({ title, description, price, date }) => {
    createEvent({
      variables: { title, description, price: +price, date },
      context: { headers: { 'Authorization': `Bearer ${token}` } }
    })
  }

  const handleDetails = event => {
    setIsDetails(true)
    setSelectedEvent(events?.data?.events.find(e => e._id === event._id))
  }

  const handleCancelDetails = () => {
    setIsDetails(false)
    setSelectedEvent({})
  }

  const handleBookEvent = () => {
    bookEvent({
      variables: { eventId: selectedEvent._id },
      context: { headers: { 'Authorization': `Bearer ${token}` } }
    })
    setIsDetails(false)
    setSelectedEvent({})
  }

  bookedEvent.data && console.log('booked data: ', bookedEvent.data)  
  bookedEvent.error && console.log('booked error: ', bookedEvent.error)

  useEffect(() => {
    if (createdEvent.data) {
      setIsAdd(false)
      reset()
      events.refetch()
    }
  }, [createdEvent.data])

  return (
    <>
      {isAdd && (
        <>
          <Backdrop />
          <Modal title="Add Event" onCancel={() => setIsAdd(false)} onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" {...register('title', { required })} />
                {errors.title && errors.title.message && <label class="error-label">{errors.title.message}</label>}
              </div>

              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea rows="4" {...register('description', { required })} />
                {errors.description && errors.description.message && <label class="error-label">{errors.description.message}</label>}
              </div>

              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" {...register('price', { required })} />
                {errors.price && errors.price.message && <label class="error-label">{errors.price.message}</label>}
              </div>

              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" {...register('date', { required })} />
                {errors.date && errors.date.message && <label class="error-label">{errors.date.message}</label>}
              </div>
          </Modal>
        </>
      )}

      {isDetails && (
        <>
        <Backdrop />
        <Modal title={selectedEvent?.title} onCancel={handleCancelDetails} {...token && { onConfirm: handleBookEvent }}>
          <p>{selectedEvent?.description}</p>
          <p>${selectedEvent?.price} - {new Date(selectedEvent?.date).toLocaleDateString()}</p>
        </Modal>
        </>
      )}


      {token && (
        <div className="events-container">
          <p>Share your own Events!</p>
          <button className="btn" onClick={() => setIsAdd(true)}>Create Event</button>
        </div>
      )}

      {events?.loading ? <Spinner /> :
      events?.data?.events.length > 0 && events?.data?.events.map(event => (
        <Card
          key={event._id}
          event={event}
          userId={userId}
          title={event.title}
          subtitle={`${event.price} - ${new Date(event.date).toLocaleDateString()}`}
          buttonText="View Details"
          onClick={() => handleDetails(event)}
          {...userId === event.creator._id && { buttonText: `View Details (Owner)` }}
        />
      ))}
    </>
  )
}