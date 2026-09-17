import { api } from '../api/client'

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/v1/bookings', bookingData)
    return response.data
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error
  }
}

export const getBookingsById = async (id) => {
  try {
    const response = await api.get(`/v1/bookings/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching booking:', error)
    throw error
  }
}

export const getBookingsByUserId = async (id) => {
  try {
    const response = await api.get(`/v1/bookings/user/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching bookings by user ID:', error)
    throw error
  }
}

export const confirmBooking = async (id) => {
  try {
    const response = await api.patch(`/v1/bookings/${id}/confirm`)
    return response.data
  } catch (error) {
    console.error('Error confirming booking:', error)
    throw error
  }
}

export const getBookings = async () => {
  try{
    const response = await api.get(`/v1/bookings`)
    return response.data
  } catch (error) {
    console.error('Error fetching bookings:', error)
    throw error
  }
}

