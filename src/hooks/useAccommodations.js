import {
    getAccommodations as getAccommodationsApi,
    getAccommodationsById as getAccommodationsByIdApi,
    deactivateAccommodation,
    createAccommodation
} from "../services/accommodationService";
import { useState, useCallback } from "react";

export function useAccommodations() {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const newAccommodation = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createAccommodation(data);
            return response;
        } catch (err) {
            setError(err);
            console.log("Error al crear el hospedaje", err);
        } finally {
            setLoading(false);
        }
    };

    const getAccommodations = useCallback(async (location, maxPrice, capacity) => {
        setLoading(true);
        setError(null);
        try {
            // Usamos la función importada con el alias 'Api'
            const data = await getAccommodationsApi({ params: { location, capacity, maxPrice } });
            setAccommodations(data);
            return data; // Retornamos los datos correctamente
        } catch (err) {
            setError(err);
            setAccommodations([]);
            console.log("Error al traer los hospedajes", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const getAccommodationsById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            // Usamos la función importada con el alias 'Api'
            const data = await getAccommodationsByIdApi(id);
            return data; // Retornamos los datos correctamente
        } catch (err) {
            setError(err);
            console.log("Error al traer el hospedaje por ID", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { getAccommodations, newAccommodation, getAccommodationsById, accommodations, loading, error };
}