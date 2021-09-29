import { useQuery } from "@apollo/client"
import { useContext } from "react"
import { Spinner } from "../../components"
import authContext from "../../context/authContext"
import { BOOKS } from "../../querys"

export default function Bookings() {
  // * DECLARATIONS
  const { token } = useContext(authContext)
  const bookings = useQuery(BOOKS, {
      context: { headers: { 'Authorization': `Bearer ${token}` } }
  })

  return (
    <>
      {bookings.loading && <Spinner />}
      <ul>
        {bookings.data?.bookings?.map(b =>
        <li key={b._id}>{b.event?.title} - {new Date(b.createdAt).toLocaleDateString()}</li>
        )}
      </ul>
    </>
  )
}