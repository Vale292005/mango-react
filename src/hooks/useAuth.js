import { login, register } from '../services/authService'
import {useState} from 'react'

export function useAuth() {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const newUser = async (userData) => {
        setLoading(true)
        setError(null)

        try{
            const newUser = await register(userData)
            return newUser
        }catch(error){
            setError(error)
            console.error('Error creating new user:', error)
        }finally{
            setLoading(false)
        }
    }

    const loginUser = async (credentials) => {
        setLoading(true)
        setError(null)
        try{
            const response = await login(credentials)
            const authUser = {
                email: response.email,
                role: response.role,
                type: response.type,
            }
            setUser(authUser)
            return authUser
        }catch(error){
            setError(error)
            console.error('Error logging in:', error)
        }finally{
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        setError(null)
    }

    return { newUser, loginUser, logout, user, loading, error }
}