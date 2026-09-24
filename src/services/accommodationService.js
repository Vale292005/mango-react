import { api } from "../api/client";

export const createAccommodation = async (data) => {
    try {
        const response = await api.post('/v1/accommodations', data)
        return response.data;
    } catch (error) {
        console.error('Error creating accomodation:', error)
        throw error
    }
}

export const getAccommodations = async (location = '', capacity = 0, maxPrice = 9999999) => {
    try {
        const response = await api.get('/v1/accommodations', {
            params: {
                location: location !== '' ? location : '', 
                capacity: capacity ? capacity : 0,
                maxPrice: maxPrice ? maxPrice : 9999999
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error en listar los inmuebles', error);
        throw error;
    }
}

export const getAccommodationsById = async (id) => {
    try {
        const response = await api.get(`/v1/accommodations/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al traer el alojamiento con id ${id}`, error);
        throw error;
    }
}

export const deactivateAccommodation = async (id) => {
    try {
        const response = await api.patch(`/v1/accommodations/${id}/deactivate`);
        return response.data; 
    } catch (error) {
        console.error(`Error al desactivar el alojamiento con id ${id}`, error);
        throw error;
    }
}