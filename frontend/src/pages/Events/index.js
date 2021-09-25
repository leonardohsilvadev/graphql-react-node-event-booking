import { useState } from 'react'
import { Backdrop, Modal } from '../../components'

import './styles.css'

export default function Events() {
  const [isAdd, setIsAdd] = useState(false)

  return (
    <>
    {isAdd && (
      <>
        <Backdrop />
        <Modal title="Add Event" onCancel={() => setIsAdd(false)}>
          <p>Modal content</p>
        </Modal>
      </>
    )}
    <div className="events-container">
      <p>Share your own Events!</p>
      <button className="btn" onClick={() => setIsAdd(true)}>Create Event</button>
    </div>
    </>
  )
}