import { useEffect, useState } from 'react'
import { createBooking, getBookingsById, getBookingsByUserId, getBookings as getBookingsService } from '../services/bookingService'

export function useBookings(userId) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      let data = []
      if (userId) {
        // fetch bookings for specific user
        data = await getBookingsByUserId(userId)
      } else {
        // fetch all bookings
        data = await getBookingsService()
      }
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

  // expose a method to fetch all bookings on demand
  const getBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getBookingsService({ page: 0, size: 1000 })
      setBookings(data)
      return data
    } catch (err) {
      setError(err)
      setBookings([])
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { bookings, loading, error, saveBooking, getBookings }
}