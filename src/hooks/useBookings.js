import { useEffect, useState } from 'react'
import { createBooking, getBookingsById } from '../services/bookingService'

export function useBookings(userId) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getBookingsById(userId)
      setBookings(data)
    } catch (err) {
      setError(err)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchBookings()
    }
  }, [userId])

  const saveBooking = async (bookingData) => {
    try {
      const newBooking = await createBooking(bookingData)
      setBookings((prev) => [newBooking, ...prev])
      return newBooking
    } catch (err) {
      throw err
    }
  }

  return { bookings, loading, error, saveBooking }
}