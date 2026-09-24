import { useEffect, useState } from 'react'
import { useAccommodations } from '../../hooks/useAccommodations.js';
import { Header, Menu, ExplorePage, DateSelector, HeroImage, FilterSection, CTASection, NumberSelector } from '../../components/bookings/components.jsx'
import imagenDefault from '../../assets/url_por_defecto.png'

export default function BookingPage() {
  // 1. Usamos tu hook corregido de alojamientos
  const { accommodations = [], loading, error, getAccommodations, newAccommodation } = useAccommodations();

  const [localAccommodations, setLocalAccommodations] = useState([]);

  // Formulario de ejemplo (adaptado a hospedajes / reservas)
  const [form, setForm] = useState({
    location: '',
    capacity: 2,
    maxPrice: ''
  });

  // 2. Cargamos los alojamientos al montar el componente
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!getAccommodations)return;
      try {
        // Llamamos a la función del hook sin parámetros para traer todos inicialmente
        const data = await getAccommodations();
        if (mounted && data) {
          setLocalAccommodations(Array.isArray(data) ? data : (data.content || []));
        }
      } catch (err) {
        console.error("Error al cargar los alojamientos:", err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // 3. Filtrar los alojamientos que tienen piscina (Corregido .toUperCase() -> .toUpperCase())
  const alojamientosConPiscina = localAccommodations.filter((item) => {
    if (!item.caracteristicas) return false;
    return item.caracteristicas.some(amenity => amenity.toUpperCase() === "PISCINA");
  });
  const alojamientosPetFriendly = localAccommodations.filter((item) => {
    if (!item.caracteristicas) return false;
    return item.caracteristicas.some(amenity => amenity.toUpperCase() === "PET_FRIENDLY");
  });
  const alojamientosConParking = localAccommodations.filter((item) => {
    if (!item.caracteristicas) return false;
    return item.caracteristicas.some(amenity => amenity.toUpperCase() === "PARQUEADERO");
  });

  const sections = [
    {
      title: "Alojamientos con Piscina",
      images: alojamientosConPiscina.map(item => ({
        url: item.rutasImagenes?.[0] || imagenDefault,
        title: item.name,
        location: item.location,
        id: item.id
      }))
    },
    {
      title: "Pet Friendly",
      images: alojamientosPetFriendly.map(item => ({
        url: item.rutasImagenes?.[0] || imagenDefault,
        title: item.name,
        location: item.location,
        id: item.id
      }))
    },
    {
      title: "Con Parqueadero",
      images: alojamientosConParking.map(item => ({
        url: item.rutasImagenes?.[0] || imagenDefault,
        title: item.name,
        location: item.location,
        id: item.id
      }))
    }
  ]

  // 4. Manejar envío o búsqueda
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ejemplo: buscar aplicando los filtros del formulario
      const data = await getAccommodations(form.location, form.maxPrice, form.capacity);
      if (data) {
        setLocalAccommodations(Array.isArray(data) ? data : (data.content || []));
      }
    } catch (err) {
      alert('Error al buscar hospedajes: ' + err.message);
    }
  };

  return (
    <div className="home">
      <Header />
      <Menu />
      <ExplorePage />
      <div className="date-selectors">
        <DateSelector />
        <NumberSelector />
      </div>
      <HeroImage />
      {sections.map((section) => (
        <FilterSection
          key={section.title}
          title={section.title}
          images={section.images}
        />
      ))}
      <CTASection />
    </div>
  )
}