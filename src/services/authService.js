import {api} from '../api/client'

export const login = async (credentials) => {
    try{
        const response = await api.post('/v1/auth/login',credentials)
        return response.data
    }catch(error){
        console.error('Error logging in:',error)
        throw error
    }
}

export const register = async (userData) => {
    try{
        const response = await api.post('/v1/auth/register',userData)
        return response.data
    }catch(error){
        console.error('Error registering:',error)
        throw error
    }
}