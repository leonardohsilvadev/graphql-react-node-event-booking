import './styles.css'

export const Card = ({ event: { title, price, date, creator }, userId, onDetails }) => (
    <div className="events-list">
      <div>
      <h1>{title}</h1>
      <h2>${price} - {new Date(date).toLocaleDateString()}</h2>
      </div>
  
      <div>
        {userId !== creator._id ?
          <button className="btn" onClick={onDetails}>View Details</button> :
          <h2>You're the event owner</h2>}
      </div>
    </div>
)