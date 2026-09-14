import { api } from '../api/client'

export const login = async ({ email, password }) => {
    try {
        const response = await api.post('/v1/auth/login', {
            email,
            password
        },
            { withCredentials: true })
        return response.data
    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}

export const register = async ({ email, password, firstName, lastName }) => {
    try {
        const response = await api.post('/v1/auth/register', {
            email,
            password,
            firstName,
            lastName
        }, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error('Error registering:', error)
        throw error
    }
}