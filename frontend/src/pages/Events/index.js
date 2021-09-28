/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Backdrop, Modal } from '../../components'
import { CREATE_EVENT, EVENTS } from '../../querys'
import { required } from '../../validators/validators'
import authContext from '../../context/authContext'

import './styles.css'

export default function Events() {
  const [isAdd, setIsAdd] = useState(false)
  const { token } = useContext(authContext)
  const events = useQuery(EVENTS)
  const [createEvent, createdEvent] = useMutation(CREATE_EVENT)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = ({ title, description, price, date }) => {
    createEvent({
      variables: { title, description, price: +price, date },
      context: { headers: { 'Authorization': `Bearer ${token}` } }
    })
  }

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
            <div>
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
            </div>
          </Modal>
        </>
      )}
      {token && (
        <div className="events-container">
          <p>Share your own Events!</p>
          <button className="btn" onClick={() => setIsAdd(true)}>Create Event</button>
        </div>
      )}

      {events?.data?.events.length > 0 && events?.data?.events.map(e => (
        <ul key={e._id} className="events-list">
          <li className="events-list-item">{e.title}</li>
        </ul>
      ))}
    </>
  )
}