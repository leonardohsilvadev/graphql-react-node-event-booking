import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Card, Spinner } from "../../components";
import authContext from "../../context/authContext";
import { BOOKS, CANCEL_BOOKING } from "../../querys";

export default function Bookings() {
  // * DECLARATIONS
  const { token } = useContext(authContext);
  const bookings = useQuery(BOOKS, {
    context: { headers: { Authorization: `Bearer ${token}` } },
  });
  const [cancelBooking, canceledBookingData] = useMutation(CANCEL_BOOKING, {
    context: { headers: { Authorization: `Bearer ${token}` } },
  })

  // * FUNCTIONS
  const handleCancelBooking = async bookingId => {
    await cancelBooking({ variables: { bookingId } })
    bookings.refetch()
  }

  canceledBookingData?.data && console.log('canceled data: ', canceledBookingData?.data)
  canceledBookingData?.error && console.log('canceled error: ', canceledBookingData?.error)

  return (
    <>
      {(bookings.loading || canceledBookingData?.loading) ? <Spinner />
      : bookings?.data?.bookings.map(({ _id, event, createdAt }) => (
      <Card
        key={_id}
        title={event.title}
        subtitle={`${new Date(createdAt).toLocaleDateString()}`}
        onClick={() => handleCancelBooking(_id)}
        buttonText="Cancel Booking"
      />
      ))}
    </>
  );
}
